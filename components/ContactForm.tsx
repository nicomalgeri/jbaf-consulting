'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-accent-50 border border-accent-200 rounded-xl p-8 text-center">
        <CheckCircle2 className="h-16 w-16 text-accent-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600">
          Your message has been sent successfully. We'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <label htmlFor="serviceInterest" className="block text-sm font-semibold text-gray-700 mb-2">
          Service of Interest
        </label>
        <select
          id="serviceInterest"
          className="flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
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
    </form>
  );
}
