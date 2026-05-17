'use client'

import { i18n, TranslationKeys } from '@/lib/i18n';

export function useLang() {
  const t = (key: TranslationKeys): string | readonly string[] => {
    return i18n[key] || key;
  };

  return { t };
}