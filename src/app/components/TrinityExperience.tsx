import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n';
import { SafeImage } from './SafeImage';

interface TeaCardProps {
  number: string;
  title: string;
  titleEn: string;
  subtitle: string;
  teaTypeLabel: string;
  teaTypeValue: string;
  craft: string;
  vibe: string;
  metrics: string[];
  imageUrl: string;
  index: number;
}

function TeaCard({ number, title, titleEn, subtitle, teaTypeLabel, teaTypeValue, craft, vibe, metrics, imageUrl, index }: TeaCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative zen-glass zen-ink-bleed rounded-xl overflow-hidden transition-all duration-700"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ rotateX: 1.5, rotateY: -1.5, scale: 1.02, transition: { duration: 0.5 } }}
    >
      {/* Rock texture overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1597658437143-cd9eb743b53e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwdGV4dHVyZSUyMGRhcmslMjBtaW5pbWFsfGVufDF8fHx8MTc3NDYwNTUyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/0 via-[#C9A961]/10 to-[#E8B4B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
      />

      {/* Tea image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#131313]">
        <motion.div
          className="h-full w-full"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          <SafeImage
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A]/55" />
        
        {/* Floating particles effect on hover */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#C9A961] rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  opacity: 0,
                }}
                animate={{
                  y: '-20%',
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Number tag */}
        <div className="text-xs tracking-[0.3em] uppercase text-[#C9A961]/60 mb-4 font-light">
          {number}
        </div>

        {/* Title */}
        <h3 className="text-2xl mb-2 tracking-tight font-light">
          {title}
        </h3>
        <p className="text-sm mb-3 tracking-wide font-light text-[#F5F5F3]/45">{titleEn}</p>
        <p className="text-lg mb-2 tracking-wide font-light text-[#F5F5F3]/60">{subtitle}</p>
        <p className="text-sm mb-6 tracking-wide font-light text-[#E8B4B8]/70">
          {teaTypeLabel}: {teaTypeValue}
        </p>

        {/* Hairline divider */}
        <div className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-6" />

        {/* Craft description */}
        <p className="text-xs leading-relaxed tracking-wide font-light text-[#F5F5F3]/60 mb-4">
          {craft}
        </p>

        {/* Vibe quote */}
        <p className="text-sm leading-relaxed tracking-wide font-light text-[#F5F5F3]/80 mb-6 italic">
          {vibe}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs backdrop-blur-md bg-[#C9A961]/10 border-[0.5px] border-[#C9A961]/30 rounded-full text-[#C9A961] tracking-wider font-light"
            >
              <ArrowUpRight className="h-3 w-3" />
              {metric}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TrinityExperience() {
  const { language } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const headerByLanguage = {
    en: { title: 'The Trinity Collection', subtitle: 'Three Signature Teas' },
    zh: { title: '套裝精選茶', subtitle: '探索套裝內的三款精選茶' },
    ja: { title: 'トリニティ・コレクション', subtitle: '3つのシグネチャーティー' },
  } as const;

  const teasByLanguage = {
    en: [
      {
        number: 'No. 01',
        title: 'The Morning Aura',
        titleEn: 'The Morning Aura',
        subtitle: 'Dawn Clarity',
        teaTypeLabel: 'Tea',
        teaTypeValue: 'Jasmine Silver Needle',
        craft: 'Crafted in Fujian with traditional multi-infusion scenting for a natural jasmine expression.',
        vibe: '"Like the first ray through morning mist, clear and awakening."',
        metrics: ['Clarity +15%', 'Energy +10%'],
      },
      {
        number: 'No. 02',
        title: 'The Inspired Resonance',
        titleEn: 'The Inspired Resonance',
        subtitle: 'Creative Baseline',
        teaTypeLabel: 'Tea',
        teaTypeValue: 'Golden Guanyin',
        craft: 'A balanced profile of florals and roast, opening layered aromatics suited for creative expression.',
        vibe: '"As orchid notes unfold in quiet layers, ideas begin to glow from within."',
        metrics: ['Inspiration +20%', 'Flow State +15%'],
      },
      {
        number: 'No. 03',
        title: 'The Timeless Amber',
        titleEn: 'The Timeless Amber',
        subtitle: 'Aged Warmth',
        teaTypeLabel: 'Tea',
        teaTypeValue: 'Vintage Citrus Puerh',
        craft: 'Core-region citrus peel and ripe puerh aged naturally for layered, mellow complexity.',
        vibe: '"No sharp edges, only grounded warmth for deep-night reflection."',
        metrics: ['Calm +25%', 'Groundedness +20%'],
      },
    ],
    zh: [
      {
        number: 'No. 01',
        title: '晨光',
        titleEn: 'The Morning Aura',
        subtitle: '清醒基調',
        teaTypeLabel: '茶型',
        teaTypeValue: '茉莉銀毫',
        craft: '以傳統窨製工藝呈現輕盈花香與淨透茶感，適合晨間重啟與注意力聚焦。',
        vibe: '「像穿透薄霧的第一縷晨光，乾淨、鮮靈、帶來清醒起點。」',
        metrics: ['清晰', '能量'],
      },
      {
        number: 'No. 02',
        title: '靈感共鳴',
        titleEn: 'The Inspired Resonance',
        subtitle: '靈感基調',
        teaTypeLabel: '茶型',
        teaTypeValue: '金觀音',
        craft: '花香與焙韻平衡得當，香氣層次清晰，適合創作與表達場景。',
        vibe: '「當蘭韻層層展開，思路會在安靜中被點亮。」',
        metrics: ['靈感', '心流'],
      },
      {
        number: 'No. 03',
        title: '時光琥珀',
        titleEn: 'The Timeless Amber',
        subtitle: '沉潛基調',
        teaTypeLabel: '茶型',
        teaTypeValue: '陳年柑普',
        craft: '陳化後的果韻與熟普厚度相互托舉，口感溫潤，尾韻綿長。',
        vibe: '「像夜色裡緩慢發亮的琥珀，給你穩定而深沉的內在支撐。」',
        metrics: ['平靜', '沉穩'],
      },
    ],
    ja: [
      {
        number: 'No. 01',
        title: '朝のオーラ',
        titleEn: 'The Morning Aura',
        subtitle: '透明な目覚め',
        teaTypeLabel: '茶種',
        teaTypeValue: 'ジャスミン白毫',
        craft: '福建の伝統製法による多層窨製で、自然な花香と軽やかな旨みを引き出す。',
        vibe: '「朝霧を貫く一筋の光のように、澄んで目覚める。」',
        metrics: ['明瞭感 +15%', '活力 +10%'],
      },
      {
        number: 'No. 02',
        title: 'インスパイア共鳴',
        titleEn: 'The Inspired Resonance',
        subtitle: 'ひらめきの基調',
        teaTypeLabel: '茶種',
        teaTypeValue: '金観音',
        craft: '花香と焙煎のバランスがよく、香りの層が思考を静かに整える。',
        vibe: '「蘭の気配がほどけるほど、発想は内側から明るくなる。」',
        metrics: ['発想力 +20%', 'フロー +15%'],
      },
      {
        number: 'No. 03',
        title: 'タイムレス・アンバー',
        titleEn: 'The Timeless Amber',
        subtitle: '熟成の温もり',
        teaTypeLabel: '茶種',
        teaTypeValue: 'ヴィンテージ柑橘プーアル',
        craft: '熟成した柑皮と熟普洱が重なり、丸みある深い余韻を生む。',
        vibe: '「鋭さはなく、夜の思索を支える静かな温かさだけが残る。」',
        metrics: ['落ち着き +25%', '安定感 +20%'],
      },
    ],
  } as const;
  const imageUrls = [
    '/images/no_01.png',
    '/images/no_02.png',
    '/images/no_03.png',
  ];

  return (
    <section id="trinity" ref={ref} className="relative py-32 px-8">
      {/* Hairline rule above */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-24"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div className="max-w-7xl mx-auto" style={{ y }}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 tracking-tight font-light">
            {headerByLanguage[language].title}
          </h2>
          <p className="text-sm tracking-[0.3em] uppercase text-[#C9A961]/60 font-light">
            {headerByLanguage[language].subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teasByLanguage[language].map((tea, index) => (
            <TeaCard key={tea.number} {...tea} imageUrl={imageUrls[index]} index={index} />
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