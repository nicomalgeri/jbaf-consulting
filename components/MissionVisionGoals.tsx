import { Target, Eye, TrendingUp } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from './ui/Card';

export default function MissionVisionGoals() {
  const cardClassName =
    "group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white/95 p-6 sm:p-7 lg:p-7 text-gray-900 shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition-all duration-300 ease-out transform-gpu before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%)] before:opacity-0 before:transition-opacity before:duration-300 lg:hover:-translate-y-1 lg:hover:scale-[1.01] lg:hover:border-primary-200/80 lg:hover:shadow-2xl lg:hover:shadow-blue-500/10 lg:hover:before:opacity-80";

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
      className="section-padding lg:py-12 lg:h-[calc(100vh-80px)] bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.08] tech-pattern tech-pattern-dark" />

      <div className="container-custom relative lg:h-full lg:flex lg:flex-col lg:justify-center">
        <div className="text-center mb-10 sm:mb-12 lg:mb-8">
          <h2 className="text-3xl sm:text-h2 font-heading text-white mb-4">
            Our Foundation
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-lg text-primary-100 max-w-3xl mx-auto">
            Guided by purpose, driven by excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className={`text-center ${cardClassName}`}>
                <CardHeader>
                  <div className={`${iconWrapClass} w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ease-out lg:group-hover:brightness-110 lg:group-hover:border-primary-200/80`}>
                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${iconClass} transition-transform duration-300 ease-out lg:group-hover:scale-105`} />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-gray-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[0.98rem] sm:text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
