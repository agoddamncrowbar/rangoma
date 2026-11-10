import { Button } from '../ui/Button'
import { Heading } from '../ui/Heading'
import { Container } from '../layout/Container'
import { Reveal } from './Reveal'

export function Cta() {
  return (
    <section className="border-t border-ink/10 py-16 sm:py-20">
      <Container>
        <Reveal className="flex flex-wrap items-center justify-between gap-8">
          <Heading size="lg" className="max-w-[20ch]">
            Need legal advice you can rely on?
          </Heading>
          <Button href="#/contact" variant="burg">
            Speak to an advocate
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
