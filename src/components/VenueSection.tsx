'use client'

import { useLang } from '@/hooks/useLang';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div
    className="text-center mb-3"
    style={{
      fontSize: 11,
      color: 'var(--sub)',
      fontFamily: 'Jost',
      letterSpacing: '3.5px',
      textTransform: 'uppercase'
    }}
  >
    {children}
  </div>
);

export default function VenueSection() {
  const { t } = useLang();

  const handleMapClick = () => {
    window.open('https://go.2gis.com/HuJLB', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="px-6 py-6">
      <SectionLabel>{t('venueLbl')}</SectionLabel>

      <div
        className="rounded-xl p-[18px] mx-auto max-w-md"
        style={{
          background: 'var(--card)',
          border: '0.5px solid var(--border)'
        }}
      >
        <div
          className="mb-1.5"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: 21,
            color: 'var(--text)',
            lineHeight: 1.3
          }}
        >
          {t('venue')}
        </div>

        <div style={{ fontSize: 13, color: 'var(--sub)', fontFamily: 'Jost' }}>
          {t('city')} ·{' '}
          <a
            href="https://go.2gis.com/HuJLB"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent2)',
              textDecoration: 'none',
              borderBottom: '0.5px solid var(--accent)',
              paddingBottom: 1
            }}
          >
            {t('map')} →
          </a>
        </div>
      </div>
    </section>
  );
}