import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useScroll, motion } from "motion/react";
import type { Invitation } from "@/data/invitation";
import { VineSpine } from "@/components/vine-spine";
import { MusicToggle } from "@/components/music-toggle";
import { Contacts, Countdown, Events, Finale, Gallery, Hero, Venue } from "@/components/sections";
import { ErrorState, FallbackState, LoadingState, NotFoundState } from "@/components/invitation-state";
import { fetchPublicInvitation, slugFromPathname, validContacts, type PublicInvitationContent, type PublicResponse } from "@/lib/public-invitation";

type PageState =
  | { kind: "loading" }
  | { kind: "error" }
  | { kind: "not_found" }
  | { kind: "fallback"; shop: PublicResponse["shop"] }
  | { kind: "live"; content: PublicInvitationContent; shop?: PublicResponse["shop"] };

const string = (value: unknown) => typeof value === "string" ? value.trim() : "";
const object = (value: unknown): Record<string, unknown> | undefined => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;

function toInvitation(content: PublicInvitationContent): Invitation {
  const gallery = Array.isArray(content.gallery) ? content.gallery.flatMap((item, index) => {
    const itemObject = object(item);
    const src = string(typeof item === "string" ? item : itemObject?.url ?? itemObject?.src ?? itemObject?.image_url);
    return src ? [{ src, alt: string(itemObject?.alt ?? itemObject?.caption), width: typeof itemObject?.width === "number" ? itemObject.width : 800, height: typeof itemObject?.height === "number" ? itemObject.height : 1000 }] : [];
  }) : [];
  const venueImage = string(content.venue_image_url);
  if (venueImage) gallery.push({ src: venueImage, alt: string(content.venue_name), width: 1200, height: 800 });

  const events = Array.isArray(content.events) ? content.events.flatMap((item, index) => {
    const event = object(item);
    const name = string(event?.name ?? event?.title ?? event?.event_name);
    if (!name) return [];
    const description = string(event?.note ?? event?.description);
    const mapsUrl = string(event?.maps_url ?? event?.mapsUrl);
    return [{ id: string(event?.id) || `${name}-${index}`, name, date: string(event?.date ?? event?.event_date), time: string(event?.time ?? event?.start_time), venue: string(event?.venue ?? event?.venue_name), address: "", city: string(event?.city), ...(description ? { description } : {}), ...(mapsUrl ? { mapsUrl } : {}) }];
  }) : [];

  const date = string(content.wedding_date);
  const time = string(content.start_time);
  const timestamp = Date.parse(`${date} ${time}`);
  const mapsUrl = string(content.maps_url);
  const musicUrl = string(content.music_url);
  return {
    groomName: string(content.groom_name), brideName: string(content.bride_name), date,
    dateISO: Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : "",
    tagline: "",
    invocation: { preset: content.invocation ? "custom" : "none", text: string(content.invocation), lang: "en", dir: "ltr" },
    message: { intro: "", body: "" }, events,
    venue: { name: string(content.venue_name), address: string(content.venue_address), city: string(content.city), ...(mapsUrl ? { mapsUrl } : {}) },
    gallery, contact: {}, social: {},
    music: { enabled: content.music_enabled === true, ...(musicUrl ? { src: musicUrl } : {}), title: "Music" },
    closing: { kicker: "With love", thanks: "Thank you for celebrating with us" },
  };
}

export const Route = createFileRoute("/$slug")({ component: PublicInvitationRoute });

function PublicInvitationRoute() {
  const [state, setState] = useState<PageState>({ kind: "loading" });
  const reload = () => {
    const slug = slugFromPathname(window.location.pathname);
    if (!slug) { setState({ kind: "not_found" }); return; }
    setState({ kind: "loading" });
    void fetchPublicInvitation(slug).then((data) => {
      if (data.state === "live" && object(data.content)) setState({ kind: "live", content: data.content!, shop: data.shop });
      else if (data.state === "fallback") setState({ kind: "fallback", shop: data.shop ?? {} });
      else setState({ kind: "not_found" });
    }).catch(() => setState({ kind: "error" }));
  };
  useEffect(() => { reload(); }, []);

  if (state.kind === "loading") return <LoadingState />;
  if (state.kind === "error") return <ErrorState retry={reload} />;
  if (state.kind === "not_found") return <NotFoundState />;
  if (state.kind === "fallback") return <FallbackState shop={state.shop} />;
  return <LiveInvitation content={state.content} shop={state.shop} />;
}

function FloatingShopShowcase({ shopName }: { shopName?: string }) {
  if (!shopName) return null;
  
  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-background/50 backdrop-blur-sm pointer-events-none border-t border-champagne/10 overflow-hidden h-6 flex items-center">
      <motion.div
        className="flex whitespace-nowrap min-w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
      >
        {[...Array(20)].map((_, i) => (
          <span key={i} className="text-[0.55rem] uppercase tracking-[0.2em] text-ink/70 mx-8">
            {shopName}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function LiveInvitation({ content, shop }: { content: PublicInvitationContent, shop?: PublicResponse["shop"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const data = useMemo(() => toInvitation(content), [content]);
  const contacts = validContacts(content.contacts);
  const countdownIsValid = Boolean(data.dateISO && new Date(data.dateISO).getTime() > Date.now());
  const hasVenue = Boolean(data.venue.name || data.venue.address || data.venue.city);

  return <main ref={ref} className="paper grain relative w-full overflow-x-clip pb-6">
    <VineSpine progress={scrollYProgress} />
    <div className="relative z-10">
      <Hero data={data} />
      {countdownIsValid && <Countdown data={data} />}
      {data.events.length > 0 && <Events data={data} />}
      {data.gallery.length > 0 && <Gallery data={data} />}
      {hasVenue && <Venue data={data} />}
      <Contacts contacts={contacts} />
      <Finale data={data} />
    </div>
    {data.music?.enabled && <MusicToggle label="Music" src={data.music.src} />}
    <FloatingShopShowcase shopName={shop?.name} />
  </main>;
}
