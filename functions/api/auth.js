const CALLBACK_PATH = '/api/callback';
const STATE_COOKIE = 'decap_oauth_state';

const securityHeaders = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
};

const randomState = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...bytes))
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
};

export async function onRequestGet({ request, env }) {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response('OAuth no está configurado.', { status: 500, headers: securityHeaders });
  }

  const requestUrl = new URL(request.url);
  const callbackUrl = `${requestUrl.origin}${CALLBACK_PATH}`;
  const state = randomState();
  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');

  authorizeUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set('redirect_uri', callbackUrl);
  // Este repositorio es público; no solicitamos acceso a repositorios privados.
  authorizeUrl.searchParams.set('scope', env.GITHUB_OAUTH_SCOPE || 'public_repo');
  authorizeUrl.searchParams.set('state', state);

  const headers = new Headers(securityHeaders);
  headers.set('Location', authorizeUrl.toString());
  headers.set(
    'Set-Cookie',
    `${STATE_COOKIE}=${state}; Path=${CALLBACK_PATH}; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
  );

  return new Response(null, { status: 302, headers });
}

export async function onRequest() {
  return new Response('Método no permitido.', {
    status: 405,
    headers: { ...securityHeaders, Allow: 'GET' },
  });
}
