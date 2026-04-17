import Link from "next/link";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 font-semibold tracking-tight text-[var(--color-ink)]">
      <span aria-hidden className="inline-block h-3.5 w-3.5 rounded-full bg-[var(--color-sage)]" />
      <span className="display text-[19px]">Mend</span>
    </Link>
  );
}
