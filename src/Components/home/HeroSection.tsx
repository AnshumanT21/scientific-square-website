import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import ParticleRing from './ParticleRing';
import AnimatedCounter from '../AnimatedCounter';
import { createPageUrl } from '../../utils';

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: 30, suffix: '+', label: 'Years Experience' },
  { value: 8, suffix: '', label: 'Global Partners' },
  { value: 100, suffix: '%', label: 'Application Support' },
];

const display = { fontFamily: '"Space Grotesk", Inter, system-ui, sans-serif' };
const mono = { fontFamily: '"JetBrains Mono", ui-monospace, monospace' };

// Styles the hero needs that aren't in the site's Tailwind config.
const heroCss = `
  .ss-hero-gradient {
    background: linear-gradient(100deg, #b4b2f5 0%, #9391c7 40%, #d09b2c 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .ss-hero-grid {
    background-image:
      linear-gradient(to right, rgba(147,145,199,0.07) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(147,145,199,0.07) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse at 70% 45%, black, transparent 70%);
  }
`;

/** Masked word-by-word rise, like type being set. */
function SplitWords({ text, delay = 0, gradient = false }: { text: string; delay?: number; gradient?: boolean }) {
  const words = text.split(' ');
  return (
    <span aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            // padding-bottom extends the box the gradient is painted into, so the
            // descenders of "y" and "p" aren't left transparent
            className={`inline-block pb-[0.14em] ${gradient ? 'ss-hero-gradient' : ''}`}
            initial={{ y: '110%', rotate: 4 }}
            animate={{ y: '0%', rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.06, ease }}
          >
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  // seconds to offset the intro animations by
  const intro = 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const layout = useCallback((w: number, h: number) => {
    if (w >= 1024) return { cx: w * 0.72, cy: h * 0.46, R: Math.min(w * 0.17, h * 0.27) };
    // smaller screens: tuck the ring into the top-right, above the bottom-aligned copy
    if (w >= 640) return { cx: w * 0.78, cy: h * 0.2, R: Math.min(w * 0.12, h * 0.11) };
    // phones: fixed position near the top; the copy below reserves room for it (pt-64)
    return { cx: w * 0.62, cy: 150, R: Math.min(w * 0.19, 72) };
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#050b14] text-white">
      {/* fonts + hero-only styles (React 19 hoists the stylesheet link into <head>) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600&display=swap"
        precedence="default"
      />
      <style>{heroCss}</style>

      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-10%] h-[80vh] w-[80vh] rounded-full bg-[#9391c7]/[0.12] blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[60vh] w-[60vh] rounded-full bg-[#002a4b]/60 blur-[120px]" />
        <div className="ss-hero-grid absolute inset-0" />
      </div>

      <ParticleRing layout={layout} scatter={scrollYProgress} startDelay={intro * 1000} />

      <HudCorners delay={intro} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-10 pt-64 sm:px-6 sm:pt-28 lg:justify-center lg:px-8 lg:pb-0"
      >
        <div className="max-w-[640px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: intro + 0.3, ease }}
            className="mb-7 text-[15px] text-white/55"
          >
            Authorized &amp; exclusive distributor for{' '}
            <span className="text-white/90">8 global instrument manufacturers</span>
          </motion.p>

          <h1
            style={display}
            className="text-[clamp(2.6rem,min(5.6vw,9.5vh),5.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]"
          >
            <span className="block">
              <SplitWords text="Precision in" delay={intro + 0.45} />
            </span>
            <span className="block">
              <SplitWords text="every measure." delay={intro + 0.6} />
            </span>
            <span className="block">
              <SplitWords text="Innovation in" delay={intro + 0.8} gradient />
            </span>
            <span className="block">
              <SplitWords text="every step." delay={intro + 0.95} gradient />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: intro + 1.25, ease }}
            className="mt-6 max-w-[520px] text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Empowering scientific discovery with world-class laboratory equipment — from ultrapure water to green
            hydrogen, backed by three decades of application expertise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: intro + 1.4, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to={createPageUrl('ProductDetail') + '?product=lab-water-purification-system'}
              onClick={() => window.scrollTo(0, 0)}
              className="group inline-flex items-center gap-2 rounded-full bg-[#d09b2c] px-6 py-3.5 text-sm font-medium text-[#050b14] transition-all duration-300 hover:bg-[#e6bd62] hover:shadow-[0_10px_40px_-10px_rgba(208,155,44,0.7)]"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to={createPageUrl('ContactUs')}
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Talk to an Expert
            </Link>
          </motion.div>

          <motion.dl
            ref={statsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: intro + 1.7 }}
            className="mt-10 hidden grid-cols-3 gap-8 border-t border-white/10 pt-5 sm:grid sm:max-w-[480px]"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dd style={display} className="text-3xl font-semibold text-white">
                  <AnimatedCounter value={s.value} suffix={s.suffix} isInView={statsInView} />
                </dd>
                <dt className="mt-1 text-[12px] text-white/50">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: intro + 2.2 }}
        style={mono}
        className="pointer-events-none absolute bottom-8 right-8 z-10 hidden items-center gap-2 text-[10.5px] uppercase tracking-[0.2em] text-white/40 lg:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.div>
    </section>
  );
}

/** Small instrument-style HUD: corner brackets and a live probe coordinate. */
function HudCorners({ delay }: { delay: number }) {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const corner = 'absolute h-4 w-4 border-white/25';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.5, duration: 1 }}
      className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
      aria-hidden
    >
      <div className="absolute right-[6%] top-[15%] h-[62%] w-[44%]">
        <span className={`${corner} left-0 top-0 border-l border-t`} />
        <span className={`${corner} right-0 top-0 border-r border-t`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} bottom-0 right-0 border-b border-r`} />
        <div style={mono} className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-white/35">
          Fig. 01 — S² ring / sample view
        </div>
        <div style={mono} className="absolute -bottom-6 right-0 text-[10px] tabular-nums tracking-[0.15em] text-white/35">
          PROBE&nbsp; X {pos.x.toFixed(3)} &nbsp;Y {pos.y.toFixed(3)}
        </div>
      </div>
    </motion.div>
  );
}
