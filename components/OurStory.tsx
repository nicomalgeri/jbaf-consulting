'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export default function OurStory() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] tech-pattern tech-pattern-light" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-100 rounded-2xl -z-10" />

              {/* Main image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Joseph-Ajayi.png"
                  alt="Joseph Ajayi - Founder of JBAF LIMITED"
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Founder name card */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-6 py-4 text-center min-w-[200px]">
                <p className="font-semibold text-gray-900">Joseph Ajayi</p>
                <p className="text-sm text-primary-600">Founder & Director</p>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500 mb-3">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-6">
              From Ambition to Execution
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                At JBAF Consulting, we began with a simple observation: many organisations
                have the ambition to change, but few have the capacity to execute. We realised
                that the world doesn't need more reports—it needs more results. That is why
                we don't just advise; we deliver.
              </p>
              <p>
                As a UK-based consultancy, we serve as the bridge between strategic planning
                and real-world execution. We partner with organisations navigating the headwinds
                of complexity, change, and growth.
              </p>
            </div>

            <div className="mt-8">
              <Link href="/our-story">
                <Button variant="primary" className="group">
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
