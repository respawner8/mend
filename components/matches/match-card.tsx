import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/avatar";
import type { Therapist } from "@/lib/types";
import type { MatchScore } from "@/lib/quiz";
import { specialtyLabels } from "@/lib/specialties";

export function MatchCard({ therapist, score }: { therapist: Therapist; score: MatchScore }) {
  return (
    <Link
      href={`/therapists/${therapist.id}`}
      className="group flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-sage)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar firstName={therapist.firstName} lastName={therapist.lastName} color={therapist.color} size={52} />
          <div>
            <div className="display text-lg text-[var(--color-ink)]">{therapist.firstName} {therapist.lastName}</div>
            <div className="text-xs text-[var(--color-text-subtle)]">
              {therapist.credentials} · {therapist.yearsPracticing} yrs · {therapist.pronouns}
            </div>
          </div>
        </div>
        <span className="mono rounded-full bg-[var(--color-sage)] px-2 py-1 text-[11px] font-semibold text-white">
          {score.percent}% match
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{therapist.bio}</p>

      {score.reasons.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-[var(--color-ink)]/80">
          {score.reasons.slice(0, 3).map(r => (
            <li key={r} className="flex items-start gap-2">
              <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-sage)]" />
              {r}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {therapist.specialties.slice(0, 3).map(s => (
          <span key={s} className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-0.5 text-[11px] text-[var(--color-text-muted)]">
            {specialtyLabels[s]}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-[var(--color-text-subtle)]">
          {therapist.availability.length > 0 ? `Next available soon` : "Limited availability"}
          {therapist.price ? ` · $${therapist.price} self-pay` : ""}
        </span>
        <ArrowUpRight className="h-4 w-4 text-[var(--color-text-subtle)] transition-colors group-hover:text-[var(--color-sage)]" />
      </div>
    </Link>
  );
}
