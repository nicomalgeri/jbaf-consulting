import type { Metadata } from 'next';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';
import LegalPageLayout, { LegalHighlight } from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Legal Notice / Imprint',
  description: 'Legal notice and imprint for JBAF LIMITED. Company registration details, contact information, and regulatory information.',
  alternates: {
    canonical: `${siteUrl}/legal-notice`,
  },
};

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 p-3 sm:p-4 md:p-5 rounded-lg my-3 sm:my-4 md:my-5">
      {children}
    </div>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {children}
    </dl>
  );
}

function InfoItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">{label}</dt>
      <dd className="text-gray-700 text-xs sm:text-sm md:text-base">{children}</dd>
    </div>
  );
}

export default function LegalNoticePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Legal Notice', url: `${siteUrl}/legal-notice` },
  ]);

  return (
    <LegalPageLayout
      title="Legal Notice / Imprint"
      lastUpdated="January 2026"
      breadcrumbSchema={breadcrumbSchema}
    >
      <h2>1. Site Operator / Company Details</h2>
      <InfoCard>
        <InfoGrid>
          <InfoItem label="Company Name:">JBAF LIMITED</InfoItem>
          <InfoItem label="Legal Form:">Private Limited Company incorporated in England and Wales</InfoItem>
          <InfoItem label="Company Registration Number:">14013108</InfoItem>
          <InfoItem label="Registered Office Address:">
            JBAF LIMITED<br />
            12 West Street<br />
            Ware, England<br />
            SG12 9EE, United Kingdom
          </InfoItem>
        </InfoGrid>
      </InfoCard>

      <h2>2. Contact Information</h2>
      <InfoCard>
        <InfoGrid>
          <InfoItem label="Email:">
            <a href="mailto:info@jbafconsult.com">info@jbafconsult.com</a>
          </InfoItem>
          <InfoItem label="Website:">
            <a href="https://jbafconsult.com">https://jbafconsult.com</a>
          </InfoItem>
        </InfoGrid>
      </InfoCard>

      <h2>3. Governing Law and Jurisdiction</h2>
      <p>
        This website and all legal relationships arising from its use are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any disputes arising from or in connection with this website, unless mandatory statutory provisions dictate otherwise.
      </p>
      <p>
        As a UK-based company, JBAF LIMITED operates in compliance with UK laws and regulations, including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
      </p>

      <h2>4. Regulatory Information</h2>
      <p>
        JBAF LIMITED is registered with Companies House. You can verify our company registration details at:{' '}
        <a
          href="https://find-and-update.company-information.service.gov.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://find-and-update.company-information.service.gov.uk
        </a>
      </p>

      <h2>5. Responsible for Content</h2>
      <p>Responsible for editorial content pursuant to applicable laws:</p>
      <p>
        <strong>JBAF LIMITED</strong><br />
        Email: <a href="mailto:info@jbafconsult.com">info@jbafconsult.com</a>
      </p>

      <h2>6. Disclaimer</h2>

      <h3>6.1 Content Accuracy</h3>
      <p>
        The information provided on this website has been compiled with care. However, JBAF LIMITED cannot guarantee the accuracy, completeness, or timeliness of the information. The company reserves the right to modify or update content at any time without prior notice.
      </p>

      <h3>6.2 External Links</h3>
      <p>
        This website may contain links to external third-party websites. JBAF LIMITED has no control over the content of these external sites and therefore cannot accept any liability for their content. The respective provider or operator of linked pages is always responsible for their content. Linked pages were checked for possible legal violations at the time of linking; no illegal content was identifiable at that time.
      </p>

      <h3>6.3 Liability Limitations</h3>
      <p>
        JBAF LIMITED shall not be liable for any damages, whether direct, indirect, incidental, or consequential, arising from the use or inability to use this website or its content, except in cases of intentional misconduct or gross negligence.
      </p>
      <LegalHighlight variant="warning">
        Nothing in this disclaimer excludes or limits liability for death or personal injury arising from negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by English law.
      </LegalHighlight>

      <h2>7. Copyright and Intellectual Property</h2>
      <p>
        All content on this website, including but not limited to text, images, graphics, logos, videos, and documents, is protected by copyright and other intellectual property laws. The content is owned by JBAF LIMITED or used with permission from rights holders. Any reproduction, distribution, modification, or use of the content beyond the scope of copyright law requires prior written consent from JBAF LIMITED.
      </p>

      <h2>8. Online Dispute Resolution</h2>
      <p>
        The European Commission provides a platform for online dispute resolution (ODR):{' '}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr
        </a>
      </p>
      <p>
        JBAF LIMITED is neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
      </p>
    </LegalPageLayout>
  );
}
