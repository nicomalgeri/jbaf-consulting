'use client';

import Image from 'next/image';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const partners = [
  {
    name: 'NHS',
    logo: '/Icons/NHS.png',
    width: 200,
    height: 80,
  },
  {
    name: 'Cirrus Consortium',
    logo: '/Icons/Cirrus-Consortium.jpeg',
    width: 260,
    height: 90,
  },
  {
    name: 'Cyber Essentials',
    logo: '/Icons/cyber-essentials.png',
    width: 220,
    height: 90,
  },
] as const;

export default function Partners() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] tech-pattern tech-pattern-light" />
      <div className="container-custom relative">
        <ScrollReveal className="text-center mb-8 sm:mb-10 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-h2 font-heading text-gray-900 mb-3 sm:mb-4">
            Our Partners
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Trusted by organisations who value practical, outcome-focused support.
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 items-center justify-items-center"
          staggerDelay={0.1}
        >
          {partners.map((partner) => (
            <StaggerItem key={partner.name} className="w-full">
              <div className="flex min-h-[80px] sm:min-h-[100px] lg:min-h-[110px] w-full items-center justify-center rounded-xl sm:rounded-2xl border border-gray-200/70 bg-white/90 px-4 sm:px-8 py-4 sm:py-6 shadow-sm sm:shadow-[0_8px_24px_rgba(15,23,42,0.06)] lg:shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition-transform duration-300 sm:hover:scale-[1.02]">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className={`w-auto max-w-[140px] sm:max-w-none object-contain ${
                    partner.name === 'Cyber Essentials' ? 'h-10 sm:h-14 lg:h-16' : 'h-9 sm:h-12 lg:h-14'
                  }`}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
