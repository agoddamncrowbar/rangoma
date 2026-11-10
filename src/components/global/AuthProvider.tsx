import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { api, type AdminUser } from '../../lib/api'
import { AuthContext } from '../../lib/auth'

// Knows who is signed in to the admin portal. The session itself lives in a cookie set by the PHP backend.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<{ user: AdminUser | null }>('/api/auth/me')
      .then((r) => setUser(r.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    const r = await api.post<{ user: AdminUser }>('/api/auth/login', { username, password })
    setUser(r.user)
  }, [])

  const logout = useCallback(async () => {
    await api.post('/api/auth/logout').catch(() => {})
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
