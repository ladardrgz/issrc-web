import { onRequestGet as authorizeWithGitHub } from './functions/api/auth.js';
import { onRequestGet as finishGitHubAuthorization } from './functions/api/callback.js';

const apiRoutes = new Map([
  ['/api/auth', authorizeWithGitHub],
  ['/api/callback', finishGitHubAuthorization],
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const apiHandler = apiRoutes.get(url.pathname);

    if (apiHandler) {
      if (request.method !== 'GET') {
        return new Response('Método no permitido.', {
          status: 405,
          headers: { Allow: 'GET', 'Cache-Control': 'no-store' },
        });
      }

      return apiHandler({ request, env });
    }

    // Astro genera el sitio en dist/; el binding ASSETS sirve esos archivos estáticos.
    return env.ASSETS.fetch(request);
  },
};
