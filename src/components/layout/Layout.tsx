import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout({ route, children }: { route: string; children: ReactNode }) {
  return (
    <>
      <Header route={route} />
      <main key={route}>{children}</main>
      <Footer />
    </>
  )
}
