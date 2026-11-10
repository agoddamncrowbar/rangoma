import type { ReactNode } from 'react'
import { Eyebrow } from '../ui/Eyebrow'
import { Heading } from '../ui/Heading'
import { Reveal } from './Reveal'

type Props = { eyebrow?: string; title: string; aside?: ReactNode }

// Section title with an optional link or note aligned to the right.
export function SectionHead({ eyebrow, title, aside }: Props) {
  return (
    <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <Heading>{title}</Heading>
      </div>
      {aside}
    </Reveal>
  )
}
