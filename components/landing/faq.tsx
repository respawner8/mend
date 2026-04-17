import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faq = [
  { q: "How fast can I actually start?",
    a: "Most first sessions book within 3-7 days. Some therapists have same-week slots." },
  { q: "Is this covered by insurance?",
    a: "We support Aetna, BCBS, Cigna, Kaiser, and UnitedHealthcare in-network. Out-of-network receipts (superbills) are supported for everyone else." },
  { q: "Can I switch therapists?",
    a: "Yes — any time, no fuss. We'll re-run matches with anything you want to adjust." },
  { q: "Is this right for a crisis?",
    a: "No. If you are in crisis, please call or text 988. Mend is a scheduling tool, not an emergency service." },
  { q: "Are sessions virtual or in-person?",
    a: "Most therapists offer both. You'll tell us your preference in the quiz." },
  { q: "What if I don't click with my therapist?",
    a: "You can switch after any session — we'll help you re-match. Most clients stick with their first pick." },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
      <p className="mono mb-2 text-xs uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">FAQ</p>
      <h2 className="display text-3xl text-[var(--color-ink)] md:text-4xl mb-8">Questions we hear most.</h2>
      <Accordion className="w-full">
        {faq.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`}>
            <AccordionTrigger className="text-left text-[var(--color-ink)]">{item.q}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-[var(--color-text-muted)]">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
