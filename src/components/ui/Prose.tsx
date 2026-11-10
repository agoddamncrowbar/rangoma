import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

// Body copy: paragraphs inside get the site's reading size and colour.
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('[&_p]:mb-4 [&_p]:text-[17px] [&_p]:leading-7 [&_p]:text-ink-2', className)}>{children}</div>
}
