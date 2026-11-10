export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')

export const folio = (i: number) => String(i + 1).padStart(2, '0')
