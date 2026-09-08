export type PublicContact = { name?: string; phone?: string; whatsapp_url?: string };

export type PublicEvent = {
  id?: string;
  name?: string;
  title?: string;
  event_name?: string;
  date?: string;
  event_date?: string;
  time?: string;
  start_time?: string;
  venue?: string;
  venue_name?: string;
  city?: string;
  maps_url?: string;
  mapsUrl?: string;
  note?: string;
  description?: string;
};

export type PublicGalleryItem = string | {
  url?: string;
  src?: string;
  image_url?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type PublicInvitationContent = {
  groom_name?: string;
  bride_name?: string;
  invocation?: string;
  wedding_date?: string;
  start_time?: string;
  end_time?: string;
  events?: PublicEvent[];
  venue_name?: string;
  venue_address?: string;
  city?: string;
  maps_url?: string;
  venue_image_url?: string;
  gallery?: PublicGalleryItem[];
  music_enabled?: boolean;
  music_url?: string;
  contacts?: PublicContact[];
};

export type PublicResponse = {
  state?: "live" | "fallback" | "not_found";
  invitation?: { public_url?: string };
  content?: PublicInvitationContent;
  shop?: { name?: string; phone?: string; whatsapp?: string; address?: string; city?: string; business_contact?: string };
};

const text = (value: unknown) => typeof value === "string" ? value.trim() : "";
const record = (value: unknown): Record<string, unknown> | undefined =>
  value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : undefined;

export function slugFromPathname(pathname: string): string | null {
  const segment = pathname.split("/").filter(Boolean).at(-1);
  if (!segment) return null;
  try {
    const slug = decodeURIComponent(segment).trim();
    return slug && !/[\\/]/.test(slug) ? slug : null;
  } catch {
    return null;
  }
}

export async function fetchPublicInvitation(slug: string): Promise<PublicResponse> {
  const url = text(import.meta.env.VITE_SUPABASE_URL).replace(/\/$/, "");
  const key = text(import.meta.env.VITE_SUPABASE_ANON_KEY);
  if (!url || !key) throw new Error("Public invitation service is not configured.");

  const response = await fetch(`${url}/rest/v1/rpc/get_public_invitation_content`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ p_slug: slug }),
  });
  if (!response.ok) throw new Error("Could not load the invitation.");

  const body: unknown = await response.json();
  const outer = record(body);
  const normalized = record(outer?.data) ?? outer;
  if (!normalized) throw new Error("Invalid invitation response.");
  return normalized as PublicResponse;
}

export function validContacts(value: unknown): PublicContact[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 2).flatMap((item) => {
    const contact = record(item);
    const phone = text(contact?.phone);
    return phone ? [{ name: text(contact?.name) || undefined, phone, whatsapp_url: text(contact?.whatsapp_url) || undefined }] : [];
  });
}
