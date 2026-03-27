import { useI18n } from '../i18n';

export function LanguageSwitcher() {
  const { language, setLanguage, languages } = useI18n();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#F5F5F3]/20 bg-[#111214]/70 p-1 backdrop-blur-md">
      {languages.map((item) => {
        const active = item.code === language;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLanguage(item.code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1.5 text-xs tracking-wide transition-colors ${
              active
                ? 'bg-[#C9A961]/20 text-[#C9A961]'
                : 'text-[#F5F5F3]/60 hover:text-[#F5F5F3]'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
