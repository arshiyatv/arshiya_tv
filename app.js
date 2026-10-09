/**
 * ارشیا TV — فقط پخش زنده (منبع واحد: channels.js)
 */
(function () {
  "use strict";

  var tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  if (tg) {
    try {
      tg.ready();
      tg.expand();
      if (tg.setHeaderColor) tg.setHeaderColor("#0a0a0a");
      if (tg.setBackgroundColor) tg.setBackgroundColor("#0a0a0a");
    } catch (e) {}
  }

  var REG = window.ARSHIA_CHANNELS || {};
  /* پراکسی فقط وقتی روی دامنه خودت (مثل pythonanywhere) باشی؛ روی GitHub Pages خاموش */
  var USE_PROXY = (function () {
    var h = (location.hostname || "").toLowerCase();
    if (h.indexOf("github.io") >= 0) return false;
    if (h === "localhost" || h === "127.0.0.1") return false;
    return true; /* pythonanywhere یا دامنه شخصی با flask_app */
  })();

  function viaProxy(url) {
    if (!USE_PROXY || !url) return url;
    if (/sr-api\.ir/i.test(url)) return url;
    return "/proxy?url=" + encodeURIComponent(url);
  }

  function isHls(url) {
    return url && /\.m3u8(\?|$)/i.test(url);
  }

  var state = {
    path: "domestic",
    groupIndex: 0,
    powerOn: false,
    current: null,
    hls: null,
    tvModel: "modern_flat",
  };

  function $(id) { return document.getElementById(id); }
  function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function currentPath() {
    return REG[state.path] || REG.domestic;
  }
  function currentGroups() {
    return (currentPath().groups) || [];
  }
  function currentGroup() {
    var g = currentGroups();
    return g[state.groupIndex] || g[0] || { title: "", channels: [] };
  }

  window.showView = function (name) {
    qsa(".view").forEach(function (el) {
      el.classList.toggle("active", el.id === "view-" + name);
    });
    qsa(".nav-item").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-view") === name);
    });
    if (name === "tv") {
      renderPathTabs();
      renderGroupTabs();
      renderChannelGrid();
      applyTvModel(state.tvModel);
    }
  };

  window.setTvModel = function (model) {
    state.tvModel = model || "modern_flat";
    applyTvModel(state.tvModel);
    qsa(".model-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-model") === state.tvModel);
    });
  };
  function applyTvModel(model) {
    var tv = $("vintage-tv");
    if (!tv) return;
    tv.classList.remove("flat", "cinema", "neon");
    if (model === "cinema") tv.classList.add("cinema");
    else if (model === "neon") tv.classList.add("neon");
    else tv.classList.add("flat");
  }

  function renderPathTabs() {
    var bar = $("path-tabs");
    if (!bar) return;
    bar.innerHTML = "";
    ["domestic", "satellite"].forEach(function (key) {
      if (!REG[key]) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "group-tab" + (state.path === key ? " active" : "");
      b.textContent = REG[key].title;
      b.onclick = function () {
        state.path = key;
        state.groupIndex = 0;
        renderPathTabs();
        renderGroupTabs();
        renderChannelGrid();
      };
      bar.appendChild(b);
    });
  }

  function renderGroupTabs() {
    var bar = $("group-tabs");
    if (!bar) return;
    bar.innerHTML = "";
    currentGroups().forEach(function (g, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "group-tab" + (state.groupIndex === i ? " active" : "");
      b.textContent = g.title;
      b.onclick = function () {
        state.groupIndex = i;
        renderGroupTabs();
        renderChannelGrid();
      };
      bar.appendChild(b);
    });
  }

  function renderChannelGrid() {
    var grid = $("channel-grid");
    if (!grid) return;
    grid.innerHTML = "";
    var list = currentGroup().channels || [];
    list.forEach(function (ch) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "channel-chip";
      if (state.current && state.current.id === ch.id) b.classList.add("active");
      var badge = ch.play ? "" : " · سایت";
      b.textContent = "📺 " + ch.name + badge;
      b.onclick = function () { tuneChannel(ch); };
      grid.appendChild(b);
    });
  }

  window.togglePower = function () {
    state.powerOn = !state.powerOn;
    var btn = $("tv-power");
    if (btn) btn.classList.toggle("on", state.powerOn);
    var led = $("tv-led");
    if (led) led.classList.toggle("on", state.powerOn);
    if (!state.powerOn) {
      stopStream();
      showSnow(true);
      setOffLabel(true, "خاموش");
      setNowPlaying("");
    } else {
      showSnow(true);
      setOffLabel(true, "آماده پخش<br/><small>شبکه را انتخاب کنید</small>");
    }
  };

  function showSnow(on) {
    var n = $("tv-noise");
    if (n) n.style.display = on ? "block" : "none";
  }
  function setOffLabel(show, html) {
    var el = $("tv-off-label");
    if (!el) return;
    el.style.display = show ? "flex" : "none";
    if (html) el.innerHTML = html;
  }
  function setNowPlaying(name) {
    var el = $("now-playing");
    if (!el) return;
    if (!name) { el.hidden = true; return; }
    el.hidden = false;
    el.innerHTML = "در حال پخش: <strong>" + esc(name) + "</strong>";
  }

  function stopStream() {
    var video = $("live-player");
    var frame = $("site-frame");
    if (state.hls) { try { state.hls.destroy(); } catch (e) {} state.hls = null; }
    if (video) {
      try { video.pause(); video.removeAttribute("src"); video.load(); video.style.display = "none"; } catch (e) {}
    }
    if (frame) {
      frame.style.display = "none";
      frame.removeAttribute("src");
    }
  }

  function playHls(url, name) {
    var video = $("live-player");
    if (!video) return;
    var playUrl = viaProxy(url);
    state.powerOn = true;
    var btn = $("tv-power");
    if (btn) btn.classList.add("on");
    var led = $("tv-led");
    if (led) led.classList.add("on");
    stopStream();
    showSnow(true);
    setOffLabel(true, "در حال اتصال…");
    setNowPlaying(name);
    video.style.display = "block";

    function ok() { showSnow(false); setOffLabel(false); }
    function fail() {
      showSnow(true);
      setOffLabel(true, "سیگنال این شبکه الان در دسترس نیست<br/><small>شبکه دیگری را امتحان کنید</small>");
    }

    if (window.Hls && Hls.isSupported()) {
      var hls = new Hls({ enableWorker: true, lowLatencyMode: true, maxBufferLength: 40 });
      state.hls = hls;
      hls.loadSource(playUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play().then(ok).catch(function () {
          setOffLabel(true, "یک‌بار روی تصویر بزنید");
          video.addEventListener("click", function once() {
            video.play().then(ok).catch(fail);
          }, { once: true });
        });
      });
      hls.on(Hls.Events.ERROR, function (ev, data) {
        if (data && data.fatal) fail();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = playUrl;
      video.play().then(ok).catch(fail);
    } else {
      video.src = playUrl;
      video.play().then(ok).catch(fail);
    }
  }

  function openSite(url, name) {
    stopStream();
    state.powerOn = true;
    var btn = $("tv-power");
    if (btn) btn.classList.add("on");
    var led = $("tv-led");
    if (led) led.classList.add("on");
    showSnow(false);
    setOffLabel(false);
    setNowPlaying(name + " (سایت)");
    var frame = $("site-frame");
    var video = $("live-player");
    if (video) video.style.display = "none";
    if (frame) {
      frame.style.display = "block";
      frame.src = url;
    } else {
      setOffLabel(true, "این شبکه از طریق سایت پخش می‌شود<br/><small>" + esc(url) + "</small>");
    }
  }

  window.tuneChannel = function (ch) {
    if (!ch) return;
    state.current = ch;
    renderChannelGrid();
    renderPanel();
    if (ch.play && isHls(ch.play)) {
      playHls(ch.play, ch.name);
    } else if (ch.play && isHls(ch.play) === false && ch.play.indexOf("http") === 0) {
      // non-hls direct url try as video
      playHls(ch.play, ch.name);
    } else if (ch.site) {
      openSite(ch.site, ch.name);
    } else {
      setOffLabel(true, "لینک پخش برای این شبکه ثبت نشده");
    }
  };

  window.tuneByIndex = function (idx) {
    var list = currentGroup().channels || [];
    if (list[idx]) tuneChannel(list[idx]);
  };

  function renderPanel() {
    var box = $("channel-panel");
    if (!box) return;
    var ch = state.current;
    if (!ch) {
      box.innerHTML = '<p class="hint-soft">شبکه‌ای انتخاب نشده</p>';
      return;
    }
    var hasPlay = !!(ch.play && isHls(ch.play));
    box.innerHTML =
      '<div class="acc-item open" data-panel="info">' +
      '<button type="button" class="acc-head">اطلاعات شبکه</button>' +
      '<div class="acc-body">' +
      "<p><strong>" + esc(ch.name) + "</strong></p>" +
      "<p class='muted'>" + (hasPlay ? "پخش مستقیم داخل ارشیا TV" : "پخش از سایت منبع") + "</p>" +
      (ch.site ? "<p class='muted small'>" + esc(ch.site) + "</p>" : "") +
      "</div></div>";
  }

  window.toggleFullscreen = function () {
    var screen = $("tv-screen");
    var stage = $("tv-stage");
    if (!screen) return;
    if (tg && tg.expand) try { tg.expand(); } catch (e) {}
    var isBig = screen.classList.contains("is-fullscreen");
    if (!isBig) {
      var req = screen.requestFullscreen || screen.webkitRequestFullscreen;
      if (req) try { req.call(screen); } catch (e) {}
      screen.classList.add("is-fullscreen");
      if (stage) stage.classList.add("tg-big");
      document.body.classList.add("tv-immersive");
    } else {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) try { exit.call(document); } catch (e) {}
      screen.classList.remove("is-fullscreen");
      if (stage) stage.classList.remove("tg-big");
      document.body.classList.remove("tv-immersive");
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    var q = new URLSearchParams(location.search || "");
    if (q.get("path") === "satellite") state.path = "satellite";
    showView("tv");
    showSnow(true);
    setOffLabel(true, "آماده پخش<br/><small>مسیر داخلی یا ماهواره را انتخاب کنید</small>");
    // auto radio javan if available
    if (q.get("ch")) {
      var all = [];
      ["domestic", "satellite"].forEach(function (k) {
        (REG[k] && REG[k].groups || []).forEach(function (g) {
          (g.channels || []).forEach(function (c) { all.push(c); });
        });
      });
      var found = all.find(function (c) { return c.id === q.get("ch"); });
      if (found) setTimeout(function () { tuneChannel(found); }, 300);
    }
  });
})();
