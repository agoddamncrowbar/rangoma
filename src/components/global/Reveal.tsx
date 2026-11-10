import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cx } from '../../lib/cx'

type Props = {
  as?: 'div' | 'article' | 'ul' | 'li' | 'section'
  delay?: number
  className?: string
  children: ReactNode
}

// One short fade and rise as the block scrolls into view.
export function Reveal({ as = 'div', delay = 0, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const Tag = as as 'div'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx(
        'transition-[opacity,transform] duration-[400ms] ease-soft motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        seen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
