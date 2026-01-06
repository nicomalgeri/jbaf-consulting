'use client';

import { usePathname } from 'next/navigation';
import {
  siteUrl,
  generateBreadcrumbSchema,
  organizationSchema,
  professionalServiceSchema,
  websiteSchema,
} from '@/lib/seo';

export function StructuredData() {
  const pathname = usePathname();

  // Generate breadcrumb based on current path
  const breadcrumbItems = [{ name: 'Home', url: siteUrl }];

  if (pathname !== '/') {
    const pathSegments = pathname.split('/').filter(Boolean);
    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbItems.push({
        name: name === 'Services' && index < pathSegments.length - 1 ? 'Services' : name,
        url: `${siteUrl}${currentPath}`,
      });
    });
  }

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

export default StructuredData;
