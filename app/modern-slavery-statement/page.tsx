import type { Metadata } from 'next';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';
import LegalPageLayout, { LegalLead, LegalAddress, LegalHighlight } from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Modern Slavery Statement',
  description: 'JBAF LIMITED Modern Slavery and Human Trafficking Statement. Our commitment to preventing slavery and human trafficking in our operations and supply chain.',
  alternates: {
    canonical: `${siteUrl}/modern-slavery-statement`,
  },
};

export default function ModernSlaveryStatementPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Modern Slavery Statement', url: `${siteUrl}/modern-slavery-statement` },
  ]);

  return (
    <LegalPageLayout
      title="Modern Slavery Statement"
      subtitle="Modern Slavery and Human Trafficking Statement"
      lastUpdated="Financial year ending 31 January 2024"
      breadcrumbSchema={breadcrumbSchema}
    >
      <h2>1. Introduction</h2>
      <p>
        This Modern Slavery and Human Trafficking Statement is a response to Section 54(1), Part 6 of the Modern Slavery Act 2015 and relates to actions and activities for the financial year ending 31 January 2024.
      </p>
      <p>
        JBAF LIMITED (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;) is committed to preventing slavery and human trafficking violations in its own operations, its supply chain, and its products. We have zero-tolerance towards slavery and require our supply chain to comply with our values.
      </p>

      <h2>2. Organisational Structure</h2>
      <p>
        JBAF LIMITED is a private limited company incorporated in England and Wales, with business operations in the United Kingdom.
      </p>
      <p>
        We operate in the Consulting sector. We work with a trusted network of suppliers and partners to deliver high-quality consulting, digital transformation, and project management services. Our supply chain includes:
      </p>
      <ul>
        <li>Professional service providers</li>
        <li>Technology and IT partners</li>
        <li>Accredited trainers</li>
        <li>Subcontractors for site works</li>
        <li>Compliance consultants</li>
        <li>Marketing specialists</li>
      </ul>
      <p>
        All partners are carefully selected based on quality, compliance, sustainability, and value. Our supply chain is selected based on their expertise, track record, and alignment with our commitment to quality, innovation, and integrity.
      </p>
      <p>
        For more information about us, please visit our website:{' '}
        <a href="https://jbafconsult.com">www.jbafconsult.com</a>
      </p>

      <h2>3. Policies</h2>
      <p>
        We operate a number of internal policies to ensure that we are conducting business in an ethical and transparent manner. These include the following:
      </p>

      <h3>3.1 Recruitment and Selection Policy</h3>
      <p>
        Our recruitment and selection policy includes robust measures to prevent modern slavery. We conduct right-to-work checks, avoid recruitment fees, ensure transparency in employment terms, and work only with reputable recruitment agencies. Staff involved in hiring are trained to spot signs of exploitation, and we regularly review our processes to uphold ethical and lawful recruitment practices.
      </p>

      <h3>3.2 Supplier Code of Conduct</h3>
      <p>
        Our Supplier Code of Conduct explicitly prohibits all forms of modern slavery, including forced labour, human trafficking, and child labour. Suppliers are required to:
      </p>
      <ul>
        <li>Comply with the Modern Slavery Act 2015 and all relevant labour laws</li>
        <li>Ensure that employment is freely chosen, and workers are not coerced, bonded, or forced to work under threat</li>
        <li>Provide transparent employment terms, fair wages, and safe working conditions</li>
        <li>Prohibit the use of recruitment fees that could lead to debt bondage</li>
        <li>Monitor their own supply chains to prevent exploitation at any level</li>
      </ul>
      <p>
        We expect all suppliers to implement ethical labour practices and conduct regular audits. Failure to comply with these standards may result in termination of the business relationship.
      </p>

      <h3>3.3 Whistleblowing Policy</h3>
      <p>
        The whistleblowing policy provides a safe and confidential way for staff and third parties to report concerns related to modern slavery. It encourages early reporting of any suspected exploitation, forced labour, or unethical practices within the organisation or supply chain. Reports can be made without fear of retaliation, and all concerns are investigated promptly and fairly. This proactive approach helps identify and address issues before they escalate, supporting our commitment to preventing modern slavery.
      </p>

      <h3>3.4 Staff Code of Conduct</h3>
      <p>
        The staff code of conduct sets clear expectations for ethical behaviour and helps prevent modern slavery by promoting respect, transparency, and accountability. Staff are required to treat all individuals with dignity, report any concerns about exploitation or unethical practices, and comply with laws related to labour rights and human trafficking. The code reinforces a zero-tolerance approach to modern slavery and encourages vigilance in identifying and addressing any suspicious activity within the organisation or its supply chain.
      </p>

      <h3>3.5 Procurement Policy</h3>
      <p>
        The procurement policy helps prevent modern slavery by ensuring that all suppliers and contractors uphold ethical labour practices. It requires due diligence checks on suppliers, including compliance with the Modern Slavery Act 2015, and prioritises working with organisations that demonstrate transparency in their supply chains. The policy prohibits the use of suppliers involved in forced labour, child labour, or human trafficking, and includes clauses in contracts requiring adherence to anti-slavery standards. Regular reviews and risk assessments are carried out to monitor compliance and address any concerns promptly.
      </p>

      <h3>3.6 Safeguarding Policy</h3>
      <p>
        The safeguarding policy plays a vital role in preventing modern slavery by creating a culture of vigilance, protection, and early intervention. It ensures that staff and volunteers are trained to spot the signs of exploitation, including physical, emotional, or behavioural indicators linked to trafficking or forced labour. The policy sets out clear procedures for reporting concerns and working with relevant authorities to safeguard individuals at risk. By embedding a safeguarding-first approach in all activities, the organisation helps prevent vulnerable people from falling into exploitative situations.
      </p>

      <p>We make sure our suppliers are aware of our policies and adhere to the same standards.</p>

      <h2>4. Due Diligence</h2>
      <p>
        As part of our efforts to monitor and reduce the risk of slavery and human trafficking occurring in our supply chains, we have adopted the following due diligence procedures:
      </p>
      <ul>
        <li>Internal supplier audits</li>
        <li>External supplier audits</li>
      </ul>
      <p>Our due diligence procedures aim to:</p>
      <ul>
        <li>Identify and action potential risks in our business and supply chains</li>
        <li>Monitor potential risks in our business and supply chains</li>
        <li>Reduce the risk of slavery and human trafficking occurring in our business and supply chains</li>
        <li>Provide protection for whistleblowers</li>
      </ul>

      <h2>5. Risk and Compliance</h2>
      <p>
        We have evaluated the nature and extent of our exposure to the risk of slavery and human trafficking occurring in our UK supply chain through reviewing on a regular basis all aspects of the supply chain based on supply chain mapping.
      </p>
      <p>
        We do not consider that we operate in a high-risk environment due to the nature of our professional services sector and our UK-based operations.
      </p>
      <LegalHighlight variant="warning">
        <strong>Zero Tolerance:</strong> We do not tolerate slavery and human trafficking in our supply chains. Where there is evidence of failure to comply with our policies and procedures by any of our suppliers, we will seek to terminate our relationship with that supplier immediately.
      </LegalHighlight>

      <h2>6. Effectiveness</h2>
      <p>
        We use Key Performance Indicators (KPIs) to measure our effectiveness and ensure that slavery and human trafficking is not taking place in our business and supply chains. These KPIs are as follows:
      </p>
      <ul>
        <li>We will train our staff about modern slavery issues and increase awareness</li>
        <li>We will carry out a regular audit of suppliers - 50% of suppliers each year</li>
      </ul>

      <h2>7. Training Staff</h2>
      <p>
        We require our staff to complete training and ongoing refresher courses on slavery and human trafficking. Our training covers:
      </p>
      <ul>
        <li>How to identify the signs of slavery and human trafficking</li>
        <li>What initial steps should be taken if slavery or human trafficking is suspected</li>
        <li>How to escalate potential slavery or human trafficking issues to the relevant parties within the business</li>
        <li>What external help is available</li>
        <li>What steps we should take if suppliers in our supply chain do not implement anti-slavery policies in high-risk scenarios, including their removal from our supply chain</li>
      </ul>

      <h2>8. Approval</h2>
      <p>This statement was approved by:</p>
      <p>
        <strong>Joseph Ajayi</strong><br />
        Director, JBAF LIMITED
      </p>

      <h2>9. Contact Information</h2>
      <p>For questions about this Modern Slavery Statement, please contact us at:</p>
      <LegalAddress>
        <strong>JBAF LIMITED</strong><br />
        12 West Street<br />
        Ware, England, SG12 9EE<br />
        United Kingdom<br />
        <br />
        Email: <a href="mailto:info@jbafconsult.com">info@jbafconsult.com</a><br />
        Website: <a href="https://jbafconsult.com">https://jbafconsult.com</a>
      </LegalAddress>
    </LegalPageLayout>
  );
}
