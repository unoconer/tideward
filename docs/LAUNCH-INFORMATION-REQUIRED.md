# Information Required Before Launch

Run `node build.mjs` to see what's still missing. Nothing on the site has been invented.

## Already set

- [x] Name: **Tideward**
- [x] Site URL: `https://tideward.netlify.app`
- [x] Phone: **(858) 225-5674**
- [x] Hours: **Monday–Friday, 9:00 AM – 5:00 PM (Pacific Time)**, office meetings by appointment
- [x] Business type: **storefront office** in San Diego, CA (Google Business Profile "Local store")
- [x] Services confirmed: plan setup, records and valuations, Form 5500-EZ preparation, ongoing
      support, Self-Directed and Solo 401(k) education, and office meetings
- [x] Role: administrative support alongside the client's plan provider, at the sponsor's
      direction. The business is not a fiduciary, trustee, custodian, registered investment
      adviser or broker-dealer.
- [x] Format: a one-page site, with separate Privacy, Terms and Disclosures pages

## Required

| Item | Notes |
|---|---|
| **Office street address** | `business.address.streetAddress`. Must be a real office that is **staffed during the posted hours** and receives clients. No virtual office, mailbox (UPS/PO box) or unstaffed coworking address. Currently a visible placeholder. |
| **ZIP code** | `business.address.postalCode`. Currently a visible placeholder. |
| **Register the business name** | California **Fictitious Business Name** statement with the San Diego County Assessor/Recorder/County Clerk, then publish it in a local newspaper once a week for 4 weeks. Then set `business.publicNameConfirmed: true`. Check the county FBN index, the USPTO and Google Maps for "Tideward" conflicts first. |

Optional once the address is set: `business.geo` with the office's real coordinates.

## Recommended before going public

- [ ] An attorney has reviewed the Privacy Policy, Terms and Disclosures (California law, CCPA/CPRA, administrative-services wording).
- [ ] An ERISA attorney has confirmed the administrative-services role.
- [ ] Netlify: form detection is on, an email notification is set up, and a test submission was received.
- [ ] Netlify: the project is public. Then add the Search Console verification code to `site.googleSiteVerification`.

## Optional (hidden until set)

Business email, owner name, company history and credentials.
