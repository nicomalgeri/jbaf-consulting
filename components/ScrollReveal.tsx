'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  distance?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 0.5,
  distance = 24,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { y: 0, x: distance };
      case 'right': return { y: 0, x: -distance };
      case 'none': return { y: 0, x: 0 };
      default: return { y: distance, x: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...getDirectionOffset(),
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children wrapper for lists/grids
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: Omit<StaggerContainerProps, 'direction'>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Individual item for stagger animation
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function StaggerItem({
  children,
  className = '',
  direction = 'up',
}: StaggerItemProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case 'up': return { y: 20, x: 0 };
      case 'down': return { y: -20, x: 0 };
      case 'left': return { y: 0, x: 20 };
      case 'right': return { y: 0, x: -20 };
      case 'none': return { y: 0, x: 0 };
      default: return { y: 20, x: 0 };
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
