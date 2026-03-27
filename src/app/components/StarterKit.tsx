import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Package, Music, Palette, Wine } from 'lucide-react';
import { useI18n } from '../i18n';
import { SafeImage } from './SafeImage';

interface KitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function KitItem({ icon, title, description, index }: KitItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-4 group"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.19, 1.0, 0.22, 1.0] }}
    >
      <div className="flex-shrink-0 p-3 backdrop-blur-md bg-[#C9A961]/10 border-[0.5px] border-[#C9A961]/20 rounded-xl group-hover:bg-[#C9A961]/20 transition-all duration-500">
        {icon}
      </div>
      <div>
        <h4 className="text-base mb-2 tracking-tight font-light">{title}</h4>
        <p className="text-sm leading-relaxed tracking-wide font-light text-[#F5F5F3]/60">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function StarterKit() {
  const { language } = useI18n();
  const starterKitUsd = 45.99;
  /** Approximate display rates — refresh periodically for marketing accuracy. */
  const currencyMultiplier = { zh: 33, ja: 150 } as const;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const kitItemsByLanguage = {
    en: [
      {
        title: 'Three Signature Teas (1 serving each)',
        description: 'The Morning Aura, The Inspired Resonance, and The Timeless Amber.',
      },
      {
        title: 'Core Tea Ware (The Vessel)',
        description: 'A minimalist white porcelain or heat-resistant glass gaiwan designed for aroma clarity.',
      },
      {
        title: 'Digital Sound Pass',
        description: 'Permanent unlock of AI-interactive audio for the first three teas.',
      },
      {
        title: 'Art Cards',
        description: 'Three numbered visual cards with brewing parameters and attribute guidance.',
      },
    ],
    zh: [
      {
        title: '三款精選茶（各 1 份）',
        description: '晨光、花韻、時光琥珀三支風味原型，完整納入探索套裝。',
      },
      {
        title: '基礎茶具',
        description: '極簡白瓷/耐熱玻璃蓋碗，精準釋放香氣層次，降低沖泡門檻。',
      },
      {
        title: '數位音樂通行證',
        description: '永久解鎖首批三款茶的完整心靈導遊與茶文化配樂。',
      },
      {
        title: '藝術卡片',
        description: '三張獨立編號視覺卡，附沖泡參數、品飲提示與屬性指引。',
      },
    ],
    ja: [
      {
        title: '3種のシグネチャーティー（各1杯分）',
        description: '朝のオーラ、インスパイア共鳴、タイムレス・アンバー。',
      },
      {
        title: '基本茶器',
        description: '香りを捉えやすい、ミニマルな白磁/耐熱ガラスの蓋碗。',
      },
      {
        title: 'デジタルサウンドパス',
        description: '最初の3種のAIインタラクティブ音声を恒久解放。',
      },
      {
        title: 'アートカード',
        description: '番号付きビジュアルカード3枚。抽出パラメータと属性ガイド付き。',
      },
    ],
  } as const;
  const kitIcons = [
    <Package key="package" className="w-5 h-5 text-[#C9A961]" />,
    <Wine key="wine" className="w-5 h-5 text-[#C9A961]" />,
    <Music key="music" className="w-5 h-5 text-[#E8B4B8]" />,
    <Palette key="palette" className="w-5 h-5 text-[#E8B4B8]" />,
  ];

  const copy = {
    en: { eyebrow: 'For Explorers', title: 'The Starter Kit', subtitle: 'A structured starter set that unifies three signature teas, core ware, and guided practice.', cta: 'Explore The Kit', pricePrefix: 'Starter Kit:' },
    zh: { eyebrow: '為探索者準備', title: '探索套裝', subtitle: '將三款精選茶、器具與引導系統融合為一體的入門範式', cta: '探索套裝內容', pricePrefix: '探索套裝：' },
    ja: { eyebrow: '探求者のために', title: 'スターターキット', subtitle: '3種の厳選茶・茶器・ガイド体験を一つに束ねた導入セット', cta: 'キット内容を見る', pricePrefix: 'スターターキット：' },
  } as const;

  const localizedStarterKitPrice =
    language === 'en'
      ? `$${starterKitUsd.toFixed(2)}`
      : language === 'zh'
        ? `NT$${(Math.ceil(starterKitUsd) * currencyMultiplier.zh).toLocaleString('zh-TW')}`
        : `¥${(Math.ceil(starterKitUsd) * currencyMultiplier.ja).toLocaleString('ja-JP')}`;

  return (
    <section id="starter-kit" ref={ref} className="relative py-32 px-8">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A961]/5 rounded-full blur-3xl" />

      {/* Hairline rule above */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-24"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div className="relative max-w-6xl mx-auto" style={{ y }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            <div className="relative rounded-2xl overflow-hidden border-[0.5px] border-[#F5F5F3]/10">
              <SafeImage
                src="/images/tea-cup.png"
                alt="The Starter Kit"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-[500px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
            </div>
            {/* Floating glow */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#E8B4B8]/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            <div className="mb-8">
              <p className="text-xs tracking-[0.3em] uppercase text-[#C9A961]/60 mb-4 font-light">
                {copy[language].eyebrow}
              </p>
              <h2 className="text-4xl md:text-5xl mb-6 tracking-tight font-light">
                {copy[language].title}
              </h2>
              <p className="text-base leading-relaxed tracking-wide font-light text-[#F5F5F3]/70 mb-8">
                {copy[language].subtitle}
              </p>
              <p className="inline-flex rounded-full border border-[#C9A961]/35 bg-[#C9A961]/10 px-3 py-1 text-xs tracking-wider text-[#C9A961] mb-8">
                {copy[language].pricePrefix} {localizedStarterKitPrice}
              </p>
              <div className="w-16 h-[0.5px] bg-[#C9A961]/40 mb-8" />
            </div>

            {/* Kit items */}
            <div className="space-y-6">
              {kitItemsByLanguage[language].map((item, index) => (
                <KitItem key={item.title} icon={kitIcons[index]} title={item.title} description={item.description} index={index} />
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              type="button"
              onClick={() => document.getElementById('trinity')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="mt-10 px-10 py-4 backdrop-blur-md bg-[#C9A961]/10 border-[0.5px] border-[#C9A961]/40 rounded-full hover:bg-[#C9A961]/20 hover:border-[#C9A961]/60 transition-all duration-500 text-[#C9A961] text-sm tracking-widest uppercase font-light"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {copy[language].cta}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Hairline rule below */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mt-24"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </section>
  );
}
