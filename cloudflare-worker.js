const MARKETING = "https://cloud-resource-manager-marketing.vercel.app";
const CONSOLE   = "https://cloud-resource-manager-console.vercel.app";
const API       = "https://cloud-resource-manager-api.vercel.app";

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
      // Forward the full path (including /console) directly since Console app has basePath: "/console"
      const target = new URL(CONSOLE + path + url.search);
      const req = new Request(target, {
        method:  request.method,
        headers: request.headers,
        body:    request.body,
      });
      return fetch(req);
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
