import { useEffect, useState } from 'react'

// The public site uses hash routes (#/about). The admin portal uses real paths (/admin/...).
export function navigate(to: string, replace = false) {
  if (replace) window.history.replaceState(null, '', to)
  else window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/')
  useEffect(() => {
    const on = () => setPath(window.location.pathname.replace(/\/+$/, '') || '/')
    window.addEventListener('popstate', on)
    return () => window.removeEventListener('popstate', on)
  }, [])
  return path
}

export const isAdminPath = (path: string) => path === '/admin' || path.startsWith('/admin/')
