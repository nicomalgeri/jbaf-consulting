import { Quote } from 'lucide-react';
import { Card } from './ui/Card';
import { getTestimonials } from '@/sanity/lib/fetch';
import TestimonialsAnimationWrapper from './TestimonialsAnimationWrapper';

// Fallback testimonials data
const fallbackTestimonials = [
  {
    _id: '1',
    name: 'Sarah Mitchell',
    position: 'Director of Operations',
    company: 'Thames Valley Healthcare Trust',
    quote: 'JBAF\'s embedded approach transformed our programme delivery. Their consultants integrated seamlessly into our team, providing the strategic leadership we needed to navigate complex operational challenges. The measurable impact on our service outcomes has been remarkable.',
  },
  {
    _id: '2',
    name: 'James Richardson',
    position: 'Chief Technology Officer',
    company: 'Apex Financial Services Ltd',
    quote: 'Working with JBAF on our digital transformation was a game-changer. Their data-driven insights and systematic approach to digitising our operations gave us the competitive edge we were looking for. They truly understand how to turn information into strategic assets.',
  },
  {
    _id: '3',
    name: 'Dr. Emily Chen',
    position: 'Head of Organisational Development',
    company: 'Meridian University',
    quote: 'The leadership development programme JBAF designed for our management team exceeded all expectations. Their coaching methodology is both practical and transformative, resulting in stronger collaboration and significantly improved team performance across the institution.',
  },
  {
    _id: '4',
    name: 'Marcus Thompson',
    position: 'Managing Director',
    company: 'Sterling Construction Group',
    quote: 'JBAF\'s staffing solutions helped us build a high-performing team during a critical growth phase. Their insight-led approach to talent placement ensured every appointment aligned with our strategic objectives. The quality and retention of candidates they provided has been exceptional.',
  },
];

export default async function Testimonials() {
  let testimonials = await getTestimonials();

  // Use fallback if no Sanity data
  if (!testimonials || testimonials.length === 0) {
    testimonials = fallbackTestimonials;
  }

  return (
    <section className="section-padding bg-gradient-to-br from-white via-[#f4f7ff] to-[#eaf2ff] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />

      <div className="container-custom relative">
        <TestimonialsAnimationWrapper type="header">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-h2 font-heading text-primary-900 mb-3 sm:mb-4">
              What Our Clients Say
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Trusted by organisations across sectors
            </p>
          </div>
        </TestimonialsAnimationWrapper>

        <TestimonialsAnimationWrapper type="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialsAnimationWrapper key={testimonial._id} type="card" index={index}>
                <Card className="h-full shadow-sm sm:shadow hover:shadow-md sm:hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 sm:p-6 lg:p-8">
                    <Quote className="h-5 w-5 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-primary-200 mb-2 sm:mb-4" />
                    <p className="text-sm sm:text-[0.94rem] lg:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="border-t border-gray-200 pt-3 sm:pt-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-xs sm:text-base lg:text-lg">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            {(() => {
                              const [first, last] = testimonial.name.split(' ');
                              return `${first} ${last?.[0] ?? ''}.`;
                            })()}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TestimonialsAnimationWrapper>
            ))}
          </div>
        </TestimonialsAnimationWrapper>
      </div>
    </section>
  );
}
