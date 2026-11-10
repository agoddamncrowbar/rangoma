import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type Props = { href: string; children: ReactNode; onDark?: boolean; external?: boolean; className?: string }

export function TextLink({ href, children, onDark, external, className }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cx(
        'inline-block font-medium underline decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-150 ease-soft',
        onDark ? 'text-gold decoration-gold/40 hover:decoration-gold' : 'text-burg decoration-burg/35 hover:decoration-burg',
        className,
      )}
    >
      {children}
    </a>
  )
}
