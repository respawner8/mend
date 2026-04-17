import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { therapistById } from "@/lib/therapists";
import { BookingForm } from "@/components/booking/booking-form";

export default async function BookPage({
  params, searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ day?: string; time?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const therapist = therapistById(id);
  if (!therapist || !sp.day || !sp.time) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-8 md:py-12">
        <Link href={`/therapists/${therapist.id}`} className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to profile
        </Link>
        <BookingForm therapist={therapist} day={sp.day} time={sp.time} />
      </main>
    </>
  );
}
