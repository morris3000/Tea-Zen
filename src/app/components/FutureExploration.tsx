import { motion, useScroll, useTransform } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { useI18n } from '../i18n';
import { SafeImage } from './SafeImage';

interface FutureTeaProps {
  number: string;
  title: string;
  titleEn?: string;
  subtitle?: string;
  teaTypeLabel?: string;
  teaTypeValue?: string;
  craft?: string;
  vibe?: string;
  metrics?: string[];
  imageUrl?: string;
  scene: string;
  priceLabel: string;
  expandLabel: string;
  collapseLabel: string;
  previewLabel: string;
  index: number;
}

function FutureTea({
  number,
  title,
  titleEn,
  subtitle,
  teaTypeLabel,
  teaTypeValue,
  craft,
  vibe,
  metrics = [],
  imageUrl,
  scene,
  priceLabel,
  expandLabel,
  collapseLabel,
  previewLabel,
  index,
}: FutureTeaProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group relative zen-glass zen-ink-bleed rounded-xl overflow-hidden transition-all duration-700"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
      whileHover={{ rotateX: 1.5, rotateY: -1.5, scale: 1.02, transition: { duration: 0.5 } }}
    >
      {isExpanded && (
        <div className="relative aspect-[4/5] overflow-hidden bg-[#131313]">
          {imageUrl ? (
            <SafeImage
              src={imageUrl}
              alt={title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-[#E5E2E1]/8 via-[#353535]/25 to-[#131313]/95" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A]/65" />
        </div>
      )}

      {/* Content */}
      <div className="p-8">
        <p className="text-xs tracking-[0.3em] uppercase text-[#C9A961]/60 mb-4 font-light">
          {number}
        </p>
        <h3 className="text-xl mb-2 tracking-tight font-light">{title}</h3>
        {titleEn && <p className="text-sm mb-2 tracking-wide text-[#F5F5F3]/45">{titleEn}</p>}
        {!isExpanded && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#C9A961]/30 bg-[#C9A961]/8 px-3 py-1 text-xs text-[#C9A961]/80">
            <Lock className="h-3.5 w-3.5" />
              {previewLabel}
          </div>
        )}
        {isExpanded ? (
          <>
            {subtitle && <p className="text-base mb-2 tracking-wide text-[#F5F5F3]/60">{subtitle}</p>}
            {teaTypeLabel && teaTypeValue && (
              <p className="text-sm mb-4 tracking-wide text-[#E8B4B8]/70">
                {teaTypeLabel}: {teaTypeValue}
              </p>
            )}
            <div className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-4" />
            <p className="text-sm leading-relaxed tracking-wide text-[#F5F5F3]/75 mb-3">{craft ?? scene}</p>
            <p className="text-sm italic leading-relaxed tracking-wide text-[#F5F5F3]/80 mb-4">{vibe ?? scene}</p>
            {!!metrics.length && (
              <div className="mb-4 flex flex-wrap gap-2">
                {metrics.map((metric) => (
                  <span
                    key={metric}
                    className="inline-flex items-center gap-1 rounded-full border border-[#C9A961]/30 bg-[#C9A961]/10 px-3 py-1 text-xs text-[#C9A961]"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-4 inline-flex rounded-full border border-[#C9A961]/35 bg-[#C9A961]/10 px-3 py-1 text-xs tracking-wider text-[#C9A961]">
              {priceLabel}
            </p>
          </>
        ) : (
          <p className="text-sm tracking-wide text-[#F5F5F3]/45">{expandLabel}</p>
        )}
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#F5F5F3]/70 transition-colors hover:text-[#C9A961]"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              {collapseLabel}
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              {expandLabel}
            </>
          )}
        </button>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/0 via-[#C9A961]/10 to-[#E8B4B8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />
    </motion.div>
  );
}

export function FutureExploration() {
  const { language } = useI18n();
  const singleTeaUsd = 15.99;
  const currencyMultiplier = { zh: 33, ja: 150 } as const;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const copy = {
    en: {
      eyebrow: 'Tea Library',
      title: 'Grand Tea Archive',
      subtitle: 'Expand each tea card to compare single-tea value with kits and membership.',
      tip: 'All cards are collapsed by default. Expand each tea to view full details and compare value.',
      cta: 'Unlock More Teas',
      expand: 'Expand Card',
      collapse: 'Collapse',
      priceLabelPrefix: 'Single tea:',
      preview: 'Preview',
    },
    zh: {
      eyebrow: '名茶庫',
      title: '名茶庫',
      subtitle: '每張茶卡可展開比對單款價格，清楚看出套裝與會員更划算。',
      tip: '所有茶卡預設皆為收起狀態；展開後可查看完整資訊與單款價格。',
      cta: '解鎖更多名茶',
      expand: '展開茶卡',
      collapse: '收起茶卡',
      priceLabelPrefix: '單款茶：',
      preview: '預覽',
    },
    ja: {
      eyebrow: '名茶庫',
      title: '名茶アーカイブ',
      subtitle: '各カードを展開して単品価格とキット/会員価値を比較できます。',
      tip: 'すべてのカードは初期状態で折りたたまれています。展開して詳細と単品価格を確認できます。',
      cta: 'さらに名茶を解放する',
      expand: '展開',
      collapse: '折りたたむ',
      priceLabelPrefix: '単品:',
      preview: 'プレビュー',
    },
  } as const;

  const localizedSingleTeaPrice =
    language === 'en'
      ? `$${singleTeaUsd.toFixed(2)}`
      : language === 'zh'
        ? `NT$${(Math.ceil(singleTeaUsd) * currencyMultiplier.zh).toLocaleString('zh-TW')}`
        : `¥${(Math.ceil(singleTeaUsd) * currencyMultiplier.ja).toLocaleString('ja-JP')}`;

  const futureTeasByLanguage = {
    en: [
      { number: 'No. 01', title: 'The Morning Aura', subtitle: 'Dawn Clarity', teaTypeLabel: 'Tea', teaTypeValue: 'Jasmine Silver Needle', craft: 'Layered jasmine aroma with clean, lucid finish for focused mornings.', vibe: '"First light through mist, crisp and awakening."', metrics: ['Clarity', 'Energy'], scene: 'Like first light through mist, bright and clear for a focused start.', imageUrl: '/images/no_01.png' },
      { number: 'No. 02', title: 'The Inspired Resonance', subtitle: 'Creative Flow', teaTypeLabel: 'Tea', teaTypeValue: 'Golden Guanyin', craft: 'Balanced aromatic profile that supports creative rhythm and extended flow.', vibe: '"Quietly resonant, ideas open in waves."', metrics: ['Inspiration', 'Flow'], scene: 'Layered aromatics open creative pathways and sustain gentle momentum.', imageUrl: '/images/no_02.png' },
      { number: 'No. 03', title: 'The Timeless Amber', subtitle: 'Grounded Calm', teaTypeLabel: 'Tea', teaTypeValue: 'Aged Citrus Puerh', craft: 'Warm, aged depth that settles the body and steadies the inner pace.', vibe: '"An amber core glowing through night calm."', metrics: ['Calm', 'Grounded'], scene: 'Warm depth and aged calm create stable inner grounding.', imageUrl: '/images/no_03.png' },
      { number: 'No. 04', title: 'Wild Dawn Whisper', subtitle: 'Wild Lift', teaTypeLabel: 'Tea', teaTypeValue: 'White Tea', craft: 'A light-bodied profile with airy lift and long, cool finish.', vibe: '"Spring wind over high ridges."', metrics: ['Lift', 'Fresh'], scene: 'A wild breeze over spring hills, clear and airy in the cup.' },
      { number: 'No. 05', title: 'Rainwashed Jade Ridge', subtitle: 'Clean Edge', teaTypeLabel: 'Tea', teaTypeValue: 'Green Tea', craft: 'Clear roasted bean notes and precise structure with focused aftertaste.', vibe: '"Like rain-washed stone paths."', metrics: ['Focus', 'Clean'], scene: 'Like morning rain over stone paths, fresh and focused.' },
      { number: 'No. 06', title: 'Embered Rock Echo', subtitle: 'Mineral Warmth', teaTypeLabel: 'Tea', teaTypeValue: 'Rock Oolong', craft: 'Rock-mineral body with cinnamon lift, unfolding in warm layers.', vibe: '"Cliffs warming after rain."', metrics: ['Depth', 'Power'], scene: 'Mineral warmth rises like sunlit cliffs after rain.' },
      { number: 'No. 07', title: 'Grain Mist Stillness', subtitle: 'Soft Grounding', teaTypeLabel: 'Tea', teaTypeValue: 'Puerh', craft: 'Rounded grain aroma and mature earthy body for emotional settling.', vibe: '"Soft grain warmth, mind slowing down."', metrics: ['Ease', 'Ground'], scene: 'Soft grain aroma and old-earth calm settle the mind.' },
      { number: 'No. 08', title: 'Highland Clear Song', subtitle: 'Aromatic Rise', teaTypeLabel: 'Tea', teaTypeValue: 'Dancong Oolong', craft: 'High aromatic lift with bright opening and elegant long finish.', vibe: '"Mountain florals expanding in layers."', metrics: ['Bright', 'Lift'], scene: 'Mountain florals open in layers, vivid and bright.' },
      { number: 'No. 09', title: 'Dusk Honey Murmur', subtitle: 'Honey Glow', teaTypeLabel: 'Tea', teaTypeValue: 'Oolong', craft: 'Honeyed softness with gentle spice and smooth lingering tail.', vibe: '"A dusk glow that slowly descends."', metrics: ['Warmth', 'Poise'], scene: 'Honeyed glow with gentle spice, elegant and lingering.' },
    ],
    zh: [
      { number: 'No. 01', title: '晨光', titleEn: 'The Morning Aura', subtitle: '清醒基調', teaTypeLabel: '茶型', teaTypeValue: '茉莉銀毫', craft: '以傳統窨製工藝呈現輕盈花香與淨透茶感，適合晨間重啟與注意力聚焦。', vibe: '「像穿透薄霧的第一縷晨光，乾淨、鮮靈、帶來清醒起點。」', metrics: ['清晰', '能量'], scene: '像穿透薄霧的第一縷晨光，清透而鮮靈。', imageUrl: '/images/no_01.png' },
      { number: 'No. 02', title: '靈感共鳴', titleEn: 'The Inspired Resonance', subtitle: '靈感基調', teaTypeLabel: '茶型', teaTypeValue: '金觀音', craft: '花香與焙韻平衡得當，香氣層次清晰，適合創作與表達場景。', vibe: '「當蘭韻層層展開，思路會在安靜中被點亮。」', metrics: ['靈感', '心流'], scene: '香氣層次推進思緒，讓靈感在安靜裡穩定擴散。', imageUrl: '/images/no_02.png' },
      { number: 'No. 03', title: '時光琥珀', titleEn: 'The Timeless Amber', subtitle: '沉潛基調', teaTypeLabel: '茶型', teaTypeValue: '陳年柑普', craft: '陳化後的果韻與熟普厚度相互托舉，口感溫潤，尾韻綿長。', vibe: '「像夜色裡緩慢發亮的琥珀，給你穩定而深沉的內在支撐。」', metrics: ['平靜', '沉穩'], scene: '像夜色裡緩慢發亮的琥珀，給你沉穩而有靈氣的支撐。', imageUrl: '/images/no_03.png' },
      { number: 'No. 04', title: '曠野晨息', titleEn: 'Wild Dawn Whisper', subtitle: '野逸清亮', teaTypeLabel: '茶型', teaTypeValue: '白茶', craft: '口感清透、尾段乾淨，帶有野放茶區的輕盈氣息。', vibe: '「像穿透薄霧的第一縷晨光，清透而鮮靈。」', metrics: ['提振', '清亮'], scene: '像穿透薄霧的第一縷晨光，清透而鮮靈。' },
      { number: 'No. 05', title: '雨後青脊', titleEn: 'Rainwashed Jade Ridge', subtitle: '清勁輪廓', teaTypeLabel: '茶型', teaTypeValue: '綠茶', craft: '豆香與鮮甜平衡，結構俐落，適合需要專注的時段。', vibe: '「如春雨初歇後的山徑，清新、乾淨、帶有克制的鋒芒。」', metrics: ['專注', '銳度'], scene: '如春雨初歇後的山徑，清新、乾淨、帶有克制的鋒芒。' },
      { number: 'No. 06', title: '岩火餘溫', titleEn: 'Embered Rock Echo', subtitle: '岩韻辛香', teaTypeLabel: '茶型', teaTypeValue: '岩茶', craft: '礦物感與辛香並進，層次分明，後段溫暖有力。', vibe: '「岩骨與辛香並行，像雨後岩壁回溫，力量感逐步顯現。」', metrics: ['力量', '厚度'], scene: '岩骨與辛香並行，像雨後岩壁回溫，力量感逐步顯現。' },
      { number: 'No. 07', title: '穀霧沉心', titleEn: 'Grain Mist Stillness', subtitle: '溫厚安定', teaTypeLabel: '茶型', teaTypeValue: '普洱', craft: '穀香與熟韻融合，入口圓潤，整體節奏舒緩。', vibe: '「穀香與熟韻交織，入口溫厚，情緒會自然慢下來。」', metrics: ['安定', '放鬆'], scene: '穀香與熟韻交織，入口溫厚，情緒會自然慢下來。' },
      { number: 'No. 08', title: '高嶺清歌', titleEn: 'Highland Clear Song', subtitle: '香氣展幅', teaTypeLabel: '茶型', teaTypeValue: '單叢烏龍', craft: '前段香氣高揚，尾段悠長，辨識度鮮明。', vibe: '「山野花香層層展開，前段明亮，後段悠長，辨識度極高。」', metrics: ['明亮', '延展'], scene: '山野花香層層展開，前段明亮，後段悠長，辨識度極高。' },
      { number: 'No. 09', title: '暮光蜜語', titleEn: 'Dusk Honey Murmur', subtitle: '蜜韻柔光', teaTypeLabel: '茶型', teaTypeValue: '烏龍', craft: '蜜香細緻、口感柔和，餘韻安定綿長。', vibe: '「蜜韻輕揚，尾調柔和，像傍晚光線緩緩落下。」', metrics: ['柔和', '平衡'], scene: '蜜韻輕揚，尾調柔和，像傍晚光線緩緩落下。' },
    ],
    ja: [
      { number: 'No. 01', title: '朝のオーラ', titleEn: 'The Morning Aura', subtitle: '覚醒の基調', teaTypeLabel: '茶種', teaTypeValue: 'ジャスミン銀毫', craft: '伝統的な窨製で軽やかな花香と透明感のある飲み口を引き出し、朝の再起動に寄り添う。', vibe: '「薄霧を抜ける最初の光のように、澄みながら意識を起こす。」', metrics: ['明晰', '活力'], scene: '薄霧を抜ける最初の光のように、澄んで軽やか。', imageUrl: '/images/no_01.png' },
      { number: 'No. 02', title: 'インスパイア共鳴', titleEn: 'The Inspired Resonance', subtitle: 'ひらめきの基調', teaTypeLabel: '茶種', teaTypeValue: '金観音', craft: '花香と焙煎のバランスがよく、香りの層が思考を静かに整え、創造の流れを保つ。', vibe: '「蘭の余韻がほどけるほど、発想は静かに灯りはじめる。」', metrics: ['発想', '没入'], scene: '香りの層が思考を整え、創造性を静かに広げる。', imageUrl: '/images/no_02.png' },
      { number: 'No. 03', title: 'タイムレス・アンバー', titleEn: 'The Timeless Amber', subtitle: '沈潜の基調', teaTypeLabel: '茶種', teaTypeValue: '熟成柑普', craft: '熟成した果韻と熟普の厚みが重なり、温かく長い余韻で内側の軸を支える。', vibe: '「夜の静けさの中で、琥珀の芯がゆっくりと灯り続ける。」', metrics: ['静穏', '安定'], scene: '夜の静けさの中で、温かな芯が内面を安定させる。', imageUrl: '/images/no_03.png' },
      { number: 'No. 04', title: '曠野の朝息', titleEn: 'Wild Dawn Whisper', subtitle: '野の清明', teaTypeLabel: '茶種', teaTypeValue: '白茶', craft: '軽やかなボディと涼やかな余韻。野生感のある産地由来の抜けのよさが際立つ。', vibe: '「朝霧を抜ける風のように、澄んで伸びる。」', metrics: ['高揚', '清明'], scene: '朝霧を割る一筋の光のように、澄んで軽やか。' },
      { number: 'No. 05', title: '雨後の青稜', titleEn: 'Rainwashed Jade Ridge', subtitle: '清冽な輪郭', teaTypeLabel: '茶種', teaTypeValue: '緑茶', craft: '豆香と甘みの均衡がよく、輪郭のはっきりした後味で集中しやすい。', vibe: '「雨上がりの石道のように、清く引き締まる。」', metrics: ['集中', '鮮鋭'], scene: '雨上がりの石畳のような、清々しい輪郭。' },
      { number: 'No. 06', title: '岩火の余温', titleEn: 'Embered Rock Echo', subtitle: '岩韻の辛香', teaTypeLabel: '茶種', teaTypeValue: '岩茶', craft: 'ミネラル感とスパイス感が並走し、後半に向かって温度感と厚みが立ち上がる。', vibe: '「雨後の岩壁が温まるように、力が静かに満ちる。」', metrics: ['力感', '厚み'], scene: '岩の温度感とスパイスが静かに立ち上がる。' },
      { number: 'No. 07', title: '穀霧の沈心', titleEn: 'Grain Mist Stillness', subtitle: '温厚な安定', teaTypeLabel: '茶種', teaTypeValue: 'プーアル', craft: '穀香と熟成感が溶け合い、丸みある口当たりで心拍のテンポを穏やかにする。', vibe: '「穀香のぬくもりが、焦りをほどき、心を地面へ戻す。」', metrics: ['安定', '弛緩'], scene: '穀香と熟成感が重なり、心をゆるやかに整える。' },
      { number: 'No. 08', title: '高嶺の清歌', titleEn: 'Highland Clear Song', subtitle: '香気の展幅', teaTypeLabel: '茶種', teaTypeValue: '単叢烏龍', craft: '立ち上がりの香りが高く、後半まで長く伸びる。輪郭の明るさが際立つ一杯。', vibe: '「山の花香が層を成し、明るく遠くへひらく。」', metrics: ['明亮', '伸展'], scene: '山の花香が層をなして、鮮やかに広がる。' },
      { number: 'No. 09', title: '暮光の蜜語', titleEn: 'Dusk Honey Murmur', subtitle: '蜜韻の柔光', teaTypeLabel: '茶種', teaTypeValue: '烏龍', craft: '繊細な蜜香と柔らかな口当たり。静かに続く余韻が夜の導入を整える。', vibe: '「夕の光が沈むように、甘やかな余韻が静かに降りる。」', metrics: ['柔和', '均衡'], scene: '蜜の余韻がやさしく続き、夕光のように静か。' },
    ],
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
          <p className="text-base leading-relaxed tracking-wide font-light text-[#F5F5F3]/70">
            {copy[language].subtitle}
          </p>
        </motion.div>

        {/* Tea archive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {futureTeasByLanguage[language].map((tea, index) => (
            <FutureTea
              key={tea.number}
              {...tea}
              priceLabel={`${copy[language].priceLabelPrefix} ${localizedSingleTeaPrice}`}
              expandLabel={copy[language].expand}
              collapseLabel={copy[language].collapse}
              previewLabel={copy[language].preview}
              index={index}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-sm tracking-wide font-light text-[#F5F5F3]/50 mb-6">
            {copy[language].tip}
          </p>
          <motion.button
            type="button"
            onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-10 py-4 backdrop-blur-md bg-[#F5F5F3]/5 border-[0.5px] border-[#F5F5F3]/20 rounded-full hover:bg-[#C9A961]/10 hover:border-[#C9A961]/40 transition-all duration-500 text-[#F5F5F3]/70 hover:text-[#C9A961] text-sm tracking-widest uppercase font-light"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {copy[language].cta}
          </motion.button>
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
