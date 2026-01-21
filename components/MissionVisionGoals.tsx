'use client';

import { Target, Eye, TrendingUp } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from './ui/Card';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

export default function MissionVisionGoals() {
  const cardClassName =
    "group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200/80 bg-white/95 p-5 sm:p-6 lg:p-7 text-gray-900 shadow-sm sm:shadow-[0_8px_24px_rgba(15,23,42,0.08)] lg:shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out transform-gpu before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%)] before:opacity-0 before:transition-opacity before:duration-300 lg:hover:-translate-y-1 lg:hover:scale-[1.01] lg:hover:border-primary-200/80 lg:hover:shadow-2xl lg:hover:shadow-blue-500/10 lg:hover:before:opacity-80";

  const iconWrapClass = "bg-primary-50 border border-primary-100/80";
  const iconClass = "text-primary-600";

  const items = [
    {
      icon: Target,
      title: 'Mission',
      description:
        'Collaborate seamlessly with clients to deeply comprehend stakeholder needs and drive organisational growth',
    },
    {
      icon: Eye,
      title: 'Vision',
      description:
        'Foster an empowering environment where our clients can thrive, elevating their organisations to new sustainable heights',
    },
    {
      icon: TrendingUp,
      title: 'Goal',
      description:
        'Deliver bespoke, solution-focused expert services to guarantee our clients\' absolute satisfaction',
    },
  ] as const;

  return (
    <section
      id="about"
      className="section-padding lg:py-12 lg:h-[calc(100vh-80px)] lg:min-h-[600px] bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.08] tech-pattern tech-pattern-dark" />

      <div className="container-custom relative lg:h-full lg:flex lg:flex-col lg:justify-center">
        <ScrollReveal className="text-center mb-8 sm:mb-10 lg:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-h2 font-heading text-white mb-3 sm:mb-4">
            Our Foundation
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg text-primary-100 max-w-3xl mx-auto px-2">
            Guided by purpose, driven by excellence
          </p>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-6"
          staggerDelay={0.12}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className={`text-center h-full ${cardClassName}`}>
                  <CardHeader>
                    <div className={`${iconWrapClass} w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-all duration-300 ease-out lg:group-hover:brightness-110 lg:group-hover:border-primary-200/80`}>
                      <Icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${iconClass} transition-transform duration-300 ease-out lg:group-hover:scale-105`} />
                    </div>
                    <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-900">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-[0.98rem] lg:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
