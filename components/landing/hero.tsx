import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 md:pt-28 md:pb-20">
      <div
        aria-hidden
        className="absolute -bottom-20 -right-20 h-[280px] w-[280px] rounded-full"
        style={{ background: "var(--color-sage-soft)", opacity: 0.55, filter: "blur(8px)" }}
      />
      <div className="relative mx-auto max-w-5xl">
        <div className="mono mb-5 text-[11px] uppercase tracking-[0.08em] text-[var(--color-text-subtle)]">
          LICENSED THERAPISTS · ALL 50 STATES
        </div>
        <h1 className="display text-5xl text-[var(--color-ink)] md:text-7xl lg:text-[78px]">
          Therapy,<br />
          without <span className="display-italic">the search.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
          Matched therapists in your state. Book a session in two minutes. Covered by most insurance.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button render={<Link href="/quiz" />} size="lg" className="bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-deep)]">
            Find a therapist
          </Button>
          <Button render={<Link href="/#how" />} size="lg" variant="outline">
            How it works
          </Button>
        </div>
      </div>
    </section>
  );
}
