import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/config";
import { SITE_EN } from "@/lib/config-en";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

const URL = `${SITE.url}/en/terms`;

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for the ${SITE.brand} lead-generation service.`,
  alternates: { canonical: URL, languages: { "he-IL": `${SITE.url}/terms`, "en-US": URL } },
};

const P = SITE_EN.pricing.monthlyUSD;
const R = SITE_EN.pricing.refundDays;

export default function EnTerms() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Terms", url: URL },
        ])}
      />
      <LegalLayout
        title="Terms of Service"
        updated="August 20, 2026"
        breadcrumbs={[
          { name: "Home", href: "/en" },
          { name: "Terms", href: "/en/terms" },
        ]}
      >
        <p>
          Welcome to {SITE.brand}. The service is operated by {SITE.brand} (&quot;the Company&quot;,
          &quot;we&quot;). Using {SITE.domain} and the service is conditioned on your acceptance of
          the terms below. Please read them carefully before using the service.
        </p>

        <h2>1. Definitions</h2>
        <ul>
          <li><strong>&quot;Service&quot;:</strong> a system that automatically finds and filters public posts in relevant Facebook groups and sends alerts (leads) to the subscriber&apos;s WhatsApp.</li>
          <li><strong>&quot;Subscriber&quot; / &quot;User&quot;:</strong> a business owner who wants to receive the paid service.</li>
          <li><strong>&quot;Leads&quot;:</strong> public posts identified by the system as a potential business opportunity.</li>
        </ul>

        <h2>2. Description of the service</h2>
        <p>
          The service scans public Facebook group content 24/7 and sends the subscriber WhatsApp
          alerts about leads identified as relevant to the defined trade. The service does not
          perform any action on the subscriber&apos;s Facebook account, does not access closed groups
          without permission, and does not impersonate any identity.
        </p>

        <h2>3. Signup and first payment</h2>
        <p>
          At signup, the subscriber pays for the first month (${P}, displayed in USD) through a
          secure payment processor. Payment is processed via Tranzila; the amount is charged in
          Israeli Shekels (ILS) at the applicable exchange rate. {SITE.brand} does not store credit
          card details on its servers. Once payment completes, the service begins and the{" "}
          {R}-day full money-back guarantee window starts (see section 4.4).
        </p>

        <h2>4. Payment, auto-renewal, cancellation, and refund</h2>
        <h3>4.1 Price</h3>
        <p>
          The monthly price is ${P} (displayed in USD; charged via Tranzila in ILS). The first charge
          occurs at signup. Subsequent charges occur automatically each month on the set date.
        </p>
        <h3>4.2 Auto-renewal</h3>
        <p>
          The subscription renews automatically each month using the payment method provided,
          through Tranzila&apos;s secure credit-card processing. {SITE.brand} does not store card
          details on its servers.
        </p>
        <h3>4.3 Cancellation</h3>
        <p>You may request cancellation at any time, with no cancellation fee, via:</p>
        <ul>
          <li>The &quot;Cancel subscription&quot; button in your account area. The request goes to the {SITE.brand} billing team and is processed manually.</li>
          <li>A WhatsApp message to {SITE.brand} support.</li>
          <li>An email to {SITE.notificationEmail}.</li>
        </ul>
        <p>
          Cancellation requests are typically handled within 24 hours. Until approved, the
          subscription stays active and you keep receiving leads. An approved cancellation stops
          future monthly charges. Eligibility for a refund depends on the request being made within
          the money-back window (section 4.4).
        </p>
        <h3>4.4 {R}-day full money-back guarantee</h3>
        <p>
          Every new subscriber is entitled to a full money-back guarantee for {R} days from the
          first payment. Within the window: an approved cancellation refunds the full first charge to
          your card within a few business days. Outside the window: cancellation does not refund the
          current month but stops future charges. Consumer-protection rights under applicable law
          stand separately and in addition to this guarantee.
        </p>

        <h2>5. Liability and limitations</h2>
        <p>
          The service provides a tool for finding business opportunities but does not guarantee lead
          volume, lead quality, closed deals, or any success. Results vary between users and trades.
          {" "}{SITE.brand} is not liable for any direct or indirect damage arising from use of the
          service, including but not limited to lost revenue, lost prospects, reputational harm, or
          filtering errors.
        </p>

        <h2>6. Acceptable use</h2>
        <p>The subscriber agrees to:</p>
        <ul>
          <li>Use the service only for lawful business purposes.</li>
          <li>Not share received alerts with third parties outside the business.</li>
          <li>Not spam, violate others&apos; privacy, or break the law when contacting leads.</li>
          <li>Not attempt to reverse-engineer, hack, or reproduce the system.</li>
        </ul>

        <h2>7. Intellectual property</h2>
        <p>
          All rights in the service, site, logo, design, code, and content belong to {SITE.brand}.
          Copying, reproducing, modifying, or distributing the content without explicit written
          permission is prohibited.
        </p>

        <h2>8. Changes to these terms</h2>
        <p>
          {SITE.brand} may update these terms from time to time. Material changes will be
          communicated to subscribers by email or WhatsApp. Continued use after an update constitutes
          acceptance of the updated terms.
        </p>

        <h2>9. Governing law</h2>
        <p>
          These terms and use of the service are governed by the laws of the State of Israel. Any
          dispute will be subject to the exclusive jurisdiction of the competent court in the Tel
          Aviv district.
        </p>

        <h2>10. Contact</h2>
        <ul>
          <li>WhatsApp: +972585222227</li>
          <li>Email: {SITE.notificationEmail}</li>
        </ul>
      </LegalLayout>
    </>
  );
}
