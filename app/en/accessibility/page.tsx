import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { SITE } from "@/lib/config";
import { JsonLd, breadcrumbSchema } from "@/lib/jsonld";

const URL = `${SITE.url}/en/accessibility`;

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: `${SITE.brand}'s commitment to an accessible website for all users.`,
  alternates: { canonical: URL, languages: { "he-IL": `${SITE.url}/accessibility`, "en-US": URL } },
};

export default function EnAccessibility() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: `${SITE.url}/en` },
          { name: "Accessibility", url: URL },
        ])}
      />
      <LegalLayout
        title="Accessibility Statement"
        updated="August 20, 2026"
        breadcrumbs={[
          { name: "Home", href: "/en" },
          { name: "Accessibility", href: "/en/accessibility" },
        ]}
      >
        <p>
          {SITE.brand} is committed to making its website accessible to as many people as possible,
          including people with disabilities. We aim to conform to widely accepted accessibility
          guidelines (WCAG 2.1, level AA) and continually work to improve the experience for all
          users.
        </p>

        <h2>Measures we take</h2>
        <ul>
          <li>Semantic HTML with proper headings, landmarks, and labels.</li>
          <li>Keyboard navigation and a &quot;skip to main content&quot; link.</li>
          <li>Sufficient color contrast and readable text sizing.</li>
          <li>Alt text for meaningful images and ARIA labels where appropriate.</li>
          <li>An accessibility widget for adjusting the display.</li>
        </ul>

        <h2>Ongoing effort</h2>
        <p>
          Accessibility is an ongoing process. Despite our efforts, some parts of the site may not
          yet be fully accessible. We are actively working to fix any gaps.
        </p>

        <h2>Feedback</h2>
        <p>
          If you encounter an accessibility barrier, or need help using any part of the site, please
          contact us and we&apos;ll do our best to help and to fix the issue:
        </p>
        <ul>
          <li>WhatsApp: +972585222227</li>
          <li>Email: {SITE.notificationEmail}</li>
        </ul>
      </LegalLayout>
    </>
  );
}
