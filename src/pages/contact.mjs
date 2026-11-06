import { icon, esc, B, cfg, SERVICES, phoneHtml, phoneHref, emailHtml, hoursHtml, showAddress, addressHtml } from '../lib.mjs';

const PLAN_STATUS = ['No plan yet', 'I have a Solo 401(k)', 'I have a self-directed 401(k)', 'I have another plan type', 'Not sure'];
const BUSINESS_TYPES = ['Sole proprietor / independent contractor', 'Single-member LLC', 'Multi-member LLC or partnership', 'S corporation', 'C corporation', 'Not yet established', 'Other / not sure'];
const TIMES = ['Morning', 'Midday', 'Afternoon', 'No preference'];
const WHERE = ['At the Tideward office', 'Phone call first'];

function mapEmbed() {
  const a = B.address;
  if (!showAddress() || !a.streetAddress || !a.postalCode) return '';
  const q = encodeURIComponent(`${B.publicName}, ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}`);
  return `<div class="map"><iframe title="Map showing the ${esc(B.publicName)} office" src="https://www.google.com/maps?q=${q}&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
}

/** Contact form + details block, rendered inside the homepage #contact section. */
export function contactBlock() {
  return `
  <div class="container contact">
    <div class="contact__form">
      <h3 class="h3">Meeting request</h3>
      <p class="muted">Fields marked <span aria-hidden="true">*</span><span class="sr-only">with an asterisk</span> are required. Takes about two minutes.</p>
      <form name="${cfg.form.name}" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="company_website" class="form" novalidate data-form>
        <input type="hidden" name="form-name" value="${cfg.form.name}">
        <p class="hp" aria-hidden="true"><label>Leave this field empty <input name="company_website" tabindex="-1" autocomplete="off"></label></p>
        <div class="form__row">
          <div class="field"><label for="first-name">First name <span aria-hidden="true">*</span></label><input id="first-name" name="first_name" type="text" autocomplete="given-name" required maxlength="80"></div>
          <div class="field"><label for="last-name">Last name <span aria-hidden="true">*</span></label><input id="last-name" name="last_name" type="text" autocomplete="family-name" required maxlength="80"></div>
        </div>
        <div class="form__row">
          <div class="field"><label for="email">Email address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="160"></div>
          <div class="field"><label for="phone">Phone number</label><input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="30" aria-describedby="phone-hint"><span class="hint" id="phone-hint">Optional</span></div>
        </div>
        <div class="form__row">
          <div class="field"><label for="business-type">Business type <span aria-hidden="true">*</span></label><select id="business-type" name="business_type" required><option value="">Select…</option>${BUSINESS_TYPES.map((t) => `<option>${esc(t)}</option>`).join('')}</select></div>
          <div class="field"><label for="interest">Area of interest <span aria-hidden="true">*</span></label><select id="interest" name="area_of_interest" required><option value="">Select…</option>${SERVICES.map((s) => `<option>${esc(s.title)}</option>`).join('')}<option>General question</option></select></div>
        </div>
        <div class="field"><label for="plan-status">Current plan status <span aria-hidden="true">*</span></label><select id="plan-status" name="plan_status" required><option value="">Select…</option>${PLAN_STATUS.map((t) => `<option>${esc(t)}</option>`).join('')}</select></div>
        <fieldset class="field field--choices">
          <legend>How would you like to start?</legend>
          <div class="choices">${WHERE.map((t, i) => `<label class="choice"><input type="radio" name="meeting_place" value="${t}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div>
        </fieldset>
        <fieldset class="field field--choices">
          <legend>Preferred time to talk</legend>
          <div class="choices">${TIMES.map((t, i) => `<label class="choice"><input type="radio" name="preferred_time" value="${t}"${i === 3 ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div>
        </fieldset>
        <div class="field"><label for="message">Message <span aria-hidden="true">*</span></label><textarea id="message" name="message" rows="5" required maxlength="3000" aria-describedby="message-hint"></textarea><span class="hint" id="message-hint">Briefly describe your questions or goals. Please don’t include account numbers or other sensitive financial details.</span></div>
        <div class="field field--check"><input id="consent" name="consent" type="checkbox" value="yes" required data-label="Consent"><label for="consent">I agree that ${esc(B.publicName)} may contact me by phone or email about my inquiry. I understand ${esc(B.publicName)} provides administrative support and education, not individualized investment, legal or tax advice, and I have read the <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms/">Terms</a>. <span aria-hidden="true">*</span></label></div>
        <div class="form__error" role="alert" aria-live="assertive" data-form-error hidden></div>
        <button class="btn btn--accent btn--lg btn--block" type="submit">Send Meeting Request</button>
      </form>
    </div>

    <aside class="contact__info" aria-label="Contact details">
      <div class="info-card">
        <h3 class="h3">${esc(B.publicName)}</h3>
        <ul class="info-list">
          ${B.phone ? `<li>${icon('phone', 'info-list__icon')}<div><span class="info-list__k">Phone</span><a class="info-list__big" href="${phoneHref()}">${esc(B.phone)}</a></div></li>` : `<li>${icon('phone', 'info-list__icon')}<div><span class="info-list__k">Phone</span>${phoneHtml()}</div></li>`}
          ${B.email ? `<li>${icon('mail', 'info-list__icon')}<div><span class="info-list__k">Email</span>${emailHtml()}</div></li>` : ''}
          <li>${icon('pin', 'info-list__icon')}<div><span class="info-list__k">${showAddress() ? 'Office' : 'Service area'}</span>${showAddress() ? `<address>${addressHtml()}</address>` : esc(B.serviceArea.join(' · '))}</div></li>
          <li>${icon('clock', 'info-list__icon')}<div><span class="info-list__k">Hours (${esc(B.timeZoneLabel)})</span>${hoursHtml()}</div></li>
        </ul>
        ${mapEmbed()}
      </div>
      <div class="info-card info-card--dark">
        <h3>What happens next</h3>
        <ol class="next">
          <li>We review your request.</li>
          <li>We contact you to arrange a time.</li>
          <li>We meet at our San Diego office and agree what support would help.</li>
        </ol>
        <p class="fine">Please don’t send Social Security numbers, account numbers or passwords through this website.</p>
      </div>
    </aside>
  </div>
`;
}
