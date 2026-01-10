import Image from 'next/image';
import Link from 'next/link';
import { getServices, getImageUrl, SanityService } from '@/sanity/lib/fetch';

// Extended type to handle fallback images
type ServiceWithFallback = SanityService & { _fallbackImage?: string };

export default async function Services() {
  const services = await getServices() as ServiceWithFallback[];

  return (
    <section
      id="services"
      className="section-padding bg-gradient-to-br from-white via-[#f6f9ff] to-[#eef3ff] relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-200/50 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 bottom-24 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary-200/40 to-transparent" />

      <div className="container-custom relative">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-h2 font-heading text-primary-900 mb-3 sm:mb-4 mobile-heading">
            Our Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Comprehensive solutions tailored to drive your organisation forward
          </p>
        </div>

        <div className="space-y-8 sm:space-y-14 lg:space-y-20">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            const imageUrl = getImageUrl(service.image, service._fallbackImage);

            return (
              <div
                key={service._id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10 lg:gap-14 items-center"
              >
                <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                    <Link href={`/services/${service.slug}`} className="block">
                      <Image
                        src={imageUrl}
                        alt={service.alt || service.title}
                        width={800}
                        height={520}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="h-full w-full object-cover aspect-[16/10] sm:aspect-auto"
                      />
                    </Link>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-primary-200/20" />
                  </div>
                </div>
                <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white/95 p-5 sm:p-8 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-semibold font-heading text-gray-900 mb-3 sm:mb-5">
                      <Link
                        href={`/services/${service.slug}`}
                        className="transition-colors hover:text-primary-600 active:text-primary-700"
                      >
                        {service.title}
                      </Link>
                    </h3>
                    <div className="text-[0.94rem] sm:text-base text-gray-600 leading-relaxed">
                      <p>{service.summary}</p>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl sm:rounded-full border border-primary-200 px-5 py-2.5 sm:py-2 text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary-700 transition-colors hover:border-primary-300 hover:text-primary-800 active:bg-primary-50"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
