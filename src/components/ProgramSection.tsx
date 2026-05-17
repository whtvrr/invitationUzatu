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

export default function ProgramSection() {
  const { t } = useLang();

  const programItems = [
    ['18:00', t('p2Title'), t('p2Sub')],
  ];

  return (
    <section className="px-6 py-6">
      <SectionLabel>{t('programLbl')}</SectionLabel>

      <div
        className="rounded-xl p-[18px] mx-auto max-w-md"
        style={{
          background: 'var(--card)',
          border: '0.5px solid var(--border)'
        }}
      >
        <div className="flex flex-col gap-[14px]">
          {programItems.map(([time, title, sub], i) => (
            <div key={i} className="flex items-center gap-[14px]">
              <div
                className="w-16 text-right flex-shrink-0"
                style={{
                  fontFamily: 'Cormorant Garamond',
                  fontSize: 22,
                  color: 'var(--accent2)',
                  fontWeight: 500,
                  letterSpacing: '1px'
                }}
              >
                {time}
              </div>

              <div
                className="w-px h-9 flex-shrink-0"
                style={{ background: 'var(--accent)', opacity: 0.6 }}
              />

              <div className="flex-1">
                <div
                  style={{
                    fontFamily: 'Jost',
                    fontSize: 15,
                    color: 'var(--text)',
                    fontWeight: 500
                  }}
                >
                  {title}
                </div>
                <div
                  className="mt-0.5"
                  style={{
                    fontFamily: 'Jost',
                    fontSize: 12,
                    color: 'var(--sub)'
                  }}
                >
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}