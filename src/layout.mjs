import { markSvg } from './brand.mjs';
import { cfg, B, SITE, esc, absUrl, OG_IMAGE, organizationSchema, websiteSchema, breadcrumbSchema, phoneHtml, phoneHref, emailHtml, hoursShort, showAddress, addressHtml, SERVICES, icon } from './lib.mjs';

const NAV = [
  { name: 'Services', path: '/#services' },
  { name: 'How It Works', path: '/#process' },
  { name: '401(k) Basics', path: '/#learn' },
  { name: 'FAQ', path: '/#faq' },
  { name: 'About', path: '/#about' },
];

const logo = (id, cls = '') => `<a class="brand ${cls}" href="/" aria-label="${esc(B.publicName)} — home">
  ${markSvg(id)}
  <span class="brand__text"><span class="brand__name">Tideward</span><span class="brand__sub">401(k) Plan Support</span></span>
</a>`;

function header(path) {
  return `<a class="skip" href="#main">Skip to main content</a>
<div class="topbar">
  <div class="container topbar__inner">
    <p>${icon('pin')}<span>Serving ${esc(B.serviceArea.join(' · '))}</span></p>
    <p class="topbar__right">${B.phone ? `<a href="${phoneHref()}">${icon('phone')}<span>${esc(B.phone)}</span></a>` : ''}<span class="topbar__sep" aria-hidden="true"></span><span>${hoursShort()}</span></p>
  </div>
</div>
<header class="header" data-header>
  <div class="container header__inner">
    ${logo('tw-h')}
    <button class="nav-btn" type="button" aria-expanded="false" aria-controls="nav" data-nav-toggle><span class="sr-only">Menu</span><span class="nav-btn__lines" aria-hidden="true"></span></button>
    <nav class="nav" id="nav" aria-label="Primary">
      <ul>${NAV.map((n) => `<li><a href="${n.path}">${n.name}</a></li>`).join('')}</ul>
      <div class="nav__cta">
        ${B.phone ? `<a class="nav__phone" href="${phoneHref()}">${icon('phone')}<span>${esc(B.phone)}</span></a>` : ''}
        <a class="btn btn--accent btn--sm" href="/#contact">Request a Meeting</a>
      </div>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="footer">
  <div class="container footer__top">
    <div class="footer__brand">
      ${logo('tw-f', 'brand--light')}
      <p>${esc(B.tagline)} for business owners and self-employed professionals in ${esc(B.serviceArea.join(' & '))}.</p>
      ${B.phone ? `<a class="btn btn--outline-light btn--sm" href="${phoneHref()}">${icon('phone')} ${esc(B.phone)}</a>` : ''}
    </div>
    <nav aria-label="Footer — on this site">
      <h2 class="footer__h">On this site</h2>
      <ul>${NAV.map((n) => `<li><a href="${n.path}">${n.name}</a></li>`).join('')}<li><a href="/#contact">Request a Meeting</a></li></ul>
    </nav>
    <nav aria-label="Footer — services">
      <h2 class="footer__h">Services</h2>
      <ul>${SERVICES.map((s) => `<li><a href="/#services">${s.title}</a></li>`).join('')}</ul>
    </nav>
    <div>
      <h2 class="footer__h">Contact</h2>
      <address class="footer__nap">
        <strong>${esc(B.publicName)}</strong><br>
        ${showAddress() ? addressHtml() : `Serving ${esc(B.serviceArea.join(' & '))}`}<br>
        ${phoneHtml()}<br>
        ${B.email ? emailHtml() : '<a href="/#contact">Send us a message</a>'}
      </address>
    </div>
  </div>
  <div class="container footer__legal">
    <p><strong>Important information.</strong> ${esc(B.publicName)} provides educational information and administrative support for retirement plans. We are not a plan fiduciary, custodian or trustee. Nothing on this website is individualized investment, legal, tax or accounting advice, an offer to buy or sell any security, or a recommendation of any investment. All investments involve risk, including loss of principal. Retirement plan rules and eligibility requirements apply and change over time. Consult qualified, appropriately licensed professionals about your circumstances. <a href="/disclosures/">Full disclosures</a>.</p>
  </div>
  <div class="container footer__bottom">
    <p>&copy; ${new Date().getFullYear()} ${esc(B.publicName)}. All rights reserved.</p>
    <ul>
      <li><a href="/privacy-policy/">Privacy Policy</a></li>
      <li><a href="/terms/">Terms &amp; Conditions</a></li>
      <li><a href="/disclosures/">Disclosures</a></li>
      <li><a href="/#contact">Contact</a></li>
    </ul>
  </div>
</footer>`;
}

export function render(page) {
  const canonical = absUrl(page.path);
  const graph = [organizationSchema(), websiteSchema()];
  graph.push({
    '@type': page.pageType || 'WebPage',
    '@id': canonical + '#webpage',
    url: canonical,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#organization` },
    inLanguage: cfg.site.language,
    ...(page.crumbs ? { breadcrumb: { '@id': canonical + '#breadcrumb' } } : {}),
  });
  if (page.crumbs) graph.push({ ...breadcrumbSchema(page.crumbs), '@id': canonical + '#breadcrumb' });
  if (page.schema) graph.push(...page.schema);
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  const v = page.assetVersion;

  return `<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : `<meta name="robots" content="index, follow, max-image-preview:large">\n<link rel="canonical" href="${canonical}">`}
${cfg.site.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(cfg.site.googleSiteVerification)}">` : ''}
<meta name="theme-color" content="#141C33">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(B.publicName)}">
<meta property="og:locale" content="${cfg.site.locale}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${OG_IMAGE()}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/sora-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/dm-sans-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/styles.css?v=${v}">
<script type="application/ld+json">${ld}</script>
${cfg.analytics.plausibleDomain ? `<script defer data-domain="${esc(cfg.analytics.plausibleDomain)}" src="https://plausible.io/js/script.js"></script>` : ''}
</head>
<body class="${page.bodyClass || ''}">
${header(page.path)}
<main id="main" tabindex="-1">
${page.body}
</main>
${footer()}
<script src="/assets/js/main.js?v=${v}" defer></script>
</body>
</html>
`;
}
