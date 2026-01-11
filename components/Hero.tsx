'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function useCountUp(target: number, duration = 2000, shouldStart = false) {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (!shouldStart) return;
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
  }, [target, duration, shouldStart]);

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
  const count = useCountUp(value, 2000, start);

  return (
    <div className="text-center sm:text-left">
      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>
      <div className="text-[0.7rem] sm:text-sm text-gray-600 font-medium">{label}</div>
    </div>
  );
}

export default function Hero() {
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
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50/30 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />

      {/* Accent shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[auto] lg:min-h-[90vh] py-10 sm:py-16 lg:py-20">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-8"
          >
            {/* Badge - Hidden on mobile for cleaner first impression */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-100"
            >
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                Trusted by Leading Organisations
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] sm:leading-tight font-legacy"
            >
              <span className="text-gray-900">Partner with</span>{' '}
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                JBAF Consulting
              </span>{' '}
              <span className="text-gray-900">
                for{' '}
                <span className="whitespace-nowrap underline-animate text-[0.82em] sm:text-[0.88em]">
                  lasting change
                </span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-xl md:text-2xl text-gray-600 leading-relaxed"
            >
              We don't just advise—we deliver. Transform your organisation with strategic expertise and measurable results.
            </motion.p>

            {/* Key Points - More compact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-1.5 sm:space-y-3"
            >
              {[
                'Strategic delivery & operational excellence',
                'Leadership development & team empowerment',
                'Digital transformation & data insights',
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">{point}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/#services"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-8 pt-4 sm:pt-8 border-t border-gray-200"
              ref={statsRef}
            >
              <AnimatedStat value={10} suffix="+" label="Years" start={shouldStart} />
              <AnimatedStat value={100} suffix="+" label="Projects" start={shouldStart} />
              <AnimatedStat value={100} suffix="%" label="Client Satisfaction" start={shouldStart} />
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            {/* Hero image showcase */}
            <div className="relative">
              {/* Main image card */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-premium-lg border border-white/70">
                <Image
                  src="/hero-image.jpg"
                  alt="Consulting team reviewing performance data"
                  width={620}
                  height={350}
                  className="w-full h-auto object-cover"
                  sizes="(min-width: 1024px) 520px, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 via-transparent to-accent-500/10" />

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl opacity-20 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl opacity-15 blur-2xl" />
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 top-1/4 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Proven Results</div>
                    <div className="text-xs text-gray-500">Since 2010</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 bottom-1/4 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 max-w-[200px]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg">UK</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">UK Based</div>
                    <div className="text-xs text-gray-500">Global Reach</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
