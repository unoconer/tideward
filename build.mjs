#!/usr/bin/env node
/**
 * Zero-dependency static site build for Tideward.
 *   node build.mjs            → builds ./dist, lists missing launch info
 *   STRICT=1 node build.mjs   → fails while required launch info is missing
 */
import { mkdir, rm, writeFile, readFile, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { render } from './src/layout.mjs';
import { missing, SITE, B, cfg } from './src/lib.mjs';
import home from './src/pages/home.mjs';
import { privacy, terms, disclosures, thankYou, notFound } from './src/pages/legal.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');
const pages = [home, privacy, terms, disclosures, thankYou, notFound];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });
await cp(join(root, 'src/static'), out, { recursive: true });

const h = createHash('sha256');
for (const f of ['css/styles.css', 'js/main.js']) h.update(await readFile(join(root, 'src/assets', f)));
const assetVersion = h.digest('hex').slice(0, 10);

// Unique titles and descriptions (Search Console hygiene).
const seen = { title: new Map(), description: new Map() };
for (const p of pages)
  for (const k of ['title', 'description']) {
    if (seen[k].has(p[k])) throw new Error(`Duplicate ${k}: ${p.path} and ${seen[k].get(p[k])}`);
    seen[k].set(p[k], p.path);
  }

const html = new Map();
for (const p of pages) {
  const doc = render({ ...p, body: p.body(), assetVersion });
  const file = p.file ? join(out, p.file) : join(out, p.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, doc);
  html.set(p.path, doc);
}

// Internal link check — every root-relative href/src must resolve.
const broken = [];
for (const [path, doc] of html)
  for (const [, url] of doc.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const t = join(out, url);
    if (!existsSync(t) && !existsSync(join(t, 'index.html'))) broken.push(`${path} → ${url}`);
  }
if (broken.length) throw new Error('Broken internal links:\n  ' + broken.join('\n  '));

const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex);
const prio = { '/': '1.0' };
await writeFile(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod><priority>${prio[p.path] || '0.3'}</priority></url>`).join('\n')}
</urlset>
`,
);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

const list = [...missing].sort();
if (!B.publicNameConfirmed) list.unshift('Confirm public business name is the real-world / registered name (business.publicNameConfirmed)');

console.log(`✔ Built ${pages.length} pages → dist/ (asset v${assetVersion}); internal links OK`);
console.log(`✔ sitemap.xml (${indexable.length} URLs), robots.txt`);
if (!B.email) console.log('ℹ Optional: no business email — email lines hidden; visitors use the contact form.');
const m = cfgMediaReport();
if (m.length) console.log(`ℹ Media slots using designed fallbacks: ${m.join(', ')}`);
if (list.length) {
  console.warn(`\n⚠ ${list.length} launch item(s) still need real information:`);
  for (const x of list) console.warn(`   • ${x}`);
  if (process.env.STRICT === '1') {
    console.error('\n✖ STRICT mode: complete site.config.mjs before launch.');
    process.exit(1);
  }
}

function cfgMediaReport() {
  const out = [];
  if (!cfg.media.heroVideo.mp4 && !cfg.media.heroVideo.webm) out.push('heroVideo');
  for (const [k, v] of Object.entries(cfg.media.images)) if (!v.src) out.push(k);
  return out;
}
