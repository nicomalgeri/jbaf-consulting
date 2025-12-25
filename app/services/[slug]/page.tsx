import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services, getServiceBySlug } from '@/lib/services';

type ServicePageParams = {
  slug: string;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServicePageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service - JBAF Consulting',
      description: 'Explore JBAF Consulting services.',
    };
  }

  return {
    title: `${service.title} - JBAF Consulting`,
    description: service.summary,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<ServicePageParams>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="absolute inset-0 opacity-[0.12] tech-pattern tech-pattern-dark" />
        <div className="container-custom relative py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-200 mb-4">
              Service
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6">
              {service.title}
            </h1>
            <p className="text-lg sm:text-xl text-primary-100">{service.summary}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-br from-white via-[#f6f9ff] to-[#eef3ff] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />
        <div className="container-custom relative">
          <div className="mx-auto max-w-5xl">
            <div className="reveal-card relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] lg:divide-x lg:divide-gray-200/70">
                <div className="relative min-h-[200px] sm:min-h-[240px] lg:min-h-[320px]">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary-900/20 via-transparent to-primary-200/20" />
                </div>

                <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500/80 mb-3">
                    Overview
                  </p>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold font-heading text-gray-900 mb-4">
                    Service overview
                  </h2>
                  <div className="space-y-3 text-gray-600 leading-relaxed text-[0.98rem] md:text-base">
                    {service.details.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
