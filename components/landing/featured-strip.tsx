import { Avatar } from "@/components/avatar";
import { therapists } from "@/lib/therapists";

export function FeaturedStrip() {
  const featured = therapists.slice(0, 3);
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-sage)]">A peek inside</p>
        <h2 className="display text-3xl text-[var(--color-ink)] md:text-4xl">Real, licensed, and ready.</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {featured.map(t => (
          <div key={t.id} className="flex gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <Avatar firstName={t.firstName} lastName={t.lastName} color={t.color} size={52} />
            <div className="min-w-0">
              <div className="display text-lg text-[var(--color-ink)]">{t.firstName} {t.lastName}</div>
              <div className="text-xs text-[var(--color-text-subtle)]">{t.credentials} · {t.yearsPracticing} yrs</div>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{t.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
