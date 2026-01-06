import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Legal Notice / Imprint',
  description: 'Legal notice and imprint for JBAF Consulting. Company registration details, contact information, and regulatory information.',
  alternates: {
    canonical: `${siteUrl}/legal-notice`,
  },
};

export default function LegalNoticePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Legal Notice', url: `${siteUrl}/legal-notice` },
  ]);

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 sm:py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4">
              Legal Notice / Imprint
            </h1>
            <p className="text-primary-200">Last updated: January 2026</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-gray prose-lg">

            <h2>1. Site Operator / Company Details</h2>
            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="font-semibold text-gray-900">Company Name:</dt>
                  <dd className="text-gray-700">JBAF CONSULTING LTD</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Legal Form:</dt>
                  <dd className="text-gray-700">Private Limited Company incorporated in England and Wales</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Company Registration Number:</dt>
                  <dd className="text-gray-700">12081906</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Registered Office Address:</dt>
                  <dd className="text-gray-700">
                    JBAF CONSULTING LTD<br />
                    100 Church Street<br />
                    Brighton, East Sussex<br />
                    BN1 1UJ, United Kingdom
                  </dd>
                </div>
              </dl>
            </div>

            <h2>2. Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="font-semibold text-gray-900">Email:</dt>
                  <dd>
                    <a href="mailto:Joseph@jbafconsult.com" className="text-primary-600 hover:underline">
                      Joseph@jbafconsult.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Website:</dt>
                  <dd>
                    <a href="https://jbafconsult.com" className="text-primary-600 hover:underline">
                      https://jbafconsult.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <h2>3. Governing Law and Jurisdiction</h2>
            <p>
              This website and all legal relationships arising from its use are governed by the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction over any disputes arising from or in connection with this website, unless mandatory statutory provisions dictate otherwise.
            </p>
            <p>
              As a UK-based company, JBAF CONSULTING LTD operates in compliance with UK laws and regulations, including the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>

            <h2>4. Regulatory Information</h2>
            <p>
              JBAF CONSULTING LTD is registered with Companies House. You can verify our company registration details at:{' '}
              <a
                href="https://find-and-update.company-information.service.gov.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                https://find-and-update.company-information.service.gov.uk
              </a>
            </p>

            <h2>5. Responsible for Content</h2>
            <p>Responsible for editorial content pursuant to applicable laws:</p>
            <address className="not-italic">
              <strong>JBAF CONSULTING LTD</strong><br />
              Email: <a href="mailto:Joseph@jbafconsult.com" className="text-primary-600 hover:underline">Joseph@jbafconsult.com</a>
            </address>

            <h2>6. Disclaimer</h2>

            <h3>6.1 Content Accuracy</h3>
            <p>
              The information provided on this website has been compiled with care. However, JBAF CONSULTING LTD cannot guarantee the accuracy, completeness, or timeliness of the information. The company reserves the right to modify or update content at any time without prior notice.
            </p>

            <h3>6.2 External Links</h3>
            <p>
              This website may contain links to external third-party websites. JBAF CONSULTING LTD has no control over the content of these external sites and therefore cannot accept any liability for their content. The respective provider or operator of linked pages is always responsible for their content. Linked pages were checked for possible legal violations at the time of linking; no illegal content was identifiable at that time.
            </p>

            <h3>6.3 Liability Limitations</h3>
            <p>
              JBAF CONSULTING LTD shall not be liable for any damages, whether direct, indirect, incidental, or consequential, arising from the use or inability to use this website or its content, except in cases of intentional misconduct or gross negligence.
            </p>
            <p className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              Nothing in this disclaimer excludes or limits liability for death or personal injury arising from negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by English law.
            </p>

            <h2>7. Copyright and Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, images, graphics, logos, videos, and documents, is protected by copyright and other intellectual property laws. The content is owned by JBAF CONSULTING LTD or used with permission from rights holders. Any reproduction, distribution, modification, or use of the content beyond the scope of copyright law requires prior written consent from JBAF CONSULTING LTD.
            </p>

            <h2>8. Online Dispute Resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>
              JBAF CONSULTING LTD is neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
            </p>

            <p className="text-sm text-gray-500 mt-12 pt-8 border-t">
              © 2026 JBAF CONSULTING LTD. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
