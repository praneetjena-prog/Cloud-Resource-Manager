const MARKETING = "https://supercloud-marketing-623693490738.us-central1.run.app";
const CONSOLE   = "https://supercloud-console-623693490738.us-central1.run.app";
const API       = "https://supercloud-api-623693490738.us-central1.run.app";

export default {
  async fetch(request) {
    const url  = new URL(request.url);
    const path = url.pathname;

    // ── /api/* ──────────────────────────────────────────────────
    if (path.startsWith("/api")) {
      const target = new URL(API + path + url.search);
      const req = new Request(target, {
        method:  request.method,
        headers: request.headers,
        body:    request.body,
      });
      const res = await fetch(req);
      const headers = new Headers(res.headers);
      headers.set("Access-Control-Allow-Origin", "*");
      return new Response(res.body, { status: res.status, headers });
    }

    // ── /console or /console/* ───────────────────────────────────
    if (path === "/console" || path.startsWith("/console/")) {
      const stripped = path.replace(/^\/console/, "") || "/";
      const target   = new URL(CONSOLE + stripped + url.search);

      const req = new Request(target, {
        method:  request.method,
        headers: request.headers,
        body:    request.body,
      });
      const res     = await fetch(req);
      const ctype   = res.headers.get("content-type") || "";

      // Rewrite HTML so _next asset paths resolve correctly under /console
      if (ctype.includes("text/html")) {
        let html = await res.text();
        html = html
          .replaceAll('src="/_next/', 'src="/console/_next/')
          .replaceAll('href="/_next/', 'href="/console/_next/')
          .replaceAll('"/_next/', '"/console/_next/');
        const headers = new Headers(res.headers);
        headers.delete("content-length");
        return new Response(html, { status: res.status, headers });
      }

      return res;
    }

    // ── /* → Marketing (default) ─────────────────────────────────
    const target = new URL(MARKETING + path + url.search);
    const req = new Request(target, {
      method:  request.method,
      headers: request.headers,
      body:    request.body,
    });
    return fetch(req);
  },
};
