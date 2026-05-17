'use client'

import { useLang } from '@/hooks/useLang';
import FloralDivider from './FloralDivider';

export default function HostsSection() {
  const { t } = useLang();

  return (
    <section className="px-6 py-6">
      <FloralDivider width={280} />

      <div className="text-center mt-6">
        <div
          style={{
            fontSize: 11,
            color: 'var(--sub)',
            letterSpacing: '3px',
            fontFamily: 'Jost',
            textTransform: 'uppercase'
          }}
        >
          {t('hostsLbl')}
        </div>
        <div
          className="mt-2"
          style={{
            fontFamily: 'Cormorant Garamond',
            fontStyle: 'italic',
            fontSize: 28,
            color: 'var(--text)',
            letterSpacing: '0.8px'
          }}
        >
          {t('hosts')}
        </div>
      </div>
    </section>
  );
}