import Link from "next/link";
import { Pencil } from "lucide-react";
import type { QuizAnswers } from "@/lib/types";
import { specialtyLabels, insuranceLabels, modeLabels, genderLabels } from "@/lib/specialties";

export function FilterChips({ answers }: { answers: QuizAnswers }) {
  const chips: string[] = [];
  if (answers.specialties.length > 0) {
    chips.push(...answers.specialties.map(s => specialtyLabels[s]));
  }
  if (answers.mode !== "either") chips.push(modeLabels[answers.mode]);
  if (answers.genderId !== "any") chips.push(genderLabels[answers.genderId]);
  chips.push(insuranceLabels[answers.insurance]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map(c => (
        <span key={c} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-ink)]">
          {c}
        </span>
      ))}
      <Link href="/quiz" className="mono inline-flex items-center gap-1 text-xs text-[var(--color-sage)] hover:text-[var(--color-sage-deep)]">
        <Pencil className="h-3 w-3" /> Edit
      </Link>
    </div>
  );
}
