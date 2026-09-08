import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export type InvocationPreset = "allah" | "om" | "jesus" | "ram" | "custom" | "none";

export type Invitation = {
  brideName: string;
  groomName: string;
  date: string;
  dateISO: string;
  tagline: string;
  invocation: {
    preset: InvocationPreset;
    text: string;
    translation?: string;
    lang: string;
    dir: "rtl" | "ltr";
  };
  message: {
    intro: string;
    body: string;
  };
  events: {
    id: string;
    name: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    city: string;
    description?: string;
    mapsUrl?: string;
  }[];
  venue: {
    name: string;
    address: string;
    city: string;
    note?: string;
    mapsUrl?: string;
  };
  gallery: { src: string; alt: string; width: number; height: number }[];
  contact: {
    phone?: string;
    whatsapp?: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  music?: {
    enabled: boolean;
    src?: string;
    title?: string;
  };
  closing: {
    kicker: string;
    thanks: string;
  };
};

export const invitation: Invitation = {
  brideName: "Ayesha",
  groomName: "Ahmed",
  date: "14 December 2026",
  dateISO: "2026-12-14T11:00:00+05:30",
  tagline: "Two families, one garden, a lifetime of blooming",
  invocation: {
    preset: "allah",
    text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful",
    lang: "ar",
    dir: "rtl",
  },
  message: {
    intro: "Together with their families",
    body: "invite you to celebrate their special day",
  },
  events: [
    {
      id: "nikah",
      name: "Nikah",
      date: "14 December 2026",
      time: "11:00 AM",
      venue: "Falaknuma Garden Hall",
      address: "Road No. 12, Banjara Hills",
      city: "Hyderabad",
      description: "The solemnisation, followed by lunch in the courtyard.",
      mapsUrl: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    },
    {
      id: "walima",
      name: "Walima",
      date: "16 December 2026",
      time: "7:30 PM",
      venue: "The Ivory Courtyard",
      address: "Necklace Road, Khairatabad",
      city: "Hyderabad",
      description: "An evening reception under the lanterns.",
      mapsUrl: "https://maps.google.com/?q=Necklace+Road+Hyderabad",
    },
  ],
  venue: {
    name: "Falaknuma Garden Hall",
    address: "Road No. 12, Banjara Hills",
    city: "Hyderabad",
    note: "Valet parking available at the east gate",
    mapsUrl: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
  },
  gallery: [
    { src: gallery1, alt: "Ahmed and Ayesha at golden hour", width: 1024, height: 1280 },
    { src: gallery2, alt: "Henna and ring detail on ivory silk", width: 1280, height: 960 },
    { src: gallery3, alt: "Ayesha in the garden", width: 1024, height: 1280 },
    { src: gallery4, alt: "The couple walking through the courtyard", width: 1280, height: 960 },
  ],
  contact: {
    phone: "+91 98490 00000",
    whatsapp: "+919849000000",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
  music: {
    enabled: true,
    title: "A quiet garden",
  },
  closing: {
    kicker: "With love",
    thanks: "Thank you for celebrating with us",
  },
};

export const invocationPresets: Record<
  Exclude<InvocationPreset, "custom" | "none">,
  { text: string; translation?: string; lang: string; dir: "rtl" | "ltr" }
> = {
  allah: {
    text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful",
    lang: "ar",
    dir: "rtl",
  },
  om: { text: "॥ ॐ श्री गणेशाय नमः ॥", lang: "hi", dir: "ltr" },
  jesus: { text: "In the name of the Father, the Son and the Holy Spirit", lang: "en", dir: "ltr" },
  ram: { text: "॥ श्री राम जय राम जय जय राम ॥", lang: "hi", dir: "ltr" },
};
