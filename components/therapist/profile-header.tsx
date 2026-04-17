import { Avatar } from "@/components/avatar";
import type { Therapist } from "@/lib/types";
import { specialtyLabels, insuranceLabels, modeLabels } from "@/lib/specialties";

export function ProfileHeader({ therapist }: { therapist: Therapist }) {
  return (
    <div>
      <div className="flex items-start gap-5">
        <Avatar firstName={therapist.firstName} lastName={therapist.lastName} color={therapist.color} size={72} />
        <div className="min-w-0">
          <h1 className="display text-3xl text-[var(--color-ink)] md:text-4xl">
            {therapist.firstName} {therapist.lastName}
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-subtle)]">
            {therapist.credentials} · {therapist.yearsPracticing} yrs · {therapist.pronouns}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <p className="text-[var(--color-ink)]/90 leading-relaxed">{therapist.bio}</p>

        <div>
          <div className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-sage)]">My approach</div>
          <p className="text-[var(--color-ink)]/90 leading-relaxed">{therapist.approach}</p>
        </div>

        <div>
          <div className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-sage)]">Focus areas</div>
          <div className="flex flex-wrap gap-1.5">
            {therapist.specialties.map(s => (
              <span key={s} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1 text-xs text-[var(--color-ink)]">
                {specialtyLabels[s]}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-sage)]">Session modes</div>
            <div className="text-sm text-[var(--color-ink)]/90">
              {therapist.modes.map(m => modeLabels[m]).join(" · ")}
            </div>
          </div>
          <div>
            <div className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-sage)]">Insurance</div>
            <div className="text-sm text-[var(--color-ink)]/90">
              {therapist.insurances.map(i => insuranceLabels[i]).join(", ")}
              {therapist.price && <> · ${therapist.price} self-pay</>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
