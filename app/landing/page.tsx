'use client';

import { useState, useCallback } from 'react';
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
  Zap,
  Settings,
  FileCheck,
  Lightbulb,
  Building2,
  Building,
  ChevronRight,
  MessageSquare,
  TrendingUp,
  Eye,
  Handshake,
  Download,
  FileText,
  Mail,
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
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What We Do</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Strategic Delivery */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Delivery & Operational Support</h3>
              <p className="text-gray-600 mb-4">Hands-on delivery leadership that brings structure, governance, and momentum.</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Programme & project delivery
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Governance, risk & compliance
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Process optimisation
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Stakeholder alignment
                </li>
              </ul>
              <button
                onClick={scrollToForm}
                className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center"
              >
                Speak to a Delivery Specialist
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>

            {/* Leadership & Team Development */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Leadership & Team Development</h3>
              <p className="text-gray-600 mb-4">Building confident leaders and high-performing teams.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Leadership coaching
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Team capability development
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Culture and behavioural alignment
                </li>
              </ul>
            </div>

            {/* Staffing & Workforce Solutions */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <UserPlus className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Staffing & Workforce Solutions</h3>
              <p className="text-gray-600 mb-4">Capability you can trust — delivered fast.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Interim staffing
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Specialist placements
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Workforce planning
                </li>
              </ul>
            </div>

            {/* Digital Transformation */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Transformation & Insights</h3>
              <p className="text-gray-600 mb-4">Turning data and technology into operational advantage.</p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Analytics & insights
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Workflow digitisation
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                  Transformation planning
                </li>
              </ul>
            </div>

            {/* Corporate Communication - Full width */}
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="max-w-xl">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <Megaphone className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Communication & Engagement</h3>
                <p className="text-gray-600 mb-4">Clear, strategic communication that aligns people and strengthens trust.</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                    Communication strategy
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                    Brand positioning
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
                    Executive messaging
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Support */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Who We Support</h2>
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
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About JBAF Consulting</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            JBAF Consulting is a multidisciplinary consultancy specialising in strategic delivery, operational support, and workforce solutions.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We help organisations navigate complexity, strengthen performance, and deliver measurable outcomes with confidence.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Our consultants bring deep experience across public, private, and regulated sectors — combining operational discipline with human-centred delivery.
          </p>
          <p className="text-xl font-semibold text-gray-900">
            We don't just advise — we deliver. We don't just support — we empower.
          </p>
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
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Problems We Solve</h2>
            <p className="text-lg text-gray-600">We support organisations facing:</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
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
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-gray-200"
              >
                <item.icon className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-lg font-semibold text-primary-600">
            If this sounds familiar, JBAF can help.
          </p>
        </div>
      </section>

      {/* How We Deliver */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How We Deliver</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.subtitle}</p>
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
        </div>
      </section>

      {/* Client Success */}
      <section id="success" className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Client Success Snapshots</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Operational Stabilisation – Public Health',
                description: 'Delivered a managed service that reduced backlog and improved reporting accuracy within 8 weeks.',
              },
              {
                title: 'PMO Setup – Construction Firm',
                description: 'Implemented governance and reporting frameworks that improved project oversight and reduced delays.',
              },
              {
                title: 'Digital Workflow Redesign – Tech Company',
                description: 'Streamlined processes, reduced manual workload, and improved operational visibility.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Expect */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What You Can Expect Working With JBAF</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Clarity from day one',
              'Consistent communication',
              'Proactive risk management',
              'Embedded delivery capability',
              'Strengthened internal teams',
              'Measurable, sustainable outcomes',
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section id="resources" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Free Resources</h2>
            <p className="text-lg text-gray-600">Download tools designed to help you strengthen delivery immediately:</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              'Mobilisation Framework',
              'MI Reporting Template',
              'Delivery Governance Toolkit',
            ].map((resource, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                <FileText className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{resource}</span>
                <Download className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

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
                q: 'Can you provide long-term managed services?',
                a: 'Absolutely. We offer flexible, scalable managed service packages.',
              },
              {
                q: 'Do you provide interim staffing?',
                a: 'Yes — from administrators to senior delivery leads.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
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
