'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export default function OurStory() {
  return (
    <section className="section-padding bg-gradient-to-br from-white via-[#f6f9ff] to-[#eef3ff] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] tech-pattern tech-pattern-light" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-h2 font-bold font-heading text-gray-900 mb-4 sm:mb-6">
              About JBAF Consulting
            </h2>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                JBAF Consulting is a multidisciplinary consultancy specialising in strategic delivery, operational support, and workforce solutions.
              </p>
              <p>
                We help organisations navigate complexity, strengthen performance, and deliver measurable outcomes with confidence.
              </p>
              <p>
                Our consultants bring deep experience across public, private, and regulated sectors — combining operational discipline with human-centred delivery.
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

          {/* Right - Founder & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm sm:shadow-[0_8px_24px_rgba(15,23,42,0.08)] lg:shadow-[0_16px_40px_rgba(15,23,42,0.12)] border border-gray-100">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Joseph Ajayi</h3>
                <p className="text-primary-600 font-medium text-sm sm:text-base">Founder & Director</p>
              </div>
              <div className="pt-4 sm:pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">15+</div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">50+</div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">Projects Delivered</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">100%</div>
                    <div className="text-xs sm:text-sm text-gray-500 mt-1">Client Satisfaction</div>
                  </div>
                </div>
              </div>
              <p className="text-center text-primary-600 font-semibold mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100 leading-relaxed text-sm sm:text-base">
                We don&apos;t just advise — we deliver.<br />
                We don&apos;t just support — we empower.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
