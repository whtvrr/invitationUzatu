'use client'

import { useLang } from '@/hooks/useLang';
import FloralDivider from './FloralDivider';

export default function InviteSection() {
  const { t } = useLang();

  return (
    <section className="px-6 py-6">
      {/* Invitation paragraph */}
      <div
        className="text-center px-2 py-3 whitespace-pre-line"
        style={{
          fontFamily: 'Cormorant Garamond',
          fontStyle: 'italic',
          color: 'var(--text)',
          fontSize: 19,
          lineHeight: 1.65,
          letterSpacing: '0.4px'
        }}
      >
        {t('invite')}
      </div>

      <div className="mt-6">
        <FloralDivider width={280} />
      </div>
    </section>
  );
}