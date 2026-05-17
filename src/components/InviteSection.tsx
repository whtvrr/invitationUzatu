'use client'

import { useLang } from '@/hooks/useLang';
import FloralDivider from './FloralDivider';

export default function InviteSection() {
  const { t } = useLang();

  return (
    <section className="px-6 py-6">
      {/* Scroll indicator */}
      <div className="flex flex-col items-center gap-4">
        <div
          className="text-[9px] tracking-[4px] uppercase opacity-75"
          style={{ fontFamily: 'Jost', color: 'var(--sub)' }}
        >
          {t('scroll')}
        </div>
        <div
          className="scroll-ring w-8 h-8 rounded-full border border-accent flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            borderColor: 'var(--accent)'
          }}
        >
          <svg className="scroll-arrow" width="13" height="13" viewBox="0 0 9 9" fill="none">
            <path
              d="M1.5 3 L4.5 6 L7.5 3"
              stroke="var(--accent2)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mt-6">
        <FloralDivider width={280} />
      </div>
    </section>
  );
}