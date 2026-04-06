import { ButtonLink } from "@/components/ui/ButtonLink"
import { PageHeader } from "@/components/ui/PageHeader"

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-th-muted">
        404
      </p>
      <PageHeader
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
        centered
      />
      <div className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </section>
  )
}
