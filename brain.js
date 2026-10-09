/**
 * ARSHIA TV PRO — BRAIN v3.1
 */
(function (global) {
  "use strict";

  var Brain = {
    version: "3.1.0-pro",
    brand: "ARSHIA TV",
    proxyBase: "",
    hls: {
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 30,
      maxBufferLength: 18,
      maxMaxBufferLength: 36,
      maxBufferSize: 18 * 1000 * 1000,
      maxBufferHole: 0.3,
      highBufferWatchdogPeriod: 2,
      nudgeMaxRetry: 5,
      fragLoadingTimeOut: 8000,
      manifestLoadingTimeOut: 5000,
      levelLoadingTimeOut: 5000,
      startLevel: -1,
      abrEwmaDefaultEstimate: 800000,
      testBandwidth: true
    },
    healthTimeoutMs: 4500,
    maxFailover: 5,
    preconnectHosts: [
      "https://radio.sr-api.ir",
      "https://radio2.sr-api.ir",
      "https://ncdn.telewebion.ir",
      "https://cdn.telewebion.ir",
      "https://cdn.jsdelivr.net"
    ],
    playUrl: function (raw) {
      if (!raw) return "";
      if (!this.proxyBase) return raw;
      if (/sr-api\.ir/i.test(raw)) return raw;
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
