import { createContext, useContext, useMemo, useState } from 'react';

export type Language = 'en' | 'zh' | 'ja';

type I18nContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  languages: { code: Language; label: string }[];
};

const I18nContext = createContext<I18nContextValue | null>(null);

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
];

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      languages: LANGUAGES,
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
