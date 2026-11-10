import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

const tones = {
  page: '',
  raise: 'bg-raise',
  dark: 'bg-night text-on',
}

type Props = { tone?: keyof typeof tones; className?: string; children: ReactNode }

export function Section({ tone = 'page', className, children }: Props) {
  return (
    <section data-dark={tone === 'dark' ? '' : undefined} className={cx('py-[clamp(64px,8vw,96px)]', tones[tone], className)}>
      {children}
    </section>
  )
}
