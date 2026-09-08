import { useEffect, useRef, useState } from "react";

/**
 * Discreet, original ambient audio. Nothing autoplays with sound: the tones
 * are synthesised only after a deliberate user interaction.
 */
export function MusicToggle({ label = "Music" }: { label?: string }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscs: OscillatorNode[] } | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      nodesRef.current?.oscs.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* already stopped */
        }
      });
      void ctxRef.current?.close();
    };
  }, []);

  const start = () => {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = ctxRef.current ?? new Ctor();
    ctxRef.current = ctx;
    void ctx.resume();

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 2.5);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 0.018;
    lfo.connect(lfoGain).connect(gain.gain);
    lfo.start();

    // A soft, open Amaj9-ish pad.
    const oscs = [220, 277.18, 329.63, 415.3].map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = (i - 1.5) * 4;
      const g = ctx.createGain();
      g.gain.value = 0.25 / (i + 1);
      o.connect(g).connect(filter);
      o.start();
      return o;
    });

    filter.connect(gain).connect(ctx.destination);
    nodesRef.current = { gain, oscs: [...oscs, lfo] };
    setPlaying(true);
  };

  const stop = () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (!ctx || !nodes) return;
    nodes.gain.gain.cancelScheduledValues(ctx.currentTime);
    nodes.gain.gain.setValueAtTime(nodes.gain.gain.value, ctx.currentTime);
    nodes.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
    const oscs = nodes.oscs;
    window.setTimeout(() => {
      oscs.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* noop */
        }
      });
    }, 900);
    nodesRef.current = null;
    setPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={() => (playing ? stop() : start())}
      aria-pressed={playing}
      aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      className="fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/80 text-ink backdrop-blur-sm transition-colors hover:bg-card sm:bottom-8 sm:right-8"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.2}>
        {playing ? (
          <>
            <path d="M9 5v14M15 5v14" strokeLinecap="round" />
          </>
        ) : (
          <path d="M8 5.5v13l11-6.5-11-6.5Z" strokeLinejoin="round" />
        )}
      </svg>
      <span
        className={`pointer-events-none absolute inset-0 rounded-full border border-champagne/50 ${
          playing ? "animate-ping" : "opacity-0"
        }`}
        style={{ animationDuration: "3s" }}
      />
    </button>
  );
}
