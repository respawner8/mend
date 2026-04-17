const quotes = [
  { name: "Dana O.",  role: "Mend client, 6 months",
    text: "The quiz took two minutes and I had three genuine options. The first one is now my therapist." },
  { name: "Maya S.",  role: "Mend client, 1 year",
    text: "I'd been meaning to find someone for a year. Mend finally made it low-effort enough that I did." },
  { name: "Jonas M.", role: "Mend client, 4 months",
    text: "Felt oddly human for a website. That's a compliment." },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">What clients say</p>
        <h2 className="display text-3xl text-[var(--color-ink)] md:text-4xl">Small wins, honest words.</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {quotes.map(q => (
          <figure key={q.name} className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <blockquote className="text-[15px] leading-relaxed text-[var(--color-ink)]/90">
              &ldquo;{q.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-xs text-[var(--color-text-muted)]">
              <span className="font-semibold text-[var(--color-ink)]">{q.name}</span> · {q.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
