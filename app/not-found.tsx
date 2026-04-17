import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
        <p className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-sage)]">404</p>
        <h1 className="display text-4xl text-[var(--color-ink)]">Page not found.</h1>
        <p className="mt-3 text-[var(--color-text-muted)]">The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.</p>
        <Button render={<Link href="/" />} className="mt-6 bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-deep)]">
          Take me home
        </Button>
      </main>
    </>
  );
}
