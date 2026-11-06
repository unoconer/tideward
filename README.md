# Tideward: Website

A one-page site for Tideward, which provides Solo and self-directed 401(k) plan support from an
office in San Diego, California. It's static with no dependencies, built with Node and deployed
to **Netlify** at `https://tideward.netlify.app`.

## Quick start

```bash
node build.mjs          # builds ./dist; checks internal links; lists missing info
STRICT=1 node build.mjs # pre-launch check (fails while the address placeholders remain)
```

## Deploy to Netlify

1. **Add new project → Import from Git**, then select this repo and branch `claude/nifty-cray-89pvhk`.
2. Name the project `tideward`.
3. **Forms → Enable form detection**, then deploy. Add an email notification for the `consultation` form.
4. Make the project **public**, then verify it in Google Search Console.

## Structure

The homepage (`/`) holds every section, each reachable from the menu and the sticky section bar:
Services · How it works · Who does what · 401(k) basics · FAQ · About · Visit & contact (meeting form).
`/privacy-policy/`, `/terms/` and `/disclosures/` are separate pages under California law
(CCPA/CPRA notice included), plus `/thank-you/` and `404.html`.

## Office address (placeholder)

Tideward is set up as a **storefront office** (`locationType: 'office'`). Until
`business.address.streetAddress` and `postalCode` are filled in, the page shows yellow
`[Street address — to be provided]` and `[ZIP]` tags, and no storefront schema or map is output.
Fill both in `site.config.mjs` with the real, staffed office address, then rebuild.

## Design

- **Palette:** midnight ink `#141C33`, bay green `#23705F`, coral `#E8775A`, sea glass `#9ED8C6`, sand paper `#F7F3EC`
- **Type:** Sora (display) and DM Sans (text), both self-hosted
- **Logo:** a sand "T" with sea-glass and coral tide lines on an indigo tile (`src/brand.mjs`)
- **Hero:** background video of Mission Bay, San Diego (desktop only; phones get the poster image)

See `docs/` for the launch checklist, media sources, Search Console and Google Business Profile steps.
