// MySQL returns "YYYY-MM-DD HH:MM:SS" in the server's local time.
const parse = (s: string) => new Date(s.replace(' ', 'T'))

export const formatDate = (s: string) => parse(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

export const formatDateTime = (s: string) =>
  parse(s).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

// "5 minutes ago" style label for the inbox; falls back to the date after a week.
export function timeAgo(s: string) {
  const mins = Math.round((Date.now() - parse(s).getTime()) / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  return days < 7 ? `${days} day${days === 1 ? '' : 's'} ago` : formatDate(s)
}
