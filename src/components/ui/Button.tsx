import type { ReactNode } from 'react'
import { cx } from '../../lib/cx'

const base =
  'inline-flex items-center justify-center rounded-xs border font-medium leading-none transition-[color,background-color,border-color,transform] duration-150 ease-soft active:scale-[0.98] cursor-pointer'

const variants = {
  gold: 'border-transparent bg-gold text-night hover:bg-[#d8b571]',
  burg: 'border-transparent bg-burg text-[#f6f0e4] hover:bg-night',
  ghost: 'border-on/30 text-on hover:border-gold hover:text-gold',
}

const sizes = {
  md: 'h-12 px-6 text-[15px]',
  sm: 'h-9 px-4 text-sm',
}

type Props = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: ReactNode
} & ({ href: string; onClick?: () => void; type?: never } | { href?: undefined; onClick?: () => void; type?: 'button' | 'submit' })

export function Button({ variant = 'gold', size = 'md', className, children, href, onClick, type = 'button' }: Props) {
  const cls = cx(base, variants[variant], sizes[size], className)
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
