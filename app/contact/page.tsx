import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MapPin, Mail, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { generateBreadcrumbSchema, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with JBAF Consulting UK',
  description: 'Contact JBAF Consulting for leadership development, digital transformation, staffing, and stakeholder engagement services. Based in Ware, England, serving organisations across the UK.',
  keywords: [
    'contact JBAF Consulting',
    'UK business consultancy contact',
    'consulting enquiry',
    'Ware England consultant',
    'business transformation contact',
    'consulting services UK',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact JBAF Consulting | UK Business Consultancy',
    description: 'Get in touch with JBAF Consulting for expert consulting services. Leadership development, digital transformation, staffing, and stakeholder engagement.',
    url: `${siteUrl}/contact`,
    siteName: 'JBAF Consulting',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact JBAF Consulting | UK Business Consultancy',
    description: 'Get in touch with JBAF Consulting for expert consulting services across the UK.',
  },
};

export default function ContactPage() {
  // Structured data for contact page
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Contact', url: `${siteUrl}/contact` },
  ]);

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact JBAF Consulting',
    description: 'Contact page for JBAF Consulting - UK Business Consultancy',
    url: `${siteUrl}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'JBAF Consulting',
      email: 'info@jbafconsult.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '12 West Street',
        addressLocality: 'Ware',
        addressRegion: 'England',
        postalCode: 'SG12 9EE',
        addressCountry: 'GB',
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-16 sm:py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6">
              Get in Touch
            </h1>
            <p className="text-lg sm:text-xl text-primary-100">
              Ready to transform your organisation? Let's start a conversation about how
              JBAF Consulting can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Reach out through any of these channels.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 p-2.5 rounded-lg shrink-0">
                      <MapPin className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">12 West Street</p>
                      <p className="text-sm text-gray-500">Ware, England, SG12 9EE</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 p-2.5 rounded-lg shrink-0">
                      <Mail className="h-5 w-5 text-primary-600" />
                    </div>
                    <a
                      href="mailto:info@jbafconsult.com"
                      className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      info@jbafconsult.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary-100 p-2.5 rounded-lg shrink-0">
                      <Clock className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-500">Sat - Sun: Closed</p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8 sm:p-10 lg:p-12 shadow-lg border-0 bg-white">
                <div className="mb-8 sm:mb-10">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-gray-900 mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600">
                    Fill out the form below and we'll get back to you.
                  </p>
                </div>
                <ContactForm />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
