import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { JourneyDialog } from './JourneyDialog';
import { useI18n } from '../i18n';

const HERO_BG = '/images/001.png';

export function Hero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [heroBgFailed, setHeroBgFailed] = useState(false);
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { language } = useI18n();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '50%']);
  const smokeY = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [1, 0.5, 0]);

  const copy = {
    en: {
      title1: 'Beyond the Leaves.',
      title2: 'A Journey to the Self.',
      subtitle: 'A 15-minute meditation ritual blending world teas, healing sound, and sensory art.',
      cta: 'Begin Your Journey',
      ctaSecondary: 'Explore The Ritual',
    },
    zh: {
      title1: '超越茶葉本身。',
      title2: '一場向內而行的旅程。',
      subtitle: '以稀缺名茶為媒介，融合冥想引導、茶魂音樂與感官藝術，完成一場 15 分鐘的高密度內在校準。',
      cta: '開啟你的旅程',
      ctaSecondary: '探索感官儀式',
    },
    ja: {
      title1: '茶葉の先へ。',
      title2: '自分に還る旅へ。',
      subtitle: '世界の銘茶、癒しの音、感覚アートを融合した15分間の瞑想体験。',
      cta: '旅をはじめる',
      ctaSecondary: 'リチュアルを見る',
    },
  } as const;

  return (
    <>
      <img
        src={HERO_BG}
        alt=""
        className="hidden"
        aria-hidden
        decoding="async"
        onError={() => setHeroBgFailed(true)}
      />
      <section id="hero" ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-24">
        {/* Background image with overlay - Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 bg-[#131313]"
            style={
              heroBgFailed
                ? undefined
                : {
                    backgroundImage: `url('${HERO_BG}')`,
                  }
            }
          />
          {/* Liquid flow effect - Parallax */}
          <motion.div
            style={{ y: smokeY }}
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen"
            animate={shouldReduceMotion ? { scale: 1, rotate: 0 } : { scale: [1, 1.1, 1], rotate: [0, 2, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-[#131313]"
              style={
                heroBgFailed
                  ? undefined
                  : {
                      backgroundImage: `url('${HERO_BG}')`,
                    }
              }
            />
          </motion.div>
        </motion.div>

        {/* Content - Parallax */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-8"
          style={{ y: contentY, opacity }}
        >
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            {/* Hairline rule above */}
            <motion.div
              className="w-16 h-[0.5px] bg-[#F5F5F3] opacity-30 mx-auto mb-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            <h1 className="text-5xl md:text-7xl mb-8 tracking-tight font-light leading-[1.05]">
              <span className="font-medium">{copy[language].title1}</span>
              <br />
              <span className="text-[#E5E2E1]/80 italic font-light">{copy[language].title2}</span>
            </h1>

            <motion.p
              className="text-base md:text-xl mb-12 max-w-2xl leading-relaxed tracking-wide font-light text-[#C3C8C1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {copy[language].subtitle}
            </motion.p>

            <motion.button
              onClick={() => setIsDialogOpen(true)}
              className="group relative px-12 py-4 backdrop-blur-md bg-[#F5F5F3]/10 border-[0.5px] border-[#C9A961]/40 rounded-full hover:bg-[#C9A961]/20 hover:border-[#C9A961]/60 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A961]/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative text-sm tracking-widest uppercase font-light text-[#C9A961]">
                {copy[language].cta}
              </span>
            </motion.button>
            <button
              type="button"
              onClick={() => document.getElementById('ritual')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="ml-0 mt-4 md:mt-0 md:ml-4 rounded-full border border-[#434843]/40 bg-[#353535]/40 px-8 py-4 text-xs uppercase tracking-[0.1rem] text-[#E5E2E1]/80 backdrop-blur-md transition-colors duration-500 hover:bg-[#353535]/60"
            >
              {copy[language].ctaSecondary}
            </button>

            {/* Hairline rule below */}
            <motion.div
              className="w-16 h-[0.5px] bg-[#F5F5F3] opacity-30 mx-auto mt-12"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          <ChevronDown className="w-6 h-6 text-[#F5F5F3] opacity-30" />
        </motion.div>
      </section>

      <JourneyDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </>
  );
}