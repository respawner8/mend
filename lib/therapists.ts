import type { Therapist, Slot } from "./types";

function buildAvailability(seed: number): Slot[] {
  const baseTimes = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
  const slots: Slot[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getTime() + i * 86_400_000);
    const iso = d.toISOString().slice(0, 10);
    const count = (seed * 31 + i * 7) % 4;
    const offset = (seed + i) % baseTimes.length;
    for (let k = 0; k < count; k++) {
      slots.push({ day: iso, time: baseTimes[(offset + k) % baseTimes.length] });
    }
  }
  return slots;
}

export const therapists: Therapist[] = [
  {
    id: "t1",
    firstName: "Amara",   lastName: "Okonkwo",
    pronouns: "she/her",
    credentials: "LMFT",  yearsPracticing: 9,
    color: "#b97a56",
    genderId: "woman",
    modes: ["virtual", "in-person"],
    specialties: ["anxiety", "relationships", "life-transitions"],
    insurances: ["aetna", "bcbs", "united", "self-pay"],
    price: 180,
    bio: "I work with adults navigating anxiety, relationship questions, and big transitions — new cities, new roles, new seasons of life. My style is warm and direct. We'll spend less time on life stories and more on what's actually in front of you right now.",
    approach: "I draw mostly from ACT and attachment-informed therapy. We'll notice patterns, name them, and experiment with small shifts between sessions. Expect practical homework some weeks.",
    availability: buildAvailability(3),
  },
  {
    id: "t2",
    firstName: "Jonas",   lastName: "Weber",
    pronouns: "he/him",
    credentials: "LCSW",  yearsPracticing: 14,
    color: "#4f7a8c",
    genderId: "man",
    modes: ["virtual"],
    specialties: ["depression", "grief", "life-transitions"],
    insurances: ["bcbs", "cigna", "self-pay"],
    price: 160,
    bio: "Over fourteen years I've found the work is often simpler than it looks: helping people feel heard, then helping them see themselves more accurately. I specialize in depression, grief, and the long middle of big life changes.",
    approach: "Mostly psychodynamic with a heavy dose of plain talk. I don't give advice but I do say what I notice. Sessions are structured but not rigid.",
    availability: buildAvailability(5),
  },
  {
    id: "t3",
    firstName: "Priya",   lastName: "Ramachandran",
    pronouns: "she/her",
    credentials: "PhD, Psychologist",  yearsPracticing: 11,
    color: "#7a5cb8",
    genderId: "woman",
    modes: ["virtual", "in-person"],
    specialties: ["trauma", "anxiety", "relationships"],
    insurances: ["aetna", "united", "cigna", "self-pay"],
    price: 220,
    bio: "I help adults who've been through things — big traumas, small traumas, and the cumulative kind. I'm EMDR-trained and grounded in somatic approaches. My office feels like a place you can finally put something down.",
    approach: "EMDR and sensorimotor psychotherapy where useful, CBT when that's what the work calls for. I move at your pace.",
    availability: buildAvailability(1),
  },
  {
    id: "t4",
    firstName: "Sam",     lastName: "Hale",
    pronouns: "they/them",
    credentials: "LMHC",  yearsPracticing: 6,
    color: "#5b8767",
    genderId: "non-binary",
    modes: ["virtual"],
    specialties: ["anxiety", "adhd", "life-transitions", "stress"],
    insurances: ["aetna", "bcbs", "self-pay"],
    price: 150,
    bio: "Especially good with late-diagnosed ADHD, creative professionals, and folks in the middle of coming-into-themselves. I work collaboratively and we will almost definitely laugh.",
    approach: "ACT and values-based therapy. Curious, practical, and non-pathologizing. Homework is optional but highly recommended.",
    availability: buildAvailability(7),
  },
  {
    id: "t5",
    firstName: "Elena",   lastName: "Garcia",
    pronouns: "she/her",
    credentials: "LPC",   yearsPracticing: 13,
    color: "#c98b6b",
    genderId: "woman",
    modes: ["virtual", "in-person"],
    specialties: ["depression", "stress", "grief"],
    insurances: ["kaiser", "united", "self-pay"],
    price: 170,
    bio: "I've worked in community mental health, private practice, and teaching. I keep coming back to private practice because the room is small enough to do real work. Bilingual in Spanish.",
    approach: "CBT with a relational frame. We'll work on thought patterns and on what it feels like to be you in the world.",
    availability: buildAvailability(4),
  },
  {
    id: "t6",
    firstName: "Noor",    lastName: "Haidari",
    pronouns: "she/her",
    credentials: "LCSW",  yearsPracticing: 8,
    color: "#8c7a4f",
    genderId: "woman",
    modes: ["in-person"],
    specialties: ["relationships", "life-transitions", "grief"],
    insurances: ["bcbs", "cigna", "self-pay"],
    price: 175,
    bio: "I work mostly with first- and second-generation folks carrying family, career, and identity questions at the same time. I'm honored by the specificity of these stories and I don't flatten them.",
    approach: "Relational and culturally attentive. I'll ask about the world you came from as well as the one you're in.",
    availability: buildAvailability(2),
  },
  {
    id: "t7",
    firstName: "Marcus",  lastName: "Reeves",
    pronouns: "he/him",
    credentials: "LMFT",  yearsPracticing: 18,
    color: "#6b8ca1",
    genderId: "man",
    modes: ["virtual", "in-person"],
    specialties: ["relationships", "trauma", "depression"],
    insurances: ["aetna", "united", "kaiser", "self-pay"],
    price: 200,
    bio: "I work with couples and individuals — often both over the life of a relationship. I'm straightforward, warm, and not afraid to name what's hard in a room.",
    approach: "Gottman-informed with couples; attachment-forward with individuals. Practical and honest.",
    availability: buildAvailability(6),
  },
  {
    id: "t8",
    firstName: "Rin",     lastName: "Takeshita",
    pronouns: "she/her",
    credentials: "LPC",   yearsPracticing: 5,
    color: "#d17a8a",
    genderId: "woman",
    modes: ["virtual"],
    specialties: ["anxiety", "stress", "adhd"],
    insurances: ["aetna", "cigna", "self-pay"],
    price: 140,
    bio: "I help high-performers who've outrun their own nervous systems. I'm especially good with perfectionism, burnout, and the anxious-but-functional kind of anxious. Direct and a little dry.",
    approach: "Mostly CBT + somatic work. Sessions have structure and you'll leave with one thing to try.",
    availability: buildAvailability(8),
  },
];

export const therapistById = (id: string) => therapists.find(t => t.id === id);
