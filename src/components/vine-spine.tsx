import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useMotionOff } from "./botanical";

/**
 * The continuous spine of the plant. It spans the entire document and is
 * drawn by global scroll progress, so every section feels like part of one
 * growing vine rather than separate decorations.
 */
const SPINE =
  "M50 -10 C 22 50, 10 118, 22 190 C 34 262, 84 288, 88 360 C 92 432, 16 458, 14 530 C 12 602, 86 628, 88 700 C 90 772, 24 798, 26 870 C 28 908, 44 916, 50 922";

const MARKS: { x: number; y: number; t: number; a: number; s: number; kind: "leaf" | "bud" }[] = [
  { x: 16, y: 132, t: 0.1, a: 200, s: 0.9, kind: "leaf" },
  { x: 20, y: 176, t: 0.14, a: -20, s: 0.75, kind: "leaf" },
  { x: 40, y: 236, t: 0.2, a: -34, s: 0.85, kind: "leaf" },
  { x: 70, y: 274, t: 0.25, a: -20, s: 0.7, kind: "bud" },
  { x: 88, y: 342, t: 0.31, a: 12, s: 0.9, kind: "leaf" },
  { x: 66, y: 424, t: 0.39, a: 176, s: 0.8, kind: "leaf" },
  { x: 26, y: 464, t: 0.45, a: 160, s: 0.9, kind: "leaf" },
  { x: 14, y: 546, t: 0.53, a: 200, s: 0.7, kind: "bud" },
  { x: 44, y: 610, t: 0.6, a: -18, s: 0.85, kind: "leaf" },
  { x: 88, y: 672, t: 0.66, a: 8, s: 0.9, kind: "leaf" },
  { x: 62, y: 776, t: 0.75, a: 170, s: 0.8, kind: "leaf" },
  { x: 26, y: 832, t: 0.82, a: 190, s: 0.9, kind: "leaf" },
  { x: 32, y: 908, t: 0.9, a: -22, s: 0.75, kind: "bud" },
];

function Mark({ kind }: { kind: "leaf" | "bud" }) {
  if (kind === "bud") {
    return (
      <svg viewBox="-14 -28 28 32" className="h-8 w-8 overflow-visible">
        <path d="M0 0 C -7 -4, -7 -18, 0 -24 C 7 -18, 7 -4, 0 0 Z" fill="var(--petal-mid)" />
        <path
          d="M0 0 C -6 -2, -9 -8, -8 -12 M0 0 C 6 -2, 9 -8, 8 -12"
          stroke="var(--botanic-sage)"
          strokeWidth={1.4}
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 -14 42 28" className="h-7 w-10 overflow-visible">
      <path
        d="M0 0 C 11 -13, 31 -11, 40 0 C 31 11, 11 13, 0 0 Z"
        fill="var(--botanic-leaf)"
        opacity={0.85}
      />
      <path d="M1 0 C 14 -1, 28 -0.5, 39 0" stroke="var(--botanic-ink)" strokeWidth={0.7} fill="none" opacity={0.35} />
    </svg>
  );
}

function VineMark({
  progress,
  mark,
}: {
  progress: MotionValue<number>;
  mark: (typeof MARKS)[number];
}) {
  const off = useMotionOff();
  const opacity = useTransform(progress, [mark.t - 0.02, mark.t + 0.03], [0, 1]);
  const scale = useTransform(progress, [mark.t - 0.02, mark.t + 0.05], [0.2, 1]);
  return (
    <motion.div
      className="absolute origin-left"
      style={{
        left: `${mark.x}%`,
        top: `${mark.y / 10}%`,
        rotate: mark.a,
        scale: off ? 1 : scale,
        opacity: off ? 1 : opacity,
      }}
    >
      <div style={{ transform: `scale(${mark.s})` }}>
        <Mark kind={mark.kind} />
      </div>
    </motion.div>
  );
}

export function VineSpine({ progress }: { progress: MotionValue<number> }) {
  const off = useMotionOff();
  const raw = useSpring(progress, { stiffness: 70, damping: 22, mass: 0.4 });
  const pathLength = useTransform(raw, (v) => Math.min(1, Math.max(0.02, v * 1.05)));

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <svg className="h-full w-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <motion.path
          d={SPINE}
          fill="none"
          stroke="var(--botanic-sage)"
          strokeWidth={1.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.55}
          style={{ pathLength: off ? 1 : pathLength }}
        />
        <motion.path
          d={SPINE}
          fill="none"
          stroke="var(--champagne)"
          strokeWidth={0.6}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.4}
          transform="translate(2 0)"
          style={{ pathLength: off ? 1 : pathLength }}
        />
      </svg>
      <div className="absolute inset-0">
        {MARKS.map((m, i) => (
          <VineMark key={i} progress={raw} mark={m} />
        ))}
      </div>
    </div>
  );
}
