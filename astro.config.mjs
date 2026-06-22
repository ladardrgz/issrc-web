// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkRemoveHtml from './src/lib/remarkRemoveHtml.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.issformosa.edu.ar',
  trailingSlash: 'always',
  redirects: {
    '/blog': '/noticias/',
  },
  markdown: {
    processor: unified({ remarkPlugins: [remarkRemoveHtml] }),
  },
});
