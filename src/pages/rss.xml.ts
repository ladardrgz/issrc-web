import { getCollection } from 'astro:content';

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char);

export async function GET({ site }: { site: URL }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const items = posts.map((post) => `<item><title>${escapeXml(post.data.title)}</title><description>${escapeXml(post.data.description)}</description><link>${new URL(`/noticias/${post.id}/`, site).href}</link><pubDate>${post.data.date.toUTCString()}</pubDate></item>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Noticias · Instituto Ramón Carrillo</title><link>${site.href}</link><description>Noticias institucionales</description>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml' } });
}
