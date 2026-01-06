'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cvSubmissionSchema, type CVSubmissionData, validateFile } from '@/lib/validations';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { CheckCircle2, Loader2, Upload, X } from 'lucide-react';

export default function CVSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CVSubmissionData>({
    resolver: zodResolver(cvSubmissionSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    const error = validateFile(file);

    if (error) {
      setFileError(error);
      setCvFile(null);
    } else {
      setFileError(null);
      setCvFile(file);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    setFileError(null);
  };

  const onSubmit = async (data: CVSubmissionData) => {
    // Validate file before submission
    const error = validateFile(cvFile);
    if (error) {
      setFileError(error);
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      if (cvFile) {
        formData.append('cv', cvFile);
      }

      const response = await fetch('/api/submit-cv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setCvFile(null);
      } else {
        alert('Failed to submit CV. Please try again.');
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
          Application Submitted!
        </h3>
        <p className="text-gray-600 mb-4">
          Thank you for your interest in joining JBAF LIMITED. We'll review your application
          and get back to you within 5 business days.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="accent">
          Submit Another Application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <Input
          id="fullName"
          label="Full Name"
          placeholder="John Smith"
          error={errors.fullName?.message}
          {...register('fullName')}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <Input
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+44 20 1234 5678"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          id="linkedin"
          label="LinkedIn Profile (Optional)"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          error={errors.linkedin?.message}
          {...register('linkedin')}
        />
      </div>

      <Input
        id="currentPosition"
        label="Current Position"
        placeholder="Senior Consultant at XYZ Company"
        error={errors.currentPosition?.message}
        {...register('currentPosition')}
      />

      {/* CV Upload */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
          Upload CV (PDF, max 5MB)
        </label>
        <div className="relative">
          <input
            type="file"
            id="cv-upload"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="cv-upload"
            className={`flex items-center justify-center w-full h-28 sm:h-32 px-4 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
              fileError
                ? 'border-red-300 bg-red-50'
                : cvFile
                ? 'border-accent-300 bg-accent-50'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {cvFile ? (
              <div className="flex items-center space-x-3">
                <Upload className="h-6 w-6 text-accent-500" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{cvFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFile();
                  }}
                  className="p-1 hover:bg-white rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-xs sm:text-sm text-gray-600">
                  <span className="font-semibold text-primary-500">Click to upload</span> or drag and drop
                </p>
                <p className="text-[0.7rem] sm:text-xs text-gray-500 mt-1">PDF up to 5MB</p>
              </div>
            )}
          </label>
        </div>
        {fileError && (
          <p className="mt-2 text-sm text-red-600">{fileError}</p>
        )}
      </div>

      <Textarea
        id="coverLetter"
        label="Cover Letter"
        placeholder="Tell us why you'd like to join JBAF LIMITED and what makes you a great fit..."
        rows={8}
        error={errors.coverLetter?.message}
        {...register('coverLetter')}
      />

      <div className="flex items-start space-x-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          {...register('consent')}
        />
        <label htmlFor="consent" className="text-xs sm:text-sm text-gray-600">
          I consent to JBAF LIMITED storing my personal information and CV for recruitment
          purposes. I understand that my data will be handled in accordance with GDPR regulations.
        </label>
      </div>
      {errors.consent && (
        <p className="text-sm text-red-600">{errors.consent.message}</p>
      )}

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting Application...
          </>
        ) : (
          'Submit Application'
        )}
      </Button>
    </form>
  );
}
