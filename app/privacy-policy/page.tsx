import type { Metadata } from 'next';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';
import LegalPageLayout, { LegalLead, LegalAddress, LegalHighlight } from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'JBAF LIMITED Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with UK GDPR.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Privacy Policy', url: `${siteUrl}/privacy-policy` },
  ]);

  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="January 2026"
      breadcrumbSchema={breadcrumbSchema}
    >
      <LegalLead>
        JBAF LIMITED (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you visit our website jbafconsult.com and use our services.
      </LegalLead>

      <h2>1. Data Controller</h2>
      <p>The data controller responsible for processing your personal data is:</p>
      <LegalAddress>
        <strong>JBAF LIMITED</strong><br />
        12 West Street<br />
        Ware, England, SG12 9EE<br />
        United Kingdom<br />
        <br />
        Company Registration: 14013108<br />
        Email: <a href="mailto:info@jbafconsult.com">info@jbafconsult.com</a>
      </LegalAddress>

      <h2>2. What Personal Data We Collect</h2>
      <p>We may collect and process the following categories of personal data:</p>

      <h3>2.1 Information You Provide Directly</h3>
      <ul>
        <li><strong>Contact Forms:</strong> Name, email address, phone number, and message content when you contact us</li>
        <li><strong>Business Inquiries:</strong> Company/organisation name, contact person details, and inquiry content</li>
        <li><strong>Service Engagement:</strong> Information necessary to provide our consulting services to you</li>
      </ul>

      <h3>2.2 Information Collected Automatically</h3>
      <ul>
        <li><strong>Technical Data:</strong> IP address (anonymised), browser type and version, operating system, device information</li>
        <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referral sources (via Google Analytics)</li>
        <li><strong>Cookie Data:</strong> Cookie consent status (see our <a href="/cookie-policy">Cookie Policy</a> for details)</li>
      </ul>

      <h2>3. Legal Basis for Processing (UK GDPR Article 6)</h2>
      <p>We process your personal data based on the following legal grounds:</p>
      <ul>
        <li><strong>Consent (Art. 6(1)(a)):</strong> For analytics cookies. You may withdraw consent at any time.</li>
        <li><strong>Contract Performance (Art. 6(1)(b)):</strong> To provide our consulting services and fulfil our obligations to clients.</li>
        <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> To improve our website, ensure security, prevent fraud, and analyse website usage for operational purposes.</li>
        <li><strong>Legal Obligations (Art. 6(1)(c)):</strong> To comply with accounting, tax, and other legal requirements.</li>
      </ul>

      <h2>4. How We Use Your Data</h2>
      <p>We use collected data for the following purposes:</p>
      <ul>
        <li>To respond to your inquiries and provide support</li>
        <li>To provide consulting services</li>
        <li>To improve website functionality and user experience</li>
        <li>To generate anonymised analytics and usage statistics</li>
        <li>To comply with legal obligations</li>
        <li>To protect our rights and prevent fraudulent activities</li>
      </ul>

      <h2>5. Data Sharing and Third-Party Services</h2>
      <p>We may share your data with the following categories of recipients:</p>

      <h3>5.1 Analytics</h3>
      <p>
        <strong>Google Analytics (GA4):</strong> For website performance and usage analytics.{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google&apos;s privacy policy
        </a>
      </p>
      <LegalHighlight variant="success">
        <strong>We do not sell, rent, or trade your personal data to third parties for marketing purposes.</strong>
      </LegalHighlight>

      <h2>6. International Data Transfers</h2>
      <p>
        Some of our service providers may be located outside the United Kingdom. When we transfer data internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses, adequacy decisions, or other legally recognised transfer mechanisms in accordance with UK GDPR requirements.
      </p>

      <h2>7. Data Retention</h2>
      <p>We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected:</p>
      <ul>
        <li><strong>Contact form inquiries:</strong> 3 years after your last contact</li>
        <li><strong>Client records:</strong> 6 years (as required by UK tax and accounting laws)</li>
        <li><strong>Analytics data:</strong> 14 months (anonymised)</li>
        <li><strong>Consent cookie:</strong> 1 year</li>
      </ul>

      <h2>8. Your Rights Under UK GDPR</h2>
      <p>Under the UK General Data Protection Regulation, you have the following rights:</p>
      <ul>
        <li><strong>Right of Access (Art. 15):</strong> Request a copy of the personal data we hold about you</li>
        <li><strong>Right to Rectification (Art. 16):</strong> Request correction of inaccurate or incomplete data</li>
        <li><strong>Right to Erasure (Art. 17):</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
        <li><strong>Right to Restriction (Art. 18):</strong> Request restriction of processing in certain circumstances</li>
        <li><strong>Right to Data Portability (Art. 20):</strong> Receive your data in a structured, machine-readable format</li>
        <li><strong>Right to Object (Art. 21):</strong> Object to processing based on legitimate interests</li>
        <li><strong>Right to Withdraw Consent (Art. 7):</strong> Withdraw consent at any time (without affecting lawfulness of prior processing)</li>
      </ul>

      <h3>How to Exercise Your Rights</h3>
      <p>
        To exercise any of these rights, please contact us at{' '}
        <a href="mailto:info@jbafconsult.com">info@jbafconsult.com</a>.
        We will respond to your request within 30 days. We may require proof of identity before processing your request.
      </p>

      <h2>9. Right to Lodge a Complaint</h2>
      <p>
        If you believe your data protection rights have been violated, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO), the UK supervisory authority for data protection:{' '}
        <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
          https://ico.org.uk
        </a>
      </p>

      <h2>10. Data Security</h2>
      <p>
        We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include encryption (HTTPS/TLS), secure authentication, access controls, and regular security assessments.
      </p>

      <h2>11. Children&apos;s Privacy</h2>
      <p>
        Our website and services are not intended for children under 16 years of age. We do not knowingly collect personal data from children under 16 without parental consent. If you believe we have collected data from a child, please contact us immediately.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
      </p>

      <h2>13. Contact Us</h2>
      <p>For any questions or concerns about this Privacy Policy or our data practices, please contact:</p>
      <LegalAddress>
        <strong>JBAF LIMITED</strong><br />
        12 West Street<br />
        Ware, England, SG12 9EE<br />
        United Kingdom<br />
        <br />
        Email: <a href="mailto:info@jbafconsult.com">info@jbafconsult.com</a>
      </LegalAddress>
    </LegalPageLayout>
  );
}
