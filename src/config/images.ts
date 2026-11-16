/**
 * Every image on the site is referenced from here.
 * To use real gym photos: drop files into /public/images and change the paths below.
 * Sizes are the intrinsic width/height (used to reserve space and avoid layout shift).
 */
export type Img = { src: string; alt: string; w: number; h: number };

const p = (name: string, alt: string, w: number, h: number, ext = "svg"): Img => ({
  src: `/images/${name}.${ext}`,
  alt,
  w,
  h,
});

export const images = {
  /** Hero athlete. Keep a dark background: the hero blends it into the page. */
  runner: p("runner", "Athlete sprinting through red light trails", 1024, 1024, "jpg"),
  about: {
    main: p("about-main", "Inside MR & MRS Unisex Fitness Studio", 1200, 1500),
    detail: p("about-detail", "Close-up of training equipment", 800, 1000),
  },
  programs: {
    weight: p("prog-weight", "Weight training", 1400, 1000),
    strength: p("prog-strength", "Strength training", 1400, 1000),
    cardio: p("prog-cardio", "Cardio training", 1400, 1000),
    muscle: p("prog-muscle", "Muscle building", 1400, 1000),
    weightloss: p("prog-weightloss", "Weight loss training", 1400, 1000),
    general: p("prog-general", "General fitness", 1400, 1000),
  },
  gallery: [
    p("gallery-1", "Gallery photo 1", 1200, 1500),
    p("gallery-2", "Gallery photo 2", 1600, 1000),
    p("gallery-3", "Gallery photo 3", 1200, 1200),
    p("gallery-4", "Gallery photo 4", 1200, 1500),
    p("gallery-5", "Gallery photo 5", 1600, 1000),
    p("gallery-6", "Gallery photo 6", 1200, 1200),
    p("gallery-7", "Gallery photo 7", 1200, 1500),
    p("gallery-8", "Gallery photo 8", 1600, 1000),
  ],
};
