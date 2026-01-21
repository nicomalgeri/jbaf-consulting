'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function CallToAction() {
  return (
    <section className="section-padding bg-gradient-to-br from-[#0b1630] via-[#0d2a52] to-[#0f3f73] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] tech-pattern tech-pattern-dark" />

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" distance={20}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 sm:mb-6 px-2">
              Ready to Transform Your Organisation?
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.1}>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 lg:mb-8 text-primary-100 px-2">
              Let&apos;s discuss how JBAF Consulting can help you achieve lasting change and impactful results.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.2}>
            <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-12 text-primary-100 max-w-2xl mx-auto px-2">
              Whether you&apos;re looking to optimise delivery, develop your team, or drive digital transformation,
              we&apos;re here to partner with you every step of the way.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <Button variant="accent" size="lg" className="w-full sm:w-auto text-sm sm:text-base" asChild>
                <Link href="/contact" className="inline-flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base bg-white/10 border-white text-white hover:bg-white hover:text-primary-700"
                asChild
              >
                <Link href="mailto:info@jbafconsult.com" className="inline-flex items-center justify-center">
                  Email Us
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
