'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="section-padding bg-gradient-to-br from-[#0b1630] via-[#0d2a52] to-[#0f3f73] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] tech-pattern tech-pattern-dark" />

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
            Ready to Transform Your Organisation?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Let's discuss how JBAF Consulting can help you achieve lasting change and impactful results.
          </p>
          <p className="text-lg mb-12 text-primary-100 max-w-2xl mx-auto">
            Whether you're looking to optimize delivery, develop your team, or drive digital transformation,
            we're here to partner with you every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/contact" className="inline-flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-primary-700"
              asChild
            >
              <Link href="tel:+442073284499" className="inline-flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold font-heading mb-2">15+</div>
                <div className="text-primary-100">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold font-heading mb-2">100+</div>
                <div className="text-primary-100">Successful Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold font-heading mb-2">98%</div>
                <div className="text-primary-100">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
