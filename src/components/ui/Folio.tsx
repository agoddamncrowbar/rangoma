import { cx, folio } from '../../lib/cx'

// Two-digit folio numeral, e.g. 01, used on lists and values.
export function Folio({ i, onDark, className }: { i: number; onDark?: boolean; className?: string }) {
  return <span className={cx('text-[13px] leading-4 tabular-nums', onDark ? 'text-gold' : 'text-mute', className)}>{folio(i)}</span>
}
