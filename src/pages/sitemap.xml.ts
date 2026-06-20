import { getCollection } from 'astro:content';
import { careers } from '../data/careers';

const staticRoutes = ['/', '/institucion/', '/carreras/', '/ingresantes/', '/noticias/', '/contacto/', '/calendario/', '/privacidad/'];

export async function GET({ site }: { site: URL }) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const routes = [...staticRoutes, ...careers.map((career) => `/carreras/${career.slug}/`), ...posts.map((post) => `/noticias/${post.id}/`)];
  const urls = routes.map((route) => `<url><loc>${new URL(route, site).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
