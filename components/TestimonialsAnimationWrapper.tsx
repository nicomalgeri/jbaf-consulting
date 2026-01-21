'use client';

import { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface TestimonialsAnimationWrapperProps {
  children: ReactNode;
  type: 'header' | 'grid' | 'card';
  index?: number;
}

export default function TestimonialsAnimationWrapper({
  children,
  type,
  index = 0,
}: TestimonialsAnimationWrapperProps) {
  if (type === 'header') {
    return (
      <ScrollReveal direction="up" duration={0.5} distance={20}>
        {children}
      </ScrollReveal>
    );
  }

  if (type === 'grid') {
    return <>{children}</>;
  }

  // Card type - stagger based on index
  return (
    <ScrollReveal
      direction="up"
      duration={0.5}
      distance={20}
      delay={index * 0.1}
    >
      {children}
    </ScrollReveal>
  );
}
