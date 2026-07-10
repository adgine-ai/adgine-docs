/**
 * Decap CMS GitHub OAuth proxy for Cloudflare Workers (free tier).
 *
 * Routes:
 *   GET /auth      → redirect to GitHub OAuth
 *   GET /callback  → exchange code, post token to Decap admin opener
 *
 * Secrets (wrangler secret put):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *   ALLOWED_ORIGINS  (optional, comma-separated, e.g. https://adgine.ai,https://adgine-docs.pages.dev)
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function html(body) {
  return new Response(body, {
    headers: {'Content-Type': 'text/html; charset=utf-8', ...CORS},
  });
}

function isOriginAllowed(origin, env) {
  if (!origin) return true;
  const list = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (list.length === 0) return true;
  return list.some((allowed) => origin === allowed || origin.startsWith(allowed));
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {headers: CORS});
    }

    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const redirectUri = `${url.origin}/callback`;
      const authUrl = new URL('https://github.com/login/oauth/authorize');
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', 'repo');
      return Response.redirect(authUrl.toString(), 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) {
        return html('<p>Missing OAuth code.</p>');
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'adgine-docs-decap-oauth',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenRes.json();
      if (!data.access_token) {
        return html(`<p>OAuth failed: ${JSON.stringify(data)}</p>`);
      }

      const payload = JSON.stringify({token: data.access_token, provider: 'github'});
      return html(`<!doctype html>
<html><body><script>
  (function () {
    var msg = 'authorization:github:success:${payload.replace(/'/g, "\\'")}';
    if (window.opener) {
      window.opener.postMessage(msg, '*');
    } else {
      document.body.innerHTML = '<p>授权成功，请关闭此窗口并返回文档后台。</p>';
    }
  })();
</script></body></html>`);
    }

    return new Response('Adgine Docs OAuth Worker. Use /auth', {status: 404, headers: CORS});
  },
};
