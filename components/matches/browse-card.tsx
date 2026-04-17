import Link from "next/link";
import { Avatar } from "@/components/avatar";
import type { Therapist } from "@/lib/types";
import { specialtyLabels } from "@/lib/specialties";

export function BrowseCard({ therapist }: { therapist: Therapist }) {
  return (
    <Link
      href={`/therapists/${therapist.id}`}
      className="group flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:border-[var(--color-sage)]"
    >
      <Avatar firstName={therapist.firstName} lastName={therapist.lastName} color={therapist.color} size={44} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="display text-base text-[var(--color-ink)]">{therapist.firstName} {therapist.lastName}</div>
          {therapist.price && <span className="mono text-xs text-[var(--color-text-subtle)]">${therapist.price}</span>}
        </div>
        <div className="text-xs text-[var(--color-text-subtle)]">
          {therapist.credentials} · {therapist.yearsPracticing} yrs
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {therapist.specialties.slice(0, 2).map(s => (
            <span key={s} className="rounded-full bg-[var(--color-bg)] px-2 py-0.5 text-[11px] text-[var(--color-text-muted)]">
              {specialtyLabels[s]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
