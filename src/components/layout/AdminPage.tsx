import type { ReactNode } from 'react'
import { Heading } from '../ui/Heading'

export function AdminPage({ title, intro, actions, children }: { title: string; intro?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Heading as="h1" size="lg">
            {title}
          </Heading>
          {intro && <p className="mt-2 mb-0 text-[15px] text-ink-2">{intro}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  )
}
