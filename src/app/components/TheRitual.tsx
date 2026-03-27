import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Droplet, Headphones, TrendingUp } from 'lucide-react';
import { useI18n } from '../i18n';

interface RitualStepProps {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function RitualStep({ step, icon, title, description, index }: RitualStepProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center text-center group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.3, duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
    >
      {/* Step number */}
      <motion.div
        className="text-xs tracking-[0.3em] uppercase text-[#C9A961]/40 mb-6 font-light"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
        transition={{ delay: index * 0.3 + 0.2 }}
      >
        {step}
      </motion.div>

      {/* Icon with glow */}
      <motion.div
        className="relative mb-8"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6 backdrop-blur-md bg-[#F5F5F3]/5 border-[0.5px] border-[#F5F5F3]/10 rounded-2xl group-hover:border-[#C9A961]/40 transition-all duration-500">
          {icon}
        </div>
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-[#C9A961]/20 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Title */}
      <h3 className="text-2xl mb-4 tracking-tight font-light">{title}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed tracking-wide font-light text-[#F5F5F3]/70 max-w-xs">
        {description}
      </p>

      {/* Connecting line (except for last item) */}
      {index < 2 && (
        <motion.div
          className="hidden lg:block absolute top-24 left-full w-32 h-[0.5px] bg-gradient-to-r from-[#C9A961]/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
        />
      )}
    </motion.div>
  );
}

export function TheRitual() {
  const { language } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const copy = {
    en: { title: 'The Ritual', subtitle: 'A 15-minute multisensory ritual' },
    zh: { title: '感官儀式', subtitle: '15 分鐘完成一次可複用的內在整定' },
    ja: { title: 'リチュアル', subtitle: '15分のマルチセンサリー体験' },
  } as const;

  const stepsByLanguage = {
    en: [
      { step: 'Step 1', title: 'Brew', description: 'Use 90-100°C water (93°C recommended). Smell first, then sip, letting your senses open in sequence.' },
      { step: 'Step 2', title: 'Listen', description: 'Scan the art card to enter this tea’s dedicated sound track and follow the rhythm of your breath.' },
      { step: 'Step 3', title: 'Reflect', description: 'Record your current state and attribute shifts to build a reusable inner rhythm over time.' },
    ],
    zh: [
      { step: '步驟 1', title: '沖泡', description: '90-100°C 熱水，建議 93°C。先聞香、後入口，讓感官逐步打開。' },
      { step: '步驟 2', title: '聆聽', description: '掃描藝術卡進入該茶專屬音軌，以呼吸節奏完成品飲引導。' },
      { step: '步驟 3', title: '回觀', description: '記錄當下狀態與屬性變化，沉澱可持續複用的個人節律。' },
    ],
    ja: [
      { step: 'ステップ 1', title: '淹れる', description: '90-100℃のお湯（推奨93℃）で。まず香りを聴き、次に口に含み、感覚を順に開く。' },
      { step: 'ステップ 2', title: '聴く', description: 'アートカードのQRを読み取り、その茶専用の音トラックで呼吸のリズムを整える。' },
      { step: 'ステップ 3', title: '回観する', description: 'その時の状態と属性変化を記録し、再現可能な自分のリズムとして蓄積する。' },
    ],
  } as const;
  const icons = [
    <Droplet key="brew" className="w-8 h-8 text-[#C9A961]" />,
    <Headphones key="listen" className="w-8 h-8 text-[#E8B4B8]" />,
    <TrendingUp key="reflect" className="w-8 h-8 text-[#C9A961]" />,
  ];

  return (
    <section id="ritual" ref={ref} className="relative py-32 px-8 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A961]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E8B4B8]/5 rounded-full blur-3xl" />

      {/* Hairline rule above */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-24"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div className="relative max-w-7xl mx-auto" style={{ y }}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight font-light">{copy[language].title}</h2>
          <p className="text-sm tracking-[0.3em] uppercase text-[#C9A961]/60 font-light">
            {copy[language].subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
          {stepsByLanguage[language].map((step, index) => (
            <RitualStep key={step.step} {...step} icon={icons[index]} index={index} />
          ))}
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
