import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Award, Heart } from 'lucide-react';
import { useI18n } from '../i18n';
import { SafeImage } from './SafeImage';

interface TeamMemberProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  index: number;
}

function TeamMember({ title, description, icon, imageUrl, index }: TeamMemberProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="group relative backdrop-blur-md bg-[#F5F5F3]/5 border-[0.5px] border-[#F5F5F3]/10 rounded-2xl overflow-hidden hover:border-[#C9A961]/30 transition-all duration-700"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
      whileHover={{ y: -5 }}
    >
      {/* Image — object-contain shows full portrait without cropping */}
      <div className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden bg-[#131313] sm:min-h-[320px]">
        <motion.div
          className="flex max-h-[min(420px,55vh)] w-full items-center justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.7 }}
        >
          <SafeImage
            src={imageUrl}
            alt={title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="max-h-[min(420px,55vh)] w-full object-contain object-center"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1A1A1A]/85 via-[#1A1A1A]/25 to-transparent" />
        
        {/* Icon badge */}
        <motion.div
          className="absolute top-6 right-6 p-3 backdrop-blur-lg bg-[#C9A961]/20 border-[0.5px] border-[#C9A961]/40 rounded-xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl mb-4 tracking-tight font-light">{title}</h3>
        <p className="text-sm leading-relaxed tracking-wide font-light text-[#F5F5F3]/70">
          {description}
        </p>
      </div>

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/10 via-transparent to-[#E8B4B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />
    </motion.div>
  );
}

export function Team() {
  const { language } = useI18n();
  const ref = useRef(null);
  const copy = {
    en: { eyebrow: 'Our Co-Creators', title: 'Team & Philosophy', subtitle: 'The team where tradition meets modernity', mission: 'Our Mission' },
    zh: { eyebrow: '聯合創作者', title: '團隊與理念', subtitle: '以專業製茶與身心訓練共同構建體驗深度', mission: '我們的使命' },
    ja: { eyebrow: '共創チーム', title: 'チームと哲学', subtitle: '伝統と現代をつなぐコアチーム', mission: '私たちの使命' },
  } as const;

  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const teamMembersByLanguage = {
    en: [
      {
        title: 'Co-Founder · Certified Tea Sommelier',
        description:
          'Around fifteen years in specialty tea, with a decade immersed in Fujian—China’s foremost tea province—walking gardens, cupping lots, and mapping how terroir and craft translate into the cup. Deep fluency in Chinese tea quality, sourcing channels, and seasonal character guides every curation toward traceable leaves and consistent, honest flavor.',
      },
      {
        title: 'Co-Founder · Yoga & Meditation Guide',
        description:
          'Led the university yoga club as president, then built more than ten years of practice across asana, breath, and mindful movement. She weaves breath cadence into the tea ritual so stillness and focus arrive within fifteen minutes—repeatable, embodied, and quietly grounding.',
      },
    ],
    zh: [
      {
        title: '聯合創辦人・持證品茶師',
        description:
          '約十五年品茶與選茶資歷，於「中國第一茶省」福建深耕逾十年：走訪產區、杯測批次、把關工藝與風味曲線，深諳各類中國茶的品質門檻與供應脈絡。以可追溯的來源與穩定表現，為每一款茶建立值得信賴的味覺與敘事。',
      },
      {
        title: '聯合創辦人・瑜珈／冥想導師',
        description:
          '大學時期即擔任瑜珈社長，此後累積逾十年瑜珈與身心相關訓練，專注於體式、呼吸與覺察的整合。她將呼吸節奏與飲茶動作編成可重複的儀式，讓放鬆與專注在十五分鐘內可被身體記住，並在每一次沖泡中溫柔落地。',
      },
    ],
    ja: [
      {
        title: '共同創業者・認定ティーソムリエ',
        description:
          '銘茶の探求歴は約15年。中国屈指の茶産地・福建で10年以上にわたり産地を歩き、カッピングと工程を見極めながら、風土と技法が杯にどう宿るかを読み解いてきた。中国茶の品質基準と調達の流れに精通し、トレーサブルで一貫した味わいへと導く。',
      },
      {
        title: '共同創業者・ヨガ／瞑想ガイド',
        description:
          '大学時代にヨガサークル代表を務め、その後10年以上にわたりヨガと心身の実践に関わってきた。アーサナと呼吸、気づきを一つの流れにし、茶の所作と呼吸のリズムを結びつける。15分のうちに静けさと集中が身体に刻まれるよう、繰り返し行える儀式として設計する。',
      },
    ],
  } as const;
  const teamImages = ['/images/coFounder01.png', '/images/coFounder03.png'];
  const teamIcons = [
    <Award key="award" className="w-5 h-5 text-[#C9A961]" />,
    <Heart key="heart" className="w-5 h-5 text-[#E8B4B8]" />,
  ];
  const missionByLanguage = {
    en: 'In fast-paced city life, we create a 15-minute micro-sanctuary you can enter without leaving your seat. Every brew becomes a deep conversation with yourself.',
    zh: '在高壓節奏中，我們把複雜的修復過程壓縮為 15 分鐘可執行方案：一杯茶、一段引導、一次回觀。你獲得的不只是當下放鬆，而是可持續複用的穩定能力。',
    ja: '慌ただしい都市生活の中でも、席を立たずに入れる15分の小さな避難所を。お茶を淹れるたび、自分との深い対話が始まります。',
  } as const;

  return (
    <section ref={ref} className="relative py-32 px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A961]/5 to-transparent" />

      {/* Hairline rule above */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-24"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div className="relative max-w-7xl mx-auto" style={{ y }}>
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
          <p className="text-base leading-relaxed tracking-wide font-light text-[#F5F5F3]/70 max-w-3xl mx-auto mb-8">
            {copy[language].subtitle}
          </p>
          <div className="w-16 h-[0.5px] bg-[#C9A961]/40 mx-auto" />
        </motion.div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {teamMembersByLanguage[language].map((member, index) => (
            <TeamMember
              key={member.title}
              title={member.title}
              description={member.description}
              icon={teamIcons[index]}
              imageUrl={teamImages[index]}
              index={index}
            />
          ))}
        </div>

        {/* Mission statement */}
        <motion.div
          className="relative backdrop-blur-md bg-[#F5F5F3]/5 border-[0.5px] border-[#C9A961]/20 rounded-3xl p-12 text-center overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A961]/10 rounded-full blur-3xl" />

          <div className="relative">
            <motion.div
              className="inline-block mb-6 p-4 backdrop-blur-md bg-[#C9A961]/10 border-[0.5px] border-[#C9A961]/30 rounded-2xl"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Heart className="w-8 h-8 text-[#C9A961]" />
            </motion.div>

            <h3 className="text-2xl md:text-3xl mb-6 tracking-tight font-light">{copy[language].mission}</h3>
            <p className="text-base md:text-lg leading-relaxed tracking-wide font-light text-[#F5F5F3]/80 max-w-3xl mx-auto">
              {missionByLanguage[language]}
            </p>
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
