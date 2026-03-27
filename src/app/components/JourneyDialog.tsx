import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useI18n } from '../i18n';

interface JourneyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function JourneyDialog({ isOpen, onClose }: JourneyDialogProps) {
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();

  const copy = {
    en: {
      title: 'Begin Your Journey',
      subtitle: 'Start your tea meditation experience.',
      label: 'Enter your email to receive your welcome tea set',
      cta: 'Start My Journey',
      policy: 'By continuing, you agree to receive artisanal tea curation and meditation guidance from The Tea Zen Box.',
      closeAria: 'Close dialog',
      placeholder: 'your@email.com',
      success: "You're on the list. Check your inbox soon.",
      error: 'Something went wrong. Please try again in a moment.',
      submitting: 'Sending…',
    },
    zh: {
      title: '開啟你的旅程',
      subtitle: '預約你的首次茶禪體驗，領取專屬歡迎茶禮。',
      label: '輸入信箱，接收歡迎茶禮與首次體驗指引',
      cta: '預約我的體驗',
      policy: '提交即表示你同意接收 The Tea Zen Box 的茶葉策展、體驗通知與冥想引導內容。',
      closeAria: '關閉彈窗',
      placeholder: 'your@email.com',
      success: '已成功登記，請留意信箱。',
      error: '送出失敗，請稍後再試。',
      submitting: '送出中…',
    },
    ja: {
      title: '旅をはじめる',
      subtitle: 'ティーメディテーション体験を始めましょう。',
      label: 'ウェルカムティーセット受取用のメールアドレス',
      cta: '体験を始める',
      policy: '続行すると The Tea Zen Box からのティーキュレーションと瞑想ガイダンスの受信に同意したものとみなされます。',
      closeAria: 'ダイアログを閉じる',
      placeholder: 'you@example.com',
      success: '登録しました。メールをご確認ください。',
      error: '送信に失敗しました。しばらくしてからお試しください。',
      submitting: '送信中…',
    },
  } as const;

  // Particle effect on hover
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 97, ${particle.alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setSubmitState('idle');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitState === 'submitting') return;

    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT?.trim();
    setSubmitState('submitting');

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, language }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      }
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-[#1A1A1A]/80 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="journey-dialog-title"
              aria-describedby="journey-dialog-description"
              className="relative w-full max-w-2xl bg-[#1A1A1A] border-[0.5px] border-[#C9A961]/30 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
            >
              {/* Particle canvas background */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-60"
              />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label={copy[language].closeAria}
                className="absolute top-6 right-6 z-10 p-2 rounded-full backdrop-blur-md bg-[#F5F5F3]/10 border-[0.5px] border-[#F5F5F3]/20 hover:bg-[#F5F5F3]/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-[#F5F5F3]" />
              </button>

              {/* Content */}
              <div className="relative z-10 p-12">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-[#C9A961]" />
                  </div>

                  <h2 id="journey-dialog-title" className="text-4xl mb-4 text-center tracking-tight font-light">
                    {copy[language].title}
                  </h2>
                  <p id="journey-dialog-description" className="text-center text-[#F5F5F3]/60 mb-8 tracking-wide font-light">
                    {copy[language].subtitle}
                  </p>

                  {/* Hairline */}
                  <div className="w-16 h-[0.5px] bg-[#C9A961] opacity-50 mx-auto mb-8" />

                  {submitState === 'success' ? (
                    <p className="rounded-xl border border-[#C9A961]/30 bg-[#C9A961]/10 px-6 py-5 text-center text-sm tracking-wide text-[#C9A961]/90">
                      {copy[language].success}
                    </p>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-light tracking-wide text-[#F5F5F3]/70"
                        >
                          {copy[language].label}
                        </label>
                        <input
                          type="email"
                          id="email"
                          autoFocus
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={copy[language].placeholder}
                          disabled={submitState === 'submitting'}
                          className="w-full rounded-xl border-[0.5px] border-[#F5F5F3]/20 bg-[#F5F5F3]/5 px-6 py-4 text-[#F5F5F3] backdrop-blur-sm transition-all duration-300 placeholder:text-[#F5F5F3]/30 focus:border-[#C9A961]/60 focus:outline-none disabled:opacity-50"
                          required
                        />
                      </div>

                      {submitState === 'error' && (
                        <p className="text-center text-sm text-[#E8B4B8]/90" role="alert">
                          {copy[language].error}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={submitState === 'submitting'}
                        className="w-full rounded-xl border-[0.5px] border-[#C9A961]/60 bg-[#C9A961]/20 px-8 py-4 text-sm font-light uppercase tracking-widest text-[#C9A961] backdrop-blur-md transition-all duration-300 hover:bg-[#C9A961]/30 disabled:cursor-not-allowed disabled:opacity-60"
                        whileHover={submitState === 'submitting' ? undefined : { scale: 1.02 }}
                        whileTap={submitState === 'submitting' ? undefined : { scale: 0.98 }}
                      >
                        {submitState === 'submitting' ? copy[language].submitting : copy[language].cta}
                      </motion.button>
                    </form>
                  )}

                  {/* Additional info */}
                  <p className="text-xs text-center text-[#F5F5F3]/40 mt-6 tracking-wide font-light">
                    {copy[language].policy}
                  </p>
                </motion.div>
              </div>

              {/* Glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#C9A961]/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
