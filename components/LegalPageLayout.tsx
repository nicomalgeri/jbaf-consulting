import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: React.ReactNode;
  breadcrumbSchema?: object;
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  children,
  breadcrumbSchema,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <Header />

      {/* Hero Section - Clean, minimal header */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06] tech-pattern tech-pattern-dark" />

        <div className="container-custom relative py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-200 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{title}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-heading mb-2 sm:mb-3 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base md:text-lg text-primary-100 mb-2">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <p className="text-xs sm:text-sm text-primary-300">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Content Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-10 lg:p-12">
              <div className="prose prose-gray max-w-none
                prose-headings:font-heading prose-headings:text-gray-900
                prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:md:text-2xl prose-h2:lg:text-3xl prose-h2:font-bold prose-h2:mt-6 prose-h2:sm:mt-8 prose-h2:md:mt-10 prose-h2:mb-3 prose-h2:sm:mb-4 prose-h2:first:mt-0
                prose-h3:text-base prose-h3:sm:text-lg prose-h3:md:text-xl prose-h3:font-semibold prose-h3:mt-4 prose-h3:sm:mt-5 prose-h3:md:mt-6 prose-h3:mb-2 prose-h3:sm:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-xs prose-p:sm:text-sm prose-p:md:text-base prose-p:my-2 prose-p:sm:my-3
                prose-li:text-gray-600 prose-li:text-xs prose-li:sm:text-sm prose-li:md:text-base prose-li:my-0.5
                prose-ul:my-2 prose-ul:sm:my-3 prose-ul:md:my-4 prose-ul:pl-4 prose-ul:sm:pl-5
                prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-semibold
              ">
                {children}
              </div>
            </div>

            {/* Footer note */}
            <p className="text-center text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8">
              &copy; {new Date().getFullYear()} JBAF LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Reusable styled components for legal content
export function LegalLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 md:mb-8 pb-4 sm:pb-6 md:pb-8 border-b border-gray-100">
      {children}
    </p>
  );
}

export function LegalAddress({ children }: { children: React.ReactNode }) {
  return (
    <address className="not-italic bg-gray-50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
      {children}
    </address>
  );
}

export function LegalHighlight({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'success' | 'warning' }) {
  const variants = {
    info: 'bg-primary-50 border-primary-200 text-primary-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
  };

  return (
    <div className={`p-3 sm:p-4 rounded-lg border text-xs sm:text-sm md:text-base ${variants[variant]}`}>
      {children}
    </div>
  );
}
