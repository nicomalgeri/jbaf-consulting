import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for jbafconsult.com. Read our terms and conditions for using the JBAF LIMITED website.',
  alternates: {
    canonical: `${siteUrl}/terms-of-use`,
  },
};

export default function TermsOfUsePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Terms of Use', url: `${siteUrl}/terms-of-use` },
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
              Terms of Use
            </h1>
            <p className="text-primary-200">Last updated: January 2026</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-gray prose-lg">
            <p className="lead text-xl text-gray-600 mb-8">
              Welcome to jbafconsult.com, the official website of JBAF Limited, trading under JBAF Consulting (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, &quot;the Company&quot;). By accessing or using our website, you agree to be bound by these Terms of Use. Please review them carefully before continuing to use our site.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and our <a href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</a>. If you do not agree to these terms, please do not use this website.
            </p>

            <h2>2. About JBAF LIMITED</h2>
            <p>
              JBAF LIMITED is a private limited company registered in England and Wales (Company Number: 14013108). We provide professional consulting services to businesses and organisations.
            </p>

            <h2>3. Website Usage Rules</h2>

            <h3>3.1 Permitted Use</h3>
            <p>You may use our website for:</p>
            <ul>
              <li>Learning about our company and services</li>
              <li>Contacting us with inquiries</li>
              <li>Sharing our content through legitimate channels with proper attribution</li>
            </ul>

            <h3>3.2 Prohibited Activities</h3>
            <p>You agree NOT to:</p>
            <ul>
              <li>Use the website for any unlawful purpose or in violation of any applicable laws</li>
              <li>Attempt to gain unauthorised access to any part of the website, server, or connected systems</li>
              <li>Use automated scripts, bots, or scrapers to collect data from the website</li>
              <li>Interfere with or disrupt the website&apos;s functionality or servers</li>
              <li>Upload or transmit viruses, malware, or any harmful code</li>
              <li>Impersonate any person or entity, or falsely represent your affiliation</li>
              <li>Submit false or misleading information through our forms</li>
              <li>Use our name, logo, or content to mislead others or for commercial purposes without permission</li>
              <li>Engage in any activity that could damage our reputation or goodwill</li>
            </ul>

            <h2>4. Intellectual Property Rights</h2>

            <h3>4.1 Our Content</h3>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, photographs, videos, audio, reports, documents, software, and design elements (collectively, &quot;Content&quot;), is owned by or licensed to JBAF LIMITED and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3>4.2 Trademarks</h3>
            <p>
              &quot;JBAF CONSULTING,&quot; &quot;JBAF,&quot; our logo, and related marks are trademarks of JBAF LIMITED. You may not use our trademarks without prior written permission, except as necessary to fairly identify us or link to our website.
            </p>

            <h3>4.3 Limited Licence</h3>
            <p>We grant you a limited, non-exclusive, non-transferable licence to access and view the Content for personal, non-commercial purposes. This licence does not include the right to:</p>
            <ul>
              <li>Reproduce, modify, or distribute Content without permission</li>
              <li>Use Content for commercial purposes</li>
              <li>Remove any copyright, trademark, or proprietary notices</li>
              <li>Create derivative works based on our Content</li>
            </ul>

            <h3>4.4 User Submissions</h3>
            <p>
              If you submit content to us (such as contact form messages or feedback), you grant us a non-exclusive, royalty-free licence to use, reproduce, and publish such content in connection with our activities. You represent that you have the right to grant this licence.
            </p>

            <h2>5. Disclaimer of Warranties</h2>

            <h3>5.1 &quot;As Is&quot; Basis</h3>
            <p>
              This website and all Content are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>

            <h3>5.2 No Guarantee of Availability</h3>
            <p>
              We do not guarantee that the website will be available at all times, uninterrupted, secure, or error-free. We may suspend, modify, or discontinue any aspect of the website at any time without notice.
            </p>

            <h3>5.3 Accuracy of Information</h3>
            <p>
              While we strive to provide accurate and up-to-date information, we make no representations or warranties regarding the accuracy, completeness, or reliability of any Content on the website.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, JBAF LIMITED, its directors, officers, employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to:
            </p>
            <ul>
              <li>Your use or inability to use the website</li>
              <li>Any errors, inaccuracies, or omissions in the Content</li>
              <li>Unauthorised access to or alteration of your data</li>
              <li>Any third-party conduct or content on the website</li>
              <li>Any loss or damage arising from reliance on information provided</li>
            </ul>
            <p className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              Nothing in these terms excludes or limits our liability for death or personal injury arising from our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited by English law.
            </p>

            <h2>7. External Links</h2>
            <p>
              Our website may contain links to third-party websites. These links are provided for your convenience only. We have no control over and assume no responsibility for the content, privacy policies, or practices of third-party sites. Your use of linked sites is at your own risk, and you should review their terms and privacy policies.
            </p>

            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless JBAF LIMITED, its directors, officers, and employees from and against any claims, liabilities, damages, losses, or expenses (including reasonable legal fees) arising from your use of the website, violation of these Terms of Use, or infringement of any third-party rights.
            </p>

            <h2>9. Privacy</h2>
            <p>
              Your use of the website is also governed by our <a href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</a>, which describes how we collect, use, and protect your personal data.
            </p>

            <h2>10. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting to the website with an updated &quot;Last updated&quot; date. Your continued use of the website after changes are posted constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.
            </p>

            <h2>11. Governing Law and Jurisdiction</h2>
            <p>
              These Terms of Use are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from or relating to these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts of England and Wales, unless mandatory statutory provisions require otherwise.
            </p>

            <h2>12. Severability</h2>
            <p>
              If any provision of these Terms of Use is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
            </p>

            <h2>13. Entire Agreement</h2>
            <p>
              These Terms of Use, together with our <a href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</a> and <a href="/cookie-policy" className="text-primary-600 hover:underline">Cookie Policy</a>, constitute the entire agreement between you and JBAF LIMITED regarding your use of the website.
            </p>

            <h2>14. Contact Information</h2>
            <p>For questions about these Terms of Use, please contact us at:</p>
            <address className="not-italic">
              <strong>JBAF LIMITED</strong><br />
              12 West Street<br />
              Ware, England, SG12 9EE<br />
              United Kingdom<br />
              <br />
              Email: <a href="mailto:info@jbafconsult.com" className="text-primary-600 hover:underline">info@jbafconsult.com</a><br />
              Website: <a href="https://jbafconsult.com" className="text-primary-600 hover:underline">https://jbafconsult.com</a>
            </address>

            <p className="text-sm text-gray-500 mt-12 pt-8 border-t">
              © 2026 JBAF LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
