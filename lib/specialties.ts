import type { Specialty, Insurance, SessionMode, GenderId } from "./types";

export const specialtyLabels: Record<Specialty, string> = {
  "anxiety":          "Anxiety",
  "depression":       "Depression",
  "relationships":    "Relationships",
  "life-transitions": "Life transitions",
  "trauma":           "Trauma",
  "stress":           "Stress",
  "grief":            "Grief",
  "adhd":             "ADHD",
};

export const insuranceLabels: Record<Insurance, string> = {
  "aetna":    "Aetna",
  "bcbs":     "Blue Cross Blue Shield",
  "cigna":    "Cigna",
  "kaiser":   "Kaiser",
  "united":   "UnitedHealthcare",
  "self-pay": "Self-pay",
  "other":    "Other",
};

export const modeLabels: Record<SessionMode | "either", string> = {
  "virtual":   "Virtual",
  "in-person": "In-person",
  "either":    "Either",
};

export const genderLabels: Record<GenderId | "any", string> = {
  "woman":      "Woman",
  "man":        "Man",
  "non-binary": "Non-binary",
  "any":        "Any",
};
