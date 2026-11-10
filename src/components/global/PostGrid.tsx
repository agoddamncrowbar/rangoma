import type { ReactNode } from 'react'
import type { Post } from '../../data/insights'
import { Heading } from '../ui/Heading'
import { Reveal } from './Reveal'

const icons: Record<string, string> = {
  Property: 'M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6',
  Employment: 'M3 8h18v12H3zM9 8V4h6v4M3 14h18',
  Succession: 'M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6',
  Litigation: 'M12 4v16M6 20h12M4 8h16M7 8l-3 7a3 3 0 006 0zM17 8l-3 7a3 3 0 006 0z',
  Banking: 'M3 9l9-5 9 5M5 9v9M9 9v9M15 9v9M19 9v9M3 20h18',
  Criminal: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
}

// Real thumbnail when the post has one, otherwise a topic tile.
function Thumb({ post }: { post: Post }) {
  if (post.thumb) return <img src={post.thumb} alt="" loading="lazy" className="mb-5 block aspect-[16/10] w-full rounded-lg object-cover" />
  return (
    <div
      aria-hidden="true"
      className="relative mb-5 grid aspect-[16/10] w-full place-items-center rounded-lg bg-night text-gold after:absolute after:inset-2 after:rounded-sm after:border after:border-gold/25 after:content-['']"
    >
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d={icons[post.tag] ?? icons.Succession} />
      </svg>
    </div>
  )
}

function Card({ post, children }: { post: Post; children: ReactNode }) {
  // Only posts with a body have an article page to link to.
  return post.body ? (
    <a href={`#/insights/${post.slug}`} className="group block">
      {children}
    </a>
  ) : (
    <div>{children}</div>
  )
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <Reveal key={p.slug}>
          <Card post={p}>
            <Thumb post={p} />
            <p className="mb-3 text-[13px] leading-4 font-medium text-gold-ink">{p.tag}</p>
            <Heading as="h3" size="md" className="mb-3 transition-colors duration-150 ease-soft group-hover:text-burg">
              {p.title}
            </Heading>
            {p.excerpt && <p className="mb-4 text-[15px] leading-6 text-ink-2">{p.excerpt}</p>}
            <p className="mb-0 text-[13px] leading-4 tabular-nums text-mute">
              {p.date}
              {p.read && ` · ${p.read}`}
            </p>
          </Card>
        </Reveal>
      ))}
    </div>
  )
}
