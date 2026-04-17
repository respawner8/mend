"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type QuizStep,
  quizTotalSteps,
  defaultAnswers,
  specialtyOptions,
  modeOptions,
  genderOptions,
  insuranceOptions,
  answersToSearchParams,
} from "@/lib/quiz";
import type { QuizAnswers, Specialty } from "@/lib/types";
import { specialtyLabels, insuranceLabels, modeLabels, genderLabels } from "@/lib/specialties";

export function QuizRunner() {
  const router = useRouter();
  const [step, setStep] = useState<QuizStep>(1);
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);

  const toggleSpecialty = (s: Specialty) =>
    setAnswers(a => ({
      ...a,
      specialties: a.specialties.includes(s)
        ? a.specialties.filter(x => x !== s)
        : [...a.specialties, s],
    }));

  const next = () => {
    if (step < quizTotalSteps) setStep((step + 1) as QuizStep);
    else router.push(`/matches?${answersToSearchParams(answers)}`);
  };
  const back = () => setStep(Math.max(1, step - 1) as QuizStep);

  const canProceed =
    step === 1 ? answers.specialties.length > 0 :
    step === 2 ? !!answers.mode :
    step === 3 ? !!answers.genderId :
    step === 4 ? !!answers.insurance : true;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <div className="mono mb-2 flex items-center justify-between text-xs text-[var(--color-text-subtle)]">
          <span>Step {step} of {quizTotalSteps}</span>
          <span>{Math.round((step / quizTotalSteps) * 100)}%</span>
        </div>
        <Progress value={(step / quizTotalSteps) * 100} className="h-1.5" />
      </div>

      {step === 1 && (
        <div>
          <h1 className="display text-3xl text-[var(--color-ink)] md:text-4xl">What brings you in?</h1>
          <p className="mt-2 text-[var(--color-text-muted)]">Pick any that feel true. You can change your mind later.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {specialtyOptions.map(s => {
              const active = answers.specialties.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSpecialty(s)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    active
                      ? "border-[var(--color-sage)] bg-[var(--color-sage)] text-white"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-sage)]",
                  )}
                >
                  {specialtyLabels[s]}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="display text-3xl text-[var(--color-ink)] md:text-4xl">How would you like to meet?</h1>
          <p className="mt-2 text-[var(--color-text-muted)]">Most therapists offer both.</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            {modeOptions.map(m => {
              const active = answers.mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setAnswers(a => ({ ...a, mode: m }))}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-colors",
                    active
                      ? "border-[var(--color-sage)] bg-[var(--color-sage)]/5"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-sage)]",
                  )}
                >
                  <div className="display text-lg text-[var(--color-ink)]">{modeLabels[m]}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="display text-3xl text-[var(--color-ink)] md:text-4xl">Any preference for your therapist?</h1>
          <p className="mt-2 text-[var(--color-text-muted)]">Everyone on Mend is licensed. This just helps us rank.</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-4">
            {genderOptions.map(g => {
              const active = answers.genderId === g;
              return (
                <button
                  key={g}
                  onClick={() => setAnswers(a => ({ ...a, genderId: g }))}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-colors",
                    active
                      ? "border-[var(--color-sage)] bg-[var(--color-sage)]/5"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-sage)]",
                  )}
                >
                  <div className="display text-lg text-[var(--color-ink)]">{genderLabels[g]}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h1 className="display text-3xl text-[var(--color-ink)] md:text-4xl">Insurance?</h1>
          <p className="mt-2 text-[var(--color-text-muted)]">We&rsquo;ll only show therapists who accept yours.</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {insuranceOptions.map(i => {
              const active = answers.insurance === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers(a => ({ ...a, insurance: i }))}
                  aria-pressed={active}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-colors",
                    active
                      ? "border-[var(--color-sage)] bg-[var(--color-sage)]/5"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-sage)]",
                  )}
                >
                  <div className="text-[var(--color-ink)]">{insuranceLabels[i]}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 1}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Button>
        <Button
          onClick={next}
          disabled={!canProceed}
          className="bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-deep)]"
        >
          {step < quizTotalSteps ? "Next" : "See my matches"} <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
