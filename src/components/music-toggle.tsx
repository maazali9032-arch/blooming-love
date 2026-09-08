import { useEffect, useRef, useState } from "react";

/** Music is only started after a visitor deliberately presses this control. */
export function MusicToggle({ label = "Music", src }: { label?: string; src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.addEventListener("ended", () => setPlaying(false));
    audio.addEventListener("error", () => setPlaying(false));
    audioRef.current = audio;
    return () => { audio.pause(); audioRef.current = null; };
  }, [src]);

  if (!src) return null;
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); return; }
    try { await audio.play(); setPlaying(true); } catch { setPlaying(false); }
  };

  return <button type="button" onClick={() => void toggle()} aria-pressed={playing}
    aria-label={playing ? `Pause ${label}` : `Play ${label}`}
    className="fixed bottom-5 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/80 text-ink backdrop-blur-sm transition-colors hover:bg-card sm:bottom-8 sm:right-8">
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.2}>
      {playing ? <path d="M9 5v14M15 5v14" strokeLinecap="round" /> : <path d="M8 5.5v13l11-6.5-11-6.5Z" strokeLinejoin="round" />}
    </svg>
  </button>;
}
