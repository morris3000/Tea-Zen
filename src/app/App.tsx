import { lazy, Suspense } from 'react';
import { Hero } from './components/Hero';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { SeoHead } from './SeoHead';
import { useI18n } from './i18n';

const StarterKit = lazy(() =>
  import('./components/StarterKit').then((m) => ({ default: m.StarterKit })),
);
const TrinityExperience = lazy(() =>
  import('./components/TrinityExperience').then((m) => ({ default: m.TrinityExperience })),
);
const Membership = lazy(() =>
  import('./components/Membership').then((m) => ({ default: m.Membership })),
);
const FutureExploration = lazy(() =>
  import('./components/FutureExploration').then((m) => ({ default: m.FutureExploration })),
);
const TheRitual = lazy(() =>
  import('./components/TheRitual').then((m) => ({ default: m.TheRitual })),
);
const AppSection = lazy(() =>
  import('./components/AppSection').then((m) => ({ default: m.AppSection })),
);
const Team = lazy(() => import('./components/Team').then((m) => ({ default: m.Team })));
const BrandQuote = lazy(() =>
  import('./components/BrandQuote').then((m) => ({ default: m.BrandQuote })),
);

function SectionSkeleton() {
  return (
    <div className="flex min-h-[28vh] items-center justify-center bg-[#131313]">
      <div className="h-1 w-14 animate-pulse rounded-full bg-[#C9A961]/25" aria-hidden />
    </div>
  );
}

export default function App() {
  const { language } = useI18n();
  const navByLanguage = {
    en: [
      { label: 'The Trinity', href: '#trinity' },
      { label: 'Starter Kit', href: '#starter-kit' },
      { label: 'Membership', href: '#membership' },
    ],
    zh: [
      { label: '套裝精選茶', href: '#trinity' },
      { label: '探索套裝', href: '#starter-kit' },
      { label: '會員方案', href: '#membership' },
    ],
    ja: [
      { label: '3種のコレクション', href: '#trinity' },
      { label: 'スターターキット', href: '#starter-kit' },
      { label: 'メンバーシップ', href: '#membership' },
    ],
  } as const;

  return (
    <div className="dark bg-[#131313] text-[#E5E2E1] min-h-screen">
      <SeoHead />
      <header className="fixed top-0 z-40 w-full zen-hairline bg-[#131313]/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#hero" className="font-headline text-lg tracking-tight text-[#E5E2E1]">
            The Tea Zen Box
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {navByLanguage[language].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs uppercase tracking-[0.1rem] text-[#E5E2E1]/60 transition-colors duration-500 hover:text-[#E5E2E1]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <LanguageSwitcher />
        </div>
      </header>
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <StarterKit />
        <TrinityExperience />
        <Membership />
        <FutureExploration />
        <TheRitual />
        <AppSection />
        <Team />
        <BrandQuote />
      </Suspense>
    </div>
  );
}