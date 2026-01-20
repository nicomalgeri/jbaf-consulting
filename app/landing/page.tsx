'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
  BarChart3,
  Clock,
  FileWarning,
  Target,
  Megaphone,
  UserPlus,
  Loader2,
  Shield,
  Zap,
  Settings,
  FileCheck,
  Lightbulb,
  Building2,
  Building,
  ChevronRight,
  MessageSquare,
  TrendingUp,
  ClipboardCheck,
  Rocket,
  Eye,
  Handshake,
} from 'lucide-react';

// Form validation schema
const landingFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  challenge: z.string().optional(),
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the privacy policy',
    }),
});

type LandingFormData = z.infer<typeof landingFormSchema>;

// Count up animation hook
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

// Animated stat component
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
      <div className="text-2xl sm:text-3xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-primary-200">{label}</div>
    </div>
  );
}

// Service card component
function ServiceCard({
  icon: Icon,
  title,
  description,
  points,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  points: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-6 shadow-premium border border-gray-100 hover:shadow-premium-lg transition-all duration-300 group"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-base mb-4">{description}</p>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-center gap-2 text-base text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// Problem card component
function ProblemCard({
  icon: Icon,
  text,
  delay,
}: {
  icon: React.ElementType;
  text: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-3 bg-red-50 rounded-xl px-4 py-3 border border-red-100"
    >
      <Icon className="w-5 h-5 text-red-500 flex-shrink-0" />
      <span className="text-gray-700 text-base">{text}</span>
    </motion.div>
  );
}

// Why choose card component
function WhyChooseCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4"
    >
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </motion.div>
  );
}

// Process step component
function ProcessStep({
  number,
  title,
  points,
  delay,
}: {
  number: number;
  title: string;
  points: string[];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-6 shadow-premium border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-full flex items-center justify-center text-white font-bold">
          {number}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-center gap-2 text-base text-gray-600">
            <ChevronRight className="w-4 h-4 text-primary-500 flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// Success story card
function SuccessCard({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100"
    >
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-base">{description}</p>
    </motion.div>
  );
}

// Expectation item component
function ExpectationItem({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center gap-3"
    >
      <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </motion.div>
  );
}

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shouldStartStats, setShouldStartStats] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LandingFormData>({
    resolver: zodResolver(landingFormSchema),
    defaultValues: {
      privacyConsent: false,
    },
  });

  // Intersection observer for stats animation
  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldStartStats(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const onSubmit = useCallback(
    async (data: LandingFormData) => {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: '',
            serviceInterest: 'general',
            message: `Company: ${data.company}\n\nChallenge: ${data.challenge || 'Not specified'}\n\nSource: Landing Page (Cold Email Campaign)`,
            privacyConsent: data.privacyConsent,
            recaptchaToken: '',
          }),
        });

        if (response.ok) {
          setIsSuccess(true);
          reset();
        } else {
          const result = await response.json();
          alert(result.error || 'Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset]
  );

  const scrollToForm = () => {
    document.getElementById('cta-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Minimal Header - No Navigation */}
      <header className="py-3 px-6 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-center">
          <Image
            src="/Logo.png"
            alt="JBAF Consulting"
            width={120}
            height={34}
            priority
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50/30 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] tech-pattern tech-pattern-light" />
        <div className="absolute top-20 right-0 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {/* Eyebrow - Audience identifier */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-medium text-primary-600"
              >
                For NHS, Public Sector & Operations Leaders
              </motion.p>

              {/* Headline - Pain + Promise */}
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15] font-legacy">
                <span className="text-gray-900">Your Programme Is Stalling.</span>
                <br />
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  We Get It Back on Track.
                </span>
              </h1>

              {/* Subheadline - Transformation statement */}
              <p className="text-base text-gray-600 leading-relaxed">
                When delivery is slipping, governance is unclear, and your team is stretched — JBAF embeds senior consultants who <strong className="text-gray-900">take ownership and drive results.</strong>
              </p>

              {/* Credibility line - Specific proof */}
              <p className="text-sm text-gray-700">
                We've turned around <strong>100+ programmes</strong> for NHS Trusts, TfL, and FTSE firms — typically mobilising within <strong>10 working days.</strong>
              </p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 pt-2"
              >
                <button
                  onClick={scrollToForm}
                  className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-lg font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5 text-base"
                >
                  Book a Strategy Call
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#success"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 text-base"
                >
                  See Case Studies
                </a>
              </motion.div>

              {/* Risk reversal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500"
              >
                <span>30-min call</span>
                <span className="hidden sm:inline">•</span>
                <span>No pitch, just diagnosis</span>
                <span className="hidden sm:inline">•</span>
                <span>Walk away with 3 actionable insights</span>
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-premium-lg border border-white/70">
                <Image
                  src="/Strategic-Delivery.jpg"
                  alt="Strategic delivery and consulting"
                  width={520}
                  height={320}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 via-transparent to-accent-500/10" />
              </div>

              {/* Floating card - Scarcity */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-4 bottom-1/4 bg-white rounded-xl shadow-xl p-3 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">3 slots remaining</div>
                    <div className="text-xs text-gray-500">for February start</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Client logo bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 text-center mb-4">Trusted by teams at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="text-lg font-semibold text-gray-400">NHS</span>
              <span className="text-lg font-semibold text-gray-400">TfL</span>
              <span className="text-lg font-semibold text-gray-400">Network Rail</span>
              <span className="text-lg font-semibold text-gray-400">Local Authorities</span>
              <span className="text-lg font-semibold text-gray-400">FTSE Companies</span>
            </div>
          </motion.div>

          {/* Trust stats bar */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-4 sm:p-5"
          >
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <AnimatedStat value={10} suffix="+" label="Years Experience" start={shouldStartStats} />
              <AnimatedStat value={100} suffix="+" label="Projects Delivered" start={shouldStartStats} />
              <AnimatedStat value={100} suffix="%" label="Client Satisfaction" start={shouldStartStats} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions to strengthen your organisation's delivery capability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={Target}
              title="Strategic Delivery & Operational Support"
              description="Hands-on delivery leadership that brings structure, governance, and momentum."
              points={['Programme & project delivery', 'Governance, risk & compliance', 'Process optimisation', 'Stakeholder alignment']}
              delay={0}
            />
            <ServiceCard
              icon={Users}
              title="Leadership & Team Development"
              description="Building confident leaders and high-performing teams."
              points={['Leadership coaching', 'Team capability development', 'Culture and behavioural alignment']}
              delay={0.1}
            />
            <ServiceCard
              icon={UserPlus}
              title="Staffing & Workforce Solutions"
              description="Capability you can trust — delivered fast."
              points={['Interim staffing', 'Specialist placements', 'Workforce planning']}
              delay={0.2}
            />
            <ServiceCard
              icon={BarChart3}
              title="Digital Transformation & Insights"
              description="Turning data and technology into operational advantage."
              points={['Analytics & insights', 'Workflow digitisation', 'Transformation planning']}
              delay={0.3}
            />
            <ServiceCard
              icon={Megaphone}
              title="Corporate Communication & Engagement"
              description="Clear, strategic communication that aligns people and strengthens trust."
              points={['Communication strategy', 'Brand positioning', 'Executive messaging']}
              delay={0.4}
            />
          </div>

          {/* Section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">Not sure which service fits your needs?</p>
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Let's Discuss Your Challenges
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Who We Support Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Who We Support
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Public Sector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-premium border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Public Sector</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'NHS organisations',
                  'Local authorities',
                  'Central government departments',
                  'Transport authorities (e.g., TfL, Network Rail)',
                  'Education institutions',
                  'Public utilities & infrastructure bodies',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Private Sector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-premium border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Private Sector</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Construction & engineering firms',
                  'Transport & logistics companies',
                  'Oil, gas & renewable energy providers',
                  'Professional services',
                  'Technology & SaaS companies',
                  'Non-profits, charities & social enterprises',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-accent-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-300"
            >
              See How We Can Help Your Organisation
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose JBAF Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Organisations Choose JBAF
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <WhyChooseCard
              icon={TrendingUp}
              title="Outcome-Driven Delivery"
              description="We focus on measurable results, not theoretical recommendations."
              delay={0}
            />
            <WhyChooseCard
              icon={Handshake}
              title="Embedded Expertise"
              description="Our consultants integrate into your teams, ensuring continuity and real-world impact."
              delay={0.1}
            />
            <WhyChooseCard
              icon={Zap}
              title="Rapid Mobilisation"
              description="We can be operational within days, not months."
              delay={0.2}
            />
            <WhyChooseCard
              icon={FileCheck}
              title="Audit-Ready Governance"
              description="Clear documentation, structured reporting, and compliance built into every engagement."
              delay={0.3}
            />
            <WhyChooseCard
              icon={Lightbulb}
              title="Tailored Solutions"
              description="No templates. No generic frameworks. Everything is built around your organisation's needs."
              delay={0.4}
            />
            <WhyChooseCard
              icon={Settings}
              title="Scalable Support"
              description="Flexible support that grows with your organisation — without increasing headcount."
              delay={0.5}
            />
          </div>

          {/* Section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Experience the JBAF Difference
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Problems We Solve
            </h2>
            <p className="text-gray-600 text-lg">
              We support organisations facing:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <ProblemCard icon={AlertCircle} text="Operational pressure and capacity gaps" delay={0} />
            <ProblemCard icon={FileWarning} text="Poor governance or unclear accountability" delay={0.05} />
            <ProblemCard icon={Eye} text="Inconsistent reporting or lack of MI visibility" delay={0.1} />
            <ProblemCard icon={Clock} text="Delivery delays or stalled programmes" delay={0.15} />
            <ProblemCard icon={Users} text="Workforce shortages or capability gaps" delay={0.2} />
            <ProblemCard icon={Settings} text="Inefficient processes and manual workflows" delay={0.25} />
            <ProblemCard icon={MessageSquare} text="Weak communication or stakeholder misalignment" delay={0.3} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <p className="text-lg font-medium text-gray-700 mb-4">
              If this sounds familiar, <span className="text-primary-600">JBAF can help.</span>
            </p>
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get Help With Your Challenge
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* How We Deliver Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Deliver
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <ProcessStep
              number={1}
              title="Mobilisation"
              points={['Discovery & scoping', 'Governance setup', 'Success measures', 'Delivery roadmap']}
              delay={0}
            />
            <ProcessStep
              number={2}
              title="MI Reporting"
              points={['Weekly dashboards', 'Executive summaries', 'RAID management', 'Forward-look planning']}
              delay={0.1}
            />
            <ProcessStep
              number={3}
              title="Handover"
              points={['Final documentation pack', 'Updated logs & templates', 'Knowledge-transfer sessions', 'Clear next-step recommendations']}
              delay={0.2}
            />
          </div>

          {/* Section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">Ready to start your project?</p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 transition-all duration-300"
            >
              Book a Scoping Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Client Success Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Client Success Snapshots
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <SuccessCard
              title="Operational Stabilisation – Public Health"
              description="Delivered a managed service that reduced backlog and improved reporting accuracy within 8 weeks."
              delay={0}
            />
            <SuccessCard
              title="PMO Setup – Construction Firm"
              description="Implemented governance and reporting frameworks that improved project oversight and reduced delays."
              delay={0.1}
            />
            <SuccessCard
              title="Digital Workflow Redesign – Tech Company"
              description="Streamlined processes, reduced manual workload, and improved operational visibility."
              delay={0.2}
            />
          </div>

          {/* Section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">Want similar results for your organisation?</p>
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start Your Success Story
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* What You Can Expect Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What You Can Expect Working With JBAF
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ExpectationItem text="Clarity from day one" delay={0} />
            <ExpectationItem text="Consistent communication" delay={0.05} />
            <ExpectationItem text="Proactive risk management" delay={0.1} />
            <ExpectationItem text="Embedded delivery capability" delay={0.15} />
            <ExpectationItem text="Strengthened internal teams" delay={0.2} />
            <ExpectationItem text="Measurable, sustainable outcomes" delay={0.25} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'How quickly can JBAF mobilise?',
                a: 'Typically within 5–10 working days depending on scope.',
              },
              {
                q: 'Do you work with both public and private sector organisations?',
                a: 'Yes — our model scales across regulated and commercial environments.',
              },
              {
                q: 'Do you provide interim staffing?',
                a: 'Yes — from administrators to senior delivery leads.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta-form" className="py-16 sm:py-20 bg-gradient-to-br from-[#0b1630] via-[#0d2a52] to-[#0f3f73]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                Ready to Strengthen Your Organisation?
              </h2>
              <p className="text-primary-100 text-lg mb-8">
                Let's start a conversation that moves your business forward.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-primary-100">
                  <Rocket className="w-5 h-5 text-accent-400" />
                  <span>Mobilise within 5-10 working days</span>
                </div>
                <div className="flex items-center gap-3 text-primary-100">
                  <Shield className="w-5 h-5 text-accent-400" />
                  <span>No-obligation consultation</span>
                </div>
                <div className="flex items-center gap-3 text-primary-100">
                  <ClipboardCheck className="w-5 h-5 text-accent-400" />
                  <span>Tailored proposal based on your needs</span>
                </div>
              </div>

              {/* Founder section */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <Image
                  src="/Joseph-Ajayi.png"
                  alt="Joseph Ajayi"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold text-white">Joseph Ajayi</div>
                  <div className="text-primary-200 text-sm">Founder & Director</div>
                  <div className="text-primary-300 text-xs mt-1">
                    Every engagement personally overseen
                  </div>
                </div>
              </div>

              {/* Email alternative */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-primary-200 text-sm">
                  Or email us directly at{' '}
                  <a href="mailto:info@jbafconsult.com" className="text-white hover:underline">
                    info@jbafconsult.com
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl"
            >
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-accent-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    We've received your request and will be in touch within 24 hours to discuss
                    how we can support your organisation.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Book a Consultation</h3>
                  <p className="text-gray-600 text-sm mb-6">Fill in your details and we'll be in touch.</p>

                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-800 mb-2">
                      Organisation Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Ltd"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                      {...register('company')}
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.company.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="challenge" className="block text-sm font-semibold text-gray-800 mb-2">
                      What's your biggest challenge right now?{' '}
                      <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="challenge"
                      rows={3}
                      placeholder="Tell us briefly what you're dealing with..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                      {...register('challenge')}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                      {...register('privacyConsent')}
                    />
                    <label htmlFor="privacyConsent" className="text-sm text-gray-600 cursor-pointer">
                      I agree to the{' '}
                      <Link href="/privacy-policy" className="text-primary-600 hover:underline" target="_blank">
                        Privacy Policy
                      </Link>{' '}
                      and consent to JBAF LIMITED contacting me about my inquiry.
                    </label>
                  </div>
                  {errors.privacyConsent && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.privacyConsent.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Book a Consultation
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/Logo.png"
                alt="JBAF Consulting"
                width={100}
                height={28}
              />
              <span className="text-base text-gray-600">© 2025 JBAF Consulting Ltd</span>
            </div>
            <div className="flex items-center gap-6 text-base text-gray-600">
              <span>12 West Street, Ware, SG12 9EE</span>
              <Link href="/privacy-policy" className="hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
