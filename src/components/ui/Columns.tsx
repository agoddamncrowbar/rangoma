// Fluted-column motif taken from the pillar in the RJ logo.
export function Columns() {
  return (
    <div className="pointer-events-none absolute top-0 -right-[2%] bottom-0 flex w-[70%] justify-end gap-[2.2%] opacity-10 lg:w-[46%]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className="w-[9%] bg-[linear-gradient(90deg,transparent,#c9a25c_30%,#c9a25c_70%,transparent)]" />
      ))}
    </div>
  )
}
