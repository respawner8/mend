import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { therapistById, therapists } from "@/lib/therapists";
import { ProfileHeader } from "@/components/therapist/profile-header";
import { AvailabilityCalendar } from "@/components/therapist/availability-calendar";

export async function generateStaticParams() {
  return therapists.map(t => ({ id: t.id }));
}

export default async function TherapistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const therapist = therapistById(id);
  if (!therapist) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 md:py-12">
        <Link href="/matches" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-ink)]">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to matches
        </Link>
        <div className="grid gap-8 md:grid-cols-[60%_40%]">
          <ProfileHeader therapist={therapist} />
          <AvailabilityCalendar therapistId={therapist.id} slots={therapist.availability} firstName={therapist.firstName} />
        </div>
      </main>
    </>
  );
}
