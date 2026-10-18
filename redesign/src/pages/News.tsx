import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Globe, MapPin, Users, X, Zap } from 'lucide-react';
import Page from '../components/Page';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import Reveal from '../components/Reveal';
import { lockScroll } from '../lib/smooth';

const launch = {
  title: 'Unveiling Scientific Square: The Future of Precision Science',
  excerpt:
    'Today marks a paradigm shift in laboratory instrumentation. We are bridging the gap between theoretical potential and practical mastery.',
  date: '2024-07-24',
  category: 'Strategic Launch',
  image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1400&q=80',
  readTime: '2 min read',
};

const formatDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

export default function News() {
  const [open, setOpen] = useState(false);

  return (
    <Page>
      <PageHero
        eyebrow="Official Announcement"
        title="News & Events"
        crumbs={[{ label: 'Home', to: '/' }, { label: 'News & Events' }]}
        intro="Shaping the tomorrow of scientific discovery."
      />

      <section className="bg-ink pb-28">
        <div className="container-site">
          <Reveal>
            <article className="group grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-ink-800 lg:grid-cols-2">
              <div className="relative h-72 overflow-hidden lg:h-auto lg:min-h-[520px]">
                <img
                  src={launch.image}
                  alt="Laboratory innovation"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink-800/60" />
                <div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-ink/80 px-5 py-3 text-center backdrop-blur">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-gold">July</span>
                  <span className="block font-display text-3xl font-semibold">24</span>
                  <span className="block font-mono text-[10px] text-white/50">2024</span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.15em] text-gold">
                    {launch.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm text-white/45">
                    <Clock className="h-4 w-4" />
                    {launch.readTime}
                  </span>
                </div>
                <h2 className="mt-8 text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  {launch.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/60">{launch.excerpt}</p>
                <button onClick={() => setOpen(true)} className="btn btn-gold group mt-10 self-start">
                  Explore the Vision
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>{open && <Reader onClose={() => setOpen(false)} />}</AnimatePresence>
      <CTA />
    </Page>
  );
}

function Reader({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={launch.title}
      className="fixed inset-0 z-[80] overflow-y-auto bg-ink"
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      data-lenis-prevent
    >
      <button
        onClick={onClose}
        className="fixed right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink/80 backdrop-blur transition-colors hover:border-gold hover:bg-gold hover:text-ink"
        aria-label="Close article"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <motion.img
          src={launch.image}
          alt=""
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <span className="absolute left-5 top-6 rounded-md border border-white/20 bg-white/10 px-3 py-1 font-mono text-[11px] backdrop-blur sm:left-8">
          ID: SCISQ-LAUNCH-24
        </span>
      </div>

      <motion.div
        className="mx-auto -mt-32 max-w-3xl px-5 pb-28 sm:px-8"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } } }}
      >
        <motion.div variants={item} className="relative">
          <span className="eyebrow">{launch.category}</span>
          <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {launch.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(launch.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Delhi, India
            </span>
          </div>
        </motion.div>

        <motion.blockquote variants={item} className="mt-12 border-l-2 border-gold pl-6 font-display text-2xl leading-snug text-white/90">
          &ldquo;Precision isn&apos;t just a metric; it&apos;s the foundation of truth. At Scientific Square, we
          aren&apos;t just selling instruments; we are curating the future of reliability.&rdquo;
        </motion.blockquote>

        <motion.div variants={item} className="mt-10 space-y-5 text-lg leading-relaxed text-white/65">
          <p>
            Today, we open the doors to <strong className="font-medium text-white">Scientific Square</strong>, an entity
            forged in the fires of necessity. We recognized a growing void in the market: the disconnect between
            advanced analytical potential and the practical realities of the modern laboratory.
          </p>
          <p>
            Our inception is not merely a business launch; it is a declaration of intent. We are here to dismantle the
            complexities of spectroscopy and electrochemistry, replacing them with streamlined, robust workflows.
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            { icon: Zap, title: 'Precision Architecture', body: 'Technology sourced not for its novelty, but for its unyielding accuracy in critical environments.' },
            { icon: Globe, title: 'Adaptive Ecosystems', body: 'Tailored instrumentation workflows that mold to your research needs, not the other way around.' },
            { icon: Users, title: 'Knowledge-First Support', body: 'We move beyond transactional relationships. Our application scientists are partners in your discovery, offering deep-dive training and lifecycle mentorship.', wide: true },
          ].map((c) => (
            <div key={c.title} className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 ${c.wide ? 'sm:col-span-2' : ''}`}>
              <c.icon className="h-6 w-6 text-gold" strokeWidth={1.6} />
              <h3 className="mt-4 text-lg font-medium">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/55">{c.body}</p>
            </div>
          ))}
        </motion.div>

        <motion.p variants={item} className="mt-12 border-t border-white/10 pt-8 text-white/50">
          Scientific Square is now operational and ready to serve laboratories across the world. Join us as we redefine
          the benchmarks of scientific excellence.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
