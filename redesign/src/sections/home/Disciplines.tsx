import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../../components/Reveal';
import SplitWords from '../../components/SplitWords';
import { categoriesByDiscipline, categoryPartners, disciplines, type Category } from '../../data/products';
import { productPath } from '../../lib/cn';

export default function Disciplines() {
  const [hovered, setHovered] = useState<Category | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  return (
    <section
      className="relative bg-ink pb-32"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 border-t border-white/[0.08] pt-16 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">The Catalogue</span>
            </Reveal>
            <h2 className="mt-5 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.035em]">
              <SplitWords text="Four disciplines." />
              <br />
              <span className="text-white/40">
                <SplitWords text="One trusted source." delay={0.2} />
              </span>
            </h2>
          </div>
          <Reveal delay={0.2}>
            <Link to="/products" className="btn btn-ghost group">
              View all products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16">
          {disciplines.map((d, di) => (
            <div key={d.id} className="grid gap-6 border-t border-white/[0.08] py-10 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-gold">0{di + 1}</span>
                  <h3 className="text-2xl font-medium">{d.name}</h3>
                </div>
                <p className="mt-3 max-w-xs pl-8 text-sm leading-relaxed text-white/50">{d.blurb}</p>
              </Reveal>
              <ul className="lg:col-span-8">
                {categoriesByDiscipline(d.id).map((c, ci) => (
                  <motion.li
                    key={c.slug}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, delay: ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={productPath(c.slug)}
                      onMouseEnter={() => setHovered(c)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative flex items-center gap-4 overflow-hidden border-b border-white/[0.06] py-5 pr-2 last:border-b-0 sm:gap-6"
                    >
                      <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-lav/[0.12] to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                      <span className="relative flex-1 font-display text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-white/85 transition-all duration-500 group-hover:translate-x-3 group-hover:text-white">
                        {c.name}
                      </span>
                      <span className="relative hidden text-right font-mono text-[11px] uppercase tracking-[0.12em] text-white/40 md:block">
                        {categoryPartners(c).join(' · ')}
                      </span>
                      <span className="relative w-16 text-right font-mono text-[11px] text-white/40">
                        {String(c.products.length).padStart(2, '0')} {c.products.length === 1 ? 'item' : 'items'}
                      </span>
                      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* floating product preview that follows the cursor */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        style={{ x: sx, y: sy }}
        aria-hidden
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="plate -ml-32 -mt-[230px] h-[200px] w-[260px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={hovered.slug}
                  src={hovered.products[0].image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain p-4 mix-blend-multiply"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
