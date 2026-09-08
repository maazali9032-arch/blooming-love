import type { ReactNode } from "react";
import type { PublicResponse } from "@/lib/public-invitation";

function Shell({ children }: { children: ReactNode }) {
  return <main className="paper grain flex min-h-screen items-center justify-center px-6 text-center"><div className="max-w-md">{children}</div></main>;
}

export function LoadingState() { return <Shell><p className="eyebrow">Preparing your invitation</p><p className="display mt-5 text-3xl text-ink">One moment, please</p></Shell>; }
export function NotFoundState() { return <Shell><p className="eyebrow">Invitation not found</p><p className="mt-5 text-sm font-light leading-7 text-muted-foreground">Please check the invitation link and try again.</p></Shell>; }
export function ErrorState({ retry }: { retry: () => void }) { return <Shell><p className="eyebrow">Unable to load invitation</p><p className="mt-5 text-sm font-light leading-7 text-muted-foreground">Please check your connection and try again.</p><button onClick={retry} className="eyebrow mt-8 border border-border px-6 py-3 text-ink">Try again</button></Shell>; }
export function FallbackState({ shop }: { shop: PublicResponse["shop"] }) {
  const details = [shop?.business_contact, shop?.phone, shop?.address, shop?.city].filter(Boolean);
  return <Shell><p className="eyebrow">Invitation unavailable</p><p className="display mt-5 text-3xl text-ink">This invitation is no longer available.</p>{shop?.name && <p className="mt-8 text-sm font-medium tracking-wide text-ink">{shop.name}</p>}{details.map((detail) => <p key={detail} className="mt-2 text-sm font-light text-muted-foreground">{detail}</p>)}</Shell>;
}
