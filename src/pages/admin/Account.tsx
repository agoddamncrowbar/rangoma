import { useState, type FormEvent } from 'react'
import { api, ApiError } from '../../lib/api'
import { useAuth } from '../../lib/auth'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Field'
import { Notice } from '../../components/ui/Notice'
import { AdminPage } from '../../components/layout/AdminPage'

export default function Account() {
  const { user } = useAuth()
  const [current, setCurrent] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setErrors({})
    setMessage(null)
    if (password !== confirm) {
      setErrors({ confirm: 'The two passwords do not match.' })
      return
    }
    setBusy(true)
    try {
      await api.post('/api/admin/password', { current, password })
      setCurrent('')
      setPassword('')
      setConfirm('')
      setMessage({ tone: 'success', text: 'Password changed.' })
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fields)
        if (!Object.keys(err.fields).length) setMessage({ tone: 'error', text: err.message })
      } else {
        setMessage({ tone: 'error', text: 'Something went wrong. Please try again.' })
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <AdminPage title="Account" intro={`Signed in as ${user?.username ?? user?.email}.`}>
      <form onSubmit={submit} noValidate className="grid max-w-[420px] gap-5 rounded-lg border border-ink/10 bg-card p-6">
        {message && <Notice tone={message.tone}>{message.text}</Notice>}
        <Input label="Current password" type="password" autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} error={errors.current} />
        <Input label="New password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} hint="At least 10 characters." />
        <Input label="Confirm new password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
        <Button type="submit" variant="burg" className="justify-self-start">
          {busy ? 'Saving' : 'Change password'}
        </Button>
      </form>
    </AdminPage>
  )
}
