/**
 * ARSHIA TV PRO — UI Controller v3.1
 */
(function () {
  "use strict";

  var brain = window.ArshiaBrain;
  var DB = window.ArshiaChannels || {};
  var engine = null;
  var deferredPrompt = null;

  var state = {
    path: "domestic",
    group: 0,
    channel: null,
    power: true
  };

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function groups() {
    return (DB[state.path] && DB[state.path].groups) || [];
  }
  function channelList() {
    var g = groups()[state.group];
    return (g && g.channels) || [];
  }

  function setStatus(text, kind) {
    var el = $("status-bar");
    if (!el) return;
    el.textContent = text || "";
    el.className = "status-bar" + (kind ? " " + kind : "");
  }

  function showSnow(on) {
    var n = $("noise");
    if (n) n.classList.toggle("on", !!on);
  }

  function setLabel(html, show) {
    var el = $("screen-label");
    if (!el) return;
    el.style.display = show ? "flex" : "none";
    if (html != null) el.innerHTML = html;
  }

  function hideSiteFrame() {
    var frame = $("site-frame");
    if (frame) {
      frame.style.display = "none";
      try { frame.removeAttribute("src"); } catch (e) {}
    }
  }

  function showPlayer(show) {
    var p = $("player");
    if (p) p.style.display = show ? "block" : "none";
  }

  function renderPaths() {
    var bar = $("path-tabs");
    if (!bar) return;
    bar.innerHTML = "";
    ["domestic", "satellite"].forEach(function (key) {
      if (!DB[key]) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tab" + (state.path === key ? " active" : "");
      b.textContent = DB[key].title;
      b.onclick = function () {
        state.path = key;
        state.group = 0;
        renderPaths();
        renderGroups();
        renderGrid();
      };
      bar.appendChild(b);
    });
  }

  function renderGroups() {
    var bar = $("group-tabs");
    if (!bar) return;
    bar.innerHTML = "";
    groups().forEach(function (g, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tab subtle" + (state.group === i ? " active" : "");
      b.textContent = g.title;
      b.onclick = function () {
        state.group = i;
        renderGroups();
        renderGrid();
      };
      bar.appendChild(b);
    });
  }

  function renderGrid() {
    var grid = $("channel-grid");
    if (!grid) return;
    grid.innerHTML = "";
    channelList().forEach(function (ch) {
      var has = (ch.sources && ch.sources.length) || ch.play;
      var card = document.createElement("button");
      card.type = "button";
      card.className = "ch-card" + (state.channel && state.channel.id === ch.id ? " active" : "");
      card.innerHTML =
        '<span class="ch-logo">' + esc(ch.logo || "▶") + "</span>" +
        '<span class="ch-name">' + esc(ch.name) + "</span>" +
        (has ? "" : '<span class="ch-badge">سایت</span>');
      card.onclick = function () { tune(ch); };
      grid.appendChild(card);
    });
  }

  function ensureEngine() {
    if (engine) return engine;
    if (typeof window.ArshiaStreamEngine !== "function") {
      setStatus("موتور پخش لود نشده", "err");
      return null;
    }
    var v = $("player");
    engine = new window.ArshiaStreamEngine(v);
    engine.onStatus = function (type, detail) {
      if (type === "connecting") {
        showSnow(true);
        setLabel("در حال اتصال…", true);
        setStatus("اتصال به منبع " + ((detail.index || 0) + 1) + "…", "info");
      } else if (type === "playing") {
        showSnow(false);
        setLabel("", false);
        showPlayer(true);
        setStatus("● پخش زنده — " + (state.channel ? state.channel.name : ""), "live");
      } else if (type === "failover") {
        setStatus("تعویض سرور خودکار…", "warn");
      } else if (type === "need_gesture") {
        setLabel("یک‌بار روی تصویر بزنید", true);
      } else if (type === "error") {
        showSnow(true);
        showPlayer(false);
        setLabel((detail && detail.message) || "سیگنال در دسترس نیست", true);
        setStatus("قطع", "err");
      }
    };
    return engine;
  }

  function tune(ch) {
    if (!ch) return;
    if (!state.power) {
      state.power = true;
      var led = $("led");
      if (led) led.classList.add("on");
    }
    state.channel = ch;
    renderGrid();
    var np = $("now-playing");
    if (np) {
      np.hidden = false;
      np.innerHTML = "<strong>" + esc(ch.name) + "</strong>";
    }

    hideSiteFrame();
    var srcs = brain && brain.sourcesOf ? brain.sourcesOf(ch) : (ch.sources || []);

    if (srcs.length) {
      showPlayer(true);
      var eng = ensureEngine();
      if (eng) eng.play(srcs);
    } else if (ch.site) {
      if (engine) engine.destroy();
      showPlayer(false);
      showSnow(false);
      setLabel(
        "لینک پخش مستقیم برای این شبکه ثبت نشده<br/><small>بعد از تهیه m3u8 قانونی در لیست اضافه می‌شود</small>",
        true
      );
      setStatus("بدون استریم مستقیم", "warn");
      var frame = $("site-frame");
      if (frame) {
        frame.style.display = "block";
        frame.src = ch.site;
      }
    } else {
      setLabel("منبع ثبت نشده", true);
      setStatus("خالی", "err");
    }
  }

  window.tvPower = function () {
    state.power = !state.power;
    var led = $("led");
    if (led) led.classList.toggle("on", state.power);
    if (!state.power) {
      if (engine) engine.destroy();
      hideSiteFrame();
      showPlayer(false);
      showSnow(true);
      setLabel("خاموش", true);
      setStatus("خاموش", "");
    } else {
      showSnow(true);
      setLabel("آماده", true);
      setStatus("آماده", "info");
      if (state.channel) tune(state.channel);
    }
  };

  window.tvFullscreen = function () {
    var box = $("stage");
    if (!box) return;
    var req = box.requestFullscreen || box.webkitRequestFullscreen;
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) exit.call(document);
    } else if (req) {
      req.call(box);
    }
  };

  window.installApp = function () {
    var banner = $("install-banner");
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () { deferredPrompt = null; });
      if (banner) banner.hidden = true;
      return;
    }
    setStatus("کروم: منوی ⋮ ← افزودن به صفحه اصلی", "info");
    if (banner) banner.hidden = false;
  };

  window.dismissInstall = function () {
    var banner = $("install-banner");
    if (banner) banner.hidden = true;
  };

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var banner = $("install-banner");
    if (banner) banner.hidden = false;
  });

  function boot() {
    if (brain && brain.preconnect) brain.preconnect();
    renderPaths();
    renderGroups();
    renderGrid();
    showSnow(true);
    setLabel("شبکه را انتخاب کنید", true);
    setStatus("ARSHIA TV " + (brain ? brain.version : "PRO"), "info");

    var q = new URLSearchParams(location.search || "");
    if (q.get("ch")) {
      var want = q.get("ch");
      var all = [];
      Object.keys(DB).forEach(function (k) {
        (DB[k].groups || []).forEach(function (g) {
          (g.channels || []).forEach(function (c) { all.push(c); });
        });
      });
      var found = all.find(function (c) { return c.id === want; });
      if (found) {
        setTimeout(function () { tune(found); }, 400);
      }
    }

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(function () {});
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
