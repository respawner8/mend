import type { QuizAnswers, Therapist, Specialty, Insurance, SessionMode, GenderId } from "./types";
import { specialtyLabels, insuranceLabels, modeLabels, genderLabels } from "./specialties";

export type QuizStep = 1 | 2 | 3 | 4;

export const quizTotalSteps = 4 as const;

export const defaultAnswers: QuizAnswers = {
  specialties: [],
  mode: "either",
  genderId: "any",
  insurance: "self-pay",
};

export const specialtyOptions: Specialty[] = [
  "anxiety", "depression", "relationships", "life-transitions",
  "trauma", "stress", "grief", "adhd",
];

export const modeOptions: (SessionMode | "either")[] = ["virtual", "in-person", "either"];
export const genderOptions: (GenderId | "any")[] = ["any", "woman", "man", "non-binary"];
export const insuranceOptions: Insurance[] = [
  "aetna", "bcbs", "cigna", "kaiser", "united", "self-pay", "other",
];

export function answersToSearchParams(a: QuizAnswers): string {
  const p = new URLSearchParams();
  if (a.specialties.length) p.set("s", a.specialties.join(","));
  p.set("m", a.mode);
  p.set("g", a.genderId);
  p.set("i", a.insurance);
  return p.toString();
}

export function searchParamsToAnswers(sp: URLSearchParams): QuizAnswers {
  const s = (sp.get("s") || "").split(",").filter(Boolean) as Specialty[];
  return {
    specialties: s.filter(x => specialtyOptions.includes(x)),
    mode: (sp.get("m") as QuizAnswers["mode"]) || "either",
    genderId: (sp.get("g") as QuizAnswers["genderId"]) || "any",
    insurance: (sp.get("i") as Insurance) || "self-pay",
  };
}

export interface MatchScore {
  percent: number;
  reasons: string[];
}

export function scoreTherapist(a: QuizAnswers, t: Therapist): MatchScore {
  const reasons: string[] = [];
  let pts = 0;
  const maxPts = 100;

  if (a.specialties.length === 0) {
    pts += 20;
  } else {
    const hits = a.specialties.filter(s => t.specialties.includes(s));
    const ratio = hits.length / a.specialties.length;
    pts += Math.round(40 * ratio);
    if (hits.length >= 1) {
      reasons.push(
        `Specializes in ${hits.slice(0, 2).map(h => specialtyLabels[h]).join(" and ")}`,
      );
    }
  }

  if (a.insurance === "self-pay") {
    pts += 25;
  } else if (t.insurances.includes(a.insurance)) {
    pts += 25;
    reasons.push(`Accepts ${insuranceLabels[a.insurance]}`);
  } else if (a.insurance === "other") {
    pts += 10;
  }

  if (a.genderId === "any") {
    pts += 10;
  } else if (t.genderId === a.genderId) {
    pts += 15;
    reasons.push(`${genderLabels[a.genderId]} therapist`);
  }

  if (a.mode === "either") {
    pts += 10;
  } else if (t.modes.includes(a.mode)) {
    pts += 15;
    reasons.push(`Offers ${modeLabels[a.mode].toLowerCase()} sessions`);
  }

  pts += Math.min(5, Math.round(t.yearsPracticing / 4));

  return { percent: Math.max(0, Math.min(100, Math.round((pts / maxPts) * 100))), reasons };
}

export function rankTherapists(a: QuizAnswers, list: Therapist[]):
  Array<{ therapist: Therapist; score: MatchScore }> {
  return list
    .map(t => ({ therapist: t, score: scoreTherapist(a, t) }))
    .sort((a, b) => b.score.percent - a.score.percent);
}
