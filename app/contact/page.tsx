import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'Contact Us - JBAF Consulting',
  description: 'Get in touch with JBAF Consulting. We\'re here to help you transform your organisation.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-100">
              Ready to transform your organisation? Let's start a conversation about how
              JBAF Consulting can help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  We're here to help. Reach out to us through any of the following channels.
                </p>
              </div>

              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">
                        City Road<br />
                        London EC1V 2NX<br />
                        United Kingdom
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">
                        <a href="tel:+442073284499" className="hover:text-primary-500 transition-colors">
                          +44-20-7328-4499
                        </a>
                        <br />
                        <a href="tel:+9934878989" className="hover:text-primary-500 transition-colors">
                          +99-34-8878-9989
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a
                        href="mailto:info@jbafconsult.com"
                        className="text-gray-600 hover:text-primary-500 transition-colors"
                      >
                        info@jbafconsult.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-50 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                  Send Us a Message
                </h2>
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
