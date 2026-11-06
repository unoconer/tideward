// Shared helpers: escaping, placeholders, media, schema and UI components.
import config from '../site.config.mjs';

export const cfg = config;
export const B = config.business;
export const SITE = config.site.url.replace(/\/$/, '');
export const absUrl = (p) => SITE + p;
export const OG_IMAGE = () => `${SITE}/assets/img/og-image.png`;

/** Placeholders reported by the build. */
export const missing = new Set();

export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function ph(value, label) {
  if (value !== null && value !== undefined && value !== '') return esc(value);
  missing.add(label);
  return `<span class="placeholder" title="Must be completed before launch">[${esc(label)}]</span>`;
}

// ------------------------------------------------------------------ media
/**
 * Image slot. Renders the configured image, or a designed fallback panel
 * (never a broken image) when no file has been supplied yet.
 */
export function mediaImg(key, { cls = '', eager = false, label = '', decorative = false } = {}) {
  const m = config.media.images[key];
  if (m?.src) {
    return `<img class="${cls}"${m.pos ? ` style="object-position:${esc(m.pos)}"` : ''} src="${esc(m.src)}" alt="${decorative ? '' : esc(m.alt)}" width="1600" height="1067" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  }
  return `<div class="${cls} media-fallback" role="presentation"><span class="media-fallback__mark">${markGlyph()}</span>${label ? `<span class="media-fallback__label">${esc(label)}</span>` : ''}</div>`;
}
const markGlyph = () =>
  '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="20.5" fill="none" stroke="currentColor" stroke-width="1"/><path d="M16 14v20M32 14v20M16 24h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

export function heroVideo() {
  const v = config.media.heroVideo;
  if (!v.mp4 && !v.webm) {
    return v.poster ? `<img class="hero__poster hero__poster--still" src="${esc(v.poster)}" alt="" width="1920" height="1080" fetchpriority="high" decoding="async">` : '';
  }
  // Sources are attached by JS only on larger screens without reduced-motion or
  // data-saver, so phones download just the lightweight poster image.
  return `${v.poster ? `<img class="hero__poster" src="${esc(v.poster)}" alt="" width="1280" height="720" fetchpriority="high" decoding="async">` : ''}
  <video class="hero__video" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" data-hero-video${v.webm ? ` data-webm="${esc(v.webm)}"` : ''}${v.mp4 ? ` data-mp4="${esc(v.mp4)}"` : ''}></video>`;
}

// ------------------------------------------------------------------ services
export const SERVICES = [
  { key: 'planSetup', id: 'plan-setup', title: 'Plan Setup', icon: 'check', group: 'admin',
    short: 'We walk through setup with you and the plan provider you choose — adoption paperwork, the plan’s EIN and plan-titled accounts — so the plan starts on solid footing.' },
  { key: 'recordkeeping', id: 'records', title: 'Records & Valuations', icon: 'layers', group: 'admin',
    short: 'Contributions logged by type and date, every transaction recorded, and year-end values documented for each plan asset.' },
  { key: 'filing', id: 'form-5500-ez', title: 'Form 5500-EZ', icon: 'doc', group: 'admin',
    short: 'When your one-participant plan crosses the filing threshold, we prepare the annual return from your records for you to review and sign.' },
  { key: 'ongoing', id: 'ongoing', title: 'Year-Round Support', icon: 'shield', group: 'admin',
    short: 'Deadline reminders and a direct line for questions as your business and your plan change.' },
  { key: 'education', id: 'self-directed-education', title: 'Self-Directed 401(k) Education', icon: 'book', group: 'education',
    short: 'What self-direction permits, what it prohibits, and the duties it brings.' },
  { key: 'solo401k', id: 'solo-401k-education', title: 'Solo 401(k) Education', icon: 'person', group: 'education',
    short: 'Eligibility, both contribution roles, Roth choices and annual filing.' },
  { key: 'consultation', id: 'meetings', title: 'Office Meetings', icon: 'chat', group: 'education',
    short: 'Sit down with us at our San Diego office, by appointment.' },
].filter((s) => config.services[s.key]?.offered);

// ------------------------------------------------------------------ icons
export const ICONS = {
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  scale: '<path d="M12 3v18M7 21h10M5 7h14"/><path d="m5 7-3 7a3 3 0 0 0 6 0L5 7ZM19 7l-3 7a3 3 0 0 0 6 0l-3-7Z"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  shield: '<path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z"/>',
  chat: '<path d="M4 5h16v11H8l-4 4V5Z"/><path d="M8 9h8M8 12h5"/>',
  home: '<path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10M10 20v-6h4v6"/>',
  coins: '<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.7-2.7-3-6-3"/>',
  handshake: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 14 2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a3.6 3.6 0 0 1 4.5-.5L18 7l3 1v7h-2"/><path d="M3 8l3-1 2 1 3 3"/><path d="M3 8v7h2l4 4a1.4 1.4 0 0 0 2-2"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
  gem: '<path d="M6 3h12l3 6-9 12L3 9l3-6Z"/><path d="M3 9h18M9 3l3 18 3-18"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  growth: '<path d="M3 20h18"/><path d="M5 16l5-5 4 3 6-7"/><path d="M15 7h5v5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  doc: '<path d="M14 3H6v18h12V7l-4-4Z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  alert: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17h.01"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

// ------------------------------------------------------------------ contact
export const phoneHref = () => `tel:${B.phoneE164}`;
export const phoneHtml = () => (B.phone ? `<a href="${phoneHref()}">${esc(B.phone)}</a>` : ph(null, 'Business phone — to be provided'));
export const emailHtml = () => (B.email ? `<a href="mailto:${esc(B.email)}">${esc(B.email)}</a>` : '');
export const showAddress = () => B.locationType === 'office';
export const addressHtml = () =>
  `${ph(B.address.streetAddress, 'Street address — to be provided')}<br>${esc(B.address.addressLocality)}, ${esc(B.address.addressRegion)} ${ph(B.address.postalCode, 'ZIP')}`;

const fmtTime = (t) => {
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};
const DAY = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };
const shortTime = (t) => { const [h, m] = t.split(':').map(Number); return `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''}`; };
/** e.g. "Mon–Fri 9–5 PT" */
export function hoursShort() {
  if (!B.hours?.length) return '';
  const h = B.hours[0];
  const days = h.days.length > 1 ? `${DAY[h.days[0]]}–${DAY[h.days[h.days.length - 1]]}` : DAY[h.days[0]];
  const tz = { 'Pacific Time': ' PT', 'Mountain Time': ' MT', 'Central Time': ' CT', 'Eastern Time': ' ET' }[B.timeZoneLabel] || '';
  return `${days} ${shortTime(h.opens)}–${shortTime(h.closes)}${tz}`;
}
export function hoursHtml() {
  const note = B.hoursNote ? `<p class="muted">${esc(B.hoursNote)}</p>` : '';
  if (!B.hours?.length) return `<p>${ph(null, 'Business hours — to be provided')}</p>${note}`;
  const rows = B.hours
    .map((h) => {
      const d = h.days.length > 2 ? `${h.days[0]} – ${h.days[h.days.length - 1]}` : h.days.join(' & ');
      return `<tr><th scope="row">${esc(d)}</th><td>${fmtTime(h.opens)} – ${fmtTime(h.closes)}</td></tr>`;
    })
    .join('');
  return `<table class="hours"><caption class="sr-only">Business hours (${esc(B.timeZoneLabel || 'local time')})</caption>${rows}</table>${note}`;
}

// ------------------------------------------------------------------ schema
export const ORG_ID = `${SITE}/#organization`;
export function organizationSchema() {
  const local = showAddress() && B.address.streetAddress && B.address.postalCode;
  const o = {
    '@type': local ? ['Organization', 'ProfessionalService'] : 'Organization',
    '@id': ORG_ID,
    name: B.publicName,
    url: SITE + '/',
    logo: `${SITE}/assets/img/logo.png`,
    image: OG_IMAGE(),
    description: 'Solo and self-directed 401(k) plan support in San Diego, California — plan setup, records and valuations, Form 5500-EZ preparation, year-round support and plain-English education.',
    areaServed: B.serviceArea.map((n) => ({ '@type': 'City', name: n })),
    knowsAbout: ['Self-Directed 401(k)', 'Solo 401(k)', 'Form 5500-EZ', 'Retirement plan administration', 'Prohibited transaction rules'],
  };
  if (B.legalName && B.legalName !== B.publicName) o.legalName = B.legalName;
  if (B.phoneE164) o.telephone = B.phoneE164;
  if (B.email) o.email = B.email;
  if (B.foundingYear) o.foundingDate = String(B.foundingYear);
  if (B.sameAs?.length) o.sameAs = B.sameAs;
  if (local) {
    o.address = { '@type': 'PostalAddress', ...B.address };
    if (B.geo) o.geo = { '@type': 'GeoCoordinates', ...B.geo };
    if (B.hours?.length)
      o.openingHoursSpecification = B.hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes }));
  }
  return o;
}
export const websiteSchema = () => ({ '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE + '/', name: B.publicName, inLanguage: cfg.site.language, publisher: { '@id': ORG_ID } });
export const breadcrumbSchema = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absUrl(c.path) })),
});
export const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })),
});

// ------------------------------------------------------------------ UI
export function faqList(faqs, level = 3) {
  return `<div class="faq">${faqs
    .map((f) => `<details class="faq__item"><summary><h${level} class="faq__q">${esc(f.q)}</h${level}><span class="faq__icon" aria-hidden="true"></span></summary><div class="faq__a">${f.a}</div></details>`)
    .join('')}</div>`;
}

export function ctaBand({ heading, text, button = 'Request a Meeting', href = '/#contact' }) {
  return `<section class="cta" aria-labelledby="cta-h">
  <div class="cta__media">${mediaImg('street', { cls: 'cta__img', decorative: true })}</div>
  <div class="container cta__inner">
    <div>
      <p class="kicker kicker--light">San Diego, California</p>
      <h2 id="cta-h">${heading}</h2>
      <p>${text}</p>
    </div>
    <div class="cta__actions">
      <a class="btn btn--accent btn--lg" href="${href}">${button}</a>
      ${B.phone ? `<a class="cta__phone" href="${phoneHref()}">${icon('phone')}<span>Or call ${esc(B.phone)}</span></a>` : ''}
    </div>
  </div>
</section>`;
}

export function pageHero({ kicker, title, lead, crumbs, image, aside = '' }) {
  const bc = crumbs
    ? `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs
        .map((c, i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${c.path}">${esc(c.name)}</a></li>`))
        .join('')}</ol></nav>`
    : '';
  return `<section class="phero${image ? ' phero--image' : ''}">
  ${image ? `<div class="phero__media">${mediaImg(image, { cls: 'phero__img', eager: true, decorative: true })}</div>` : ''}
  <div class="container phero__inner${aside ? ' phero__inner--aside' : ''}">
    <div>
      ${bc}
      ${kicker ? `<p class="kicker kicker--light">${kicker}</p>` : ''}
      <h1>${title}</h1>
      ${lead ? `<p class="phero__lead">${lead}</p>` : ''}
    </div>
    ${aside ? `<div class="phero__aside">${aside}</div>` : ''}
  </div>
</section>`;
}

/** Article table of contents + body wrapper for long-form guides. */
export function guideLayout(sections, body, { cta = true } = {}) {
  return `<div class="container guide">
  <aside class="guide__toc" aria-label="On this page">
    <p class="guide__toc-h">On this page</p>
    <ol>${sections.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol>
    ${cta ? `<div class="guide__toc-cta"><p>Questions about your situation?</p><a class="btn btn--accent btn--sm" href="/#contact">Request a Meeting</a></div>` : ''}
  </aside>
  <article class="guide__body prose">${body}</article>
</div>`;
}

export const callout = (html, kind = 'info') =>
  `<div class="callout callout--${kind}">${icon(kind === 'warn' ? 'alert' : 'shield', 'callout__icon')}<div>${html}</div></div>`;
