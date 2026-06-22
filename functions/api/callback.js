const CALLBACK_PATH = '/api/callback';
const STATE_COOKIE = 'decap_oauth_state';

const securityHeaders = {
  'Cache-Control': 'no-store',
  'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
  'Content-Type': 'text/html; charset=UTF-8',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
};

const readCookie = (cookieHeader, name) => {
  const item = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  return item?.slice(name.length + 1);
};

const escapeForInlineScript = (value) =>
  JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e');

const renderResponse = (status, content, origin) => `<!doctype html>
<html lang="es">
  <head><meta charset="utf-8"><title>Autorización de Decap CMS</title></head>
  <body>
    <p>Finalizando la autorización…</p>
    <script>
      (() => {
        const expectedOrigin = ${escapeForInlineScript(origin)};
        const payload = ${escapeForInlineScript(`authorization:github:${status}:${JSON.stringify(content)}`)};
        const receiveMessage = (event) => {
          if (event.origin !== expectedOrigin || event.source !== window.opener) return;
          window.opener.postMessage(payload, expectedOrigin);
          window.removeEventListener('message', receiveMessage);
        };
        window.addEventListener('message', receiveMessage);
        if (window.opener) window.opener.postMessage('authorizing:github', expectedOrigin);
      })();
    </script>
  </body>
</html>`;

const htmlResponse = (body, status = 200, clearState = true) => {
  const headers = new Headers(securityHeaders);
  if (clearState) {
    headers.set(
      'Set-Cookie',
      `${STATE_COOKIE}=; Path=${CALLBACK_PATH}; Max-Age=0; HttpOnly; Secure; SameSite=Lax`,
    );
  }
  return new Response(body, { status, headers });
};

export async function onRequestGet({ request, env }) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const returnedState = requestUrl.searchParams.get('state');
  const storedState = readCookie(request.headers.get('Cookie'), STATE_COOKIE);

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return htmlResponse('OAuth no está configurado.', 500);
  }

  if (!code || !returnedState || !storedState || returnedState !== storedState) {
    return htmlResponse('Solicitud OAuth inválida o vencida.', 400);
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'issrc-decap-oauth',
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${requestUrl.origin}${CALLBACK_PATH}`,
      }),
    });

    const result = await tokenResponse.json();
    if (!tokenResponse.ok || result.error || !result.access_token) {
      console.error('GitHub rechazó el intercambio OAuth:', result.error || tokenResponse.status);
      return htmlResponse(renderResponse('error', { message: 'GitHub rechazó la autorización.' }, requestUrl.origin), 401);
    }

    return htmlResponse(
      renderResponse('success', { token: result.access_token, provider: 'github' }, requestUrl.origin),
    );
  } catch (error) {
    console.error('Error durante OAuth:', error);
    return htmlResponse(renderResponse('error', { message: 'No se pudo completar la autorización.' }, requestUrl.origin), 500);
  }
}

export async function onRequest() {
  return new Response('Método no permitido.', {
    status: 405,
    headers: { ...securityHeaders, Allow: 'GET' },
  });
}
