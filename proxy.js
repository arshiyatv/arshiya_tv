/**
 * Cloudflare Worker — HLS Proxy (CORS)
 * در داشبورد Cloudflare: Workers → Create → این کد را Paste کن
 * بعد آدرس Worker را در core/brain.js داخل proxyBase بگذار:
 *   proxyBase: "https://YOUR-NAME.YOUR-SUBDOMAIN.workers.dev/?u="
 */
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors() });
    }
    const target = url.searchParams.get("u");
    if (!target) {
      return new Response("missing u", { status: 400, headers: cors() });
    }
    let dest;
    try {
      dest = new URL(target);
    } catch {
      return new Response("bad url", { status: 400, headers: cors() });
    }
    const allow = [
      "telewebion.ir",
      "ncdn.telewebion.ir",
      "cdn.telewebion.ir",
      "sr-api.ir",
      "radio.sr-api.ir",
      "radio2.sr-api.ir"
    ];
    const host = dest.hostname.toLowerCase();
    if (!allow.some((h) => host === h || host.endsWith("." + h))) {
      return new Response("host not allowed", { status: 403, headers: cors() });
    }

    const headers = new Headers();
    headers.set("User-Agent", "Mozilla/5.0 (compatible; ArshiaTV/3.0)");
    headers.set("Accept", "*/*");
    if (request.headers.get("Range")) {
      headers.set("Range", request.headers.get("Range"));
    }

    const upstream = await fetch(dest.toString(), {
      headers,
      redirect: "follow",
      cf: { cacheTtl: 0, cacheEverything: false }
    });

    const outHeaders = new Headers(upstream.headers);
    Object.entries(cors()).forEach(([k, v]) => outHeaders.set(k, v));
    outHeaders.set("Cache-Control", "no-cache");
    outHeaders.delete("content-security-policy");

    /* بازنویسی نسبی m3u8 به مطلق از طریق همین پراکسی */
    const ct = (outHeaders.get("content-type") || "").toLowerCase();
    if (ct.includes("mpegurl") || dest.pathname.endsWith(".m3u8")) {
      let body = await upstream.text();
      const base = dest;
      body = body.split("\n").map((line) => {
        const t = line.trim();
        if (!t || t.startsWith("#")) return line;
        try {
          const abs = new URL(t, base).toString();
          return url.origin + url.pathname + "?u=" + encodeURIComponent(abs);
        } catch {
          return line;
        }
      }).join("\n");
      outHeaders.set("content-type", "application/vnd.apple.mpegurl");
      return new Response(body, { status: upstream.status, headers: outHeaders });
    }

    return new Response(upstream.body, { status: upstream.status, headers: outHeaders });
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
