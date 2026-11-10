import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

const sizes = {
  display: 'font-medium text-[clamp(40px,5.4vw,68px)] leading-[1.04] tracking-[-0.02em]',
  page: 'max-w-[16ch] font-semibold text-[clamp(2.6rem,6vw,4.8rem)] leading-[1.05] tracking-[-0.02em]',
  lg: 'font-medium text-[clamp(32px,3.6vw,48px)] leading-[1.1] tracking-[-0.01em]',
  md: 'font-medium text-2xl leading-[1.2]',
  sm: 'font-medium text-[22px] leading-[1.2]',
}

type Props = { as?: 'h1' | 'h2' | 'h3' | 'h4'; size?: keyof typeof sizes; className?: string; children: ReactNode }

export function Heading({ as: Tag = 'h2', size = 'lg', className, children }: Props) {
  return <Tag className={cx('font-serif text-balance', sizes[size], className)}>{children}</Tag>
}
