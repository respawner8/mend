import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_92%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-[var(--color-text-muted)] md:flex">
          <Link href="/#how" className="hover:text-[var(--color-ink)]">How it works</Link>
          <Link href="/#faq" className="hover:text-[var(--color-ink)]">FAQ</Link>
        </nav>
        <Button render={<Link href="/quiz" />} size="sm" className="bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-deep)]">
          Find a therapist
        </Button>
      </div>
    </header>
  );
}
