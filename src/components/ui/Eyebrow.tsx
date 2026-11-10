import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type Props = { children: ReactNode; onDark?: boolean; label?: boolean; className?: string }

// Small kicker above a heading. `label` is the tracked uppercase form used on page heroes.
export function Eyebrow({ children, onDark, label, className }: Props) {
  return (
    <p
      className={cx(
        label ? 'mb-5 text-[12.5px] font-semibold uppercase leading-4 tracking-[0.22em] text-gold' : 'mb-4 text-[13px] font-medium leading-4 tracking-[0.01em]',
        !label && (onDark ? 'text-gold' : 'text-gold-ink'),
        className,
      )}
    >
      {children}
    </p>
  )
}
