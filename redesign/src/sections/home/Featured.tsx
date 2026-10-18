import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SplitWords from '../../components/SplitWords';
import { featured } from '../../data/products';
import { productPath } from '../../lib/cn';

type Item = (typeof featured)[number];

function Card({ item, index }: { item: Item; index: number }) {
  return (
    <Link
      to={productPath(item.slug)}
      className="group flex w-[78vw] shrink-0 snap-start flex-col sm:w-[360px] lg:w-[380px]"
    >
      <div className="plate aspect-[4/5] lg:aspect-auto lg:h-[clamp(300px,52vh,480px)] ring-1 ring-ink/[0.06] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-30px_rgba(5,11,20,0.45)]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.15em] text-ink/40">
          {String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
        </span>
        <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-ink text-white opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <span className="absolute bottom-5 left-5 rounded-full bg-white/80 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink/70 backdrop-blur">
          {item.partner}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-medium text-ink transition-colors group-hover:text-lav-deep">{item.name}</h3>
      <p className="mt-2 line-clamp-2 text-[14.5px] leading-relaxed text-ink/60">{item.description}</p>
    </Link>
  );
}

function Heading() {
  return (
    <div>
      <span className="eyebrow eyebrow-dark">Featured Equipment</span>
      <h2 className="mt-4 text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.035em] text-ink">
        <SplitWords text="Instruments that" />
        <br />
        <SplitWords text="define the bench." delay={0.15} />
      </h2>
    </div>
  );
}

/** Desktop: vertical scroll drives a horizontal track. Mobile: native swipe. */
export default function Featured() {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(track.current.scrollWidth - window.innerWidth, 0));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* desktop pinned track */}
      <section ref={outer} className="relative hidden bg-paper lg:block" style={{ height: `calc(100vh + ${distance}px)` }}>
        <div className="grid-bg-dark sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="container-site mb-12 flex items-end justify-between">
            <Heading />
            <div className="w-56">
              <div className="mb-2 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/40">
                <span>Scroll</span>
                <span>{featured.length} instruments</span>
              </div>
              <div className="h-px w-full bg-ink/10">
                <motion.div className="h-px bg-ink" style={{ width: bar }} />
              </div>
            </div>
          </div>
          <motion.div ref={track} style={{ x }} className="flex w-max gap-8 pl-[max(3rem,calc((100vw-1320px)/2+3rem))] pr-12">
            {featured.map((item, i) => (
              <Card key={item.name} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* mobile / tablet swipe track */}
      <section className="grid-bg-dark bg-paper py-24 lg:hidden">
        <div className="container-site mb-10">
          <Heading />
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 [scrollbar-width:none]" data-lenis-prevent-wheel>
          {featured.map((item, i) => (
            <Card key={item.name} item={item} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
