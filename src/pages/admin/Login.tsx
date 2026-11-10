import { useState, type FormEvent } from 'react'
import { ApiError } from '../../lib/api'
import { useAuth } from '../../lib/auth'
import { navigate } from '../../lib/nav'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Field'
import { Notice } from '../../components/ui/Notice'
import { AuthShell } from '../../components/layout/AuthShell'

export default function Login() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setErrors({})
    setFormError('')
    try {
      await login(username, password)
      navigate('/admin', true)
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fields)
        setFormError(Object.keys(err.fields).length ? '' : err.message)
      } else {
        setFormError('Something went wrong. Please try again.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell title="Admin sign in" intro="Rongoma Janji & Associates website">
      <form onSubmit={submit} noValidate className="grid gap-5">
        {formError && <Notice tone="error">{formError}</Notice>}
        <Input label="Username" autoComplete="username" required autoFocus value={username} onChange={(e) => setUsername(e.target.value)} error={errors.username} />
        <Input label="Password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <Button type="submit" variant="burg">
          {busy ? 'Signing in' : 'Sign in'}
        </Button>
        <a href="/admin/forgot" className="justify-self-start text-sm text-burg underline decoration-burg/35 decoration-1 underline-offset-4 hover:decoration-burg">
          Forgot your password?
        </a>
      </form>
    </AuthShell>
  )
}
