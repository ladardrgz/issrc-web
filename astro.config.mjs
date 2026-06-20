// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.issformosa.edu.ar',
  trailingSlash: 'always',
  redirects: {
    '/blog': '/noticias/',
  },
});
