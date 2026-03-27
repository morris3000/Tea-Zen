import { Helmet } from 'react-helmet-async';
import { useI18n } from './i18n';

const SEO = {
  en: {
    title: 'The Tea Zen Box — Tea meditation & curated rare teas',
    description:
      'A 15-minute tea meditation ritual: rare teas, guided sound, and sensory design. Explore the Starter Kit and membership.',
    ogLocale: 'en_US',
  },
  zh: {
    title: 'The Tea Zen Box — 茶禪冥想與珍稀茗茶策展',
    description:
      '以稀缺名茶為媒介，融合冥想引導與感官設計的 15 分鐘儀式。探索探索套裝與會員方案。',
    ogLocale: 'zh_TW',
  },
  ja: {
    title: 'The Tea Zen Box — ティーメディテーションと厳選茶',
    description:
      '銘茶、ガイド付きサウンド、感覚デザインを組み合わせた15分の儀式。スターターキットとメンバーシップをご覧ください。',
    ogLocale: 'ja_JP',
  },
} as const;

const DEFAULT_OG_IMAGE = '/images/001.png';

export function SeoHead() {
  const { language } = useI18n();
  const meta = SEO[language];
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const ogUrl = origin ? `${origin}/` : '/';
  const ogImage = origin ? `${origin}${DEFAULT_OG_IMAGE}` : DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <html lang={language === 'zh' ? 'zh-TW' : language === 'ja' ? 'ja' : 'en'} />
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:locale" content={meta.ogLocale} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
