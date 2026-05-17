'use client'

import { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';

const EVENT_DATE = new Date('2026-08-23T16:30:00+05:00'); // Aktobe time

export default function CountdownSection() {
  const { t } = useLang();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  function calc() {
    const diff = EVENT_DATE.getTime() - new Date().getTime();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  }

  useEffect(() => {
    setMounted(true);
    setTime(calc());
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <section className="px-6 py-2 pb-3">
        <div
          className="text-center mb-4"
          style={{
            fontSize: 11,
            color: 'var(--sub)',
            fontFamily: 'Jost',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}
        >
          {t('countLbl')}
        </div>
        <div className="flex gap-2.5 justify-center">
          {['000', '00', '00', '00'].map((value, i) => (
            <div
              key={i}
              className="flex flex-col items-center"
              style={{
                background: 'var(--countdown)',
                borderRadius: 12,
                padding: '18px 12px 14px',
                minWidth: 64
              }}
            >
              <div
                style={{
                  fontFamily: 'Cormorant Garamond',
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'var(--text)',
                  lineHeight: 0.9,
                  letterSpacing: '0.5px'
                }}
              >
                {value}
              </div>
              <div
                className="mt-1.5"
                style={{
                  fontSize: 9,
                  color: 'var(--sub)',
                  letterSpacing: '1px',
                  fontFamily: 'Jost',
                  textTransform: 'uppercase'
                }}
              >
                {(t('cdUnits') as readonly string[])[i]}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const units = [
    [String(time.d).padStart(3, '0'), t('cdUnits')[0]],
    [String(time.h).padStart(2, '0'), t('cdUnits')[1]],
    [String(time.m).padStart(2, '0'), t('cdUnits')[2]],
    [String(time.s).padStart(2, '0'), t('cdUnits')[3]],
  ];

  return (
    <section className="px-6 py-2 pb-3">
      <div
        className="text-center mb-4"
        style={{
          fontSize: 11,
          color: 'var(--sub)',
          fontFamily: 'Jost',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}
      >
        {t('countLbl')}
      </div>

      <div className="flex gap-2.5 justify-center">
        {units.map(([v, lbl], i) => (
          <div key={i} className="text-center" style={{ minWidth: 54 }}>
            <div
              style={{
                fontFamily: 'Cormorant Garamond',
                fontSize: 34,
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1,
                letterSpacing: '1px'
              }}
            >
              {v}
            </div>
            <div
              className="mt-1.5"
              style={{
                fontSize: 10,
                color: 'var(--sub)',
                fontFamily: 'Jost',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}
            >
              {lbl}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}