import { images } from "./images";

/**
 * Section copy. Working copy: review it with the studio and edit freely.
 * No real prices, hours, testimonials, partners or member statistics are claimed.
 */
export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Membership", href: "#plans" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  lines: ["TRAIN HARDER.", "BECOME STRONGER."],
  sub: "Push your limits, build confidence and transform your fitness journey at MR & MRS Unisex Fitness Studio.",
};

/** Illustrative sample values for the floating hero cards. Not real member data. */
export const heroStats = {
  calories: { value: 486, goal: 650 },
  activeMinutes: 52,
  week: [38, 52, 44, 61, 47, 70, 55],
  progress: 72,
};

export const trust = "TRAIN WITH PURPOSE. TRANSFORM WITH CONFIDENCE.";

export const features = [
  { icon: "Dumbbell", title: "Strength Training", text: "Free weights and machines for building real, lasting strength." },
  { icon: "HeartPulse", title: "Cardio Training", text: "Build stamina and burn energy with cardio that keeps you moving." },
  { icon: "ClipboardList", title: "Fitness Programs", text: "Structured programs matched to your goal: size, strength or weight loss." },
  { icon: "UserCheck", title: "Personal Fitness Guidance", text: "Ask for help with form, routines or where to start." },
  { icon: "Users", title: "Fitness Community", text: "Men and women training side by side and pushing each other forward." },
  { icon: "Flame", title: "Transformation", text: "Consistent training, adjusted as you grow, until the change shows." },
] as const;

export const about = {
  title: "One floor. Two kinds of strong.",
  body: [
    "MR & MRS is a unisex fitness studio in Mugalivakkam, Chennai. Men and women train in the same room, on the same iron, to the same standard.",
    "We built the studio around the work itself: heavy lifts, honest cardio and coaching that pays attention to how you move.",
  ],
};

export const programs = [
  { name: "Weight Training", text: "Dumbbells, barbells and machines used with purpose and good form.", image: images.programs.weight },
  { name: "Strength Training", text: "Built around the big lifts, with progress you can measure.", image: images.programs.strength },
  { name: "Cardio", text: "Stamina and conditioning work that raises your engine.", image: images.programs.cardio },
  { name: "Muscle Building", text: "Structured splits and progressive overload for steady size and shape.", image: images.programs.muscle },
  { name: "Weight Loss", text: "Training and habits that burn fat and that you can keep up.", image: images.programs.weightloss },
  { name: "General Fitness", text: "A balanced routine for energy, mobility and everyday strength.", image: images.programs.general },
];

/** Sample packages for layout demonstration. Confirm current rates and inclusions with the studio. */
export const plans = [
  { id: "monthly", name: "Monthly", text: "A flexible way to get started and find your rhythm.", price: "₹1,499", period: "/ month", includes: ["Full gym floor access", "Strength and cardio equipment", "Trainer orientation"], featured: false },
  { id: "quarterly", name: "Quarterly", text: "Three focused months to build consistency and momentum.", price: "₹3,799", period: "/ 3 months", includes: ["Everything in Monthly", "Personal workout plan", "Monthly progress check-in"], featured: true },
  { id: "half-yearly", name: "Half-Yearly", text: "Make training a habit with six months of steady progress.", price: "₹6,999", period: "/ 6 months", includes: ["Everything in Monthly", "Personal workout plan", "Priority trainer guidance"], featured: false },
  { id: "annual", name: "Annual", text: "A full year to put in the work and keep getting stronger.", price: "₹11,999", period: "/ year", includes: ["Everything in Monthly", "Personal workout plan", "Quarterly progress reviews"], featured: false },
];
