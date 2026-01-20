'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
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
  Zap,
  Settings,
  FileCheck,
  Lightbulb,
  Building2,
  Building,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  TrendingUp,
  Eye,
  Handshake,
  Download,
  FileText,
  Mail,
  Plus,
  Minus,
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

export default function LandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeResource, setActiveResource] = useState<number | null>(null);

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

  const onSubmit = useCallback(
    async (data: LandingFormData) => {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            company: data.company,
            message: data.challenge || 'Landing page consultation request',
            source: 'landing-page',
          }),
        });
        if (response.ok) {
          setIsSuccess(true);
          reset();
        }
      } catch (error) {
        console.error('Form submission error:', error);
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
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-center">
          <Image
            src="/Logo.png"
            alt="JBAF Consulting"
            width={130}
            height={38}
            priority
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-4"
          >
            JBAF Consulting
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
          >
            Empowering Organisations to{' '}
            <span className="text-primary-600">Deliver With Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            JBAF Consulting strengthens operations, boosts performance, and brings clarity to complex environments.
            <br className="hidden sm:block" />
            <strong className="text-gray-900">We don't just advise — we integrate, deliver, and empower.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20"
            >
              Book a Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-8 py-4 text-gray-700 font-semibold hover:text-primary-600 transition-colors"
            >
              Request a Proposal
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <a
              href="#resources"
              className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Our Mobilisation Framework
            </a>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="services" className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8 lg:mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Do</h2>
            <p className="text-gray-600 mt-2">
              End-to-end consulting services that strengthen operations and deliver measurable outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left - Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image
                  src="/Strategic-Delivery.jpg"
                  alt="Strategic Delivery"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-medium text-sm">Trusted by leading organisations across public and private sectors</p>
                </div>
              </div>
              {/* CTA below image */}
              <div className="mt-4">
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center px-5 py-2.5 bg-primary-600 text-white rounded-full font-semibold text-sm hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20"
                >
                  Discuss Your Needs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right - Service Cards */}
            <div className="space-y-2.5">
              {[
                {
                  icon: Target,
                  title: 'Strategic Delivery & Operational Support',
                  description: 'Programme delivery, governance, risk management, and process optimisation.',
                },
                {
                  icon: Users,
                  title: 'Leadership & Team Development',
                  description: 'Leadership coaching, capability building, and culture alignment.',
                },
                {
                  icon: UserPlus,
                  title: 'Staffing & Workforce Solutions',
                  description: 'Interim staffing, specialist placements, and workforce planning.',
                },
                {
                  icon: BarChart3,
                  title: 'Digital Transformation & Insights',
                  description: 'Analytics, workflow digitisation, and transformation planning.',
                },
                {
                  icon: Megaphone,
                  title: 'Corporate Communication & Engagement',
                  description: 'Communication strategy, brand positioning, and executive messaging.',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all cursor-pointer group"
                  onClick={scrollToForm}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 transition-colors">
                      <service.icon className="w-4 h-4 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">{service.title}</h3>
                      <p className="text-gray-500 text-xs truncate">{service.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 text-center lg:hidden">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all"
            >
              Discuss Your Needs
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Who We Support */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Who We Support</h2>
            <p className="text-lg text-gray-600 mt-4">Trusted by organisations across public and private sectors</p>
          </div>

          {/* Partner Logos */}
          <div className="mb-16">
            <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-8">Our Partners & Clients</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium hover:bg-gray-200 transition-colors"
                >
                  Partner {i}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Public Sector */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Public Sector</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                {[
                  'NHS organisations',
                  'Local authorities',
                  'Central government departments',
                  'Transport authorities (e.g., TfL, Network Rail)',
                  'Education institutions',
                  'Public utilities & infrastructure bodies',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Private Sector */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Private Sector</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                {[
                  'Construction & engineering firms',
                  'Transport & logistics companies',
                  'Oil, gas & renewable energy providers',
                  'Professional services',
                  'Technology & SaaS companies',
                  'Non-profits, charities & social enterprises',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Join Our Growing Client Base
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About JBAF Consulting</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                JBAF Consulting is a multidisciplinary consultancy specialising in strategic delivery, operational support, and workforce solutions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We help organisations navigate complexity, strengthen performance, and deliver measurable outcomes with confidence.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our consultants bring deep experience across public, private, and regulated sectors — combining operational discipline with human-centred delivery.
              </p>
              <p className="text-lg font-semibold text-primary-600 mb-6">
                We don't just advise — we deliver. We don't just support — we empower.
              </p>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all"
              >
                Work With Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>

            {/* Right - Image with founder */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-6">
                  <Image
                    src="/Joseph-Ajayi.png"
                    alt="Joseph Ajayi - Founder"
                    width={120}
                    height={120}
                    className="rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Joseph Ajayi</h3>
                    <p className="text-primary-600 font-medium">Founder & Director</p>
                    <p className="text-gray-500 text-sm mt-2">Leading delivery excellence across public and private sectors</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary-600">15+</div>
                      <div className="text-xs text-gray-500">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary-600">50+</div>
                      <div className="text-xs text-gray-500">Projects Delivered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary-600">100%</div>
                      <div className="text-xs text-gray-500">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose JBAF */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Organisations Choose JBAF</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Outcome-Driven Delivery',
                description: 'We focus on measurable results, not theoretical recommendations.',
              },
              {
                icon: Handshake,
                title: 'Embedded Expertise',
                description: 'Our consultants integrate into your teams, ensuring continuity and real-world impact.',
              },
              {
                icon: Zap,
                title: 'Rapid Mobilisation',
                description: 'We can be operational within days, not months.',
              },
              {
                icon: FileCheck,
                title: 'Audit-Ready Governance',
                description: 'Clear documentation, structured reporting, and compliance built into every engagement.',
              },
              {
                icon: Lightbulb,
                title: 'Tailored Solutions',
                description: "No templates. No generic frameworks. Everything is built around your organisation's needs.",
              },
              {
                icon: Settings,
                title: 'Scalable Support',
                description: "Flexible support that grows with your organisation — without increasing headcount.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all"
            >
              Experience the JBAF Difference
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Problems We Solve</h2>
            <p className="text-gray-600">We support organisations facing:</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {[
              { icon: AlertCircle, text: 'Operational pressure and capacity gaps' },
              { icon: FileWarning, text: 'Poor governance or unclear accountability' },
              { icon: Eye, text: 'Inconsistent reporting or lack of MI visibility' },
              { icon: Clock, text: 'Delivery delays or stalled programmes' },
              { icon: Users, text: 'Workforce shortages or capability gaps' },
              { icon: Settings, text: 'Inefficient processes and manual workflows' },
              { icon: MessageSquare, text: 'Weak communication or stakeholder misalignment' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                onClick={scrollToForm}
              >
                <item.icon className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              If this sounds familiar, JBAF can help.
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all"
            >
              Get Help Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How We Deliver */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How We Deliver</h2>
            <p className="text-gray-600 mt-3">A proven approach that delivers results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                number: '1',
                title: 'Mobilisation',
                subtitle: 'Fast, structured setup to create clarity and alignment.',
                points: ['Discovery & scoping', 'Governance setup', 'Success measures', 'Delivery roadmap'],
              },
              {
                number: '2',
                title: 'MI Reporting',
                subtitle: 'Clear, actionable insights that drive decisions.',
                points: ['Weekly dashboards', 'Executive summaries', 'RAID management', 'Forward-look planning'],
              },
              {
                number: '3',
                title: 'Handover',
                subtitle: 'A complete, confident transition.',
                points: ['Final documentation pack', 'Updated logs & templates', 'Knowledge-transfer sessions', 'Clear next-step recommendations'],
              },
            ].map((step, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{step.subtitle}</p>
                <ul className="space-y-2">
                  {step.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                      <ChevronRight className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Client Success */}
      <section id="success" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Client Success Snapshots</h2>
            <p className="text-gray-600 mt-3">Real results from real engagements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Operational Stabilisation – Public Health',
                description: 'Delivered a managed service that reduced backlog and improved reporting accuracy within 8 weeks.',
                stat: '8 weeks',
                statLabel: 'to stabilise',
              },
              {
                title: 'PMO Setup – Construction Firm',
                description: 'Implemented governance and reporting frameworks that improved project oversight and reduced delays.',
                stat: '40%',
                statLabel: 'fewer delays',
              },
              {
                title: 'Digital Workflow Redesign – Tech Company',
                description: 'Streamlined processes, reduced manual workload, and improved operational visibility.',
                stat: '60%',
                statLabel: 'time saved',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary-600">{item.stat}</span>
                  <span className="text-sm text-gray-500">{item.statLabel}</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Be Our Next Success Story
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What You Can Expect</h2>
            <p className="text-gray-600 mt-3">Working with JBAF means:</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Clarity from day one',
              'Consistent communication',
              'Proactive risk management',
              'Embedded delivery capability',
              'Strengthened internal teams',
              'Measurable, sustainable outcomes',
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-gray-700">{text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all"
            >
              Start a Conversation
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section id="resources" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Free Resources</h2>
            <p className="text-gray-600">Tools designed to help you strengthen delivery immediately</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: 'Mobilisation Framework',
                description: 'A structured approach to getting your programme off the ground quickly.',
                icon: Target,
              },
              {
                title: 'MI Reporting Template',
                description: 'Weekly dashboard template for clear stakeholder reporting.',
                icon: BarChart3,
              },
              {
                title: 'Governance Toolkit',
                description: 'Essential templates for risk, issue, and decision tracking.',
                icon: FileCheck,
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${
                  activeResource === index
                    ? 'border-primary-500 shadow-lg shadow-primary-500/10'
                    : 'border-gray-100 hover:border-primary-200'
                }`}
                onClick={() => setActiveResource(activeResource === index ? null : index)}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    activeResource === index ? 'bg-primary-600' : 'bg-primary-100'
                  }`}>
                    <resource.icon className={`w-5 h-5 transition-colors ${
                      activeResource === index ? 'text-white' : 'text-primary-600'
                    }`} />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{resource.title}</h4>
                </div>
                <p className="text-gray-500 text-sm mb-4">{resource.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToForm();
                  }}
                  className={`w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors ${
                    activeResource === index
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Request Download
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-3">Everything you need to know about working with JBAF</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How quickly can JBAF mobilise?',
                a: 'Typically within 5–10 working days depending on scope. We pride ourselves on rapid deployment without compromising quality.',
              },
              {
                q: 'Do you work with both public and private sector organisations?',
                a: 'Yes — our model scales across regulated and commercial environments. We have extensive experience in NHS, local government, construction, energy, and technology sectors.',
              },
              {
                q: 'Can you provide long-term managed services?',
                a: 'Absolutely. We offer flexible, scalable managed service packages tailored to your operational needs and budget.',
              },
              {
                q: 'Do you provide interim staffing?',
                a: 'Yes — from administrators to senior delivery leads. All our interim staff are vetted and experienced in their respective fields.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-semibold text-gray-900 pr-4">{faq.q}</h4>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-primary-600" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-6 pb-5 text-gray-600">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta-form" className="py-20 bg-primary-600">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Strengthen Your Organisation?
              </h2>
              <p className="text-primary-100 text-lg mb-8">
                Let's start a conversation that moves your business forward.
              </p>

              <div className="space-y-4 mb-8">
                <button
                  onClick={scrollToForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Book a Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </div>

              {/* Founder */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/20">
                <Image
                  src="/Joseph-Ajayi.png"
                  alt="Joseph Ajayi"
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold text-white">Joseph Ajayi</div>
                  <div className="text-primary-200 text-sm">Founder & Director</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-primary-200 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Or email{' '}
                  <a href="mailto:info@jbafconsult.com" className="text-white hover:underline">
                    info@jbafconsult.com
                  </a>
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    We've received your request and will be in touch within 24 hours.
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Speak With Our Team Today</h3>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Organisation
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Ltd"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                      {...register('company')}
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-1">
                      How can we help? <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="challenge"
                      rows={3}
                      placeholder="Tell us about your challenge..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                      {...register('challenge')}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacyConsent"
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      {...register('privacyConsent')}
                    />
                    <label htmlFor="privacyConsent" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/privacy-policy" className="text-primary-600 hover:underline" target="_blank">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  {errors.privacyConsent && (
                    <p className="text-sm text-red-600">{errors.privacyConsent.message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/Logo.png"
                alt="JBAF Consulting"
                width={100}
                height={28}
              />
              <span className="text-sm text-gray-600">© 2025 JBAF Consulting Ltd</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
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
