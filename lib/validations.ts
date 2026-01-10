import { z } from "zod";

// Contact Form Validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceInterest: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to submit this form",
  }),
  recaptchaToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// CV Submission Form Validation
export const cvSubmissionSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  currentPosition: z.string().min(2, "Please enter your current position"),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type CVSubmissionData = z.infer<typeof cvSubmissionSchema>;

// File validation helper
export const validateFile = (file: File | null): string | null => {
  if (!file) {
    return "Please upload your CV";
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ["application/pdf"];

  if (file.size > maxSize) {
    return "File size must be less than 5MB";
  }

  if (!allowedTypes.includes(file.type)) {
    return "Only PDF files are allowed";
  }

  return null;
};
