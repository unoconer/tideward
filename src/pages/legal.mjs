import { pageHero, esc, B, cfg, phoneHtml, emailHtml } from '../lib.mjs';

const UPDATED = 'November 5, 2026';
const N = esc(B.publicName);
const contactBlock = () =>
  `<div class="legal-contact"><p><strong>${N}</strong><br>Phone: ${phoneHtml()}<br>${B.email ? `Email: ${emailHtml()}<br>` : ''}Online: <a href="/#contact">contact form</a></p></div>`;

function legal({ path, name, title, description, lead, toc, body }) {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name, path },
  ];
  return {
    path,
    title,
    description,
    crumbs,
    body: () => `
${pageHero({ kicker: 'Legal', title: name, lead, crumbs })}
<section class="section section--tight-top">
  <div class="container legal-wrap">
    <aside class="legal-toc" aria-label="Sections"><p class="guide__toc-h">Sections</p><ol>${toc.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol></aside>
    <div class="prose legal">
      <p class="muted">Last updated: ${UPDATED}</p>
      ${body()}
    </div>
  </div>
</section>`,
  };
}

export const privacy = legal({
  path: '/privacy-policy/',
  name: 'Privacy Policy',
  title: `Privacy Policy | ${B.publicName}`,
  description: `How ${B.publicName} collects, uses, shares and protects information submitted through this website, and the choices available to you.`,
  lead: 'What we collect, why, who we share it with, and the choices you have.',
  toc: [
    ['scope', 'Scope'], ['collect', 'Information we collect'], ['use', 'How we use it'], ['share', 'Service providers'], ['cookies', 'Cookies & analytics'],
    ['security', 'Security'], ['retention', 'Retention'], ['choices', 'Your choices & rights'], ['children', 'Children'], ['changes', 'Changes'], ['contact', 'Contact'],
  ],
  body: () => `
<h2 id="scope">Scope</h2>
<p>This Privacy Policy describes how ${N} (“we,” “us,” “our”) handles information collected through this website and through communications that begin on it. By using the website, you agree to the practices described here.</p>

<h2 id="collect">Information we collect</h2>
<h3>Information you provide</h3>
<p>When you submit the consultation request form or contact us, we collect what you choose to share, which may include your first and last name, email address, phone number, business type, area of interest, preferred time to talk, your message, and your consent to be contacted.</p>
<p>Please do not submit Social Security numbers, account numbers, passwords, or other sensitive financial or health information through the website.</p>
<h3>Information from clients</h3>
<p>If you engage us for plan support, we receive the plan and business information needed to provide it — for example plan documents, account statements, contribution and transaction records, and valuation support. We use it only to provide the services you request, keep it confidential, and handle it as described in this policy and our engagement with you.</p>
<h3>Information collected automatically</h3>
<p>Our hosting provider automatically receives standard technical information when you visit — such as IP address, browser and device type, pages requested, referring page, and date and time — to deliver, secure and troubleshoot the website.</p>

<h2 id="use">How we use information</h2>
<ul>
  <li>To respond to your inquiry and arrange a consultation you request;</li>
  <li>To provide plan administration services you engage us for;</li>
  <li>To communicate with you about the topics you asked about;</li>
  <li>To operate, maintain, secure and improve the website;</li>
  <li>To comply with legal obligations and enforce our terms.</li>
</ul>
<p>We do not sell your personal information, and we do not share it with third parties for their own marketing.</p>

<h2 id="share">Service providers</h2>
<p>We use service providers who process information on our behalf, only as needed to provide their services:</p>
<ul>
  <li><strong>Netlify, Inc.</strong> — website hosting, content delivery and processing of form submissions.</li>
  ${cfg.analytics.plausibleDomain ? '<li><strong>Plausible Analytics</strong> — privacy-focused, cookie-free aggregate website statistics.</li>' : ''}
  <li>Email, telephone and scheduling tools we use to receive and respond to your messages.</li>
</ul>
<p>We may also disclose information if required by law, to protect our rights or the safety of others, or in connection with a business transfer.</p>

<h2 id="cookies">Cookies and analytics</h2>
<p>This website does not use advertising cookies or cross-site tracking. Fonts and media are served from our own website rather than third-party networks. ${
    cfg.analytics.plausibleDomain
      ? 'We use a privacy-focused analytics service that does not use cookies and does not collect personal information.'
      : 'We do not currently use website analytics. If we add analytics, we will choose a privacy-conscious provider and update this policy.'
  }</p>

<h3>Do Not Track</h3>
<p>Some browsers send a “Do Not Track” signal. Because this website does not track visitors across third-party sites or serve targeted advertising, it does not change its behavior in response to these signals.</p>

<h2 id="security">Security</h2>
<p>The website is served only over encrypted HTTPS connections, and access to inquiry information is limited to people who need it to respond to you. We use reasonable administrative, technical and physical safeguards, but no method of transmission or storage is completely secure.</p>

<h2 id="retention">Retention</h2>
<p>We keep inquiry information only as long as needed to respond to you and maintain reasonable business records, and then delete or de-identify it unless the law requires longer retention.</p>

<h2 id="choices">Your choices and rights</h2>
<p><strong>California residents.</strong> If the California Consumer Privacy Act, as amended by the California Privacy Rights Act, applies to our business, you may have the right to know what personal information we collect and how we use and share it, to request access, correction or deletion, and to opt out of the sale or sharing of personal information. We do not sell or share personal information for cross-context behavioral advertising. Under California’s “Shine the Light” law, you may also ask whether we disclosed personal information to third parties for their direct marketing; we do not.</p>
<p>You may ask us to stop contacting you at any time. Depending on where you live, you may have rights under applicable law — such as the right to access, correct or delete personal information we hold about you, or to opt out of certain processing. To make a request, contact us using the details below. We will verify and respond as required by applicable law and will not discriminate against you for exercising your rights.</p>

<h2 id="children">Children’s privacy</h2>
<p>This website is intended for adults and is not directed to children under 13. We do not knowingly collect information from children.</p>

<h2 id="changes">Changes to this policy</h2>
<p>We may update this Privacy Policy. The “Last updated” date shows when it was last revised. Material changes will be posted on this page.</p>

<h2 id="contact">Contact us</h2>
${contactBlock()}
`,
});

export const terms = legal({
  path: '/terms/',
  name: 'Terms & Conditions',
  title: `Terms & Conditions | ${B.publicName}`,
  description: `The terms that govern use of the ${B.publicName} website, including educational-content limits, intellectual property, liability and governing law.`,
  lead: 'The rules for using this website and its educational content.',
  toc: [
    ['agreement', 'Agreement'], ['use', 'Permitted use'], ['education', 'Educational content only'], ['no-relationship', 'No professional relationship'], ['accuracy', 'Accuracy'],
    ['ip', 'Intellectual property'], ['links', 'Third-party links'], ['warranties', 'Disclaimer of warranties'], ['liability', 'Limitation of liability'],
    ['indemnity', 'Indemnification'], ['law', 'Governing law'], ['changes', 'Changes'], ['contact', 'Contact'],
  ],
  body: () => `
<h2 id="agreement">Agreement to these terms</h2>
<p>These Terms and Conditions (“Terms”) govern your use of the website operated by ${N}. By accessing or using the website you agree to these Terms. If you do not agree, please do not use the website.</p>

<h2 id="use">Permitted use</h2>
<p>You may use the website for lawful, personal and informational purposes. You agree not to: attempt unauthorized access; interfere with the website’s operation or security; submit false, misleading or unlawful information; send spam through our forms; or use automated means to scrape content or submit forms.</p>

<h2 id="education">Educational content only</h2>
<p>All content is general educational and informational material. It is not individualized investment, legal, tax or accounting advice, and it is not an offer, solicitation or recommendation to buy or sell any security, investment or financial product. Retirement plan rules are complex, change over time and depend on individual facts. Consult qualified, appropriately licensed professionals before acting. See our <a href="/disclosures/">Financial &amp; Educational Disclosures</a>.</p>

<h2 id="no-relationship">No professional relationship</h2>
<p>Using the website, submitting a form or communicating with us does not create an advisory, fiduciary, attorney-client, accountant-client or other professional relationship.</p>

<h2 id="accuracy">Accuracy of information</h2>
<p>We work to keep content accurate and current but do not guarantee it is complete, accurate or up to date. Laws, IRS limits and interpretations change, and we may update content without notice.</p>

<h2 id="ip">Intellectual property</h2>
<p>The text, design, graphics, logos and other original content on this website are owned by ${N} or used with permission and are protected by intellectual property laws. Typefaces are used under the SIL Open Font License; stock media is used under its license. You may view and print pages for personal, non-commercial use. Any other use requires our prior written permission.</p>

<h2 id="links">Third-party links</h2>
<p>Links to third-party websites, such as IRS.gov, are provided for convenience. We do not control and are not responsible for their content or practices, and a link is not an endorsement.</p>

<h2 id="warranties">Disclaimer of warranties</h2>
<p>The website and its content are provided “as is” and “as available,” without warranties of any kind, express or implied, to the fullest extent permitted by law.</p>

<h2 id="liability">Limitation of liability</h2>
<p>To the fullest extent permitted by law, ${N} and its owners, employees and agents will not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss arising from your use of or reliance on the website or its content.</p>

<h2 id="indemnity">Indemnification</h2>
<p>You agree to indemnify and hold harmless ${N} from claims arising out of your misuse of the website or violation of these Terms.</p>

<h2 id="law">Governing law</h2>
<p>These Terms are governed by the laws of the State of California, without regard to conflict-of-law principles. Any dispute will be resolved in the state or federal courts located in San Diego County, California, unless applicable law requires otherwise.</p>

<h2 id="changes">Changes</h2>
<p>We may update these Terms. Continued use of the website after changes are posted means you accept the revised Terms.</p>

<h2 id="contact">Contact</h2>
${contactBlock()}
`,
});

export const disclosures = legal({
  path: '/disclosures/',
  name: 'Financial & Educational Disclosures',
  title: `Financial & Educational Disclosures | ${B.publicName}`,
  description: `Important disclosures about ${B.publicName}: our administrative and educational role, no investment, legal or tax advice, investment risk and plan rules.`,
  lead: 'Important information about the nature of our content and consultations.',
  toc: [
    ['education', 'Educational purpose'], ['not-investment', 'Not investment advice'], ['not-legal', 'Not legal or tax advice'], ['role', 'Our role & administrative services'],
    ['risk', 'Investment risk'], ['guarantees', 'No guarantees'], ['rules', 'Plan rules apply'], ['endorsement', 'No government endorsement'], ['professionals', 'Consult professionals'],
  ],
  body: () => `
<h2 id="education">Educational purpose</h2>
<p>Website content and consultations offered by ${N} are general educational and informational material designed to help you understand retirement plan structures — not to recommend a course of action for you.</p>

<h2 id="not-investment">Not investment advice</h2>
<p>Nothing on this website or in our consultations is individualized investment advice or a recommendation to buy, sell or hold any security, real estate or other asset. ${N} is not registered as an investment adviser or broker-dealer with the U.S. Securities and Exchange Commission, the California Department of Financial Protection and Innovation or any other regulator.</p>

<h2 id="not-legal">Not legal or tax advice</h2>
<p>Nothing on this website is legal, tax or accounting advice. Retirement plan, tax and ERISA rules are complex and fact-specific. Consult a CPA, enrolled agent, tax attorney or ERISA attorney about your situation.</p>

<h2 id="role">Our role</h2>
<p>${N} provides administrative support and education for retirement plans at the direction of the plan sponsor. We do not act as a plan fiduciary, trustee or custodian; we do not exercise discretionary authority or control over plan assets or investments; and we do not hold, move or invest plan money. Plan documents, custody and investment advice, where needed, are provided by independent third parties you select.</p>
<h3>Administrative services and filings</h3>
<p>When we prepare Form 5500-EZ or other plan documents, we rely on the information you provide. The plan sponsor or plan administrator is responsible for reviewing, signing and filing returns, for the accuracy of the information supplied, and for meeting plan deadlines. Recordkeeping and valuation support organizes the records and values you provide or obtain; we do not perform independent appraisals unless separately agreed in writing.</p>

<h2 id="risk">Investment risk</h2>
<p>All investments involve risk, including possible loss of principal. Alternative assets that may be held in self-directed plans — including real estate, private companies, private loans, precious metals and digital assets — can be illiquid, difficult to value, concentrated, subject to fraud and higher-cost than traditional investments. Past performance does not guarantee future results.</p>

<h2 id="guarantees">No guarantees</h2>
<p>We do not guarantee any investment return, tax result, eligibility outcome, plan approval or other result. Examples are hypothetical and for illustration only.</p>

<h2 id="rules">Plan rules and eligibility apply</h2>
<p>Eligibility for a Solo 401(k) or any retirement plan depends on your business, income, employees and other facts. Contribution limits, distribution rules, prohibited transaction rules and reporting requirements apply and change over time. Failing to follow them can result in taxes, penalties or loss of a plan’s tax-advantaged status.</p>

<h2 id="endorsement">No government endorsement</h2>
<p>References to the IRS, the U.S. Department of Labor, the SEC or federal law are for education only. ${N} is not affiliated with, approved by or endorsed by any government agency.</p>

<h2 id="professionals">Consult qualified professionals</h2>
<p>Before establishing a retirement plan or making an investment, consult qualified professionals who can consider your complete financial, tax and legal circumstances.</p>
${contactBlock()}
`,
});

export const thankYou = {
  path: '/thank-you/',
  title: `Thank You | ${B.publicName}`,
  description: `Thank you for contacting ${B.publicName}. Your consultation request has been received.`,
  noindex: true,
  body: () => `
${pageHero({ kicker: 'Request received', title: 'Thank you — we’ll be in touch', lead: 'We will review your message and contact you to arrange a time to talk.' })}
<section class="section section--tight-top"><div class="container narrow center">
  <p>While you wait, read our short <a href="/#learn">401(k) basics</a> or the <a href="/#faq">FAQ</a>.</p>
  <a class="btn btn--dark" href="/">Back to the homepage</a>
</div></section>`,
};

export const notFound = {
  path: '/404.html',
  file: '404.html',
  title: `Page Not Found | ${B.publicName}`,
  description: 'The page you requested could not be found.',
  noindex: true,
  body: () => `
${pageHero({ kicker: 'Error 404', title: 'We couldn’t find that page', lead: 'It may have moved or no longer exists.' })}
<section class="section section--tight-top"><div class="container narrow center">
  <div class="btn-row btn-row--center"><a class="btn btn--dark" href="/">Homepage</a><a class="btn btn--outline" href="/#faq">Read the FAQ</a><a class="btn btn--outline" href="/#contact">Contact us</a></div>
</div></section>`,
};
