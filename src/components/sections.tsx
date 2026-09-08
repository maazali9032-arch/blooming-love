import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Blossom,
  Bud,
  FlowerCluster,
  FrameCorner,
  Leaf,
  LeafBranch,
  Rose,
  Sprig,
  Stem,
  Wreath,
  useMotionOff,
} from "./botanical";
import type { Invitation } from "@/data/invitation";

const ease = [0.22, 0.61, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const off = useMotionOff();
  return (
    <motion.div
      className={className}
      initial={off ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: off ? 0 : 1, delay: off ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ================================ 1 + 2 + 3 ================================ */

export function Hero({ data }: { data: Invitation }) {
  const off = useMotionOff();
  const d = (n: number) => (off ? 0 : n);
  const hasBothNames = Boolean(data.groomName && data.brideName);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-24 pt-16">
      {data.invocation.preset !== "none" && data.invocation.text && (
        <motion.div
          className="mb-10 max-w-md text-center"
          dir={data.invocation.dir}
          lang={data.invocation.lang}
          initial={off ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(1.6), delay: d(0.3), ease }}
        >
          <p
            className="text-[1.35rem] leading-[2.4rem] text-ink/85 sm:text-2xl"
            style={{
              fontFamily:
                data.invocation.dir === "rtl"
                  ? '"Noto Naskh Arabic", serif'
                  : "var(--font-display)",
            }}
          >
            {data.invocation.text}
          </p>
          {data.invocation.translation && (
            <p className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              {data.invocation.translation}
            </p>
          )}
        </motion.div>
      )}

      {/* the first stem draws itself, then the first rose blooms */}
      <div className="relative w-full max-w-[26rem]">
        <svg viewBox="0 0 360 260" className="w-full overflow-visible" aria-hidden="true">
          <motion.path
            d="M180 258 C 176 210, 168 176, 176 140 C 182 112, 180 92, 180 74"
            fill="none"
            stroke="var(--botanic-sage)"
            strokeWidth={1.8}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: off ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: d(2.6), delay: d(0.6), ease }}
          />
          <motion.path
            d="M176 150 C 148 146, 120 128, 104 104"
            fill="none"
            stroke="var(--botanic-sage)"
            strokeWidth={1.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: off ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: d(1.6), delay: d(2.2), ease }}
          />
          <motion.path
            d="M178 122 C 206 118, 234 100, 250 78"
            fill="none"
            stroke="var(--botanic-sage)"
            strokeWidth={1.2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: off ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: d(1.6), delay: d(2.5), ease }}
          />
          <HeroSprout delay={d(2.9)} />
        </svg>

        {/* the bloom frames the couple */}
        <div className="pointer-events-none absolute inset-x-0 -top-2 flex justify-center">
          <motion.svg
            viewBox="0 0 200 200"
            className="w-40 sm:w-48"
            aria-hidden="true"
            initial={{ opacity: off ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: d(0.6), delay: d(3.1) }}
          >
            <HeroRose delay={d(3.2)} />
          </motion.svg>
        </div>
      </div>

      <motion.div
        className="relative -mt-6 text-center"
        initial={off ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: d(1.4), delay: d(4.4), ease }}
      >
        {data.groomName && <h1 className="display text-[3.1rem] leading-[1] tracking-[0.06em] text-ink sm:text-7xl">{data.groomName.toUpperCase()}</h1>}
        {hasBothNames && <div className="my-3 flex items-center justify-center gap-4"><span className="hairline w-14" /><span className="display text-2xl italic text-champagne">&amp;</span><span className="hairline w-14" /></div>}
        {data.brideName && <h1 className="display text-[3.1rem] leading-[1] tracking-[0.06em] text-ink sm:text-7xl">{data.brideName.toUpperCase()}</h1>}
        {data.date && <p className="eyebrow mt-7">{data.date}</p>}
      </motion.div>

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: d(5.6) }}
      >
        <p className="eyebrow text-[0.6rem]">Scroll to let it grow</p>
        <motion.div
          className="mx-auto mt-3 h-8 w-px bg-champagne/70"
          animate={off ? {} : { scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}

function HeroSprout({ delay }: { delay: number }) {
  const off = useMotionOff();
  const items = [
    { x: 104, y: 104, a: 200, s: 0.5, i: 0 },
    { x: 132, y: 122, a: 214, s: 0.42, i: 1 },
    { x: 250, y: 78, a: -22, s: 0.5, i: 2 },
    { x: 222, y: 96, a: -34, s: 0.42, i: 3 },
    { x: 176, y: 186, a: 160, s: 0.46, i: 4 },
    { x: 184, y: 210, a: -18, s: 0.4, i: 5 },
  ];
  return (
    <g>
      {items.map((l) => (
        <motion.g
          key={l.i}
          initial={{ opacity: off ? 1 : 0, scale: off ? 1 : 0.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: off ? 0 : 0.8, delay: delay + l.i * 0.12, ease }}
          style={{ transformOrigin: `${l.x}px ${l.y}px` }}
        >
          <g transform={`translate(${l.x} ${l.y}) rotate(${l.a}) scale(${l.s})`}>
            <path
              d="M0 0 C 11 -13, 31 -11, 40 0 C 31 11, 11 13, 0 0 Z"
              fill="var(--botanic-leaf)"
              opacity={0.9}
            />
          </g>
        </motion.g>
      ))}
      <motion.g
        initial={{ opacity: off ? 1 : 0, scale: off ? 1 : 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: off ? 0 : 0.9, delay: delay + 0.9, ease }}
        style={{ transformOrigin: "104px 104px" }}
      >
        <g transform="translate(104 104) rotate(-24) scale(0.7)">
          <path d="M0 0 C -7 -4, -7 -18, 0 -24 C 7 -18, 7 -4, 0 0 Z" fill="var(--petal-mid)" />
        </g>
      </motion.g>
    </g>
  );
}

function HeroRose({ delay }: { delay: number }) {
  const off = useMotionOff();
  const rings = [
    { count: 8, scale: 1.05, tone: "var(--petal-light)", tilt: 0 },
    { count: 7, scale: 0.76, tone: "var(--petal-mid)", tilt: 24 },
    { count: 5, scale: 0.48, tone: "var(--petal-deep)", tilt: 50 },
  ];
  return (
    <g transform="translate(100 100)">
      {rings.map((ring, r) =>
        Array.from({ length: ring.count }).map((_, i) => {
          const a = (360 / ring.count) * i + ring.tilt;
          return (
            <motion.path
              key={`${r}-${i}`}
              d="M0 0 C 9 -11, 27 -9.5, 33 0 C 27 9.5, 9 11, 0 0 Z"
              fill={ring.tone}
              initial={
                off
                  ? { opacity: 1, scale: ring.scale * 1.25, rotate: a }
                  : { opacity: 0, scale: 0.05, rotate: a - 55 }
              }
              animate={{ opacity: 1, scale: ring.scale * 1.25, rotate: a }}
              transition={{
                duration: off ? 0 : 1,
                delay: off ? 0 : delay + (2 - r) * 0.24 + i * 0.06,
                ease,
              }}
              style={{ transformOrigin: "0px 0px" }}
            />
          );
        }),
      )}
      <motion.circle
        r={5}
        fill="var(--petal-deep)"
        initial={{ opacity: off ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.6 }}
      />
      <motion.circle
        r={2.2}
        fill="var(--champagne)"
        initial={{ opacity: off ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
      />
    </g>
  );
}

/* =================================== 6 ==================================== */

export function Message({ data }: { data: Invitation }) {
  return (
    <section className="relative px-6 py-28 sm:py-36">
      <div className="relative mx-auto max-w-xl text-center">
        <LeafBranch className="pointer-events-none absolute -left-6 -top-14 w-32 opacity-90 sm:-left-24 sm:w-44" />
        <LeafBranch
          className="pointer-events-none absolute -right-6 -bottom-16 w-32 opacity-90 sm:-right-24 sm:w-44"
          flip
          delay={0.2}
        />
        <Reveal>
          <p className="eyebrow">{data.message.intro}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="display mt-6 text-4xl leading-[1.15] tracking-[0.04em] text-ink sm:text-5xl">
            {data.groomName} <span className="italic text-champagne">&amp;</span> {data.brideName}
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-sm text-[0.95rem] font-light leading-8 tracking-wide text-muted-foreground">
            {data.message.body}
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <Sprig className="mx-auto mt-10 w-40" delay={0.5} />
        </Reveal>
        <Reveal delay={0.55}>
          <p className="display mt-6 text-lg italic text-ink/70">{data.tagline}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* =================================== 7 ==================================== */

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

export function Countdown({ data }: { data: Invitation }) {
  const target = useMemo(() => new Date(data.dateISO).getTime(), [data.dateISO]);
  const [parts, setParts] = useState<number[] | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const s = Math.floor(diff / 1000);
      setParts([Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60]);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="relative mx-auto max-w-2xl">
        <svg
          viewBox="0 0 400 200"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <Stem d="M0 178 C 70 168, 110 138, 150 108" width={1.2} duration={1.4} />
          <Stem d="M400 22 C 330 32, 290 62, 250 92" width={1.2} duration={1.4} delay={0.2} />
          <Leaf x={54} y={172} angle={-26} scale={0.4} delay={0.7} />
          <Leaf x={104} y={146} angle={-40} scale={0.34} delay={0.82} flip />
          <Leaf x={346} y={28} angle={154} scale={0.4} delay={0.9} />
          <Leaf x={296} y={54} angle={140} scale={0.34} delay={1.0} flip />
          <Blossom x={150} y={106} scale={0.6} delay={1.1} />
          <Blossom x={250} y={94} scale={0.6} delay={1.2} tone="var(--petal-mid)" />
          <Bud x={200} y={186} angle={-8} scale={0.55} delay={1.3} />
        </svg>

        <Reveal className="relative text-center">
          <p className="eyebrow">Counting the days</p>
        </Reveal>

        <div className="relative mt-10 grid grid-cols-4 gap-1 sm:gap-4">
          {UNITS.map((u, i) => (
            <Reveal key={u} delay={0.1 + i * 0.1} className="text-center">
              <div className="relative px-1">
                <span className="display block text-[2.2rem] leading-none tabular-nums text-ink sm:text-6xl">
                  {parts ? String(parts[i]).padStart(2, "0") : "--"}
                </span>
                <span className="eyebrow mt-3 block text-[0.52rem] sm:text-[0.62rem]">{u}</span>
                {i < 3 && (
                  <span className="absolute right-0 top-1 hidden h-8 w-px bg-border sm:block" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================== 8 ==================================== */

export function Events({ data }: { data: Invitation }) {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <p className="eyebrow">The celebrations</p>
        <Sprig className="mx-auto mt-6 w-32" delay={0.2} />
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-4xl gap-20 sm:gap-16 md:grid-cols-2">
        {data.events.map((ev, i) => (
          <div key={ev.id} className="relative">
            <FlowerCluster
              className="pointer-events-none absolute -top-16 w-28 opacity-95 sm:w-36"
              flip={i % 2 === 1}
              delay={i * 0.15}
              {...(i % 2 === 1 ? { } : {})}
            />
            <Reveal delay={0.2} className="relative">
              <div className="border-y border-border/80 px-4 py-10 text-center">
                <h3 className="display text-4xl tracking-[0.14em] text-ink sm:text-5xl">
                  {ev.name.toUpperCase()}
                </h3>
                <div className="mx-auto my-6 flex items-center justify-center gap-3">
                  <span className="hairline w-10" />
                  <span className="h-1 w-1 rotate-45 bg-champagne" />
                  <span className="hairline w-10" />
                </div>
                <p className="text-sm font-light tracking-[0.18em] text-ink/80 uppercase">
                  {ev.date}
                </p>
                <p className="mt-1 text-sm font-light tracking-[0.18em] text-ink/80 uppercase">
                  {ev.time}
                </p>
                <p className="display mt-6 text-2xl text-ink">{ev.venue}</p>
                <p className="mt-1 text-[0.8rem] font-light tracking-wide text-muted-foreground">
                  {ev.address}
                </p>
                <p className="text-[0.8rem] font-light tracking-wide text-muted-foreground">
                  {ev.city}
                </p>
                {ev.description && (
                  <p className="mx-auto mt-5 max-w-xs text-[0.82rem] font-light italic leading-6 text-muted-foreground">
                    {ev.description}
                  </p>
                )}
                {ev.mapsUrl && (
                  <a
                    href={ev.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="eyebrow mt-8 inline-block border-b border-champagne/70 pb-1 text-ink transition-colors hover:text-champagne"
                  >
                    View location
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =================================== 10 =================================== */

function GalleryImage({
  item,
  index,
}: {
  item: Invitation["gallery"][number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const off = useMotionOff();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.01, 1.06]);
  const wide = item.width > item.height;

  return (
    <motion.figure
      ref={ref}
      className={`relative ${wide ? "sm:col-span-7" : "sm:col-span-5"} ${
        index % 2 ? "sm:mt-20" : ""
      }`}
      initial={off ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: off ? 0 : 1, ease }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={off ? {} : { y, scale }}
        />
      </div>
      <FrameCorner
        className="pointer-events-none absolute -bottom-8 -left-8 w-24 sm:w-28"
        delay={0.3}
      />
      <div className="pointer-events-none absolute -right-6 -top-8 w-20 sm:w-24">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <Stem d="M116 112 C 100 76, 72 40, 8 6" delay={0.2} duration={1.2} width={1.2} />
          <Leaf x={94} y={86} angle={-128} scale={0.4} delay={0.6} />
          <Rose x={26} y={20} scale={0.62} delay={0.7} />
          <Bud x={58} y={46} angle={-150} scale={0.5} delay={0.9} />
        </svg>
      </div>
    </motion.figure>
  );
}

export function Gallery({ data }: { data: Invitation }) {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <p className="eyebrow">Moments</p>
      </Reveal>
      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-16 sm:grid-cols-12 sm:gap-x-10 sm:gap-y-24">
        {data.gallery.map((g, i) => (
          <GalleryImage key={g.src} item={g} index={i} />
        ))}
      </div>
    </section>
  );
}

/* =================================== 11 =================================== */

export function Venue({ data }: { data: Invitation }) {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="relative mx-auto max-w-lg text-center">
        <svg
          viewBox="0 0 400 260"
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <Stem d="M12 246 C 18 180, 44 106, 118 46" width={1.4} duration={1.8} />
          <Stem d="M388 246 C 382 180, 356 106, 282 46" width={1.4} duration={1.8} delay={0.2} />
          <Leaf x={20} y={200} angle={-72} scale={0.42} delay={0.7} />
          <Leaf x={34} y={148} angle={-58} scale={0.36} delay={0.82} flip />
          <Leaf x={72} y={92} angle={-40} scale={0.42} delay={0.94} />
          <Leaf x={380} y={200} angle={252} scale={0.42} delay={0.75} />
          <Leaf x={366} y={148} angle={238} scale={0.36} delay={0.87} flip />
          <Leaf x={328} y={92} angle={220} scale={0.42} delay={0.99} />
          <Rose x={124} y={40} scale={0.72} delay={1.1} />
          <Rose x={276} y={40} scale={0.72} delay={1.2} rotate={18} />
          <Blossom x={196} y={22} scale={0.7} delay={1.35} />
          <Bud x={166} y={34} angle={-30} scale={0.55} delay={1.45} />
          <Bud x={234} y={34} angle={30} scale={0.55} delay={1.5} />
        </svg>

        <Reveal className="relative pt-14">
          <p className="eyebrow">The venue</p>
          <h3 className="display mt-6 text-[2rem] leading-tight text-ink sm:text-5xl">
            {data.venue.name}
          </h3>
          <p className="mt-5 text-sm font-light leading-7 tracking-wide text-muted-foreground">
            {data.venue.address}
            <br />
            {data.venue.city}
          </p>
          {data.venue.note && (
            <p className="mt-3 text-[0.78rem] font-light italic text-muted-foreground">
              {data.venue.note}
            </p>
          )}
          {data.venue.mapsUrl && (
            <a
              href={data.venue.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="eyebrow mt-9 inline-block border border-border px-7 py-3 text-ink transition-colors hover:border-champagne hover:text-champagne"
            >
              Get directions
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* =================================== 12 =================================== */

export function Rsvp({ data }: { data: Invitation }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState("1");
  const [note, setNote] = useState("");

  const field =
    "w-full border-0 border-b border-border bg-transparent px-0 py-3 text-sm font-light tracking-wide text-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-champagne";

  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="relative mx-auto max-w-md">
        <LeafBranch className="pointer-events-none absolute -left-8 -top-10 w-28 opacity-90 sm:-left-28 sm:w-40" />
        <LeafBranch
          className="pointer-events-none absolute -right-8 -bottom-12 w-28 opacity-90 sm:-right-28 sm:w-40"
          flip
          delay={0.2}
        />
        <Reveal className="relative text-center">
          <p className="eyebrow">Kindly reply</p>
          <h3 className="display mt-5 text-3xl text-ink sm:text-4xl">Will you join us?</h3>
        </Reveal>

        {sent ? (
          <Reveal className="relative mt-12 text-center">
            <Sprig className="mx-auto w-36" />
            <p className="display mt-6 text-2xl italic text-ink">Thank you, {name || "friend"}.</p>
            <p className="mt-3 text-sm font-light text-muted-foreground">
              Your reply has been noted with love.
            </p>
          </Reveal>
        ) : (
          <Reveal delay={0.15} className="relative">
            <form
              className="mt-12 space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label className="eyebrow text-[0.58rem]" htmlFor="rsvp-name">
                  Your name
                </label>
                <input
                  id="rsvp-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={field}
                  placeholder="Full name"
                />
              </div>

              <div>
                <span className="eyebrow text-[0.58rem]">Attending</span>
                <div className="mt-3 flex gap-3">
                  {(["yes", "no"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAttending(v)}
                      className={`flex-1 border px-4 py-3 text-[0.65rem] uppercase tracking-[0.25em] transition-colors ${
                        attending === v
                          ? "border-champagne bg-secondary/60 text-ink"
                          : "border-border text-muted-foreground hover:border-champagne/60"
                      }`}
                    >
                      {v === "yes" ? "Joyfully accept" : "Regretfully decline"}
                    </button>
                  ))}
                </div>
              </div>

              {attending === "yes" && (
                <div>
                  <label className="eyebrow text-[0.58rem]" htmlFor="rsvp-guests">
                    Number of guests
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    min={1}
                    max={12}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className={field}
                  />
                </div>
              )}

              <div>
                <label className="eyebrow text-[0.58rem]" htmlFor="rsvp-note">
                  A message for {data.groomName} &amp; {data.brideName}
                </label>
                <textarea
                  id="rsvp-note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={`${field} resize-none`}
                  placeholder="Write a few words…"
                />
              </div>

              <button
                type="submit"
                className="eyebrow w-full border border-border py-4 text-ink transition-colors hover:border-champagne hover:text-champagne"
              >
                Send reply
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ================================ 13 + 15 ================================= */

function Petals() {
  const off = useMotionOff();
  if (off) return null;
  const petals = [
    { x: "12%", d: 0, dur: 15 },
    { x: "32%", d: 4, dur: 18 },
    { x: "58%", d: 8, dur: 16 },
    { x: "78%", d: 2, dur: 20 },
    { x: "90%", d: 11, dur: 17 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute -top-8"
          style={{ left: p.x }}
          animate={{ y: ["0vh", "108vh"], x: [0, i % 2 ? 34 : -34, 0], rotate: [0, 220] }}
          transition={{
            duration: p.dur,
            delay: p.d,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 34 22" className="h-3 w-5 opacity-60">
            <path
              d="M0 11 C 9 0, 27 2, 33 11 C 27 20, 9 22, 0 11 Z"
              fill="var(--petal-mid)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

const socialIcons: Record<string, string> = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm5.6-1.3a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z",
  facebook: "M14 8.5V6.8c0-.7.2-1.1 1.2-1.1H17V3h-2.6C11.8 3 11 4.4 11 6.6v1.9H9V11h2v10h3V11h2.2l.3-2.5H14Z",
  youtube:
    "M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.7c.2.9.9 1.6 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12ZM10 15V9l5.2 3L10 15Z",
  whatsapp:
    "M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a12 12 0 0 1-5.6-4.8c-.4-.7-.9-1.6-.9-2.5s.5-1.4.7-1.6c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.5.9 1.1 1.5 2 2.1.5.3.7.3.9.1l.7-.8c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.2.1.6 0 1.5Z",
  phone:
    "M6.6 3h2.2l1.6 4-1.9 1.4a12 12 0 0 0 5.1 5.1L15 11.6l4 1.6v2.2c0 1-.8 1.8-1.8 1.6A15 15 0 0 1 5 6.8 1.7 1.7 0 0 1 6.6 3Z",
};

function IconLink({ kind, href, label }: { kind: string; href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-champagne hover:text-champagne"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
        <path d={socialIcons[kind]} />
      </svg>
    </a>
  );
}

export function Contacts({ contacts }: { contacts: { name?: string; phone: string; whatsapp_url?: string }[] }) {
  if (!contacts.length) return null;
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Contact</p>
        <div className="mx-auto mt-10 grid max-w-md gap-5 sm:grid-cols-2">
          {contacts.map((contact, index) => {
            const whatsapp = contact.whatsapp_url || `https://wa.me/${contact.phone.replace(/\D/g, "")}`;
            return <div key={`${contact.phone}-${index}`} className="border-y border-border px-4 py-7">
              {contact.name && <p className="display text-xl text-ink">{contact.name}</p>}
              <div className="mt-5 flex justify-center gap-5">
                <a href={`tel:${contact.phone}`} className="eyebrow border-b border-champagne pb-1 text-ink">Call</a>
                <a href={whatsapp} target="_blank" rel="noreferrer noopener" className="eyebrow border-b border-champagne pb-1 text-ink">WhatsApp</a>
              </div>
            </div>;
          })}
        </div>
      </Reveal>
    </section>
  );
}

export function Finale({ data }: { data: Invitation }) {
  const links: { kind: string; href: string; label: string }[] = [];
  if (data.contact.whatsapp)
    links.push({
      kind: "whatsapp",
      href: `https://wa.me/${data.contact.whatsapp.replace(/[^\d]/g, "")}`,
      label: "WhatsApp",
    });
  if (data.contact.phone)
    links.push({
      kind: "phone",
      href: `tel:${data.contact.phone.replace(/\s/g, "")}`,
      label: "Phone",
    });
  if (data.social.instagram)
    links.push({ kind: "instagram", href: data.social.instagram, label: "Instagram" });
  if (data.social.facebook)
    links.push({ kind: "facebook", href: data.social.facebook, label: "Facebook" });
  if (data.social.youtube)
    links.push({ kind: "youtube", href: data.social.youtube, label: "YouTube" });

  return (
    <section className="relative overflow-hidden px-6 pb-28 pt-24 sm:pt-32">
      <div className="relative mx-auto flex aspect-square w-full max-w-[26rem] items-center justify-center sm:max-w-lg">
        <Wreath className="pointer-events-none absolute inset-0 h-auto w-full" />
        <Reveal delay={1.4} className="relative z-10 px-10 text-center sm:px-16">
          <p className="eyebrow">{data.closing.kicker}</p>
          <h2 className="display mt-4 text-[1.9rem] leading-[1.12] tracking-[0.04em] text-ink sm:text-[2.9rem]">
            {data.groomName}
            <span className="mx-3 italic text-champagne">&amp;</span>
            {data.brideName}
          </h2>
          <div className="mx-auto my-5 flex items-center justify-center gap-3">
            <span className="hairline w-8" />
            <span className="h-1 w-1 rotate-45 bg-champagne" />
            <span className="hairline w-10" />
          </div>
          <p className="mx-auto max-w-[15rem] text-[0.62rem] sm:text-[0.7rem] uppercase leading-6 tracking-[0.24em] text-muted-foreground">
            {data.closing.thanks}
          </p>
          {links.length > 0 && (
            <div className="mt-7 flex items-center justify-center gap-2 sm:gap-3">
              {links.map((l) => (
                <IconLink key={l.kind} {...l} />
              ))}
            </div>
          )}
        </Reveal>
      </div>
      <Petals />
      <p className="relative mt-10 text-center text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/70">
        {data.date} · {data.venue.city}
      </p>
    </section>
  );
}
