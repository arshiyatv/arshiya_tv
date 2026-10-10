/**
 * Cloudflare Worker — HLS Proxy (CORS + Anti-Block)
 * 
 * نحوه استفاده:
 * 1. برو به https://dash.cloudflare.com
 * 2. Workers & Pages → Create Worker
 * 3. این کد را کامل Paste کن و Deploy کن
 * 4. آدرس Worker را کپی کن (مثل: https://arshia-proxy.xxx.workers.dev)
 * 5. در core/brain.js این خط را بگذار:
 *    proxyBase: "https://arshia-proxy.xxx.workers.dev/?u=",
 */

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Max-Age": "86400"
        }
      });
    }

    const target = url.searchParams.get("u");
    if (!target) {
      return new Response("Missing ?u= parameter", { status: 400 });
    }

    try {
      const targetUrl = decodeURIComponent(target);
      
      const response = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://telewebion.com/",
          "Origin": "https://telewebion.com"
        },
        cf: {
          cacheTtl: 10,
          cacheEverything: false
        }
      });

      const newHeaders = new Headers(response.headers);
      newHeaders.set("Access-Control-Allow-Origin", "*");
      newHeaders.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
      newHeaders.set("Access-Control-Expose-Headers", "*");
      newHeaders.delete("Content-Security-Policy");
      newHeaders.delete("X-Frame-Options");

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    } catch (err) {
      return new Response("Proxy Error: " + err.message, { status: 502 });
    }
  }
};
