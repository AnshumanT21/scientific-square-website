import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import ParticleRing from '../../components/ParticleRing';
import SplitWords from '../../components/SplitWords';
import Counter from '../../components/Counter';
import Marquee from '../../components/Marquee';
import { heroStats, readouts } from '../../data/company';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const layout = useCallback((w: number, h: number) => {
    if (w >= 1024) return { cx: w * 0.72, cy: h * 0.46, R: Math.min(w * 0.17, h * 0.27) };
    // smaller screens: tuck the ring into the top-right, above the bottom-aligned copy
    if (w >= 640) return { cx: w * 0.74, cy: h * 0.24, R: Math.min(w * 0.15, h * 0.13) };
    return { cx: w * 0.7, cy: h * 0.17, R: Math.min(w * 0.2, h * 0.1) };
  }, []);

  return (
    <section ref={ref} className="relative flex h-[100svh] min-h-[740px] flex-col overflow-hidden bg-ink">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[-10%] h-[80vh] w-[80vh] rounded-full bg-lav/[0.12] blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[60vh] w-[60vh] rounded-full bg-navy/60 blur-[120px]" />
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_70%)]" />
      </div>

      <ParticleRing layout={layout} scatter={scrollYProgress} />

      <HudCorners />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-site relative z-10 flex flex-1 flex-col justify-end pb-10 pt-28 lg:justify-center lg:pb-0"
      >
        <div className="max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
              Authorized &amp; Exclusive Distributor
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.6rem,min(5.6vw,9.5vh),5.4rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            <span className="block">
              <SplitWords text="Precision in" immediate delay={0.45} />
            </span>
            <span className="block">
              <SplitWords text="every measure." immediate delay={0.6} />
            </span>
            <span className="block text-gradient">
              <SplitWords text="Innovation in" immediate delay={0.8} wordClassName="text-gradient" />
            </span>
            <span className="block">
              <SplitWords text="every step." immediate delay={0.95} wordClassName="text-gradient" />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25, ease }}
            className="mt-6 max-w-[520px] text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Empowering scientific discovery with world-class laboratory equipment — from ultrapure water to green
            hydrogen, backed by three decades of application expertise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link to="/products" className="btn btn-gold group">
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Talk to an Expert
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="mt-10 hidden grid-cols-3 gap-8 border-t border-white/10 pt-5 sm:grid sm:max-w-[480px]"
          >
            {heroStats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-semibold text-white">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-[12px] text-white/50">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Instrument readout strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="relative z-10 border-t border-white/[0.07] bg-ink/60 backdrop-blur-md"
      >
        <div className="flex items-stretch">
          <div className="hidden shrink-0 items-center gap-2 border-r border-white/[0.07] px-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-gold md:flex">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-gold" /> Live specs
          </div>
          <Marquee duration={55} className="mask-fade-x flex-1 py-4">
            {readouts.map((r) => (
              <div key={r.label} className="flex items-center gap-3 px-7 font-mono text-[12px]">
                <span className="uppercase tracking-[0.14em] text-white/40">{r.label}</span>
                <span className="text-lav-bright">{r.value}</span>
                <span className="text-white/25">/ {r.source}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="pointer-events-none absolute bottom-20 right-8 z-10 hidden items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40 lg:flex"
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
function HudCorners() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const corner = 'absolute h-4 w-4 border-white/25';
  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block" aria-hidden>
      <div className="absolute right-[6%] top-[15%] h-[62%] w-[44%]">
        <span className={`${corner} left-0 top-0 border-l border-t`} />
        <span className={`${corner} right-0 top-0 border-r border-t`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} bottom-0 right-0 border-b border-r`} />
        <div className="absolute -top-6 left-0 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          Fig. 01 — S² ring / sample view
        </div>
        <div className="absolute -bottom-6 right-0 font-mono text-[10px] tabular-nums tracking-[0.15em] text-white/35">
          PROBE&nbsp; X {pos.x.toFixed(3)} &nbsp;Y {pos.y.toFixed(3)}
        </div>
      </div>
    </div>
  );
}
