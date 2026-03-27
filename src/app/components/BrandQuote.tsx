import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n';

export function BrandQuote() {
  const { language } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const quoteByLanguage = {
    en: {
      l1: 'You are not just brewing tea;',
      l2: 'you are meeting the version of yourself',
      l3: "that the world hasn't met yet.",
      translated: 'Every brew is an encounter with your unintroduced self.',
      footer: '© 2026 — A Journey Within',
      links: ['Join the Subscription Flow', 'Our Sourcing Ethics', 'The AI Music Lab'],
    },
    zh: {
      l1: '你泡的不只是茶；',
      l2: '你是在遇見一個更穩定、更清醒的自己，',
      l3: '那個世界尚未見過的你。',
      translated: '每一次沖泡，都是一次價值回收：把被消耗的注意力與內在秩序，重新帶回你手中。',
      footer: '© 2026 — 一場向內之旅',
      links: ['進入訂閱流程', '我們的溯源倫理', 'AI 音樂實驗室'],
    },
    ja: {
      l1: 'ただお茶を淹れているのではない。',
      l2: '世界がまだ出会っていない',
      l3: 'もうひとりの自分に会っている。',
      translated: 'お茶を淹れるたびに、まだ世界が知らない自分に出会う。',
      footer: '© 2026 — 内なる旅',
      links: ['サブスクリプションを見る', '私たちの調達倫理', 'AIミュージックラボ'],
    },
  } as const;

  return (
    <section ref={ref} className="relative py-32 px-8">
      {/* Ink smoke background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1643738640546-fb8ea5df483c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmslMjBzbW9rZSUyMGZsdWlkJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc0NjA1NTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      />

      {/* Hairline rule above */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mb-24"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5 }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          {/* Opening quotation mark */}
          <motion.div
            className="text-6xl text-[#C9A961]/30 mb-8 font-serif"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            "
          </motion.div>

          {/* Main quote */}
          <blockquote className="text-2xl md:text-3xl leading-relaxed tracking-wide font-light mb-8">
            {quoteByLanguage[language].l1}
            <br />
            <span className="text-[#F5F5F3]/60">
              {quoteByLanguage[language].l2}
            </span>
            <br />
            {quoteByLanguage[language].l3}
          </blockquote>

          {/* Chinese translation */}
          <motion.p
            className="text-base md:text-lg leading-relaxed tracking-wide font-light text-[#F5F5F3]/50 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {quoteByLanguage[language].translated}
          </motion.p>

          {/* Closing quotation mark */}
          <motion.div
            className="text-6xl text-[#C9A961]/30 font-serif"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            "
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 w-[0.5px] h-24 bg-[#C9A961]/20 hidden lg:block"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.div
          className="absolute -right-8 top-1/2 -translate-y-1/2 w-[0.5px] h-24 bg-[#C9A961]/20 hidden lg:block"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      {/* Hairline rule below quote */}
      <motion.div
        className="w-full h-[0.5px] bg-[#F5F5F3]/10 mt-24 mb-16"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Footer Links */}
      <motion.div
        className="relative max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {quoteByLanguage[language].links.map((label, index) => (
            <motion.a
              key={label}
              href="#"
              className="group flex items-center gap-2 text-sm tracking-wide text-[#F5F5F3]/60 hover:text-[#C9A961] transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              {label}
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Brand footer */}
        <div className="text-center space-y-4">
          <p className="text-xs tracking-[0.3em] uppercase text-[#C9A961]/40 font-light">
            The Tea Zen Box
          </p>
          <div className="w-12 h-[0.5px] bg-[#C9A961]/20 mx-auto" />
          <p className="text-xs tracking-wider text-[#F5F5F3]/20 font-light">
            {quoteByLanguage[language].footer}
          </p>
        </div>
      </motion.div>
    </section>
  );
}