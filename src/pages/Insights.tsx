import { getInsights } from '../lib/wp'
import { insights } from '../data/content'
import { useAsync } from '../lib/hooks'
import { PageHero } from '../components/Layout'

export default function Insights() {
  const posts = useAsync(getInsights, insights)
  return (
    <>
      <PageHero eyebrow="Insights" title="Legal updates and guidance.">
        Articles and notes from our advocates. In production this page is fed by the firm's WordPress dashboard.
      </PageHero>
      <section className="sec">
        <div className="wrap posts">
          {[...posts, ...posts].map((p, i) => (
            <article key={i} className="post" data-reveal>
              <div className="post-img"><span>{p.tag}</span></div>
              <h3>{p.title}</h3>
              <p className="muted">{p.date}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
