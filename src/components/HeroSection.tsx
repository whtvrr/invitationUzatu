'use client'

import { useLang } from '@/hooks/useLang';

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative" style={{ height: 540, overflow: 'hidden' }}>
      {/* Complex gradient background with SVG */}
      <div className="absolute inset-0 hero-gradient">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 480 540"
          preserveAspectRatio="none"
        >
          <ellipse
            cx="90"
            cy="100"
            rx="170"
            ry="120"
            fill="white"
            opacity="0.25"
            style={{ filter: 'blur(40px)' }}
          />
          <ellipse
            cx="400"
            cy="350"
            rx="160"
            ry="120"
            fill="var(--accent)"
            opacity="0.22"
            style={{ filter: 'blur(34px)' }}
          />
          <ellipse
            cx="240"
            cy="520"
            rx="280"
            ry="70"
            fill="var(--bg)"
            opacity="0.6"
            style={{ filter: 'blur(36px)' }}
          />
          <path
            d="M0,50 Q24,12 60,8 Q44,46 0,50Z"
            fill="var(--accent)"
            opacity="0.2"
          />
          <path
            d="M480,50 Q456,12 420,8 Q436,46 480,50Z"
            fill="var(--accent)"
            opacity="0.2"
          />
          <path
            d="M40,260 Q100,250 130,260"
            stroke="var(--accent)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.45"
          />
          <path
            d="M440,260 Q380,250 350,260"
            stroke="var(--accent)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.45"
          />
          <circle cx="50" cy="260" r="3" fill="var(--accent)" opacity="0.5" />
          <circle cx="430" cy="260" r="3" fill="var(--accent)" opacity="0.5" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingBottom: 60 }}>
        <div
          className="text-[11px] tracking-[8px] uppercase opacity-85 mb-6"
          style={{ fontFamily: 'Jost', color: 'var(--sub)' }}
        >
          {t('sup')}
        </div>

        <div
          className="leading-[0.92] tracking-[6px]"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: 'clamp(80px, 22vw, 120px)',
            fontWeight: 300,
            color: 'var(--text)'
          }}
        >
          {t('name')}
        </div>

        {/* Botanical floral divider */}
        <div className="mt-6">
          <svg width="240" height="28" viewBox="0 0 200 28" fill="none" className="block mx-auto max-w-full">
            <line x1="0" y1="14" x2="80" y2="14" stroke="var(--accent2)" strokeWidth="0.5" opacity="0.4"/>
            <line x1="120" y1="14" x2="200" y2="14" stroke="var(--accent2)" strokeWidth="0.5" opacity="0.4"/>
            <path d="M80,14 Q86,6 91,10 Q88,16 80,14Z" fill="var(--accent2)" opacity="0.3"/>
            <path d="M80,14 Q86,22 91,18 Q88,12 80,14Z" fill="var(--accent2)" opacity="0.22"/>
            <path d="M73,14 Q78,7 82,11 Q80,16 73,14Z" fill="var(--accent2)" opacity="0.18"/>
            <circle cx="100" cy="14" r="4" stroke="var(--accent2)" strokeWidth="0.8" fill="none" opacity="0.7"/>
            <circle cx="100" cy="14" r="2" fill="var(--accent2)" opacity="0.5"/>
            <path d="M120,14 Q114,6 109,10 Q112,16 120,14Z" fill="var(--accent2)" opacity="0.3"/>
            <path d="M120,14 Q114,22 109,18 Q112,12 120,14Z" fill="var(--accent2)" opacity="0.22"/>
            <path d="M127,14 Q122,7 118,11 Q120,16 127,14Z" fill="var(--accent2)" opacity="0.18"/>
          </svg>
        </div>

        <div
          className="mt-2 tracking-[3px]"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--sub)'
          }}
        >
          {t('date')}
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div
        className="absolute flex flex-col items-center gap-2"
        style={{ bottom: 24, left: '50%', transform: 'translateX(-50%)' }}
      >
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
    </section>
  );
}