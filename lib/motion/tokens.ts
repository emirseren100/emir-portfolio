export const motionTokens = {
  duration: {
    micro: 0.22,
    standard: 0.52,
    sequence: 0.9,
  },
  ease: {
    standard: "power3.out",
    reveal: "power4.out",
    settle: "power2.out",
  },
  pointer: {
    duration: 0.82,
    maxX: 9,
    maxY: 7,
    maxRotation: 1.6,
    projectTiltX: 1.1,
    projectTiltY: 1.4,
  },
  reveal: {
    distance: 18,
  },
} as const;

export type WordmarkState =
  | "assembled"
  | "separating"
  | "framing"
  | "rail"
  | "exit";
