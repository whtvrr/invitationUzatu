'use client'

import { useState, useEffect } from 'react';
import { Language, i18n, TranslationKeys } from '@/lib/i18n';

export function useLang() {
  const [lang, setLang] = useState<Language>('kk');

  useEffect(() => {
    // Load from localStorage and URL params
    const saved = localStorage.getItem('samal_lang') as Language;
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang') as Language;

    const initialLang = urlLang || saved || 'kk';
    if (initialLang === 'kk' || initialLang === 'ru') {
      setLang(initialLang);
    }
  }, []);

  const switchLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('samal_lang', newLang);

    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.replaceState({}, '', url.toString());
  };

  const t = (key: TranslationKeys): string | readonly string[] => {
    return i18n[lang][key] || key;
  };

  return { lang, switchLang, t };
}