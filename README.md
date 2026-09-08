# Blooming Love Story

BUILD — FLORAL BLOOM / GROWING VINE WEDDING INVITATION



Create a premium cinematic single-page digital wedding invitation centered around a living floral vine that grows and blooms as the visitor scrolls.



Use:



- React

- TypeScript

- Tailwind CSS

- Framer Motion / Motion

- SVG path animations

- CSS transforms and opacity



Build a real interactive webpage, not a static mockup.



Do NOT build an admin dashboard, authentication, database, SaaS or payment system.



---



CORE CONCEPT



The invitation begins almost completely empty.



A delicate hand-drawn vine starts growing from the edge of the screen.



As the visitor scrolls:



the vine grows → leaves appear → flowers bloom → each bloom reveals another part of the wedding invitation.



By the end, the vine has grown into a complete elegant floral composition framing the couple's final message/photo.



The experience should feel:



romantic + luxurious + organic + cinematic + sophisticated.



---



1. OPENING — BARE VINE



Start with a warm ivory/cream paper background.



Use subtle:



- paper texture

- soft natural lighting

- fine grain

- generous whitespace



Initially show only a small delicate vine stem.



The stem should draw itself progressively using SVG stroke animation.



Do NOT simply fade the vine into view.



It should visibly grow from one point.



---



2. FIRST FLOWER BLOOM



Once the initial stem reaches the center:



A flower bud appears.



Animate the flower opening using:



- scale

- rotation

- opacity

- individual petal timing



The flower should feel like it is actually blooming.



After the flower opens, reveal:



AHMED



&



AYESHA



14 DECEMBER 2026



Names should use elegant luxury serif/display typography.



The flower becomes the visual frame around the couple.



---



3. INVOCATION



Place a configurable invocation near the beginning.



Example:



بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ



But support:



- Allah

- Om

- Jesus

- Ram

- Custom

- None



Support Arabic, Urdu, Hindi, English and Unicode.



Support RTL correctly.



---



4. SCROLL = VINE GROWTH



This is the main interaction.



As the visitor scrolls down, the vine should continue growing through the page.



Use scroll-triggered SVG animation.



The sequence should feel continuous.



For example:



SECTION 1



Main stem grows.



SECTION 2



Branch grows outward.



SECTION 3



Leaves appear.



SECTION 4



Flower cluster blooms.



SECTION 5



Another branch grows around the event information.



SECTION 6



The vine travels toward the gallery.



FINAL SECTION



The entire vine connects into a completed wreath.



Do not make each section look disconnected.



The visitor should feel like they are following one continuously growing plant.



---



5. REAL SVG DRAWING



Use actual SVG paths.



Animate stems using:



- stroke-dasharray

- stroke-dashoffset

- pathLength



Animate leaves and flowers separately.



Suggested sequence:



1. stem draws

2. branch extends

3. leaf scales from 0 → 1

4. flower bud appears

5. petals rotate/open

6. flower reaches full size

7. content fades in



Stagger these animations naturally.



---



6. WEDDING MESSAGE



After the first major bloom, reveal:



Together with their families



AHMED & AYESHA



invite you to celebrate their special day



Surround the typography with delicate leaves and flowers.



Use generous whitespace.



---



7. COUNTDOWN



Create an elegant countdown:



DAYS · HOURS · MINUTES · SECONDS



As the visitor reaches this section, a small floral branch should grow around the countdown.



Do not use generic timer cards.



---



8. EVENTS



Reveal wedding events as new floral clusters bloom.



Example:



NIKAH



14 DECEMBER 2026

11:00 AM



Venue Name

Hyderabad



VIEW LOCATION



WALIMA



16 DECEMBER 2026

7:30 PM



Venue Name

Hyderabad



VIEW LOCATION



Support:



- event name

- date

- time

- venue

- address

- description

- Google Maps URL



Events should look like premium printed wedding stationery.



---



9. FLOWER VARIETY



Do not use one identical flower repeatedly.



Create a coherent botanical family containing variations such as:



- roses

- small blossoms

- leaves

- buds

- vines

- delicate branches



Keep the illustration style consistent.



The artwork should feel intentionally designed as one botanical composition.



---



10. PHOTOGRAPHY



Introduce photographs naturally into the growing vine.



Use:



- large editorial images

- botanical frames

- flowers overlapping image edges

- leaves partially covering corners

- subtle parallax

- gentle image zoom



Avoid a basic image grid.



Flowers can subtly bloom as each photograph enters the viewport.



---



11. VENUE



Create a dedicated venue section framed by a growing branch.



Display:



VENUE NAME



Address

Hyderabad



GET DIRECTIONS



Open the configured Google Maps URL.



---



12. RSVP



Create an elegant RSVP section.



Fields:



- Name

- Attending / Not attending

- Number of guests

- Message



The form should visually belong to the floral invitation.



---



13. CONTACT / SOCIAL



Support:



- WhatsApp

- Phone

- Instagram

- Facebook

- YouTube



Only display configured links.



Use minimal elegant icons.



---



14. MUSIC



Support optional background music.



Do not force autoplay with sound.



Use the initial user interaction to enable audio.



Provide a discreet play/pause control.



Do not use copyrighted audio from the reference.



---



15. FINAL BLOOM — VISUAL CLIMAX



The final section should be the biggest visual payoff.



As the visitor reaches the bottom:



- the main vine continues growing

- branches spread outward

- leaves appear

- multiple flowers bloom

- smaller buds open

- the composition gradually becomes a complete wreath



Then reveal in the center:



WITH LOVE



AHMED & AYESHA



THANK YOU FOR CELEBRATING WITH US



Below:



RSVP / WhatsApp / Contact



The completed floral wreath should frame the final content beautifully.



Add extremely subtle floating petals afterward.



Do not make the petals excessive or distracting.



---



16. VISUAL STYLE



Use an elegant botanical wedding palette:



- warm ivory

- cream

- muted sage/green

- soft floral tones

- champagne/gold accents

- dark botanical details



Keep the colors sophisticated and slightly muted.



Avoid:



- neon colors

- generic gradients

- SaaS styling

- cartoon flowers

- excessive shadows

- excessive rounded cards

- cheap particle effects



---



17. MOBILE FIRST



Primary target:



360–430px portrait.



The vine must intelligently adapt to narrow screens.



Do not allow artwork to:



- clip

- cause horizontal scrolling

- cover important text

- become excessively dense



On desktop, allow the vine to expand naturally around a wider composition.



---



18. PERFORMANCE



Use performant SVG and Motion animations.



Avoid hundreds of simultaneously animated DOM elements.



Use:



- transform

- opacity

- SVG stroke animation



where possible.



Lazy-load photography.



Respect:



"prefers-reduced-motion"



When enabled, simplify the growth/bloom animations.



---



19. CONTENT DATA



Keep all wedding content centralized:



const invitation = {

  brideName: "Ayesha",

  groomName: "Ahmed",

  date: "14 December 2026",

  invocation: {},

  events: [],

  venue: {},

  gallery: [],

  contact: {},

  social: {}

};



The components must consume this data rather than hardcoding wedding details throughout the page.



---



FINAL QUALITY BAR



The visitor should feel like they are watching a beautiful botanical wedding illustration come alive while exploring the invitation.



The vine growth and flower blooming are the hero features.



The final state should look like a completed luxury floral wedding card.



Prioritize:



1. Quality of botanical artwork

2. Real SVG growth animation

3. Flower bloom choreography

4. Scroll storytelling

5. Typography

6. Mobile experience

7. Performance



Build ONLY the complete single-page invitation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7c7354fa-1280-4dc0-877b-f149dbeec8b7).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
