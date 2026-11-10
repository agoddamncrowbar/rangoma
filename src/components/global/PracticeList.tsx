import type { PracticeArea } from '../../data/content'
import { Arrow } from '../ui/Arrow'
import { Folio } from '../ui/Folio'
import { Heading } from '../ui/Heading'
import { Reveal } from './Reveal'

// Practice areas as a ruled index, like a law-report table of contents.
export function PracticeList({ areas }: { areas: PracticeArea[] }) {
  return (
    <div className="border-t border-ink/10">
      {areas.map((a, i) => (
        <Reveal key={a.slug}>
          <a
            href={`#/practice/${a.slug}`}
            className="group grid grid-cols-[32px_1fr_16px] items-start gap-4 border-b border-ink/10 py-6 sm:grid-cols-[40px_1fr_16px] sm:gap-6"
          >
            <Folio i={i} className="pt-1.5" />
            <div>
              <Heading as="h3" size="md" className="transition-colors duration-150 ease-soft group-hover:text-burg">
                {a.title}
              </Heading>
              <p className="mt-1 mb-0 max-w-[52ch] text-[15px] leading-6 text-ink-2">{a.summary}</p>
            </div>
            <Arrow className="mt-1.5 text-mute transition-[color,transform] duration-150 ease-soft group-hover:translate-x-1 group-hover:text-burg" />
          </a>
        </Reveal>
      ))}
    </div>
  )
}
