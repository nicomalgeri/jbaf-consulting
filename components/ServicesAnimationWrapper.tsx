'use client';

import { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface ServicesAnimationWrapperProps {
  children: ReactNode;
  type: 'header' | 'service';
  direction?: 'left' | 'right';
}

export default function ServicesAnimationWrapper({
  children,
  type,
}: ServicesAnimationWrapperProps) {
  if (type === 'header') {
    return (
      <ScrollReveal direction="up" duration={0.5} distance={20}>
        {children}
      </ScrollReveal>
    );
  }

  // Use vertical animation on mobile to prevent horizontal overflow
  return (
    <ScrollReveal
      direction="up"
      duration={0.5}
      distance={24}
    >
      {children}
    </ScrollReveal>
  );
}
