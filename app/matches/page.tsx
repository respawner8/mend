import { SiteHeader } from "@/components/site/site-header";
import { therapists } from "@/lib/therapists";
import { rankTherapists, searchParamsToAnswers } from "@/lib/quiz";
import { MatchCard } from "@/components/matches/match-card";
import { BrowseCard } from "@/components/matches/browse-card";
import { FilterChips } from "@/components/matches/filter-chips";

export default async function MatchesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const urlParams = new URLSearchParams();
  Object.entries(sp).forEach(([k, v]) => {
    if (typeof v === "string") urlParams.set(k, v);
  });
  const answers = searchParamsToAnswers(urlParams);
  const ranked = rankTherapists(answers, therapists);
  const top = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-2">
          <p className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-sage)]">Your matches</p>
          <h1 className="display text-4xl text-[var(--color-ink)]">Three therapists for you.</h1>
        </div>
        <div className="mt-4">
          <FilterChips answers={answers} />
        </div>

        <section className="mt-10">
          <h2 className="display text-xl text-[var(--color-ink)] mb-4">Top matches</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {top.map(({ therapist, score }) => (
              <MatchCard key={therapist.id} therapist={therapist} score={score} />
            ))}
          </div>
        </section>

        {rest.length > 0 && (
          <section className="mt-14">
            <h2 className="display text-xl text-[var(--color-ink)] mb-4">More therapists you might like</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {rest.map(({ therapist }) => (
                <BrowseCard key={therapist.id} therapist={therapist} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
