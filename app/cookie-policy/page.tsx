import type { Metadata } from 'next';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';
import LegalPageLayout, { LegalLead, LegalAddress } from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn how JBAF LIMITED uses cookies on our website. This policy explains what cookies are, how we use them, and how you can manage your preferences.',
  alternates: {
    canonical: `${siteUrl}/cookie-policy`,
  },
};

function CookieTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto my-2 sm:my-3 -mx-1 sm:mx-0">
      <table className="min-w-full border border-gray-200 text-[10px] sm:text-xs md:text-sm">
        {children}
      </table>
    </div>
  );
}

export default function CookiePolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Cookie Policy', url: `${siteUrl}/cookie-policy` },
  ]);

  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="January 2026"
      breadcrumbSchema={breadcrumbSchema}
    >
      <LegalLead>
        This Cookie Policy explains how JBAF LIMITED (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) uses cookies and similar technologies on our website jbafconsult.com. This policy should be read alongside our Privacy Policy.
      </LegalLead>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work efficiently, provide information to site owners, and enhance user experience. Cookies can be &quot;first-party&quot; (set by us) or &quot;third-party&quot; (set by other services we use).
      </p>

      <h2>2. How We Obtain Your Consent</h2>
      <p>When you first visit our website, you will see a cookie consent banner. You can choose to:</p>
      <ul>
        <li><strong>Accept All</strong> – Enables all cookie categories</li>
        <li><strong>Reject All</strong> – Enables only essential cookies and deletes any existing analytics cookies</li>
        <li><strong>Manage Preferences</strong> – Granular control over each category</li>
        <li><strong>Revoke Consent</strong> – You can change your preferences at any time via the &quot;Cookie Preferences&quot; link in the footer</li>
      </ul>
      <p>Your consent preferences are stored locally in your browser and are valid for 1 year. Our current consent version is 1.0.</p>

      <h2>3. Cookies We Use</h2>

      <h3>3.1 Essential Cookies (Strictly Necessary)</h3>
      <p>
        These cookies are strictly necessary for the website to function. Essential cookies cannot be disabled as they are required for basic site functionality. They do not store personally identifiable information for marketing purposes.
      </p>
      <CookieTable>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b">Cookie Name</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b">Provider</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b hidden sm:table-cell">Purpose</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b font-mono text-[10px] sm:text-xs">jbaf_cookie_consent</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">JBAF</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b hidden sm:table-cell">Stores cookie consent preferences</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">1 year</td>
          </tr>
        </tbody>
      </CookieTable>

      <h3>3.2 Analytics Cookies (Performance)</h3>
      <p>
        Analytics cookies help us understand how visitors interact with our website by collecting and reporting information. We use Google Analytics 4 to track page views, session duration, and general usage patterns. These cookies are only set if you consent.
      </p>
      <CookieTable>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b">Cookie Name</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b">Provider</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b hidden sm:table-cell">Purpose</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b font-mono text-[10px] sm:text-xs">_ga</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">Google</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b hidden sm:table-cell">Distinguishes unique users</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">2 years</td>
          </tr>
          <tr>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b font-mono text-[10px] sm:text-xs">_ga_[ID]</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">Google</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b hidden sm:table-cell">Persists session state for GA4</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">2 years</td>
          </tr>
          <tr>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b font-mono text-[10px] sm:text-xs">_gid</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">Google</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b hidden sm:table-cell">Distinguishes users for analytics</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">24 hours</td>
          </tr>
        </tbody>
      </CookieTable>

      <h3>3.3 Marketing Cookies (Advertising)</h3>
      <p>Currently not in use. Reserved for future advertising integrations.</p>

      <h3>3.4 Preference Cookies (Functionality)</h3>
      <p>Currently not in use. Reserved for future preference storage (e.g., language, region).</p>

      <h2>4. How Your Consent is Stored</h2>
      <p>Your consent preferences are stored in the jbaf_cookie_consent cookie with the following attributes:</p>
      <ul>
        <li><strong>Format:</strong> JSON object containing category preferences and timestamp</li>
        <li><strong>Security attributes:</strong> SameSite=Lax; Secure</li>
        <li><strong>Duration:</strong> 1 year</li>
      </ul>

      <h2>5. Data Processing</h2>
      <p><strong>Analytics Data (Google Analytics 4):</strong></p>
      <ul>
        <li>IP addresses are anonymised (anonymize_ip: true)</li>
        <li>Cookies are set with secure flags (SameSite=Lax; Secure)</li>
        <li>No personally identifiable information is collected</li>
        <li>Data is used for: page views, session duration, traffic sources, device/browser information</li>
      </ul>
      <p><strong>Data Retention:</strong></p>
      <ul>
        <li>Google Analytics: 14 months (default GA4 setting)</li>
        <li>Consent cookie: 1 year</li>
      </ul>

      <h2>6. Third-Party Services</h2>
      <CookieTable>
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b">Service</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b">Purpose</th>
            <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold border-b hidden sm:table-cell">Privacy Policy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">Google Analytics</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b">Website analytics</td>
            <td className="px-3 sm:px-4 py-2 sm:py-3 border-b hidden sm:table-cell">
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                policies.google.com/privacy
              </a>
            </td>
          </tr>
        </tbody>
      </CookieTable>

      <h2>7. Managing Your Cookie Preferences</h2>
      <h3>7.1 Browser Settings</h3>
      <p>You can manage cookies through your browser settings. Most browsers allow you to:</p>
      <ul>
        <li>View what cookies are stored and delete them individually</li>
        <li>Block third-party cookies</li>
        <li>Block all cookies</li>
        <li>Delete all cookies when you close your browser</li>
      </ul>
      <p><strong>Note:</strong> Blocking all cookies may affect website functionality.</p>

      <h3>7.2 Browser-Specific Instructions</h3>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
        <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
        <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
      </ul>

      <h2>8. Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make changes, we will update the &quot;Last updated&quot; date at the top of this policy.
      </p>

      <h2>9. Contact Us</h2>
      <p>If you have questions about our use of cookies, please contact us at:</p>
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
