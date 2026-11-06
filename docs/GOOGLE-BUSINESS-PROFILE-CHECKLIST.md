# Google Business Profile Readiness Checklist

Use this **after** the website is live and Search Console is verified.

> **Eligibility first.** A Google Business Profile is only for businesses that make
> **in-person contact with customers during their stated hours**. An online-only
> business is **not eligible**, so don't create a profile for one. Don't use a virtual
> office, mailbox or unstaffed coworking address. Google may suspend the profile, and
> it can damage trust.

## Tideward (San Diego, CA) notes

- **Name:** **Tideward**, exactly as on the website. File a **Fictitious Business Name** statement
  with the San Diego County Assessor/Recorder/County Clerk (and complete the newspaper publication)
  before creating the profile.
- **Business type:** **Local store / storefront**: clients visit your San Diego office during the
  posted hours. Google requires a **complete, real street address that is staffed during those
  hours**.
  If you can't staff an office during the posted hours, switch to a **service business** instead
  (`locationType: 'service-area'`, address hidden).
- **Address:** **6920 Miramar Rd #318, San Diego, CA 92121**, entered exactly as on the website (suite number included).
- **Phone:** **(858) 225-5674**.
- **Hours:** Monday–Friday, 9:00 AM – 5:00 PM.
- **Primary category:** **Financial consultant**.
- **Secondary category:** **Business administration service**, backed by the website's plan
  setup, records, Form 5500-EZ and ongoing support services.

## Step 1: Verify the website
- [ ] Search Console Domain property verified (see `SEARCH-CONSOLE-SETUP.md`)
- [ ] Sitemap submitted, and the homepage is indexed or indexing has been requested

## Step 2: Check the website for consistency
- [ ] `STRICT=1 node build.mjs` passes, so no placeholders remain
- [ ] The **business name** in `site.config.mjs` is the real-world name, set with `publicNameConfirmed: true`
- [ ] The **phone number** is correct, answered during business hours, and identical everywhere
- [ ] The **address**, if shown, is genuine, staffed and receives customers
- [ ] **Hours** are genuine
- [ ] The Contact page, footer and structured data all show the same name, address and phone
- [ ] Services are described accurately, and only services you actually offer are enabled
- [ ] The contact form delivers a test submission to the business inbox

## Step 3: Decide your eligibility and profile type

| Your situation | What to do |
|---|---|
| Staffed office where clients visit during posted hours | Storefront profile with the address shown. Set `locationType: 'office'` and fill in `address`, `hours` and optionally `geo`. The site will then show the address and map and output `ProfessionalService` schema. |
| You meet clients in person at **their** location or elsewhere, and don't receive them at your address | **Service-area business.** Hide the address in GBP and list your service areas (San Diego plus nearby cities, staying within about a 2-hour drive). Set `locationType: 'service-area'`. |
| Phone, video or email only, with no in-person contact | **Not eligible.** Don't create a profile. Focus on Search Console and organic SEO. Set `locationType: 'online-only'`. |

## Step 4: Create the profile
- [ ] Sign in with the **same Google account** that owns the Search Console property, where practical
- [ ] **Business name:** exactly the real-world name, with **no added keywords or city names** unless they are part of the legal or registered name
- [ ] **Primary category:** the most accurate available category for the services you actually provide (search the category list in GBP). Don't choose an unrelated category to get a different verification method.
- [ ] Address or service area, as decided in Step 3
- [ ] Phone, matching the website exactly
- [ ] Website: the current `site.url` (now `https://tideward.netlify.app/`). A custom domain looks more established to customers; if you add one later, update the GBP website field as well.
- [ ] Hours, matching the website
- [ ] Description: factual and educational, with no promises of returns or tax savings, and no URLs or promotional language
- [ ] Services: only the services enabled on the website

## Step 5: Verification
- Google decides which verification methods are offered. These can include instant
  verification through Search Console, video verification, phone, text or email.
- Search Console ownership **may** make instant verification available. It is **not guaranteed**.
- If Google asks for video verification, be ready to show the business location or vehicle,
  your business management tools or equipment, and proof of management (for example, a
  utility bill or business registration), as Google instructs.
- Approval timing varies, so don't promise same-day approval.

## After verification
- [ ] Add the GBP URL to `business.sameAs` in `site.config.mjs` and rebuild
- [ ] Keep name, address, phone and hours consistent everywhere, including any directories
  (BBB, Yelp, industry directories) you choose to list on
- [ ] Never post fake reviews or offer incentives for reviews, and never add review markup to the website
