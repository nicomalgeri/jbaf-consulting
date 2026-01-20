import type { Metadata } from 'next';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';
import LegalPageLayout from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Carbon Reduction Policy Statement',
  description: 'JBAF LIMITED Carbon Reduction Policy Statement. Our commitment, objectives, and measures to reduce emissions in line with the UK Net Zero 2050 target.',
  alternates: {
    canonical: `${siteUrl}/carbon-reduction-policy`,
  },
};

export default function CarbonReductionPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Carbon Reduction Policy', url: `${siteUrl}/carbon-reduction-policy` },
  ]);

  return (
    <LegalPageLayout
      title="Carbon Reduction Policy Statement"
      subtitle="JBAF LIMITED - Carbon Reduction Policy Statement"
      breadcrumbSchema={breadcrumbSchema}
    >
      <h2>1. Policy Commitment</h2>
      <p>
        JBAF LIMITED is committed to reducing its carbon footprint and supporting the UK Government&apos;s Net Zero 2050 target. As a strategic consultancy operating across HR, recruitment, and public sector frameworks, we recognise our responsibility to minimise environmental impact across all service lines, supply chains, and operational activities.
      </p>

      <h2>2. Scope</h2>
      <p>This policy applies to all JBAF LIMITED operations, including:</p>
      <ul>
        <li>Strategic HR and recruitment services</li>
        <li>Digital and compliance consulting</li>
        <li>Supplier engagement and subcontractor coordination</li>
        <li>Remote and on-site delivery across the UK and international markets</li>
      </ul>

      <h2>3. Carbon Reduction Objectives</h2>
      <ul>
        <li>Reduce Scope 1 and 2 emissions through energy-efficient practices and low-carbon technologies</li>
        <li>Minimise Scope 3 emissions by engaging sustainable suppliers and promoting virtual delivery models</li>
        <li>Embed carbon-conscious decision-making into recruitment, onboarding, and workforce planning</li>
        <li>Monitor and report emissions annually, with continuous improvement targets</li>
      </ul>

      <h2>4. Operational Measures</h2>
      <ul>
        <li>Transition to renewable energy sources for office and remote workspaces</li>
        <li>Use digital-first delivery for recruitment and HR services to reduce travel and paper usage</li>
        <li>Implement hybrid working policies to reduce commuting emissions</li>
        <li>Procure from suppliers with verified carbon reduction credentials</li>
        <li>Offset residual emissions through accredited schemes where reduction is not feasible</li>
      </ul>

      <h2>5. Supply Chain &amp; Procurement</h2>
      <ul>
        <li>All recruitment and HR suppliers must comply with JBAF&apos;s sustainability standards</li>
        <li>Contracts include clauses requiring carbon reduction reporting and low-impact service delivery</li>
        <li>Preference given to suppliers with ISO 14001, PAS 2060, or equivalent environmental credentials</li>
      </ul>

      <h2>6. Monitoring &amp; Reporting</h2>
      <ul>
        <li>Carbon impact is reviewed quarterly and reported annually</li>
        <li>KPIs include energy consumption, travel emissions, supplier compliance, and offset volumes</li>
        <li>Findings inform service design, client reporting, and framework compliance</li>
      </ul>

      <h2>7. Governance</h2>
      <ul>
        <li>The Principal Consultant oversees carbon reduction strategy and compliance</li>
        <li>All staff receive training on sustainable delivery practices</li>
        <li>Policy is reviewed annually and updated in line with legislative and framework changes</li>
      </ul>
    </LegalPageLayout>
  );
}
