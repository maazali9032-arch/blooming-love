import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useScroll } from "motion/react";
import { invitation } from "@/data/invitation";
import { VineSpine } from "@/components/vine-spine";
import { MusicToggle } from "@/components/music-toggle";
import {
  Countdown,
  Events,
  Finale,
  Gallery,
  Hero,
  Message,
  Rsvp,
  Venue,
} from "@/components/sections";

const title = `${invitation.groomName} & ${invitation.brideName} · ${invitation.date}`;
const description = `${invitation.message.intro}, ${invitation.groomName} and ${invitation.brideName} invite you to their wedding on ${invitation.date} in ${invitation.venue.city}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <main ref={ref} className="paper grain relative w-full overflow-x-clip">
      <VineSpine progress={scrollYProgress} />
      <div className="relative z-10">
        <Hero data={invitation} />
        <Message data={invitation} />
        <Countdown data={invitation} />
        <Events data={invitation} />
        <Gallery data={invitation} />
        <Venue data={invitation} />
        <Rsvp data={invitation} />
        <Finale data={invitation} />
      </div>
      {invitation.music?.enabled && <MusicToggle label={invitation.music.title ?? "Music"} />}
    </main>
  );
}
