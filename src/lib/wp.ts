import { practiceAreas, type PracticeArea } from '../data/content'
import { insights, type Post } from '../data/insights'

// Headless WordPress hook-up point. Set VITE_WP_URL (e.g. https://cms.example.com)
// and the functions below fetch from the WP REST API; without it they fall back
// to the local demo content so the site always renders.
const WP = import.meta.env.VITE_WP_URL as string | undefined

async function wp<T>(path: string): Promise<T> {
  const res = await fetch(`${WP}/wp-json/wp/v2/${path}`)
  if (!res.ok) throw new Error(`WP ${res.status}`)
  return res.json()
}

export async function getPracticeAreas(): Promise<PracticeArea[]> {
  if (!WP) return practiceAreas
  const posts = await wp<{ slug: string; title: { rendered: string }; excerpt: { rendered: string }; content: { rendered: string } }[]>('practice-areas?per_page=20')
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title.rendered,
    summary: p.excerpt.rendered.replace(/<[^>]+>/g, ''),
    detail: p.content.rendered.replace(/<[^>]+>/g, ''),
    services: [],
  }))
}

export async function getInsights(): Promise<Post[]> {
  if (!WP) return insights
  const posts = await wp<{ slug: string; title: { rendered: string }; date: string }[]>('posts?per_page=12')
  return posts.map((p) => ({ slug: p.slug, tag: 'Insight', title: p.title.rendered, date: p.date.slice(0, 10) }))
}
