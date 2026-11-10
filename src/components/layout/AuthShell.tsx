import type { ReactNode } from 'react'
import { Heading } from '../ui/Heading'
import logoGold from '../../assets/logo-gold.png'

// Centered card used by the signed-out admin pages: sign in, forgot password, reset password.
export function AuthShell({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <div data-dark className="grid min-h-screen place-items-center bg-night px-6 py-12">
      <div className="w-full max-w-[400px]">
        <img src={logoGold} alt="" className="mx-auto mb-8 h-20 w-auto" />
        <div className="grid gap-5 rounded-lg bg-page p-8 text-ink">
          <div>
            <Heading as="h1" size="md">
              {title}
            </Heading>
            {intro && <p className="mt-1 mb-0 text-sm text-ink-2">{intro}</p>}
          </div>
          {children}
        </div>
        <a href="/" className="mt-6 block text-center text-sm text-on/75 hover:text-on">
          Back to the website
        </a>
      </div>
    </div>
  )
}
