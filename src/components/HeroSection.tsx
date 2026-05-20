'use client'

import { useLang } from '@/hooks/useLang';

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative" style={{ height: 540, overflow: 'hidden' }}>
      {/* Corner decorative elements */}
      <img
        src="/top-left.png"
        alt=""
        className="absolute top-0 left-0 z-10"
        style={{ width: 120, height: 'auto' }}
      />
      <img
        src="/top-right.png"
        alt=""
        className="absolute top-0 right-0 z-10"
        style={{ width: 120, height: 'auto' }}
      />

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
        <div className="relative">
          <div
            className="leading-[0.92]"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(80px, 22vw, 120px)',
              fontWeight: 400,
              color: 'var(--text)',
              letterSpacing: '2px'
            }}
          >
            {t('name')}
          </div>

          <div
            className="leading-[0.92]"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 'clamp(32px, 8vw, 48px)',
              fontWeight: 400,
              color: 'var(--accent2)',
              letterSpacing: '1px',
              marginTop: '-8px',
              marginLeft: 'clamp(50px, 15vw, 85px)'
            }}
          >
            {t('sup')}
          </div>
        </div>

        <div
          className="mt-2 tracking-[3px]"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontSize: 24,
            fontWeight: 500,
            color: 'var(--text)'
          }}
        >
          {t('date')}
        </div>

        {/* Horizontal divider below date */}
        <div className="mt-6">
          <img
            src="/horizontal.png"
            alt=""
            style={{ width: 240, height: 'auto', maxWidth: '100%' }}
            className="block mx-auto"
          />
        </div>
      </div>

      {/* Invitation text at bottom */}
      <div
        className="absolute flex flex-col items-center"
        style={{ bottom: 24, left: '50%', transform: 'translateX(-50%)', width: '90%' }}
      >
        <div
          className="text-center px-2 py-3 whitespace-pre-line"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            color: 'var(--text)',
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: '0.4px'
          }}
        >
          {t('invite')}
        </div>
      </div>
    </section>
  );
}