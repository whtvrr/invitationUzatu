'use client'

import { useLang } from '@/hooks/useLang';

export default function LanguageToggle() {
  const { lang, switchLang } = useLang();

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-accent/30">
        <div className="flex items-center">
          <button
            onClick={() => switchLang('kk')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              lang === 'kk'
                ? 'bg-countdown text-text shadow-sm'
                : 'text-sub hover:text-text'
            }`}
          >
            ҚАЗ
          </button>
          <button
            onClick={() => switchLang('ru')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              lang === 'ru'
                ? 'bg-countdown text-text shadow-sm'
                : 'text-sub hover:text-text'
            }`}
          >
            РУС
          </button>
        </div>
      </div>
    </div>
  );
}