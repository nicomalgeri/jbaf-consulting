// SEO utility functions for generating structured data
// These can be used both on server and client components

export const siteUrl = 'https://jbafconsult.com';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(service: {
  slug: string;
  title: string;
  summary: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/services/${service.slug}#service`,
    name: service.title,
    description: service.summary,
    url: `${siteUrl}/services/${service.slug}`,
    image: `${siteUrl}${service.image}`,
    provider: {
      '@id': `${siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    serviceType: 'Business Consulting',
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'JBAF Consulting',
  alternateName: 'JBAF Consult',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/Logo.png`,
    width: 200,
    height: 60,
  },
  image: `${siteUrl}/Logo.png`,
  description:
    'UK-based consultancy partnering with organisations navigating complexity, change, and growth. We deliver strategic delivery, leadership development, staffing, digital transformation, and stakeholder engagement solutions.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12 West Street',
    addressLocality: 'Ware',
    addressRegion: 'Hertfordshire',
    postalCode: 'SG12 9EE',
    addressCountry: 'GB',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+44-20-7328-4499',
      contactType: 'customer service',
      areaServed: 'GB',
      availableLanguage: 'English',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+99-34-8878-9989',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
  ],
  email: 'info@jbafconsult.com',
  foundingLocation: {
    '@type': 'Place',
    name: 'United Kingdom',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  knowsAbout: [
    'Business Consulting',
    'Leadership Development',
    'Digital Transformation',
    'Staffing Solutions',
    'Corporate Communications',
    'Stakeholder Engagement',
    'Programme Management',
    'Team Development',
    'Workforce Planning',
    'Change Management',
  ],
  slogan: 'Partner for Lasting Change and Impactful Results',
  sameAs: [
    'https://www.linkedin.com/company/jbaf-consulting/',
  ],
};

// Professional Service Schema
export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#professionalservice`,
  name: 'JBAF Consulting',
  url: siteUrl,
  image: `${siteUrl}/Logo.png`,
  priceRange: '££',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '12 West Street',
    addressLocality: 'Ware',
    addressRegion: 'Hertfordshire',
    postalCode: 'SG12 9EE',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.8095,
    longitude: -0.0295,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  telephone: '+44-20-7328-4499',
  email: 'info@jbafconsult.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Consulting Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Leadership & Team Development Solutions',
          description:
            'Practical programmes that build confident leaders and high-performing teams through coaching and targeted workshops.',
          url: `${siteUrl}/services/leadership-team-development-solutions`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Staffing Solutions',
          description:
            'Insight-led staffing solutions aligned to strategic and operational goals with workforce planning.',
          url: `${siteUrl}/services/staffing`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Transformation & Insights',
          description:
            'Actionable insights through data, analytics, and digitised operations to improve decision-making.',
          url: `${siteUrl}/services/digital-transformation-insights`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate Communication & Stakeholder Engagement',
          description:
            'Communication strategies that align narratives, strengthen relationships, and engage stakeholders.',
          url: `${siteUrl}/services/corporate-communication-stakeholder-engagement`,
        },
      },
    ],
  },
};

// Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'JBAF Consulting',
  description:
    'UK-based consultancy delivering strategic solutions for leadership development, staffing, digital transformation, and stakeholder engagement.',
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  inLanguage: 'en-GB',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};
