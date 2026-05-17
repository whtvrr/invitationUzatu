'use client'

import { useLang } from '@/hooks/useLang';

export default function DateSection() {
  const { t } = useLang();

  // Aug 1, 2026 = Saturday → Mon-first index = 5
  const startDay = 5;
  const totalDays = 31;
  const cells = [];

  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const dayLabels = t('days') as readonly string[];

  return (
    <section className="px-6 py-6">
      <div className="text-center mb-3">
        <div
          className="text-[11px] uppercase tracking-[3.5px]"
          style={{
            fontFamily: 'Jost',
            color: 'var(--sub)'
          }}
        >
          {t('dateLbl')}
        </div>
      </div>

      <div
        className="p-[14px] rounded-xl mx-auto max-w-sm"
        style={{
          background: 'var(--card)',
          border: '0.5px solid var(--border)'
        }}
      >
        <div
          className="text-center mb-2.5"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: 16,
            color: 'var(--text)',
            letterSpacing: '3px'
          }}
        >
          {t('month')}
        </div>

        <div className="grid grid-cols-7 gap-0.5">
          {dayLabels.map(d => (
            <div
              key={d}
              className="text-center py-1"
              style={{
                fontSize: 10,
                color: 'var(--sub)',
                fontFamily: 'Jost',
                fontWeight: 500,
                letterSpacing: '0.3px'
              }}
            >
              {d}
            </div>
          ))}

          {cells.map((d, i) => (
            <div
              key={i}
              className="text-center h-[30px] flex items-center justify-center"
              style={{
                fontSize: 13,
                fontFamily: 'Cormorant Garamond',
                color: d === 23 ? '#FFFFFF' : d ? 'var(--text)' : 'transparent',
                background: d === 23 ? 'var(--accent)' : 'transparent',
                borderRadius: d === 23 ? '50%' : 0,
                fontWeight: d === 23 ? 700 : 400,
                boxShadow: d === 23 ? '0 2px 8px rgba(243, 195, 178, 0.35)' : 'none'
              }}
            >
              {d || ''}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}