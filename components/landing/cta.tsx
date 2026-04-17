import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="display text-3xl text-[var(--color-ink)] md:text-4xl">Ready when you are.</h2>
            <p className="mt-2 text-[var(--color-text-muted)]">Takes about 2 minutes. No credit card up front.</p>
          </div>
          <Button render={<Link href="/quiz" />} size="lg" className="bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-deep)]">
            Take the 2-minute quiz
          </Button>
        </div>
      </div>
    </section>
  );
}
