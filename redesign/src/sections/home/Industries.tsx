import { motion } from 'framer-motion';
import Reveal from '../../components/Reveal';
import SplitWords from '../../components/SplitWords';
import { industries } from '../../data/company';

export default function Industries() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-lav/40 to-transparent" />
      <div className="container-site">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow">Industries We Empower</span>
          </Reveal>
          <h2 className="mt-5 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.035em]">
            <SplitWords text="From the cleanroom" />
            <br />
            <span className="text-white/40">
              <SplitWords text="to the power plant." delay={0.15} />
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.article
              key={ind.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800 p-8 sm:p-10"
            >
              {/* cursor spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(420px circle at var(--mx) var(--my), rgba(147,145,199,0.16), transparent 60%)',
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  padding: 1,
                  background: 'radial-gradient(300px circle at var(--mx) var(--my), rgba(208,155,44,0.7), transparent 60%)',
                  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <ind.icon className="h-7 w-7 text-lav-bright transition-colors duration-500 group-hover:text-gold" strokeWidth={1.5} />
                  <span className="font-mono text-[11px] text-white/30">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-16 text-2xl font-medium">{ind.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">{ind.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
