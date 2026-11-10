import { useState, type FormEvent } from 'react'
import { api, ApiError } from '../../lib/api'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Field'
import { Notice } from '../../components/ui/Notice'
import { AuthShell } from '../../components/layout/AuthShell'

export default function Reset() {
  const token = new URLSearchParams(window.location.search).get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setErrors({})
    setError('')
    if (password !== confirm) {
      setErrors({ confirm: 'The two passwords do not match.' })
      return
    }
    setBusy(true)
    try {
      await api.post('/api/auth/reset', { token, password })
      setDone(true)
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fields)
        if (err.fields.token || !Object.keys(err.fields).length) setError(err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setBusy(false)
    }
  }

  if (!token) {
    return (
      <AuthShell title="Reset link missing">
        <Notice tone="error">This page needs the link from the reset email.</Notice>
        <a href="/admin/forgot" className="text-sm text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
          Ask for a new link
        </a>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="Choose a new password">
      {done ? (
        <div className="grid gap-4">
          <Notice tone="success">Your password has been changed.</Notice>
          <Button href="/admin/login" variant="burg">
            Sign in
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="grid gap-5">
          {error && <Notice tone="error">{error}</Notice>}
          <Input label="New password" type="password" autoComplete="new-password" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} hint="At least 10 characters." />
          <Input label="Confirm new password" type="password" autoComplete="new-password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
          <Button type="submit" variant="burg">
            {busy ? 'Saving' : 'Change password'}
          </Button>
          {error && (
            <a href="/admin/forgot" className="justify-self-start text-sm text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
              Ask for a new link
            </a>
          )}
        </form>
      )}
    </AuthShell>
  )
}
