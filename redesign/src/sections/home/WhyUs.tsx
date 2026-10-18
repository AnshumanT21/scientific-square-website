import { motion } from 'framer-motion';
import ScrollText from '../../components/ScrollText';
import Reveal from '../../components/Reveal';
import { whyFeatures } from '../../data/company';

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 sm:py-36">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <span className="eyebrow">Why ScientificSquare</span>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <ScrollText
              className="font-display text-[clamp(1.6rem,3.3vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.02em]"
              highlight={['precision', 'reliability', 'cutting-edge']}
              text="At ScientificSquare, we understand that precision and reliability are paramount in scientific research. With over three decades of industry experience, we've built our reputation on delivering cutting-edge laboratory equipment that meets the most demanding standards."
            />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/60">
                Our commitment goes beyond just selling products – we partner with laboratories worldwide to understand
                their unique challenges and provide <span className="text-lav-bright">tailored solutions</span> that
                drive innovation and discovery.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {whyFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink-700 lg:p-10"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-white/35">0{i + 1}</span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-lav-bright transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                  <f.icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-14 text-2xl font-medium text-white">{f.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/55">{f.description}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold to-lav transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
