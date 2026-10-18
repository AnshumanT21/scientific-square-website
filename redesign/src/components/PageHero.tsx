import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SplitWords from './SplitWords';

interface Props {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: ReactNode;
  crumbs?: { label: string; to?: string }[];
  aside?: ReactNode;
}

export default function PageHero({ eyebrow, title, accent, intro, crumbs, aside }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <motion.div
          className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-lav/[0.13] blur-[130px]"
          animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[400px] rounded-full bg-gold/[0.06] blur-[110px]" />
      </div>

      <div className="container-site relative">
        {crumbs && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5">
                {c.to ? (
                  <Link to={c.to} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" />}
              </span>
            ))}
          </motion.nav>
        )}

        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className={aside ? 'lg:col-span-8' : 'lg:col-span-11'}>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              {eyebrow}
            </motion.span>
            <h1 className="mt-6 text-[clamp(2.6rem,6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              <SplitWords text={title} immediate delay={0.25} />
              {accent && (
                <>
                  <br />
                  <SplitWords text={accent} immediate delay={0.45} wordClassName="text-gradient" />
                </>
              )}
            </h1>
            {intro && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-white/60"
              >
                {intro}
              </motion.div>
            )}
          </div>
          {aside && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="lg:col-span-4"
            >
              {aside}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
