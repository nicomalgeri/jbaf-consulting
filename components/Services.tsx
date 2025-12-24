'use client';

export default function Services() {
  const services = [
    {
      title: 'Leadership & Team Development',
      image: '/services-leadership.jpg',
      alt: 'Leadership and team development session',
      description: [
        'We design practical programmes that build confident leaders and high-performing teams. Through coaching and targeted workshops, we strengthen capability, align teams, and turn insight into action—driving measurable performance and lasting impact.',
      ],
    },
    {
      title: 'Staffing',
      image: '/services-staffing.png',
      alt: 'Strategic staffing and workforce planning',
      description: [
        'We deliver insight-led staffing solutions aligned to your strategic and operational goals. Beyond recruitment, we support workforce planning to build resilient, future-ready teams that strengthen delivery and accelerate transformation.',
      ],
    },
    {
      title: 'Digital Transformation & Insights',
      image: '/services-digital.jpg',
      alt: 'Digital transformation analytics',
      description: [
        'We unlock actionable insight through data, analytics, and digitised operations. By integrating systems and transforming data into intelligence, we improve decision-making, performance, and service quality—securely and responsibly.',
      ],
    },
    {
      title: 'Corporate Communication & Stakeholder Engagement',
      image: '/services-communication.jpg',
      alt: 'Corporate communication strategy',
      description: [
        'We help organisations communicate with clarity and credibility. From strategy and messaging to campaigns and engagement, we align narratives, strengthen relationships, and ensure stakeholders stay informed, connected, and invested.',
      ],
    },
  ];

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
        <div className="text-center mb-16">
          <h2 className="text-h2 font-heading text-primary-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions tailored to drive your organisation forward
          </p>
        </div>

        <div className="space-y-16 lg:space-y-20">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center"
              >
                <div className={`${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-primary-200/20" />
                  </div>
                </div>
                <div className={`${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="rounded-3xl border border-gray-200/80 bg-white/95 p-8 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                    <h3 className="text-2xl md:text-3xl font-semibold font-heading text-gray-900 mb-5">
                      {service.title}
                    </h3>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      {service.description.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
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
