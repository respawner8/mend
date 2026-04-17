const categories = [
  { label: "Anxiety",          body: "Racing thoughts, restlessness, the persistent low-grade hum." },
  { label: "Depression",       body: "Feeling stuck, flat, or further from yourself than you want to be." },
  { label: "Life transitions", body: "New job, new city, new version of you. Or trying to be." },
  { label: "Relationships",    body: "Couples, family, friends — the patterns you keep noticing." },
];

export function WhoWeHelp() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-sage)]">Who Mend is for</p>
        <h2 className="display text-3xl text-[var(--color-ink)] md:text-4xl">Designed around the things people actually come in for.</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map(c => (
          <div key={c.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="display text-lg text-[var(--color-ink)]">{c.label}</div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
