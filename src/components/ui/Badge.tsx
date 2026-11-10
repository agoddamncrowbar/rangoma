import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

const tones = {
  gold: 'bg-gold/20 text-gold-ink',
  green: 'bg-[#e4efe4] text-[#245b2f]',
  grey: 'bg-ink/8 text-ink-2',
  red: 'bg-[#f6e3e3] text-[#7a1f1f]',
}

export function Badge({ tone = 'grey', children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return <span className={cx('inline-flex items-center rounded-xs px-2 py-0.5 text-xs leading-5 font-medium', tones[tone])}>{children}</span>
}
