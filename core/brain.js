/**
 * ARSHIA TV PRO — BRAIN v3.2 (Enhanced + Robust)
 */
(function (global) {
  "use strict";

  var Brain = {
    version: "3.2.0-pro",
    brand: "ARSHIA TV",
    // اگر Cloudflare Worker ساختی، اینجا بگذار:
    // proxyBase: "https://YOUR-WORKER.workers.dev/?u=",
    proxyBase: "",
    hls: {
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 30,
      maxBufferLength: 20,
      maxMaxBufferLength: 40,
      maxBufferSize: 20 * 1000 * 1000,
      maxBufferHole: 0.4,
      highBufferWatchdogPeriod: 2,
      nudgeMaxRetry: 8,
      fragLoadingTimeOut: 10000,
      manifestLoadingTimeOut: 8000,
      levelLoadingTimeOut: 8000,
      startLevel: -1,
      abrEwmaDefaultEstimate: 900000,
      testBandwidth: true,
      progressive: true
    },
    healthTimeoutMs: 5500,
    maxFailover: 6,
    preconnectHosts: [
      "https://radio.sr-api.ir",
      "https://radio2.sr-api.ir",
      "https://ncdn.telewebion.ir",
      "https://cdn.telewebion.ir",
      "https://cdnw.telewebion.com",
      "https://cdn.jsdelivr.net",
      "https://hls.pmchd.live",
      "https://rjtvhls.wns.live"
    ],
    playUrl: function (raw) {
      if (!raw) return "";
      if (!this.proxyBase) return raw;
      if (/sr-api\.ir|pmchd\.live|wns\.live|radio\.sr-api/i.test(raw)) return raw;
      return this.proxyBase + encodeURIComponent(raw);
    },
    sourcesOf: function (channel) {
      if (!channel) return [];
      var list = [];
      if (Array.isArray(channel.sources)) {
        channel.sources.forEach(function (s) {
          if (typeof s === "string" && s) list.push(s);
          else if (s && s.url) list.push(s.url);
        });
      }
      if (channel.play && list.indexOf(channel.play) < 0) list.unshift(channel.play);
      return list;
    },
    preconnect: function () {
      (this.preconnectHosts || []).forEach(function (h) {
        try {
          var l = document.createElement("link");
          l.rel = "preconnect";
          l.href = h;
          l.crossOrigin = "anonymous";
          document.head.appendChild(l);
          var d = document.createElement("link");
          d.rel = "dns-prefetch";
          d.href = h;
          document.head.appendChild(d);
        } catch (e) {}
      });
    }
  };
  global.ArshiaBrain = Brain;
})(window);
