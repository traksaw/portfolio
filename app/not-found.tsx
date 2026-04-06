import { ButtonLink } from "@/components/ui/ButtonLink"

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-th-muted">
        404
      </p>
      <h1 className="mt-4 font-serif text-4xl text-th-heading sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-th-body">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </section>
  )
}
