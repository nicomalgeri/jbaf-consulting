'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export default function OurStory() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] tech-pattern tech-pattern-light" />

      <div className="container-custom relative">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary-500 mb-2 sm:mb-3">
            About Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-h2 font-bold font-heading text-gray-900">
            From Ambition to Execution
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Main content - takes 8 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <div className="space-y-4 sm:space-y-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p className="text-base sm:text-lg text-gray-700 font-medium">
                At JBAF Consulting, we began with a simple observation: many organisations have the ambition to change, but few have the capacity to execute.
              </p>
              <p>
                We realised that the world doesn&apos;t need more reports—it needs more results. That is why we don&apos;t just advise; we deliver.
              </p>
              <p>
                As a UK-based consultancy, we serve as the bridge between strategic planning and real-world execution. We partner with organisations navigating the headwinds of complexity, change, and growth.
              </p>
            </div>

            <div className="mt-6 sm:mt-8">
              <Link href="/our-story">
                <Button variant="primary" className="group text-sm sm:text-base">
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Founder card - takes 4 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="bg-gradient-to-br from-gray-50 to-primary-50/50 rounded-2xl p-4 sm:p-5 border border-gray-100">
              <div className="flex items-center gap-4 lg:flex-col lg:text-center">
                {/* Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden border-2 border-white shadow-lg flex-shrink-0 lg:mx-auto">
                  <Image
                    src="/Joseph-Ajayi.png"
                    alt="Joseph Ajayi - Founder of JBAF Consulting"
                    fill
                    sizes="(min-width: 1024px) 112px, 80px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 lg:mt-3">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">Joseph Ajayi</p>
                  <p className="text-xs sm:text-sm text-primary-600 mb-2">Founder & Director</p>
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
