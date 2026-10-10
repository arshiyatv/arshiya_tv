/**
 * ARSHIA TV — Worker Proxy v4.1
 * فقط فایل‌های m3u8 از پروکسی رد می‌شوند.
 * لینک‌های .ts مستقیم به تلوبیون می‌مانند تا 403 نگیرند.
 * کل این فایل را در Cloudflare Paste کن → Save and Deploy
 */
export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors() });
    }

    const reqUrl = new URL(request.url);
    const target = reqUrl.searchParams.get("u");

    if (!target) {
      return new Response("no u — use ?u=https://ncdn.telewebion.ir/tv1/live/playlist.m3u8", {
        status: 400,
        headers: { "content-type": "text/plain; charset=utf-8", ...cors() }
      });
    }

    let dest;
    try {
      dest = new URL(target);
    } catch (e) {
      return new Response("bad url", { status: 400, headers: cors() });
    }

    const host = dest.hostname.toLowerCase();
    const allowed = [
      "telewebion.ir",
      "telewebion.com",
      "ncdn.telewebion.ir",
      "cdn.telewebion.ir",
      "cdnw.telewebion.com",
      "sr-api.ir",
      "radio.sr-api.ir",
      "radio2.sr-api.ir"
    ];
    const ok = allowed.some(function (h) {
      return host === h || host.endsWith("." + h);
    });
    if (!ok) {
      return new Response("host not allowed: " + host, { status: 403, headers: cors() });
    }

    const upHeaders = new Headers();
    upHeaders.set(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    upHeaders.set("Accept", "*/*");
    upHeaders.set("Origin", "https://www.telewebion.com");
    upHeaders.set("Referer", "https://www.telewebion.com/");
    if (request.headers.get("Range")) {
      upHeaders.set("Range", request.headers.get("Range"));
    }

    let upstream;
    try {
      upstream = await fetch(dest.toString(), {
        method: "GET",
        headers: upHeaders,
        redirect: "follow",
        cf: { cacheTtl: 0, cacheEverything: false }
      });
    } catch (err) {
      return new Response("upstream error: " + String(err), {
        status: 502,
        headers: { "content-type": "text/plain; charset=utf-8", ...cors() }
      });
    }

    const out = new Headers();
    setCors(out);
    out.set("Cache-Control", "no-store");
    const ct = (upstream.headers.get("content-type") || "").toLowerCase();
    if (ct) out.set("content-type", ct);

    const path = dest.pathname.toLowerCase();
    const isM3u =
      ct.includes("mpegurl") ||
      ct.includes("x-mpegurl") ||
      path.endsWith(".m3u8") ||
      path.includes("playlist") ||
      path.includes("index.m3u8");

    // فایل ویدیو (.ts) را دست‌نخورده برگردان — اگر از پروکسی آمد
    if (!isM3u) {
      if (upstream.headers.get("content-length")) {
        out.set("content-length", upstream.headers.get("content-length"));
      }
      return new Response(upstream.body, { status: upstream.status, headers: out });
    }

    // فقط m3u8 را بازنویسی کن
    let body = await upstream.text();
    const base = dest;
    const proxyOrigin = reqUrl.origin + reqUrl.pathname;

    body = body
      .split("\n")
      .map(function (line) {
        const t = line.trim();
        if (!t) return line;
        if (t.startsWith("#")) return line; // تگ‌های HLS دست نخورند

        try {
          const abs = new URL(t, base).toString();
          // لینک ویدیو (.ts / .m4s / .aac) را مستقیم بگذار — پروکسی نکن
          if (/\.(ts|m4s|aac|mp4)(\?|$)/i.test(abs)) {
            return abs;
          }
          // فقط زیر‌پلی‌لیست m3u8 از پروکسی رد شود
          return proxyOrigin + "?u=" + encodeURIComponent(abs);
        } catch (e) {
          return line;
        }
      })
      .join("\n");

    out.set("content-type", "application/vnd.apple.mpegurl");
    return new Response(body, { status: upstream.status, headers: out });
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*"
  };
}

function setCors(h) {
  h.set("Access-Control-Allow-Origin", "*");
  h.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
  h.set("Access-Control-Allow-Headers", "*");
  h.set("Access-Control-Expose-Headers", "*");
  }
