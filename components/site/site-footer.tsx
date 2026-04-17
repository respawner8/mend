import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-24 bg-[var(--color-surface-2)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-[var(--color-text-subtle)]">© 2026 Mend</span>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link href="/#how" className="hover:text-[var(--color-ink)]">How it works</Link>
          <Link href="/#faq" className="hover:text-[var(--color-ink)]">FAQ</Link>
          <Link href="/quiz" className="hover:text-[var(--color-ink)]">Find a therapist</Link>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-6 text-xs text-[var(--color-text-subtle)]">
        If you are in crisis, please call or text <span className="text-[var(--color-ink)]">988</span>. Mend is not an emergency service.
      </div>
    </footer>
  );
}
