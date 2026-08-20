import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/config";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

const URL = `${SITE.url}/en/privacy`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.brand} collects, uses, and protects your information.`,
  alternates: { canonical: URL, languages: { "he-IL": `${SITE.url}/privacy`, "en-US": URL } },
};

export default function EnPrivacy() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Privacy", url: URL },
        ])}
      />
      <LegalLayout
        title="Privacy Policy"
        updated="August 20, 2026"
        breadcrumbs={[
          { name: "Home", href: "/en" },
          { name: "Privacy", href: "/en/privacy" },
        ]}
      >
        <p>
          {SITE.brand} respects your privacy. This policy explains what information we collect, how
          we use it, and your rights. By using {SITE.domain} and the service, you agree to this
          policy.
        </p>

        <h2>1. Information we collect</h2>
        <ul>
          <li><strong>Account details</strong> — name, business name, email, and phone number you provide at signup.</li>
          <li><strong>Business setup</strong> — your trade, service areas, and keywords, used to filter leads for you.</li>
          <li><strong>Payment information</strong> — processed by our payment provider (Tranzila). We do not store card numbers on our servers.</li>
          <li><strong>Usage data</strong> — basic analytics about how the site and service are used, to improve them.</li>
        </ul>

        <h2>2. Public Facebook content</h2>
        <p>
          The service analyzes public posts in Facebook groups — content visible to any group
          member. We do not access private accounts, do not act on your Facebook account, and do not
          collect private personal data from group members beyond what is needed to deliver a
          relevant public post to you as a lead.
        </p>

        <h2>3. How we use your information</h2>
        <ul>
          <li>To provide and operate the service (find and deliver relevant leads).</li>
          <li>To process payments and manage your subscription.</li>
          <li>To contact you about your account, support, and important service updates.</li>
          <li>To improve the service.</li>
        </ul>

        <h2>4. Sharing</h2>
        <p>
          We do not sell your personal information. We share data only with service providers that
          help us operate (for example, the payment processor and hosting/analytics providers),
          under appropriate safeguards, and where required by law.
        </p>

        <h2>5. Data security</h2>
        <p>
          We use industry-standard measures to protect your information. Payment data is handled by a
          PCI-DSS-compliant processor and is not stored on our servers. No method of transmission is
          100% secure, but we work to protect your data.
        </p>

        <h2>6. Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information, and you
          may unsubscribe from non-essential communications at any time. Contact us using the details
          below.
        </p>

        <h2>7. Cookies</h2>
        <p>
          The site uses cookies for basic functionality (including remembering your language
          preference) and analytics. You can control cookies through your browser settings.
        </p>

        <h2>8. Changes</h2>
        <p>
          We may update this policy from time to time. Material changes will be communicated by email
          or WhatsApp.
        </p>

        <h2>9. Contact</h2>
        <ul>
          <li>WhatsApp: +972585222227</li>
          <li>Email: {SITE.notificationEmail}</li>
        </ul>
      </LegalLayout>
    </>
  );
}
