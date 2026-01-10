import { groq } from 'next-sanity';

// Services queries
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    details,
    image,
    alt,
    order
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    details,
    image,
    alt
  }
`;

// Testimonials query
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    position,
    company,
    quote,
    order
  }
`;

// Hero query
export const heroQuery = groq`
  *[_type == "hero"][0] {
    _id,
    headline,
    subheadline,
    keyPoints,
    stat1Value,
    stat1Label,
    stat2Value,
    stat2Label,
    stat3Value,
    stat3Label,
    heroImage
  }
`;

// Site settings query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    companyName,
    email,
    phone,
    address,
    linkedinUrl,
    twitterUrl,
    businessHours
  }
`;
