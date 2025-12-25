import { Target, Eye, TrendingUp } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from './ui/Card';

export default function MissionVisionGoals() {
  const cardClassName =
    "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary-700/90 via-primary-600/85 to-primary-500/90 p-6 sm:p-7 lg:p-7 text-white shadow-[0_18px_45px_rgba(15,23,42,0.35)] transition-all duration-300 ease-out transform-gpu before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)] before:opacity-70 before:transition-opacity before:duration-300 lg:hover:-translate-y-1 lg:hover:scale-[1.01] lg:hover:border-white/20 lg:hover:shadow-2xl lg:hover:shadow-blue-500/10 lg:hover:before:opacity-90";

  const items = [
    {
      icon: Target,
      title: 'Mission',
      description:
        'Collaborate seamlessly with clients to deeply comprehend stakeholder needs and drive organisational growth',
      color: 'text-white',
      bgColor: 'bg-white/10 border border-white/10',
    },
    {
      icon: Eye,
      title: 'Vision',
      description:
        'Foster an empowering environment where our clients can thrive, elevating their organisations to new sustainable heights',
      color: 'text-white',
      bgColor: 'bg-white/10 border border-white/10',
    },
    {
      icon: TrendingUp,
      title: 'Goal',
      description:
        'Deliver bespoke, solution-focused expert services to guarantee our clients\' absolute satisfaction',
      color: 'text-white',
      bgColor: 'bg-white/10 border border-white/10',
    },
  ] as const;

  return (
    <section
      id="about"
      className="section-padding lg:py-12 lg:h-[calc(100vh-80px)] bg-gradient-to-b from-[#0a1428] via-[#0b1e39] to-[#0c2849] text-white relative overflow-hidden"
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
                  <div className={`${item.bgColor} w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm transition-all duration-300 ease-out lg:group-hover:brightness-110 lg:group-hover:border-white/20`}>
                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${item.color} transition-transform duration-300 ease-out lg:group-hover:scale-105`} />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[0.98rem] sm:text-base text-primary-100 leading-relaxed">
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
