
/**
 * ARSHIA TV PRO — Stream Engine v3.1
 */
(function (global) {
  "use strict";

  function StreamEngine(videoEl) {
    this.video = videoEl;
    this.hls = null;
    this.currentIndex = 0;
    this.sources = [];
    this.onStatus = null;
    this._destroyed = false;
    this._timer = null;
  }

  StreamEngine.prototype._emit = function (type, detail) {
    if (typeof this.onStatus === "function") {
      try { this.onStatus(type, detail || {}); } catch (e) {}
    }
  };

  StreamEngine.prototype.destroy = function () {
    this._destroyed = true;
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }
    this._killHls();
    if (this.video) {
      try {
        this.video.pause();
        this.video.removeAttribute("src");
        this.video.load();
      } catch (e) {}
    }
  };

  StreamEngine.prototype._killHls = function () {
    if (this.hls) {
      try { this.hls.destroy(); } catch (e) {}
      this.hls = null;
    }
  };

  StreamEngine.prototype.play = function (sources) {
    this._destroyed = false;
    this.sources = (sources || []).filter(Boolean);
    this.currentIndex = 0;
    if (!this.sources.length) {
      this._emit("error", { message: "منبع پخش ثبت نشده" });
      return;
    }
    if (!global.Hls && !(this.video && this.video.canPlayType("application/vnd.apple.mpegurl"))) {
      this._emit("error", { message: "کتابخانه پخش هنوز لود نشده — چند ثانیه بعد دوباره بزنید" });
      return;
    }
    this._tryNext();
  };

  StreamEngine.prototype._tryNext = function () {
    var self = this;
    if (this._destroyed) return;
    var brain = global.ArshiaBrain || {};
    var max = brain.maxFailover || 5;

    if (this.currentIndex >= this.sources.length || this.currentIndex >= max) {
      this._emit("error", { message: "هیچ منبعی پاسخ نداد" });
      return;
    }

    var raw = this.sources[this.currentIndex];
    var url = brain.playUrl ? brain.playUrl(raw) : raw;
    this._emit("connecting", { index: this.currentIndex, url: raw });
    this._killHls();
    if (this._timer) { clearTimeout(this._timer); this._timer = null; }

    if (global.Hls && Hls.isSupported()) {
      var conf = Object.assign({}, brain.hls || {});
      conf.xhrSetup = function (xhr) {
        try { xhr.withCredentials = false; } catch (e) {}
      };
      var hls = new Hls(conf);
      this.hls = hls;
      var settled = false;

      var fail = function (reason) {
        if (settled || self._destroyed) return;
        settled = true;
        if (self._timer) { clearTimeout(self._timer); self._timer = null; }
        self._emit("failover", { index: self.currentIndex, reason: reason || "" });
        self.currentIndex += 1;
        self._tryNext();
      };

      var ok = function () {
        if (settled || self._destroyed) return;
        settled = true;
        if (self._timer) { clearTimeout(self._timer); self._timer = null; }
        self._emit("playing", { index: self.currentIndex, url: raw });
      };

      hls.loadSource(url);
      hls.attachMedia(this.video);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        var p = self.video.play();
        if (p && p.then) {
          p.then(ok).catch(function () {
            self._emit("need_gesture", {});
            var once = function () {
              self.video.play().then(ok).catch(function () { fail("play_blocked"); });
              self.video.removeEventListener("click", once);
            };
            self.video.addEventListener("click", once);
          });
        } else {
          ok();
        }
      });

      hls.on(Hls.Events.ERROR, function (ev, data) {
        if (!data || !data.fatal) return;
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          try { hls.startLoad(); } catch (e) { fail("network"); return; }
          self._timer = setTimeout(function () {
            if (!settled) fail("network_timeout");
          }, brain.healthTimeoutMs || 4500);
        } else {
          fail(data.type || "fatal");
        }
      });

      this._timer = setTimeout(function () {
        if (!settled && !self._destroyed) fail("timeout");
      }, (brain.healthTimeoutMs || 4500) + 2500);

    } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
      this.video.src = url;
      this.video.play().then(function () {
        self._emit("playing", { index: self.currentIndex, url: raw });
      }).catch(function () {
        self.currentIndex += 1;
        self._tryNext();
      });
    } else {
      this._emit("error", { message: "مرورگر از HLS پشتیبانی نمی‌کند" });
    }
  };

  global.ArshiaStreamEngine = StreamEngine;
})(window);
