var CACHE = "arshia-tv-pro-v31";
var SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./core/brain.js",
  "./core/channels-db.js",
  "./core/stream-engine.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) {
        return c.add(u).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var url = e.request.url;
  if (/\.m3u8(\?|$)/i.test(url) || /\.ts(\?|$)/i.test(url) || /sr-api\.ir|telewebion\.ir/i.test(url)) {
    return;
  }
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      var net = fetch(e.request).then(function (res) {
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});
