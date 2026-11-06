/**
 * ============================================================================
 *  TIDEWARD — SITE & BUSINESS CONFIGURATION
 *  Single source of truth for the page, footer, structured data (JSON-LD),
 *  sitemap and canonical URLs.
 * ============================================================================
 *
 *  - `null` means "not provided yet". Required items show a marked placeholder
 *    on the page and are listed when you run `node build.mjs`.
 *  - `STRICT=1 node build.mjs` fails while required launch items are missing.
 *  - Nothing here is invented. Never add private data (EIN, home address).
 * ============================================================================
 */

export default {
  site: {
    url: 'https://tideward.netlify.app', // no trailing slash
    googleSiteVerification: null, // Search Console HTML-tag "content" value
    locale: 'en_US',
    language: 'en-US',
  },

  business: {
    legalName: null, // PRIVATE — schema only, and only if different from publicName
    publicName: 'Tideward',
    tagline: 'Solo & Self-Directed 401(k) Plan Support',
    publicNameConfirmed: false, // true once the Fictitious Business Name is filed (San Diego County)
    owner: null, // optional
    foundingYear: null,

    phone: '(858) 225-5674',
    phoneE164: '+18582255674',
    email: null, // optional — hidden until set; visitors use the contact form

    /**
     * "office": a staffed storefront office that receives clients during the
     * posted hours (Google Business Profile "Local store"). The address shows
     * on the site, the map appears and storefront schema is output ONLY once
     * streetAddress and postalCode are real. Until then, marked placeholders.
     */
    locationType: 'office',
    address: {
      streetAddress: '6920 Miramar Rd #318', // real, staffed office
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      postalCode: '92121',
      addressCountry: 'US',
    },
    geo: null, // real coordinates of the office only
    serviceArea: ['San Diego, CA'],

    hours: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
    ],
    hoursNote: 'Office meetings by appointment.',
    timeZoneLabel: 'Pacific Time',

    sameAs: [],
  },

  /** All confirmed by the owner. */
  services: {
    education: { offered: true },
    solo401k: { offered: true },
    planSetup: { offered: true },
    filing: { offered: true },
    recordkeeping: { offered: true },
    ongoing: { offered: true },
    consultation: { offered: true },
  },

  team: [],
  about: { story: null, professionalBackground: null },
  form: { name: 'consultation' },
  analytics: { plausibleDomain: null },

  /** MEDIA — self-hosted, people-free imagery in src/assets/media/. */
  media: {
    // Pexels video 20018409 — aerial over Mission Bay, San Diego (Pexels License)
    heroVideo: { webm: '/assets/media/hero.webm', mp4: '/assets/media/hero.mp4', poster: '/assets/media/hero-poster.webp' },
    // Stock photos from Pexels (Pexels License), no identifiable people — sources in docs/MEDIA.md
    images: {
      city: { src: '/assets/media/city.webp', pos: '50% 55%', alt: 'Downtown San Diego skyline and marina at dusk' },
      records: { src: '/assets/media/records.webp', pos: '50% 50%', alt: 'Open planner, folders and a laptop on a white desk' },
      street: { src: '/assets/media/street.webp', pos: '50% 55%', alt: 'San Diego skyline reflected in the bay at night' },
    },
  },
};
