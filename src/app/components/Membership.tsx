import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Check, Star } from 'lucide-react';
import { useI18n } from '../i18n';

export function Membership() {
  const [isQuarterly, setIsQuarterly] = useState(true);
  const { language } = useI18n();
  const usdPrices = {
    quarterly: 89.97,
    monthly: 35.99,
    avgMonthly: 29.99,
  };
  const singleTeaUsd = 15.99;
  const monthlyTeaCount = 4;
  const monthlyTeaValueUsd = singleTeaUsd * monthlyTeaCount;
  const currencyMultiplier = {
    zh: 33,
    ja: 150,
  } as const;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const copy = {
    en: {
      eyebrow: 'Join The Journey',
      title: 'Membership & Subscription',
      subtitle: 'A continuous exploration membership',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      popular: 'Most Popular',
      avgPerMonth: 'avg',
      cancelAnytime: 'Cancel anytime',
      quarterUnit: '/ quarter',
      monthUnit: '/ month',
      valueLabel: '4 teas retail value',
      subscribe: 'Subscribe Now',
      trust: 'Cancel anytime, no questions asked',
      benefits: [
        '4 seasonal tea samplers delivered monthly (including hidden picks)',
        'Full app access to guided "Soul Guide" meditation audio',
        'Includes one friend starter kit to send directly after entering their address',
      ],
    },
    zh: {
      eyebrow: '加入旅程',
      title: '會員與訂閱',
      subtitle: '為長期探索者設計的持續進階體系',
      monthly: '月付',
      quarterly: '季付',
      popular: '最受歡迎',
      avgPerMonth: '平均',
      cancelAnytime: '隨時取消',
      quarterUnit: '/ 季',
      monthUnit: '/ 月',
      valueLabel: '4 款茶單買總價值',
      subscribe: '立即訂閱',
      trust: '隨時可取消，無需理由',
      benefits: [
        '每月配送 4 款精選季節茶（含隱藏品種）',
        '包含以上精選茶完整版「心靈導遊」指引音頻',
        '附贈一份好友探索套裝，填寫地址可直接寄送給對方',
      ],
    },
    ja: {
      eyebrow: '旅に参加する',
      title: 'メンバーシップ＆サブスクリプション',
      subtitle: '継続的に深める会員体験',
      monthly: '月額',
      quarterly: '四半期',
      popular: '人気プラン',
      avgPerMonth: '月あたり',
      cancelAnytime: 'いつでも解約',
      quarterUnit: '/ 四半期',
      monthUnit: '/ 月',
      valueLabel: '4種の単品合計価値',
      subscribe: '今すぐ登録',
      trust: 'いつでも解約できます',
      benefits: [
        '毎月4種の季節ティーサンプルを配送（限定種含む）',
        '上記ティーに対応する「ソウルガイド」音声をフル解放',
        '友人向けスターターキット1点付き（住所入力で直接配送）',
      ],
    },
  } as const;

  const localizedPrices =
    language === 'en'
      ? {
          quarterly: `$${usdPrices.quarterly.toFixed(2)}`,
          monthly: `$${usdPrices.monthly.toFixed(2)}`,
          avgMonthly: `$${usdPrices.avgMonthly.toFixed(2)}`,
        }
      : language === 'zh'
        ? {
            quarterly: `NT$${(Math.ceil(usdPrices.quarterly) * currencyMultiplier.zh).toLocaleString('zh-TW')}`,
            monthly: `NT$${(Math.ceil(usdPrices.monthly) * currencyMultiplier.zh).toLocaleString('zh-TW')}`,
            avgMonthly: `NT$${(Math.ceil(usdPrices.avgMonthly) * currencyMultiplier.zh).toLocaleString('zh-TW')}`,
          }
        : {
            quarterly: `¥${(Math.ceil(usdPrices.quarterly) * currencyMultiplier.ja).toLocaleString('ja-JP')}`,
            monthly: `¥${(Math.ceil(usdPrices.monthly) * currencyMultiplier.ja).toLocaleString('ja-JP')}`,
            avgMonthly: `¥${(Math.ceil(usdPrices.avgMonthly) * currencyMultiplier.ja).toLocaleString('ja-JP')}`,
          };
  const localizedMonthlyTeaValue =
    language === 'en'
      ? `USD ${monthlyTeaValueUsd.toFixed(2)}`
      : language === 'zh'
        ? `NT$${(Math.ceil(monthlyTeaValueUsd) * currencyMultiplier.zh).toLocaleString('zh-TW')}`
        : `¥${(Math.ceil(monthlyTeaValueUsd) * currencyMultiplier.ja).toLocaleString('ja-JP')}`;

  return (
    <section id="membership" ref={ref} className="relative py-32 px-8">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A961]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E8B4B8]/5 rounded-full blur-3xl" />

      {/* Hairline rule above */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-24"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div className="relative max-w-4xl mx-auto" style={{ y }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A961]/60 mb-4 font-light">
            {copy[language].eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl mb-6 tracking-tight font-light">
            {copy[language].title}
          </h2>
          <p className="text-base leading-relaxed tracking-wide font-light text-[#F5F5F3]/70">
            {copy[language].subtitle}
          </p>
        </motion.div>

        {/* Toggle Switch */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span
            className={`text-sm tracking-wide font-light transition-colors duration-300 ${
              !isQuarterly ? 'text-[#F5F5F3]' : 'text-[#F5F5F3]/40'
            }`}
          >
            {copy[language].monthly}
          </span>
          <button
            onClick={() => setIsQuarterly(!isQuarterly)}
            className={`relative w-16 h-8 rounded-full backdrop-blur-md transition-all duration-500 ${
              isQuarterly
                ? 'bg-[#C9A961]/30 border-[0.5px] border-[#C9A961]/60'
                : 'bg-[#F5F5F3]/10 border-[0.5px] border-[#F5F5F3]/20'
            }`}
          >
            <motion.div
              className={`absolute top-1 w-6 h-6 rounded-full ${
                isQuarterly ? 'bg-[#C9A961]' : 'bg-[#F5F5F3]/60'
              }`}
              animate={{ x: isQuarterly ? 32 : 4 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span
            className={`text-sm tracking-wide font-light transition-colors duration-300 flex items-center gap-2 ${
              isQuarterly ? 'text-[#F5F5F3]' : 'text-[#F5F5F3]/40'
            }`}
          >
            {copy[language].quarterly}
            {isQuarterly && (
              <span className="px-2 py-0.5 text-xs backdrop-blur-md bg-[#E8B4B8]/20 border-[0.5px] border-[#E8B4B8]/40 rounded-full text-[#E8B4B8]">
                {copy[language].popular}
              </span>
            )}
          </span>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          className="relative backdrop-blur-md bg-[#F5F5F3]/5 border-[0.5px] border-[#C9A961]/30 rounded-3xl p-12 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          {/* Glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#C9A961]/10 rounded-full blur-3xl" />

          <div className="relative">
            {/* Price */}
            <div className="text-center mb-10">
              <motion.div
                key={isQuarterly ? 'quarterly' : 'monthly'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isQuarterly ? (
                  <>
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-5xl tracking-tight font-light text-[#C9A961]">
                        {localizedPrices.quarterly}
                      </span>
                      <span className="text-lg text-[#F5F5F3]/60 font-light">{copy[language].quarterUnit}</span>
                    </div>
                    <p className="text-sm text-[#F5F5F3]/50 font-light">
                      {copy[language].avgPerMonth} <span className="text-[#C9A961]">{localizedPrices.avgMonthly}</span> {copy[language].monthUnit}
                    </p>
                    <p className="mt-2 text-xs text-[#F5F5F3]/45 font-light">
                      {copy[language].valueLabel}: <span className="text-[#E8B4B8]">{localizedMonthlyTeaValue}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-5xl tracking-tight font-light text-[#F5F5F3]">
                        {localizedPrices.monthly}
                      </span>
                      <span className="text-lg text-[#F5F5F3]/60 font-light">{copy[language].monthUnit}</span>
                    </div>
                    <p className="text-sm text-[#F5F5F3]/50 font-light">{copy[language].cancelAnytime}</p>
                    <p className="mt-2 text-xs text-[#F5F5F3]/45 font-light">
                      {copy[language].valueLabel}: <span className="text-[#E8B4B8]">{localizedMonthlyTeaValue}</span>
                    </p>
                  </>
                )}
              </motion.div>
            </div>

            {/* Hairline */}
            <div className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-10" />

            {/* Benefits */}
            <div className="space-y-5 mb-10">
              {copy[language].benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="p-1 rounded-full bg-[#C9A961]/20">
                      <Check className="w-4 h-4 text-[#C9A961]" />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed tracking-wide font-light text-[#F5F5F3]/80">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              type="button"
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="w-full px-8 py-4 backdrop-blur-md bg-[#C9A961]/20 border-[0.5px] border-[#C9A961]/60 rounded-xl hover:bg-[#C9A961]/30 transition-all duration-500 text-[#C9A961] text-sm tracking-widest uppercase font-light"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {copy[language].subscribe}
            </motion.button>

            {/* Trust badge */}
            <motion.p
              className="text-xs text-center text-[#F5F5F3]/40 mt-6 tracking-wide font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {copy[language].trust}
            </motion.p>
          </div>
        </motion.div>
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
