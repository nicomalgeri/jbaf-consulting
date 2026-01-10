import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Our Story | About JBAF Consulting UK Consultancy',
  description: 'Discover the story behind JBAF Consulting. Learn how we bridge the gap between strategic planning and real-world execution, helping organisations achieve lasting transformation.',
  keywords: [
    'JBAF Consulting story',
    'UK consultancy about',
    'business consulting UK',
    'strategic execution',
    'Joseph Ajayi',
    'consulting company history',
  ],
  alternates: {
    canonical: `${siteUrl}/our-story`,
  },
  openGraph: {
    title: 'Our Story | JBAF Consulting',
    description: 'From ambition to execution - discover how JBAF Consulting helps organisations achieve lasting transformation.',
    url: `${siteUrl}/our-story`,
    siteName: 'JBAF Consulting',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Our Story | JBAF Consulting',
    description: 'From ambition to execution - discover how JBAF Consulting helps organisations achieve lasting transformation.',
  },
};

export default function OurStoryPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Our Story', url: `${siteUrl}/our-story` },
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-200 mb-4">
              About Us
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6">
              Our Story
            </h1>
            <p className="text-lg sm:text-xl text-primary-100">
              From ambition to execution — how we help organisations achieve lasting transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Founder Section */}
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 mb-16">
              <div className="relative">
                <div className="relative aspect-[4/5] max-w-[280px] mx-auto">
                  {/* Decorative elements */}
                  <div className="absolute -top-3 -left-3 w-20 h-20 bg-primary-100 rounded-xl -z-10" />
                  <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-accent-100 rounded-xl -z-10" />

                  {/* Main image */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src="/Joseph-Ajayi.png"
                      alt="Joseph Ajayi - Founder of JBAF Consulting"
                      fill
                      sizes="280px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
                <div className="text-center mt-6">
                  <p className="font-semibold text-gray-900 text-lg">Joseph Ajayi</p>
                  <p className="text-primary-600">Founder & Director</p>
                </div>
              </div>

              <div className="prose prose-lg prose-gray max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed">
                  At JBAF Consulting, we began with a simple observation: many organisations
                  have the ambition to change, but few have the capacity to execute. We realised
                  that the world doesn't need more reports—it needs more results. That is why
                  we don't just advise; we deliver.
                </p>
              </div>
            </div>

            {/* Story Content */}
            <div className="prose prose-lg prose-gray max-w-none space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 mt-0">
                Bridging Strategy and Execution
              </h2>
              <p>
                As a UK-based consultancy, we serve as the bridge between strategic planning
                and real-world execution. We partner with organisations navigating the headwinds
                of complexity, change, and growth, working shoulder-to-shoulder with leaders to
                solve their most pressing challenges. Whether it is refining a high-level strategy,
                scaling delivery, or unlocking operational resilience, we lead from within.
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">
                Our Approach
              </h2>
              <p>
                Our approach is deeply personal and entirely tailored. We don't believe in
                "off-the-shelf" fixes. Instead, we diagnose specific bottlenecks and design
                fit-for-purpose solutions that create sustainable change. By embedding experienced
                consultants directly into client teams, we bring clarity to the boardroom and
                momentum to the frontline.
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900">
                Our Reputation
              </h2>
              <p>
                Today, JBAF Consulting is defined by a reputation for trusted partnership and
                measurable value. We empower the organisations we work with to move forward—faster,
                smarter, and stronger.
              </p>

              {/* Quote Block */}
              <blockquote className="relative bg-gradient-to-br from-primary-50 to-primary-100/50 border-l-4 border-primary-500 p-6 sm:p-8 rounded-r-xl my-12 not-prose">
                <p className="text-lg sm:text-xl text-gray-700 italic leading-relaxed">
                  "The world doesn't need more reports—it needs more results. That is why
                  we don't just advise; we deliver."
                </p>
                <footer className="mt-4">
                  <p className="font-semibold text-gray-900">Joseph Ajayi</p>
                  <p className="text-sm text-gray-600">Founder & Director, JBAF Consulting</p>
                </footer>
              </blockquote>
            </div>

            {/* Values Summary */}
            <div className="mt-16 pt-16 border-t border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-gray-900 text-center mb-8">
                What Defines Us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Results-Driven', desc: 'We focus on outcomes, not just outputs' },
                  { title: 'Embedded Partnership', desc: 'Working alongside your teams' },
                  { title: 'Tailored Solutions', desc: 'No off-the-shelf fixes' },
                  { title: 'Trusted Advisors', desc: 'Building lasting relationships' },
                ].map((item, index) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
