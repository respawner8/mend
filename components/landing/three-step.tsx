import { Wand2, ListChecks, CalendarCheck } from "lucide-react";

const steps = [
  { icon: Wand2,         title: "Answer 4 quick questions", body: "Specialty, insurance, style — takes about 60 seconds." },
  { icon: ListChecks,    title: "See 3 top matches",         body: "Ranked by what you told us. Browse more if you want options." },
  { icon: CalendarCheck, title: "Book in two minutes",       body: "Pick a time from their real calendar. Done." },
];

export function ThreeStep() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="mono mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-sage)]">How it works</p>
        <h2 className="display text-3xl text-[var(--color-ink)] md:text-4xl">Three steps. No scrolling through 40 profiles.</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, body }, i) => (
          <div key={title} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="mono mb-3 text-xs text-[var(--color-text-subtle)]">{String(i + 1).padStart(2, "0")}</div>
            <Icon className="mb-3 h-5 w-5 text-[var(--color-sage)]" />
            <h3 className="display text-lg text-[var(--color-ink)]">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
