"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Therapist } from "@/lib/types";

function formatDayLabel(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

export function BookingForm({
  therapist, day, time,
}: {
  therapist: Therapist; day: string; time: string;
}) {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [phone, setPhone]   = useState("");
  const [notes, setNotes]   = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone]     = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Required";
    if (!email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!phone.trim()) e.phone = "Required";
    if (!consent) e.consent = "Please confirm you understand.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setDone(true);
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
      <div className="flex items-start gap-4 pb-5 border-b border-[var(--color-border)]">
        <Avatar firstName={therapist.firstName} lastName={therapist.lastName} color={therapist.color} size={56} />
        <div className="min-w-0 flex-1">
          <div className="display text-lg text-[var(--color-ink)]">{therapist.firstName} {therapist.lastName}</div>
          <div className="text-sm text-[var(--color-text-muted)]">{therapist.credentials} · {therapist.pronouns}</div>
          <div className="mt-2 text-sm text-[var(--color-ink)]">
            <span className="font-medium">{formatDayLabel(day)}</span>
            <span className="text-[var(--color-text-subtle)]"> · </span>
            <span>{time}</span>
            <span className="text-[var(--color-text-subtle)]"> · 50 min</span>
            {therapist.price && <> · <span className="mono text-[var(--color-text-muted)]">${therapist.price}</span></>}
          </div>
        </div>
      </div>

      {done ? (
        <div className="pt-6 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-[var(--color-sage)]" />
          <h2 className="display text-2xl text-[var(--color-ink)]">
            You&rsquo;re booked with {therapist.firstName}.
          </h2>
          <p className="mt-2 text-[var(--color-text-muted)]">
            A confirmation is on its way to {email}. {therapist.firstName} will reach out before your session with the session link or address.
          </p>
          <div className="mx-auto mt-6 max-w-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-left text-sm">
            <div className="mono mb-1 text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-subtle)]">What to expect</div>
            <ul className="mt-2 space-y-1.5 text-[var(--color-ink)]/90">
              <li>• First session is typically 50 minutes, getting to know each other.</li>
              <li>• You can reschedule up to 24 hours ahead.</li>
              <li>• If something feels off after the first session, you can re-match for free.</li>
            </ul>
          </div>
          <div className="mt-6">
            <Button render={<Link href="/" />} variant="outline">Back to home</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="pt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} aria-invalid={!!errors.name} />
              {errors.name && <p className="mt-1 text-xs text-red-700">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={!!errors.email} />
              {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} aria-invalid={!!errors.phone} />
            {errors.phone && <p className="mt-1 text-xs text-red-700">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="notes">Anything your therapist should know? (optional)</Label>
            <Textarea id="notes" rows={4} value={notes} onChange={e => setNotes(e.target.value)} maxLength={1000} />
          </div>

          <label className="flex items-start gap-3 rounded-lg bg-[var(--color-surface-2)] p-3 text-sm text-[var(--color-ink)]">
            <Checkbox checked={consent} onCheckedChange={v => setConsent(!!v)} aria-invalid={!!errors.consent} />
            <span>
              I understand Mend is a booking tool and does not provide emergency services.
              If I&rsquo;m in crisis, I&rsquo;ll call or text <strong>988</strong>.
            </span>
          </label>
          {errors.consent && <p className="-mt-3 text-xs text-red-700">{errors.consent}</p>}

          <Button type="submit" className="w-full bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-deep)] sm:w-fit">
            Confirm booking →
          </Button>
        </form>
      )}
    </div>
  );
}
