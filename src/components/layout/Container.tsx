import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-[min(1200px,100%-48px)]', className)}>{children}</div>
}
