# Google Search Console Setup

> Search Console verification is **not** done until the site owner completes these
> steps and Google confirms it. Nothing in this repository verifies it automatically.

**Current address:** `https://tideward.netlify.app`
(set in `site.config.mjs → site.url`)

## What the website already provides

- HTTPS-only delivery on Netlify, with an HSTS header in `netlify.toml`
- `/sitemap.xml`, generated on every build, listing only indexable pages
- `/robots.txt`, which allows all crawlers and points to the sitemap
- A self-referencing canonical URL on every indexable page, using `site.url`
- A unique `<title>` and meta description on every page (the build fails if two pages share one)
- Clean internal links and a custom `404.html`
- `noindex` on the thank-you and 404 pages only
- JSON-LD structured data: Organization, WebSite, WebPage, BreadcrumbList, Service, Article and FAQPage

---

## Option A: Now, on `tideward.netlify.app` (URL-prefix property)

A **Domain property** needs a DNS TXT record. You don't control DNS for `netlify.app`,
so use a **URL-prefix property** with the **HTML tag** method.

1. Make sure the Netlify project is **public**, not "Private" or password-protected.
2. Open <https://search.google.com/search-console> and sign in with the Google account
   that will **also manage the Google Business Profile**.
3. Click **Add property** → **URL prefix** and enter
   `https://tideward.netlify.app/`
4. Choose **HTML tag** as the verification method. Google shows a tag like:
   `<meta name="google-site-verification" content="AbCdEf123..." />`
5. Copy **only the content value** (`AbCdEf123...`) into `site.config.mjs`:
   ```js
   googleSiteVerification: 'AbCdEf123...',
   ```
   Commit and push. Netlify redeploys and the tag appears on every page. (Or send the
   value to your developer to add.)
6. Back in Search Console, click **Verify**.
7. **Sitemaps** → enter `sitemap.xml` → **Submit**.
8. **URL Inspection** → inspect the homepage → **Request indexing**.

Keep the meta tag in place, because removing it un-verifies the property.

---

## Option B: Later, when a custom domain is connected (Domain property)

Use this once you own a domain such as `tideward.com`.

### 1. Connect the domain
1. Netlify → **Domain management** → **Add a domain**, then add the apex domain and `www`.
2. Point DNS to Netlify, either with Netlify DNS or with the records Netlify shows for your registrar.
3. Set the custom domain as **primary**. Netlify then redirects the `netlify.app` address to it.
4. Wait for the HTTPS certificate to show as active.
5. In `site.config.mjs`, change `site.url` to `https://tideward.com` and push.
   Canonicals, the sitemap, robots.txt and structured data all switch over automatically.

### 2. Add a Domain property
1. Search Console → **Add property** → **Domain** and enter `tideward.com`.
   Don't include `https://` or `www`.
2. Copy the **TXT record** (`google-site-verification=XXXXXXXX`).

### 3. Add the DNS TXT record

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| TXT | `@` (root domain) | `google-site-verification=XXXXXXXX` | default |

Don't remove existing TXT records, such as SPF.

### 4. Verify and submit
1. Wait for DNS propagation (minutes to 48 hours), then click **Verify**.
   Check the record with `dig TXT tideward.com +short`.
2. **Sitemaps** → submit `sitemap.xml`.
3. Keep the TXT record permanently.
4. Keep the old netlify.app URL-prefix property. Search Console will show the redirected
   URLs moving to the new domain.

---

## Ongoing checks
- Look at the **Pages** report for errors. Thank-you and 404 pages are excluded on purpose.
- Test structured data with the [Rich Results Test](https://search.google.com/test/rich-results)
  and the [Schema.org Validator](https://validator.schema.org/).
- Add other users with **Settings → Users and permissions** instead of sharing passwords.
