import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

type Props = { tone?: 'info' | 'error' | 'success'; children: ReactNode; className?: string }

const tones = {
  info: 'bg-raise text-ink-2',
  error: 'bg-[#f6e3e3] text-[#7a1f1f]',
  success: 'bg-[#e4efe4] text-[#245b2f]',
}

// Inline status message: loading, empty, error or success.
export function Notice({ tone = 'info', children, className }: Props) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={cx('rounded-lg px-5 py-4 text-[15px] leading-6', tones[tone], className)}>
      {children}
    </div>
  )
}
