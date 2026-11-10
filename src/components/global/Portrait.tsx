import { founder } from '../../data/content'
import { Reveal } from './Reveal'

// Monogram card standing in for the founder's photo.
export function Portrait() {
  return (
    <Reveal>
      <div
        role="img"
        aria-label={`Portrait of ${founder.name} to be added`}
        className="relative grid aspect-[4/5] max-w-[440px] place-items-center rounded-lg bg-night text-gold after:absolute after:inset-3 after:rounded-sm after:border after:border-gold/35 after:content-['']"
      >
        <span className="font-serif text-[96px] leading-none tracking-[0.02em]">BRJ</span>
        <span className="absolute inset-x-8 bottom-8 border-t border-gold/30 pt-4 text-[13px] leading-4 text-on/75">{founder.role}</span>
      </div>
    </Reveal>
  )
}
