import { Quote } from 'lucide-react';
import { Card } from './ui/Card';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      position: 'Director of Operations',
      company: 'Thames Valley Healthcare Trust',
      quote: 'JBAF\'s embedded approach transformed our programme delivery. Their consultants integrated seamlessly into our team, providing the strategic leadership we needed to navigate complex operational challenges. The measurable impact on our service outcomes has been remarkable.',
    },
    {
      name: 'James Richardson',
      position: 'Chief Technology Officer',
      company: 'Apex Financial Services Ltd',
      quote: 'Working with JBAF on our digital transformation was a game-changer. Their data-driven insights and systematic approach to digitising our operations gave us the competitive edge we were looking for. They truly understand how to turn information into strategic assets.',
    },
    {
      name: 'Dr. Emily Chen',
      position: 'Head of Organisational Development',
      company: 'Meridian University',
      quote: 'The leadership development programme JBAF designed for our management team exceeded all expectations. Their coaching methodology is both practical and transformative, resulting in stronger collaboration and significantly improved team performance across the institution.',
    },
    {
      name: 'Marcus Thompson',
      position: 'Managing Director',
      company: 'Sterling Construction Group',
      quote: 'JBAF\'s staffing solutions helped us build a high-performing team during a critical growth phase. Their insight-led approach to talent placement ensured every appointment aligned with our strategic objectives. The quality and retention of candidates they provided has been exceptional.',
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-white via-[#f4f7ff] to-[#eaf2ff] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />

      <div className="container-custom relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-h2 font-heading text-primary-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by organisations across sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <div className="p-6 sm:p-7 md:p-8">
                <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-primary-200 mb-4" />
                <p className="text-[0.98rem] sm:text-base text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {(() => {
                          const [first, last] = testimonial.name.split(' ');
                          return `${first} ${last?.[0] ?? ''}.`;
                        })()}
                      </h4>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
