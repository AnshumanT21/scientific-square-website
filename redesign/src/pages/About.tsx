import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, Globe2, HeartHandshake, Microscope } from 'lucide-react';
import Page from '../components/Page';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import Reveal from '../components/Reveal';
import SplitWords from '../components/SplitWords';
import Counter from '../components/Counter';
import ParticleRing from '../components/ParticleRing';
import { coreValues, partners } from '../data/company';
import { disciplines } from '../data/products';

const stats = [
  { icon: Award, value: 30, suffix: '+', label: 'Years of Founder Expertise' },
  { icon: Globe2, value: partners.length, suffix: '', label: 'Global Tech Partners' },
  { icon: Microscope, value: disciplines.length, suffix: '', label: 'Core Scientific Disciplines' },
  { icon: HeartHandshake, value: 100, suffix: '%', label: 'Commitment to Service' },
];

export default function About() {
  const ringLayout = useCallback((w: number, h: number) => ({ cx: w / 2, cy: h / 2, R: Math.min(w, h) * 0.3 }), []);

  return (
    <Page>
      <PageHero
        eyebrow="Est. 2024"
        title="Built on Experience."
        accent="Designed for the Future."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        intro="A new chapter in scientific excellence, founded on three decades of industry mastery."
      />

      {/* The Genesis */}
      <section className="bg-ink py-24 sm:py-32">
        <div className="container-site grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">The Genesis</span>
            </Reveal>
            <h2 className="mt-6 text-[clamp(2.2rem,4.4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              <SplitWords text="Not Just Another Startup." />
              <br />
              <span className="text-white/40">
                <SplitWords text="A Legacy Reimagined." delay={0.2} />
              </span>
            </h2>
            <Reveal delay={0.15} className="mt-10 space-y-6 text-lg leading-relaxed text-white/65">
              <p>
                <strong className="font-medium text-white">ScientificSquare</strong> was founded in 2024, but its roots
                go much deeper. After spending over 30 years shaping the scientific equipment landscape, our founder
                identified a critical gap in the market.
              </p>
              <p>
                The industry was flooded with products, but starved of true application support. Researchers
                weren&apos;t just looking for boxes; they needed partners who understood the science behind the
                machine.
              </p>
              <p>
                Driven by this insight, ScientificSquare was born—not to compete on volume, but to lead on{' '}
                <em className="not-italic text-gold">value</em>. We are a young company with an old soul, combining the
                agility of a startup with the wisdom of a veteran industry leader.
              </p>
            </Reveal>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=900&q=80"
                  alt="Modern laboratory"
                  className="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-8 bottom-8">
                  <div className="font-display text-7xl font-semibold text-gold">
                    <Counter value={2024} group={false} duration={2.2} />
                  </div>
                  <div className="my-4 h-px w-20 bg-white/30" />
                  <p className="text-lg text-white/85">Marking the beginning of a new era in precision instrumentation.</p>
                </div>
              </div>
            </Reveal>
            <motion.div
              className="glass absolute -right-3 -top-6 max-w-[240px] rounded-2xl p-5 sm:-right-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-medium">Open for Business</span>
              </div>
              <p className="text-xs leading-relaxed text-white/60">Ready to serve laboratories with our global partner network.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-ink-800 py-24 sm:py-32">
        <div className="container-site grid items-center gap-12 lg:grid-cols-12">
          <div className="relative aspect-square lg:col-span-5">
            <ParticleRing layout={ringLayout} dust={420} />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <span className="eyebrow">Our Ambition</span>
            </Reveal>
            <h2 className="mt-6 text-[clamp(2.2rem,4.4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              <SplitWords text="Empowering Science." />
              <br />
              <SplitWords text="Enabling the Future." delay={0.2} wordClassName="text-gradient" />
            </h2>
            <Reveal delay={0.15} className="mt-10 space-y-6 text-lg leading-relaxed text-white/65">
              <p>
                At <span className="text-white">ScientificSquare</span>, our vision is to architect a scientific
                ecosystem where breakthrough research is powered by the world&apos;s finest instrumentation. We see a
                future where geographical boundaries do not limit scientific potential.
              </p>
              <p>
                We aim to be the catalyst that transforms laboratories into global hubs of innovation. By bridging the
                gap between cutting-edge global technology and diverse applications, we strive to solve
                humanity&apos;s most pressing challenges—from <span className="text-gold">sustainable energy storage</span>{' '}
                to <span className="text-gold">water security</span>.
              </p>
              <p>
                We are not just distributors; we are enablers of the hydrogen economy and guardians of analytical
                precision, committed to building a resilient and self-reliant scientific infrastructure for the global
                community.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="container-site mt-24">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-ink-800 p-8 sm:p-10">
                <s.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                <div className="mt-8 font-display text-5xl font-semibold tracking-tight">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-white/50">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper py-24 text-ink sm:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <span className="eyebrow eyebrow-dark">Core Values</span>
              </Reveal>
              <h2 className="mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)] font-semibold leading-[1] tracking-[-0.035em]">
                <SplitWords text="What drives us" />
              </h2>
            </div>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {coreValues.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-ink/[0.08] bg-white p-8 sm:p-10"
              >
                <span className="absolute right-6 top-4 font-display text-8xl font-semibold text-ink/[0.04] transition-colors duration-500 group-hover:text-gold/15">
                  0{i + 1}
                </span>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-12 text-2xl font-medium">{v.title}</h3>
                <p className="mt-4 leading-relaxed text-ink/60">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </Page>
  );
}
