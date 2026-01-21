'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export default function OurStory() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] tech-pattern tech-pattern-light" />

      <div className="container-custom relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-12"
          >
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-500 mb-3">
              About Us
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-gray-900">
              From Ambition to Execution
            </h2>
          </motion.div>

          {/* Content - Desktop: side by side | Mobile/Tablet: stacked */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center lg:items-start">
            {/* Founder Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full sm:w-auto lg:flex-shrink-0"
            >
              <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-row sm:flex-col items-center gap-4 sm:gap-0 sm:text-center sm:max-w-[280px] sm:mx-auto lg:w-[260px]">
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg sm:mb-4">
                  <Image
                    src="/Joseph-Ajayi.png"
                    alt="Joseph Ajayi - Founder of JBAF Consulting"
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 96px, 112px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col sm:items-center">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Joseph Ajayi</h3>
                  <p className="text-sm text-primary-600 font-medium mb-1.5 sm:mb-3">Founder & Director</p>
                  <a
                    href="https://www.linkedin.com/company/jbaf-consulting/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 space-y-3 sm:space-y-4 text-gray-600 leading-relaxed text-center sm:text-left lg:pt-1"
            >
              <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
                At JBAF Consulting, we began with a simple observation: many organisations have the ambition to change, but few have the capacity to execute.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                We realised that the world doesn&apos;t need more reports—it needs more results. That is why we don&apos;t just advise; we deliver.
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                As a UK-based consultancy, we serve as the bridge between strategic planning and real-world execution. We partner with organisations navigating the headwinds of complexity, change, and growth.
              </p>
              {/* CTA - Always after text */}
              <div className="pt-4 sm:pt-5 flex justify-center sm:justify-start">
                <Link href="/our-story">
                  <Button variant="primary" className="group text-sm sm:text-base">
                    Read Our Full Story
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
