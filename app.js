/**
 * ARSHIA TV — Player & UI Logic (Static)
 * ظاهر دقیقاً مطابق نسخه فیلم — بدون حذف هیچ شبکه‌ای
 */
(function () {
  "use strict";

  var currentHls = null;
  var currentGroup = "همه";
  var COLORS = ["#ef4444", "#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#06b6d4", "#ec4899", "#84cc16"];

  function shortLogo(ch) {
    if (ch.logo && ch.logo.trim()) return ch.logo;
    var map = {
      iranintl: "INTL", azadi: "آزادی", cheshmeh: "عقاب", dej: "دژ",
      gordafarid: "گرد", bbcpersian: "BBC", radiofarda: "فردا", voapersian: "VOA",
      simayeazadi: "آزادی", shorai: "شورا", mihan: "میهن", setareh: "ستاره",
      iranwire: "Wire", mellig: "ملی", kanaljadid: "جدید", zed: "ZED",
      iranefarda: "فردا", irannr: "NR", pleon: "لئون", pulse: "پالس",
      didgah: "دید", parstv: "پارس",
      pmc: "PMC", pmcroyale: "PR", rjtv: "RJ", avang: "آونگ",
      navahang: "نوا", sunmusic: "سان", t2tv: "T2",
      persiana_music: "PM", persiana_folk: "PF", persiana_nostalgia: "PN",
      persiana_rap: "PR", persiana_setmix: "SM", afn: "AFN",
      ifilmfa: "IF", ifilm2: "IF2", metafilm: "متا", fx: "FX",
      toonix: "تون", box247: "247", avafamily: "آوا", maahtv: "ماه",
      tapesh: "تپش", tintv: "TIN", arko: "آرکو", royal: "رویال",
      oxir: "اکسیر", novin: "نوین", ravi: "راوی", yourtime: "YT",
      mtc: "MTC", nettv: "نت", itn: "ITN", omideiran: "امید",
      asil: "اصیل", assirat: "سیرات", alwilayah: "ولایه",
      persiana_fight: "رزمی"
    };
    if (map[ch.id]) return map[ch.id];
    return (ch.name || "?").substring(0, 3);
  }

  function getGroups() {
    var set = {};
    (window.CHANNELS || []).forEach(function (c) {
      if (c.group) set[c.group] = true;
    });
    return ["همه"].concat(Object.keys(set));
  }

  function renderGroupFilter() {
    var bar = document.getElementById("groupFilterBar");
    if (!bar) return;
    var groups = getGroups();
    bar.innerHTML = groups.map(function (g) {
      var active = g === currentGroup ? " active-group" : "";
      return '<button class="group-chip' + active + '" data-group="' + g + '">' + g + "</button>";
    }).join("");
    bar.querySelectorAll(".group-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentGroup = btn.getAttribute("data-group");
        renderGroupFilter();
        renderChannels();
      });
    });
  }

  function renderChannels() {
    var box = document.getElementById("channelsScroll");
    if (!box) return;
    var list = (window.CHANNELS || []).filter(function (c) {
      return currentGroup === "همه" || c.group === currentGroup;
    });
    box.innerHTML = list.map(function (ch, i) {
      var color = COLORS[i % COLORS.length];
      var logo = shortLogo(ch);
      return (
        '<div class="channel-circle-item" data-id="' + ch.id + '">' +
          '<div class="circle-avatar" style="border-color:' + color + ';">' + logo + "</div>" +
          '<span class="circle-name">' + ch.name + "</span>" +
        "</div>"
      );
    }).join("");

    box.querySelectorAll(".channel-circle-item").forEach(function (el) {
      el.addEventListener("click", function () {
        var id = el.getAttribute("data-id");
        var ch = (window.CHANNELS || []).find(function (c) { return c.id === id; });
        if (ch) selectChannel(ch);
      });
    });
  }

  function setStatus(msg) {
    var el = document.getElementById("player-status");
    if (!el) return;
    if (!msg) {
      el.style.display = "none";
      el.textContent = "";
    } else {
      el.style.display = "flex";
      el.textContent = msg;
    }
  }

  function selectChannel(ch) {
    document.getElementById("current-channel-name").textContent = ch.name;
    var streams = Array.isArray(ch.streams) ? ch.streams.filter(Boolean) : [];
    if (!streams.length) {
      setStatus("لینک استریم برای این شبکه تعریف نشده");
      return;
    }
    playStreamSequence(streams, 0, ch.name);
  }

  function playStreamSequence(streams, index, name) {
    var video = document.getElementById("main-video-player");
    if (!streams || index >= streams.length) {
      setStatus("هیچ منبعی پاسخ نداد");
      return;
    }
    var url = streams[index];
    setStatus("در حال اتصال به منبع " + (index + 1) + "...");

    if (currentHls) {
      try { currentHls.destroy(); } catch (e) {}
      currentHls = null;
    }
    video.removeAttribute("src");
    video.load();

    if (window.Hls && Hls.isSupported() && (/\.m3u8/i.test(url) || /playlist/i.test(url) || /hls/i.test(url))) {
      currentHls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        maxBufferLength: 20,
        maxMaxBufferLength: 40,
        manifestLoadingTimeOut: 10000,
        fragLoadingTimeOut: 12000
      });
      currentHls.loadSource(url);
      currentHls.attachMedia(video);
      currentHls.on(Hls.Events.MANIFEST_PARSED, function () {
        setStatus("");
        video.play().catch(function () {
          setStatus("یکبار روی تصویر بزنید");
        });
      });
      currentHls.on(Hls.Events.ERROR, function (evt, data) {
        if (data.fatal) {
          try { currentHls.destroy(); } catch (e) {}
          currentHls = null;
          playStreamSequence(streams, index + 1, name);
        }
      });
    } else {
      video.src = url;
      video.load();
      video.play().then(function () {
        setStatus("");
      }).catch(function () {
        playStreamSequence(streams, index + 1, name);
      });
    }
  }

  // UI helpers
  window.toggleDrawer = function () {
    document.getElementById("appDrawer").classList.toggle("open");
    document.getElementById("drawerOverlay").classList.toggle("open");
  };
  window.openModal = function (id) {
    var m = document.getElementById(id);
    if (m) m.style.display = "flex";
    if (document.getElementById("appDrawer").classList.contains("open")) toggleDrawer();
  };
  window.closeModal = function (id) {
    var m = document.getElementById(id);
    if (m) m.style.display = "none";
  };

  window.filterChannels = function (q) {
    q = (q || "").trim().toLowerCase();
    var box = document.getElementById("searchResults");
    if (!box) return;
    if (!q) { box.innerHTML = ""; return; }
    var hits = (window.CHANNELS || []).filter(function (c) {
      return (c.name || "").toLowerCase().indexOf(q) >= 0 || (c.group || "").toLowerCase().indexOf(q) >= 0;
    });
    box.innerHTML = hits.slice(0, 15).map(function (c) {
      return '<div style="padding:8px;border-bottom:1px solid #1e293b;cursor:pointer;" data-sid="' + c.id + '">' +
        c.name + ' <span style="color:#64748b;font-size:11px;">(' + c.group + ")</span></div>";
    }).join("") || '<div style="padding:8px;color:#64748b;">نتیجه‌ای یافت نشد</div>';
    box.querySelectorAll("[data-sid]").forEach(function (el) {
      el.addEventListener("click", function () {
        var ch = (window.CHANNELS || []).find(function (c) { return c.id === el.getAttribute("data-sid"); });
        if (ch) { closeModal("searchModal"); selectChannel(ch); }
      });
    });
  };

  // Init
  document.addEventListener("DOMContentLoaded", function () {
    renderGroupFilter();
    renderChannels();
    // اگر شبکه اول وجود داشت، آماده باش
    var first = (window.CHANNELS || [])[0];
    if (first) {
      document.getElementById("current-channel-name").textContent = "انتخاب شبکه";
    }
  });
})();
