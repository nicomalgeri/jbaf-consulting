import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CVSubmissionForm from '@/components/CVSubmissionForm';
import { Users, TrendingUp, Heart, Award, Globe, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Careers at JBAF Consulting | Consulting Jobs UK',
  description: 'Join JBAF Consulting and build your career in leadership development, digital transformation, and strategic consulting. We offer competitive packages, flexible working, and impactful projects across the UK.',
  keywords: [
    'consulting jobs UK',
    'management consulting careers',
    'JBAF Consulting careers',
    'business consultant jobs',
    'consulting vacancies UK',
    'leadership consulting jobs',
    'digital transformation careers',
    'consultant positions UK',
    'Hertfordshire consulting jobs',
  ],
  alternates: {
    canonical: `${siteUrl}/careers`,
  },
  openGraph: {
    title: 'Careers at JBAF Consulting | Join Our Team',
    description: 'Build your career with JBAF Consulting. Work on impactful projects, enjoy flexible working, and grow professionally with our expert team.',
    url: `${siteUrl}/careers`,
    siteName: 'JBAF Consulting',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Careers at JBAF Consulting | Consulting Jobs UK',
    description: 'Join our team of expert consultants. Competitive packages, flexible working, and impactful projects.',
  },
};

export default function CareersPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Professional Growth',
      description: 'Continuous learning opportunities and career development programmes to help you reach your full potential.',
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work alongside talented professionals in an environment that values teamwork and knowledge sharing.',
    },
    {
      icon: Briefcase,
      title: 'Impactful Projects',
      description: 'Engage with challenging projects across diverse sectors, making a real difference to organisations.',
    },
    {
      icon: Globe,
      title: 'Flexible Working',
      description: 'Enjoy hybrid working arrangements that support work-life balance and personal wellbeing.',
    },
    {
      icon: Award,
      title: 'Competitive Package',
      description: 'Attractive salary, performance bonuses, and comprehensive benefits including health insurance.',
    },
    {
      icon: Heart,
      title: 'Inclusive Environment',
      description: 'Be part of a diverse, inclusive team where every voice is heard and valued.',
    },
  ];

  // Structured data for careers page
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Careers', url: `${siteUrl}/careers` },
  ]);

  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers at JBAF Consulting',
    description: 'Career opportunities at JBAF Consulting - UK Business Consultancy',
    url: `${siteUrl}/careers`,
    mainEntity: {
      '@type': 'Organization',
      name: 'JBAF Consulting',
      url: siteUrl,
      logo: `${siteUrl}/Logo.png`,
      sameAs: [],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '12 West Street',
        addressLocality: 'Ware',
        addressRegion: 'Hertfordshire',
        postalCode: 'SG12 9EE',
        addressCountry: 'GB',
      },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.benefits'],
    },
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 sm:py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6">
              Join Our Team
            </h1>
            <p className="text-lg sm:text-xl text-primary-100">
              Build your career with JBAF Consulting and help organisations achieve
              lasting transformation. We're looking for talented consultants who are
              passionate about making an impact.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-h2 font-heading text-primary-900 mb-4">
              Why Join JBAF Consulting?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We invest in our people because they are our greatest asset
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-5 sm:p-6 hover:shadow-xl transition-shadow">
                  <div className="bg-primary-50 w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold font-heading text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Look For Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-h2 font-heading text-primary-900 mb-6 sm:mb-8 text-center">
              What We Look For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Experience & Expertise</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Proven track record in consulting or relevant sector
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Strong analytical and problem-solving skills
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Expertise in programme delivery or strategic planning
                  </li>
                </ul>
              </Card>

              <Card className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Qualities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Excellent communication and stakeholder management
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Adaptable, resilient, and client-focused mindset
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Passion for continuous learning and development
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CV Submission Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-h2 font-heading text-primary-900 mb-4">
                Submit Your Application
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">
                We're always looking for talented individuals to join our team.
                Even if we don't have a specific opening that matches your profile,
                we'd love to hear from you.
              </p>
            </div>

            <Card className="p-6 sm:p-8">
              <CVSubmissionForm />
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
