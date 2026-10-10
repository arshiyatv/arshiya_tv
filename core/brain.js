/**
 * ARSHIA TV PRO — BRAIN v3.2.1 (Production)
 */
(function (global) {
  "use strict";

  var Brain = {
    version: "3.2.1-pro",
    brand: "ARSHIA TV",
    // بعد از ساخت Cloudflare Worker این خط را پر کن:
    // proxyBase: "https://YOUR-NAME.YOUR-SUBDOMAIN.workers.dev/?u=",
    proxyBase: "https://arshiya-proxy-5cdc.arshiyatv-hd-c4c.workers.dev/?u=",
    hls: {
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 30,
      maxBufferLength: 22,
      maxMaxBufferLength: 45,
      maxBufferSize: 25 * 1000 * 1000,
      maxBufferHole: 0.5,
      highBufferWatchdogPeriod: 2,
      nudgeMaxRetry: 10,
      fragLoadingTimeOut: 12000,
      manifestLoadingTimeOut: 10000,
      levelLoadingTimeOut: 10000,
      startLevel: -1,
      abrEwmaDefaultEstimate: 1000000,
      testBandwidth: true,
      progressive: true
    },
    healthTimeoutMs: 6000,
    maxFailover: 7,
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
