'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';

function ContactFormInner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      privacyConsent: false,
    },
  });

  const onSubmit = useCallback(async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      let recaptchaToken = '';

      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha('contact_form');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        alert(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [executeRecaptcha, reset]);

  if (isSuccess) {
    return (
      <div className="bg-accent-50 border border-accent-200 rounded-xl p-8 text-center">
        <CheckCircle2 className="h-16 w-16 text-accent-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600 mb-4">
          Your message has been sent successfully. We'll get back to you within 24 hours.
          A confirmation email has been sent to your inbox.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="primary">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <Input
          id="name"
          label="Full Name"
          placeholder="John Smith"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="john.smith@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <Input
        id="phone"
        label="Phone Number"
        type="tel"
        placeholder="+44 20 1234 5678"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <div>
        <label htmlFor="serviceInterest" className="block text-sm sm:text-base font-semibold text-gray-800 mb-2.5">
          Service of Interest
        </label>
        <select
          id="serviceInterest"
          className="flex h-12 sm:h-14 w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 sm:px-5 py-3 text-base sm:text-lg text-gray-900 hover:border-gray-300 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 cursor-pointer"
          {...register('serviceInterest')}
        >
          <option value="">Select a service</option>
          <option value="strategic-delivery">Strategic Delivery & Operational Support</option>
          <option value="leadership-development">Leadership & Team Development Solutions</option>
          <option value="staffing">Staffing</option>
          <option value="digital-transformation">Digital Transformation & Insights</option>
          <option value="corporate-communication">Corporate Communication & Stakeholder Engagement</option>
          <option value="general">General Inquiry</option>
        </select>
        {errors.serviceInterest && (
          <p className="mt-2 text-sm text-red-600">{errors.serviceInterest.message}</p>
        )}
      </div>

      <Textarea
        id="message"
        label="Message"
        placeholder="Tell us about your project or inquiry..."
        rows={6}
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Privacy Consent Checkbox */}
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacyConsent"
            className="mt-1 h-5 w-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2 focus:ring-offset-0 cursor-pointer"
            {...register('privacyConsent')}
          />
          <label htmlFor="privacyConsent" className="text-sm sm:text-base text-gray-600 cursor-pointer">
            I agree to the{' '}
            <Link href="/privacy-policy" className="text-primary-600 hover:text-primary-700 underline">
              Privacy Policy
            </Link>{' '}
            and consent to JBAF LIMITED processing my personal data for the purpose of responding to my inquiry.
            I understand that my data will be handled in accordance with GDPR regulations.
          </label>
        </div>
        {errors.privacyConsent && (
          <p className="text-sm text-red-600 ml-8">{errors.privacyConsent.message}</p>
        )}
      </div>

      <div className="pt-2 sm:pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full h-14 sm:h-16 text-base sm:text-lg font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" className="underline hover:text-gray-700" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" className="underline hover:text-gray-700" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </form>
  );
}

export default function ContactForm() {
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaKey) {
    return <ContactFormInner />;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
}
