import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

const control =
  'min-h-11 w-full rounded-xs border bg-card px-3 py-2.5 text-base leading-6 font-normal text-ink transition-colors duration-150 ease-soft hover:border-ink/40 focus:border-burg focus:outline-2 focus:outline-burg focus:outline-offset-0 disabled:opacity-60'

type Common = { label: string; error?: string; hint?: ReactNode; className?: string }

function Wrap({ label, error, hint, className, children }: Common & { children: ReactNode }) {
  return (
    <label className={cx('grid gap-2 text-sm leading-5 font-medium text-ink', className)}>
      {label}
      {children}
      {hint && !error && <span className="text-[13px] leading-5 font-normal text-mute">{hint}</span>}
      {error && <span className="text-[13px] leading-5 font-normal text-[#a32a2a]">{error}</span>}
    </label>
  )
}

const border = (error?: string) => (error ? 'border-[#a32a2a]' : 'border-ink/20')

export function Input({ label, error, hint, className, ...rest }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap label={label} error={error} hint={hint} className={className}>
      <input {...rest} aria-invalid={!!error} className={cx(control, border(error))} />
    </Wrap>
  )
}

export function Textarea({ label, error, hint, className, ...rest }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap label={label} error={error} hint={hint} className={className}>
      <textarea {...rest} aria-invalid={!!error} className={cx(control, border(error))} />
    </Wrap>
  )
}

export function Select({ label, error, hint, className, children, ...rest }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrap label={label} error={error} hint={hint} className={className}>
      <select {...rest} aria-invalid={!!error} className={cx(control, border(error))}>
        {children}
      </select>
    </Wrap>
  )
}
