import { Shield, Award, Compass, Lightbulb, Leaf } from 'lucide-react';

export default function Values() {
  const cardClassName =
    "group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 p-6 sm:p-7 lg:p-5 text-gray-900 shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out transform-gpu before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%)] before:opacity-0 before:transition-opacity before:duration-300 lg:hover:-translate-y-1 lg:hover:scale-[1.01] lg:hover:border-primary-200/80 lg:hover:shadow-2xl lg:hover:shadow-blue-500/10 lg:hover:before:opacity-80";
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
        <div className="text-center mb-12 sm:mb-16 lg:mb-10">
          <h2 className="text-3xl sm:text-h2 font-heading text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className={cardClassName}
              >
                <div className={`${iconWrapClass} w-14 h-14 sm:w-16 sm:h-16 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-5 sm:mb-6 lg:mb-4 transition-all duration-300 ease-out lg:group-hover:brightness-110 lg:group-hover:border-primary-200/80`}>
                  <Icon className={`h-7 w-7 sm:h-8 sm:w-8 lg:h-6 lg:w-6 ${iconClass} transition-transform duration-300 ease-out lg:group-hover:scale-105`} />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-lg font-semibold font-heading mb-3 lg:mb-2 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-[0.98rem] sm:text-base lg:text-sm text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
