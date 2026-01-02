'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

function useCountUp(target: number, duration = 2400, start = false) {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (!start) return;
    let start: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const nextValue = Math.max(1, Math.round(progress * target));
      setValue(nextValue);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frameId);
  }, [target, duration, start]);

  return value;
}

function AnimatedStat({
  value,
  suffix = '',
  label,
  start,
}: {
  value: number;
  suffix?: string;
  label: string;
  start: boolean;
}) {
  const count = useCountUp(value, 2400, start);

  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-primary-100">{label}</div>
    </div>
  );
}

export default function CallToAction() {
  const [shouldStart, setShouldStart] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-gradient-to-br from-[#0b1630] via-[#0d2a52] to-[#0f3f73] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] tech-pattern tech-pattern-dark" />

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-6">
            Ready to Transform Your Organisation?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-primary-100">
            Let's discuss how JBAF Consulting can help you achieve lasting change and impactful results.
          </p>
          <p className="text-base sm:text-lg mb-8 sm:mb-12 text-primary-100 max-w-2xl mx-auto">
            Whether you're looking to optimize delivery, develop your team, or drive digital transformation,
            we're here to partner with you every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="accent" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/contact" className="inline-flex items-center">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary-700"
              asChild
            >
              <Link href="tel:+442073284499" className="inline-flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div
            ref={statsRef}
            className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-white/20"
          >
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <AnimatedStat
                value={10}
                suffix="+"
                label="Years Experience"
                start={shouldStart}
              />
              <AnimatedStat
                value={30}
                suffix="+"
                label="Projects Delivered"
                start={shouldStart}
              />
              <AnimatedStat
                value={100}
                label="Organisations Supported"
                start={shouldStart}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
