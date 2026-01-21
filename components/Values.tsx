'use client';

import { Shield, Award, Compass, Lightbulb, Leaf } from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function Values() {
  const cardClassName =
    "group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white/95 p-5 sm:p-6 lg:p-5 text-gray-900 shadow-sm sm:shadow-[0_8px_24px_rgba(15,23,42,0.08)] lg:shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out transform-gpu before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%)] before:opacity-0 before:transition-opacity before:duration-300 lg:hover:-translate-y-1 lg:hover:scale-[1.01] lg:hover:border-primary-200/80 lg:hover:shadow-2xl lg:hover:shadow-blue-500/10 lg:hover:before:opacity-80";
  const iconWrapClass = "bg-primary-50 border border-primary-100/80";
  const iconClass = "text-primary-600";

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold professionalism, transparency, and ethical clarity—earning trust through every engagement.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We deliver industry-leading outcomes, driven by mastery, precision, and impact.',
    },
    {
      icon: Compass,
      title: 'Independence',
      description: 'We apply objective thinking and reflective insight to shape practical, solution-focused results.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embed innovation into management practice, leveraging global intelligence for consistent value.',
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We build client capability for lasting success—fostering resilient partnerships grounded in trust and continuous improvement.',
    },
  ] as const;

  return (
    <section className="section-padding lg:py-12 bg-gradient-to-br from-white via-[#f6f9ff] to-[#eef3ff] text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />

      <div className="container-custom relative">
        <ScrollReveal className="text-center mb-8 sm:mb-12 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-h2 font-heading text-gray-900 mb-3 sm:mb-4">
            Our Core Values
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            The principles that guide everything we do
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-4"
          staggerDelay={0.08}
        >
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={index}>
                <div className={`h-full ${cardClassName}`}>
                  <div className={`${iconWrapClass} w-11 h-11 sm:w-12 sm:h-12 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-4 sm:mb-5 lg:mb-4 transition-all duration-300 ease-out lg:group-hover:brightness-110 lg:group-hover:border-primary-200/80`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-6 lg:w-6 ${iconClass} transition-transform duration-300 ease-out lg:group-hover:scale-105`} />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-lg font-semibold font-heading mb-2 sm:mb-3 lg:mb-2 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-[0.94rem] lg:text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
