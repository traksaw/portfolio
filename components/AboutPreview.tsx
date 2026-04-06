import { ButtonLink } from "./ui/ButtonLink"
import { Section } from "./ui/Section"
import { SectionHeading } from "./ui/SectionHeading"

export function AboutPreview() {
  return (
    <Section className="text-center">
      <SectionHeading>A Bit About Me</SectionHeading>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-th-body">
        I&apos;m a creative technologist and former Apple Genius turned full stack
        engineer, driven by a love for storytelling, community, and building
        tools that matter. With a background in education and performance, I
        bring empathy and clarity to every project I touch.
      </p>
      <div className="mt-8">
        <ButtonLink href="/about" variant="ghost">
          More About Me
        </ButtonLink>
      </div>
    </Section>
  )
}
