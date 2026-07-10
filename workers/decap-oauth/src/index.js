/**
 * Decap CMS GitHub OAuth proxy for Cloudflare Workers (free tier).
 *
 * Routes:
 *   GET /auth      → redirect to GitHub OAuth
 *   GET /callback  → exchange code, handshake with Decap admin opener
 *
 * Secrets (wrangler secret put):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
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

function callbackPage(accessToken) {
  // Decap CMS expects a postMessage handshake from the OAuth popup.
  // See: https://decapcms.org/docs/github-backend/
  const tokenLiteral = JSON.stringify(accessToken);

  return `<!doctype html>
<html lang="zh-Hans">
  <head>
    <meta charset="utf-8" />
    <title>Adgine Docs 登录</title>
    <style>
      body { font-family: system-ui, sans-serif; padding: 2rem; color: #334155; }
    </style>
  </head>
  <body>
    <p id="status">正在完成 GitHub 登录…</p>
    <script>
      (function () {
        var token = ${tokenLiteral};
        var content =
          'authorization:github:success:' +
          JSON.stringify({ token: token, provider: 'github' });
        var done = false;

        function finish(message) {
          if (done) return;
          done = true;
          document.getElementById('status').textContent = message;
          setTimeout(function () {
            window.close();
          }, 500);
        }

        function sendToken(targetOrigin) {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(content, targetOrigin || '*');
            return true;
          }
          return false;
        }

        function receiveMessage(e) {
          window.removeEventListener('message', receiveMessage, false);
          sendToken(e.origin);
          finish('登录成功，正在关闭窗口…');
        }

        if (window.opener && !window.opener.closed) {
          window.addEventListener('message', receiveMessage, false);
          window.opener.postMessage('authorizing:github', '*');

          // Fallback: some Decap versions reply without a round-trip message
          setTimeout(function () {
            if (done) return;
            window.removeEventListener('message', receiveMessage, false);
            if (sendToken('*')) {
              finish('登录成功，正在关闭窗口…');
            } else {
              finish('授权成功，请关闭此窗口并返回文档后台。');
            }
          }, 1500);
        } else {
          finish('授权成功，请关闭此窗口并返回文档后台。');
        }
      })();
    </script>
  </body>
</html>`;
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

      return html(callbackPage(data.access_token));
    }

    return new Response('Adgine Docs OAuth Worker. Use /auth', {status: 404, headers: CORS});
  },
};
