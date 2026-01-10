import { client, urlFor } from './client';
import {
  servicesQuery,
  serviceBySlugQuery,
  testimonialsQuery,
  heroQuery,
  siteSettingsQuery,
} from './queries';
import { services as fallbackServices } from '@/lib/services';

// Types
export type SanityService = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  details: string[];
  image: {
    asset: {
      _ref: string;
    };
  };
  alt: string;
  order?: number;
};

export type SanityTestimonial = {
  _id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  order?: number;
};

export type SanityHero = {
  _id: string;
  headline: string;
  subheadline?: string;
  keyPoints?: string[];
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  heroImage?: {
    asset: {
      _ref: string;
    };
  };
};

export type SanitySiteSettings = {
  _id: string;
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  businessHours?: string;
};

// Fetch functions with fallbacks
export async function getServices(): Promise<SanityService[]> {
  try {
    const services = await client.fetch(servicesQuery);
    if (services && services.length > 0) {
      // Merge with fallback images for services that don't have Sanity images
      return services.map((service: SanityService) => {
        const fallback = fallbackServices.find((f) => f.slug === service.slug);
        return {
          ...service,
          _fallbackImage: fallback?.image || '',
        };
      });
    }
    // Return fallback if no Sanity data
    return fallbackServices.map((s, i) => ({
      _id: s.slug,
      title: s.title,
      slug: s.slug,
      summary: s.summary,
      details: s.details,
      image: { asset: { _ref: '' } },
      alt: s.alt,
      order: i,
      // Keep original image path for fallback
      _fallbackImage: s.image,
    })) as unknown as SanityService[];
  } catch {
    // Return fallback on error
    return fallbackServices.map((s, i) => ({
      _id: s.slug,
      title: s.title,
      slug: s.slug,
      summary: s.summary,
      details: s.details,
      image: { asset: { _ref: '' } },
      alt: s.alt,
      order: i,
      _fallbackImage: s.image,
    })) as unknown as SanityService[];
  }
}

export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  try {
    const service = await client.fetch(serviceBySlugQuery, { slug });
    if (service) {
      // Add fallback image
      const fallback = fallbackServices.find((s) => s.slug === slug);
      return {
        ...service,
        _fallbackImage: fallback?.image || '',
      };
    }
    // Fallback to static data
    const fallback = fallbackServices.find((s) => s.slug === slug);
    if (fallback) {
      return {
        _id: fallback.slug,
        title: fallback.title,
        slug: fallback.slug,
        summary: fallback.summary,
        details: fallback.details,
        image: { asset: { _ref: '' } },
        alt: fallback.alt,
        _fallbackImage: fallback.image,
      } as unknown as SanityService;
    }
    return null;
  } catch {
    const fallback = fallbackServices.find((s) => s.slug === slug);
    if (fallback) {
      return {
        _id: fallback.slug,
        title: fallback.title,
        slug: fallback.slug,
        summary: fallback.summary,
        details: fallback.details,
        image: { asset: { _ref: '' } },
        alt: fallback.alt,
        _fallbackImage: fallback.image,
      } as unknown as SanityService;
    }
    return null;
  }
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  try {
    const testimonials = await client.fetch(testimonialsQuery);
    if (testimonials && testimonials.length > 0) {
      return testimonials;
    }
    return [];
  } catch {
    return [];
  }
}

export async function getHero(): Promise<SanityHero | null> {
  try {
    return await client.fetch(heroQuery);
  } catch {
    return null;
  }
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery);
  } catch {
    return null;
  }
}

// Helper to get image URL
export function getImageUrl(image: { asset: { _ref: string } } | undefined, fallback?: string): string {
  if (image?.asset?._ref) {
    return urlFor(image).url();
  }
  return fallback || '';
}
