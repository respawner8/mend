export type Specialty =
  | "anxiety" | "depression" | "relationships" | "life-transitions"
  | "trauma" | "stress" | "grief" | "adhd";

export type Insurance =
  | "aetna" | "bcbs" | "cigna" | "kaiser" | "united" | "self-pay" | "other";

export type SessionMode = "virtual" | "in-person";

export type GenderId = "woman" | "man" | "non-binary";

export interface Slot {
  day: string;
  time: string;
}

export interface Therapist {
  id: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  credentials: string;
  yearsPracticing: number;
  color: string;
  genderId: GenderId;
  modes: SessionMode[];
  specialties: Specialty[];
  insurances: Insurance[];
  price?: number;
  bio: string;
  approach: string;
  availability: Slot[];
}

export interface QuizAnswers {
  specialties: Specialty[];
  mode: SessionMode | "either";
  genderId: GenderId | "any";
  insurance: Insurance;
}
