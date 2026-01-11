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
    <div className="text-center">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
        {count}
        {suffix}
      </div>
      <div className="text-[0.7rem] sm:text-sm lg:text-base text-gray-600 font-medium">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [shouldStart, setShouldStart] = useState(false);
  const mobileStatsRef = useRef<HTMLDivElement | null>(null);
  const desktopStatsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mobileNode = mobileStatsRef.current;
    const desktopNode = desktopStatsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldStart(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );

    if (mobileNode) observer.observe(mobileNode);
    if (desktopNode) observer.observe(desktopNode);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50/30 overflow-hidden lg:h-[calc(100vh-80px)] lg:min-h-[600px]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />

      {/* Accent shapes */}
      <div className="absolute top-20 right-0 w-72 h-72 lg:w-96 lg:h-96 bg-accent-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 lg:w-[500px] lg:h-[500px] bg-primary-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative h-full">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[auto] lg:h-full py-10 sm:py-16 lg:py-8">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-5 lg:space-y-5"
          >
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.1] font-legacy"
            >
              <span className="text-gray-900">Partner with</span>{' '}
              <span className="whitespace-nowrap bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                JBAF Consulting
              </span>{' '}
              <span className="whitespace-nowrap text-gray-900 text-[0.82em] sm:text-[0.88em]">
                for{' '}
                <span className="underline-animate">
                  lasting change
                </span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl lg:text-xl text-gray-600 leading-relaxed max-w-2xl"
            >
              We don't just advise—we deliver. Transform your organisation with strategic expertise and measurable results.
            </motion.p>

            {/* Key Points - More compact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-1.5 sm:space-y-2 lg:space-y-2"
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
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
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

            {/* Trust Indicators - Mobile/Tablet only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 sm:pt-5 border-t border-gray-200 lg:hidden"
              ref={mobileStatsRef}
            >
              <AnimatedStat value={10} suffix="+" label="Years" start={shouldStart} />
              <AnimatedStat value={100} suffix="+" label="Projects" start={shouldStart} />
              <AnimatedStat value={100} suffix="%" label="Customer Satisfaction" start={shouldStart} />
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex lg:flex-col lg:items-center lg:justify-center"
          >
            {/* Hero image showcase */}
            <div className="relative w-full max-w-xl xl:max-w-2xl">
              {/* Main image card */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-premium-lg border border-white/70">
                <Image
                  src="/hero-image.jpg"
                  alt="Consulting team reviewing performance data"
                  width={700}
                  height={450}
                  className="w-full h-auto object-cover"
                  sizes="(min-width: 1024px) 600px, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 via-transparent to-accent-500/10" />

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl opacity-20 blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl opacity-15 blur-2xl" />
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 xl:-left-10 top-1/4 bg-white rounded-2xl shadow-xl p-5 xl:p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 xl:w-7 xl:h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm xl:text-base font-semibold text-gray-900">Proven Results</div>
                    <div className="text-xs xl:text-sm text-gray-500">Since 2010</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-6 xl:-right-10 bottom-1/4 bg-white rounded-2xl shadow-xl p-5 xl:p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 xl:w-14 xl:h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-lg xl:text-xl">UK</span>
                  </div>
                  <div>
                    <div className="text-sm xl:text-base font-semibold text-gray-900">UK Based</div>
                    <div className="text-xs xl:text-sm text-gray-500">Global Reach</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trust Indicators - Desktop only, below image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden lg:grid grid-cols-3 gap-10 xl:gap-16 mt-8 w-full max-w-xl xl:max-w-2xl"
              ref={desktopStatsRef}
            >
              <AnimatedStat value={10} suffix="+" label="Years" start={shouldStart} />
              <AnimatedStat value={100} suffix="+" label="Projects" start={shouldStart} />
              <AnimatedStat value={100} suffix="%" label="Customer Satisfaction" start={shouldStart} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
