import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Smartphone, Volume2, Activity, TrendingUp } from 'lucide-react';
import { useI18n } from '../i18n';

interface AppFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function AppFeature({ icon, title, description, index }: AppFeatureProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
    >
      <motion.div
        className="relative mb-6 p-4 backdrop-blur-md bg-[#E8B4B8]/10 border-[0.5px] border-[#E8B4B8]/20 rounded-2xl group-hover:bg-[#E8B4B8]/20 transition-all duration-500"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
        {/* Glow */}
        <motion.div
          className="absolute inset-0 bg-[#E8B4B8]/30 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </motion.div>
      <h4 className="text-lg mb-3 tracking-tight font-light">{title}</h4>
      <p className="text-sm leading-relaxed tracking-wide font-light text-[#F5F5F3]/60 max-w-xs">
        {description}
      </p>
    </motion.div>
  );
}

export function AppSection() {
  const { language } = useI18n();
  const ref = useRef(null);
  const copy = {
    en: { eyebrow: 'Digital Companion', title: 'The App', subTitleAccent: 'Soul Guide', subtitle: 'Turn each tea session into a trackable personal asset you can revisit and deepen.', cta: 'Download The App' },
    zh: { eyebrow: '數位伴侶', title: '應用程式', subTitleAccent: '心靈導遊', subtitle: '讓每一次品茶都形成可復盤、可積累的個人體驗資產', cta: '下載應用' },
    ja: { eyebrow: 'デジタルコンパニオン', title: 'アプリ', subTitleAccent: 'ソウルガイド', subtitle: '一杯ごとの体験を、振り返り可能で蓄積できる自分の資産へ。', cta: 'アプリをダウンロード' },
  } as const;

  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const featuresByLanguage = {
    en: [
      { title: 'Immersive Guidance', description: 'Voice guidance leads you through pouring, aroma, sip, and finish in one coherent rhythm.' },
      { title: 'Tea-Soul Sound Design', description: 'Each tea includes its own cultural and emotional soundtrack to deepen immersion.' },
      { title: 'Attribute Tracking', description: 'Log shifts in focus, calm, and creativity after each journey to reveal your growth curve.' },
    ],
    zh: [
      { title: '沉浸式引導', description: '以專業語音腳本帶你完成注水、聞香、入口與回韻的完整節奏。' },
      { title: '茶魂音樂', description: '圍繞該茶的產品背景與文化語境配置專屬配樂，提升品飲專注與沉浸。' },
      { title: '屬性追蹤', description: '記錄每次旅程後的專注、平靜、創造力變化，形成你的內在成長曲線。' },
    ],
    ja: [
      { title: '没入型ガイド', description: '注湯、聞香、口に含む、余韻までを一続きの所作として丁寧に導く。' },
      { title: '茶魂サウンド', description: '各茶の背景と文化文脈に合わせた音設計で、集中と没入を高める。' },
      { title: '属性トラッキング', description: '集中・静けさ・創造性の変化を記録し、内面の成長曲線として可視化する。' },
    ],
  } as const;
  const featureIcons = [
    <Volume2 key="volume" className="w-6 h-6 text-[#E8B4B8]" />,
    <Activity key="activity" className="w-6 h-6 text-[#E8B4B8]" />,
    <TrendingUp key="trend" className="w-6 h-6 text-[#E8B4B8]" />,
  ];

  return (
    <section ref={ref} className="relative py-32 px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#E8B4B8]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#C9A961]/5 rounded-full blur-3xl" />

      {/* Hairline rule above */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-24"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div className="relative max-w-7xl mx-auto" style={{ y }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            <div className="mb-12">
              <p className="text-xs tracking-[0.3em] uppercase text-[#E8B4B8]/60 mb-4 font-light">
                {copy[language].eyebrow}
              </p>
              <h2 className="text-4xl md:text-5xl mb-6 tracking-tight font-light">
                {copy[language].title}
              </h2>
              <p className="text-2xl mb-4 tracking-wide font-light text-[#E8B4B8]/80">
                {copy[language].subTitleAccent}
              </p>
              <p className="text-base leading-relaxed tracking-wide font-light text-[#F5F5F3]/70 mb-8">
                {copy[language].subtitle}
              </p>
              <div className="w-16 h-[0.5px] bg-[#E8B4B8]/40 mb-12" />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-10">
              {featuresByLanguage[language].map((feature, index) => (
                <AppFeature
                  key={feature.title}
                  icon={featureIcons[index]}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              ))}
            </div>

            {/* CTA */}
            <motion.button
              type="button"
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="mt-12 px-10 py-4 backdrop-blur-md bg-[#E8B4B8]/10 border-[0.5px] border-[#E8B4B8]/40 rounded-full hover:bg-[#E8B4B8]/20 hover:border-[#E8B4B8]/60 transition-all duration-500 text-[#E8B4B8] text-sm tracking-widest uppercase font-light"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {copy[language].cta}
            </motion.button>
          </motion.div>

          {/* Right: App preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            <div className="relative rounded-3xl overflow-hidden border-[0.5px] border-[#E8B4B8]/20">
              <img
                src="https://images.unsplash.com/photo-1769893841740-fc98ce39a3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwYXBwJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3NDYwNjk2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Soul Guide App"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
              
              {/* Floating phone icon */}
              <motion.div
                className="absolute top-8 right-8 p-4 backdrop-blur-lg bg-[#E8B4B8]/20 border-[0.5px] border-[#E8B4B8]/40 rounded-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Smartphone className="w-6 h-6 text-[#E8B4B8]" />
              </motion.div>
            </div>

            {/* Floating glow */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#E8B4B8]/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#C9A961]/20 rounded-full blur-3xl" />
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
