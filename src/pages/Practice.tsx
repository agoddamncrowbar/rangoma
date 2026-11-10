import { getPracticeAreas } from '../lib/wp'
import { practiceAreas } from '../data/content'
import { useAsync } from '../lib/hooks'
import { PageHero } from '../components/Layout'
import { CtaBand } from './Home'

export function PracticeList() {
  const areas = useAsync(getPracticeAreas, practiceAreas)
  return (
    <>
      <PageHero eyebrow="Practice areas" title="Depth across the matters that matter.">
        From property and corporate work to litigation and succession, our advocates act for businesses, institutions and individuals.
      </PageHero>
      <section className="sec">
        <div className="wrap rows">
          {areas.map((a, i) => (
            <a key={a.slug} href={`#/practice/${a.slug}`} className="row" data-reveal>
              <span className="card-n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.summary}</p>
              </div>
              <span className="card-go">→</span>
            </a>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  )
}

export function PracticeDetail({ slug }: { slug: string }) {
  const areas = useAsync(getPracticeAreas, practiceAreas)
  const a = areas.find((x) => x.slug === slug)
  if (!a)
    return (
      <PageHero eyebrow="Practice areas" title="Practice area not found.">
        <a href="#/practice" className="link">Back to all practice areas</a>
      </PageHero>
    )
  const others = areas.filter((x) => x.slug !== slug).slice(0, 5)
  return (
    <>
      <PageHero eyebrow="Practice area" title={a.title}>
        {a.summary}
      </PageHero>
      <section className="sec">
        <div className="wrap detail">
          <div className="prose" data-reveal>
            <p>{a.detail}</p>
            {a.services.length > 0 && (
              <>
                <h3 className="sub">What we handle</h3>
                <ul className="ticks">
                  {a.services.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            )}
            <a href="#/contact" className="btn btn-burg">Discuss your matter</a>
          </div>
          <aside className="side" data-reveal>
            <h4>Other practice areas</h4>
            {others.map((o) => (
              <a key={o.slug} href={`#/practice/${o.slug}`}>{o.title}</a>
            ))}
          </aside>
        </div>
      </section>
    </>
  )
}
