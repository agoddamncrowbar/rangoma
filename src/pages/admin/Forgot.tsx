import { useState, type FormEvent } from 'react'
import { api, ApiError } from '../../lib/api'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Field'
import { Notice } from '../../components/ui/Notice'
import { AuthShell } from '../../components/layout/AuthShell'

export default function Forgot() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState<{ terminal: boolean } | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await api.post<{ ok: boolean; terminal?: boolean }>('/api/auth/forgot', { username })
      setSent({ terminal: !!res.terminal })
    } catch (err) {
      setError(err instanceof ApiError ? (err.fields.username ?? err.message) : 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Forgot your password?" intro="Enter your username and we will send a reset link to the admin email address.">
      {sent ? (
        <div className="grid gap-4">
          <Notice tone="success">If that account exists, a reset link is on its way. It works once and expires in 60 minutes.</Notice>
          {sent.terminal && <Notice>Email is not set up yet, so the link was printed in the terminal running the API.</Notice>}
          <a href="/admin/login" className="text-sm text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
            Back to sign in
          </a>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="grid gap-5">
          {error && <Notice tone="error">{error}</Notice>}
          <Input label="Username or email" autoComplete="username" required autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
          <Button type="submit" variant="burg">
            {busy ? 'Sending' : 'Send reset link'}
          </Button>
          <a href="/admin/login" className="justify-self-start text-sm text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
            Back to sign in
          </a>
        </form>
      )}
    </AuthShell>
  )
}
