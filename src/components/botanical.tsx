import { motion, type Transition } from "motion/react";
import { useReducedMotion } from "motion/react";

/* ------------------------------------------------------------------ *
 * Shared botanical primitives.
 * One coherent illustration family: same stroke weight, same petal
 * geometry, same muted palette. All colours come from design tokens.
 * ------------------------------------------------------------------ */

const PETAL =
  "M0 0 C 9 -11, 27 -9.5, 33 0 C 27 9.5, 9 11, 0 0 Z";
const LEAF_SHAPE =
  "M0 0 C 11 -13, 31 -11, 40 0 C 31 11, 11 13, 0 0 Z";

const ink = "var(--botanic-ink)";
const sage = "var(--botanic-sage)";
const leafFill = "var(--botanic-leaf)";
const petalLight = "var(--petal-light)";
const petalMid = "var(--petal-mid)";
const petalDeep = "var(--petal-deep)";
const gold = "var(--champagne)";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function useMotionOff() {
  return useReducedMotion() ?? false;
}

/* ---------------------------------- stem ---------------------------------- */

export function Stem({
  d,
  className,
  width = 1.6,
  delay = 0,
  duration = 2.2,
  color = sage,
  once = true,
  amount = 0.35,
}: {
  d: string;
  className?: string;
  width?: number;
  delay?: number;
  duration?: number;
  color?: string;
  once?: boolean;
  amount?: number;
}) {
  const off = useMotionOff();
  return (
    <motion.path
      className={className}
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: off ? 1 : 0, opacity: off ? 1 : 0.2 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once, amount }}
      transition={{ duration: off ? 0 : duration, delay: off ? 0 : delay, ease }}
    />
  );
}

/* ---------------------------------- leaf ---------------------------------- */

export function Leaf({
  x,
  y,
  angle = 0,
  scale = 1,
  delay = 0,
  flip = false,
  tone = leafFill,
}: {
  x: number;
  y: number;
  angle?: number;
  scale?: number;
  delay?: number;
  flip?: boolean;
  tone?: string;
}) {
  const off = useMotionOff();
  const t: Transition = { duration: off ? 0 : 0.9, delay: off ? 0 : delay, ease };
  return (
    <motion.g
      initial={{ opacity: off ? 1 : 0, scale: off ? 1 : 0.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={t}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale} ${flip ? -scale : scale})`}>
        <path d={LEAF_SHAPE} fill={tone} opacity={0.9} />
        <path
          d="M1 0 C 14 -1, 28 -0.5, 39 0"
          stroke={ink}
          strokeWidth={0.7}
          fill="none"
          opacity={0.35}
        />
      </g>
    </motion.g>
  );
}

/* ---------------------------------- bud ----------------------------------- */

export function Bud({
  x,
  y,
  angle = 0,
  scale = 1,
  delay = 0,
  tone = petalMid,
}: {
  x: number;
  y: number;
  angle?: number;
  scale?: number;
  delay?: number;
  tone?: string;
}) {
  const off = useMotionOff();
  return (
    <motion.g
      initial={{ opacity: off ? 1 : 0, scale: off ? 1 : 0.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: off ? 0 : 0.8, delay: off ? 0 : delay, ease }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
        <path d="M0 0 C -7 -4, -7 -18, 0 -24 C 7 -18, 7 -4, 0 0 Z" fill={tone} />
        <path
          d="M0 0 C -6 -2, -9 -8, -8 -12 M0 0 C 6 -2, 9 -8, 8 -12"
          stroke={sage}
          strokeWidth={1.4}
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </motion.g>
  );
}

/* --------------------------------- blossom -------------------------------- */

export function Blossom({
  x,
  y,
  scale = 1,
  delay = 0,
  petals = 5,
  tone = petalLight,
  heart = gold,
}: {
  x: number;
  y: number;
  scale?: number;
  delay?: number;
  petals?: number;
  tone?: string;
  heart?: string;
}) {
  const off = useMotionOff();
  return (
    <motion.g
      initial={{ opacity: off ? 1 : 0, scale: off ? 1 : 0.05, rotate: off ? 0 : -25 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: off ? 0 : 1, delay: off ? 0 : delay, ease }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        {Array.from({ length: petals }).map((_, i) => (
          <motion.path
            key={i}
            d={PETAL}
            fill={tone}
            opacity={0.95}
            transform={`rotate(${(360 / petals) * i}) scale(0.42)`}
            initial={{ opacity: off ? 0.95 : 0 }}
            whileInView={{ opacity: 0.95 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: off ? 0 : 0.6,
              delay: off ? 0 : delay + i * 0.07,
              ease,
            }}
          />
        ))}
        <circle r={2.6} fill={heart} />
      </g>
    </motion.g>
  );
}

/* ---------------------------------- rose ---------------------------------- */

const ROSE_RINGS = [
  { count: 7, scale: 1, tone: petalLight, tilt: 0 },
  { count: 6, scale: 0.72, tone: petalMid, tilt: 26 },
  { count: 5, scale: 0.46, tone: petalDeep, tilt: 52 },
];

export function Rose({
  x,
  y,
  scale = 1,
  delay = 0,
  rotate = 0,
}: {
  x: number;
  y: number;
  scale?: number;
  delay?: number;
  rotate?: number;
}) {
  const off = useMotionOff();
  return (
    <motion.g
      initial={{ opacity: off ? 1 : 0, scale: off ? 1 : 0.08 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: off ? 0 : 1.1, delay: off ? 0 : delay, ease }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
        {ROSE_RINGS.map((ring, r) =>
          Array.from({ length: ring.count }).map((_, i) => {
            const a = (360 / ring.count) * i + ring.tilt;
            return (
              <motion.path
                key={`${r}-${i}`}
                d={PETAL}
                fill={ring.tone}
                initial={
                  off
                    ? { opacity: 1, scale: 1, rotate: a }
                    : { opacity: 0, scale: 0.1, rotate: a - 40 }
                }
                whileInView={{ opacity: 1, scale: ring.scale * 0.6, rotate: a }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: off ? 0 : 0.85,
                  delay: off ? 0 : delay + (2 - r) * 0.18 + i * 0.055,
                  ease,
                }}
                style={{ transformOrigin: "0px 0px" }}
              />
            );
          }),
        )}
        <circle r={3.4} fill={petalDeep} />
        <circle r={1.5} fill={gold} />
      </g>
    </motion.g>
  );
}

/* -------------------------------- branches -------------------------------- */

/** A leafy branch that draws itself and then sprouts leaves + a blossom. */
export function LeafBranch({
  className,
  flip = false,
  delay = 0,
}: {
  className?: string;
  flip?: boolean;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <Stem d="M2 110 C 40 104, 74 84, 96 58 C 118 32, 150 16, 194 12" delay={delay} duration={1.8} />
      <Leaf x={44} y={100} angle={-24} scale={0.44} delay={delay + 0.5} />
      <Leaf x={62} y={92} angle={-70} scale={0.36} delay={delay + 0.62} flip />
      <Leaf x={92} y={62} angle={-42} scale={0.5} delay={delay + 0.78} />
      <Leaf x={118} y={40} angle={-84} scale={0.38} delay={delay + 0.9} flip />
      <Leaf x={148} y={22} angle={-20} scale={0.44} delay={delay + 1.02} />
      <Blossom x={176} y={14} scale={0.75} delay={delay + 1.15} />
      <Bud x={132} y={30} angle={26} scale={0.55} delay={delay + 1.25} />
    </svg>
  );
}

/** A denser cluster with a rose — used to punctuate content blocks. */
export function FlowerCluster({
  className,
  flip = false,
  delay = 0,
}: {
  className?: string;
  flip?: boolean;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 180 160"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <Stem d="M6 156 C 34 130, 44 96, 60 66 C 74 40, 100 22, 132 18" delay={delay} duration={1.6} />
      <Stem
        d="M60 66 C 76 62, 100 66, 118 82"
        delay={delay + 0.5}
        duration={1}
        width={1.2}
      />
      <Leaf x={30} y={128} angle={-48} scale={0.42} delay={delay + 0.55} />
      <Leaf x={50} y={92} angle={-96} scale={0.34} delay={delay + 0.68} flip />
      <Leaf x={86} y={72} angle={16} scale={0.4} delay={delay + 0.8} />
      <Rose x={128} y={22} scale={0.9} delay={delay + 0.85} />
      <Blossom x={116} y={82} scale={0.7} delay={delay + 1.1} tone={petalMid} />
      <Bud x={92} y={44} angle={-18} scale={0.6} delay={delay + 1.2} />
    </svg>
  );
}

/** A small arc of foliage — used above/below headings. */
export function Sprig({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 160 40" className={className} aria-hidden="true">
      <Stem d="M6 32 C 40 12, 120 12, 154 32" delay={delay} duration={1.1} width={1.2} />
      <Leaf x={34} y={22} angle={-158} scale={0.3} delay={delay + 0.4} />
      <Leaf x={126} y={22} angle={-22} scale={0.3} delay={delay + 0.5} flip />
      <Blossom x={80} y={15} scale={0.5} delay={delay + 0.6} />
    </svg>
  );
}

/* --------------------------------- wreath --------------------------------- */

export function Wreath({ className, delay = 0 }: { className?: string; delay?: number }) {
  const leaves = Array.from({ length: 22 }).map((_, i) => {
    const a = (360 / 22) * i - 90;
    const rad = (a * Math.PI) / 180;
    const r = 128;
    return {
      x: Math.round((160 + Math.cos(rad) * r) * 100) / 100,
      y: Math.round((160 + Math.sin(rad) * r) * 100) / 100,
      angleRaw: a,
      angle: Math.round((a + (i % 2 ? 28 : -28)) * 100) / 100,
      scale: i % 3 === 0 ? 0.5 : 0.38,
      delay: Math.round((delay + 0.9 + i * 0.045) * 1000) / 1000,
      flip: i % 2 === 0,
    };
  });

  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true">
      <Stem
        d="M160 32 C 90 32, 32 90, 32 160 C 32 230, 90 288, 160 288"
        delay={delay}
        duration={2.6}
        amount={0.2}
      />
      <Stem
        d="M160 32 C 230 32, 288 90, 288 160 C 288 230, 230 288, 160 288"
        delay={delay + 0.25}
        duration={2.6}
        amount={0.2}
      />
      <Stem
        d="M160 40 C 100 46, 48 96, 44 156"
        delay={delay + 0.8}
        duration={1.6}
        width={1}
        amount={0.2}
      />
      <Stem
        d="M160 40 C 220 46, 272 96, 276 156"
        delay={delay + 0.95}
        duration={1.6}
        width={1}
        amount={0.2}
      />
      {leaves.map(({ angleRaw: _a, ...l }, i) => (
        <Leaf key={i} {...l} />
      ))}
      <Rose x={160} y={30} scale={0.92} delay={delay + 1.6} />
      <Rose x={40} y={196} scale={0.74} delay={delay + 1.9} rotate={20} />
      <Rose x={280} y={196} scale={0.74} delay={delay + 2.05} rotate={-20} />
      <Blossom x={62} y={82} scale={0.8} delay={delay + 2.2} tone={petalMid} />
      <Blossom x={258} y={82} scale={0.8} delay={delay + 2.3} tone={petalMid} />
      <Blossom x={160} y={292} scale={0.85} delay={delay + 2.4} />
      <Bud x={104} y={44} angle={-40} scale={0.62} delay={delay + 2.5} />
      <Bud x={216} y={44} angle={40} scale={0.62} delay={delay + 2.6} />
      <Bud x={30} y={132} angle={-70} scale={0.55} delay={delay + 2.7} />
      <Bud x={290} y={132} angle={70} scale={0.55} delay={delay + 2.8} />
    </svg>
  );
}

/* --------------------------- corner image botanicals ---------------------- */

export function FrameCorner({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <Stem d="M4 116 C 20 80, 48 44, 112 8" delay={delay} duration={1.3} width={1.2} />
      <Leaf x={26} y={90} angle={-52} scale={0.4} delay={delay + 0.4} />
      <Leaf x={52} y={60} angle={-40} scale={0.34} delay={delay + 0.52} flip />
      <Blossom x={86} y={30} scale={0.6} delay={delay + 0.64} />
      <Bud x={66} y={44} angle={-30} scale={0.5} delay={delay + 0.76} />
    </svg>
  );
}
