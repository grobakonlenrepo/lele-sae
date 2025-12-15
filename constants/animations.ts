export const ANIMATIONS = {
  DURATION: {
    FAST: 300,
    NORMAL: 500,
    SLOW: 700,
    EXTRA_SLOW: 1000,
  },
  EASING: "ease-out",
  DELAYS: {
    STAGGER: 150,
    SECTION: 200,
    ELEMENT: 100,
  },
} as const;

// Animation variants untuk variety
export const ANIMATION_VARIANTS = {
  fadeUp: "opacity-0 translate-y-8",
  fadeDown: "opacity-0 -translate-y-8",
  fadeLeft: "opacity-0 -translate-x-8",
  fadeRight: "opacity-0 translate-x-8",
  scale: "opacity-0 scale-95",
  slideUp: "translate-y-12",
  slideDown: "-translate-y-12",
} as const;

export const VISIBLE_STATE =
  "opacity-100 translate-x-0 translate-y-0 scale-100";
