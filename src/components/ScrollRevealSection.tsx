'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ReactNode } from 'react';

interface ScrollRevealSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollRevealSection({
  children,
  delay = 0,
  className = ""
}: ScrollRevealSectionProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}