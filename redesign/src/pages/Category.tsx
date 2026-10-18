import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import Page from '../components/Page';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { categories, categoryPartners, disciplines, getCategory, type Product } from '../data/products';
import { cn, productPath } from '../lib/cn';
import { scrollToEl } from '../lib/smooth';
import { logoScale } from '../data/company';

const ease = [0.16, 1, 0.3, 1] as const;
const anchor = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug);
  const [active, setActive] = useState(0);
  const [showJump, setShowJump] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!category) return;
    const els = category.products.map((p) => document.getElementById(anchor(p.name)));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => el && io.observe(el));
    // the jump bar only floats while the product sections are on screen
    const wrap = new IntersectionObserver(([e]) => setShowJump(e.isIntersecting), { rootMargin: '-35% 0px -35% 0px' });
    if (productsRef.current) wrap.observe(productsRef.current);
    return () => {
      io.disconnect();
      wrap.disconnect();
    };
  }, [category]);

  if (!category) return <Navigate to="/products" replace />;

  const discipline = disciplines.find((d) => d.id === category.discipline)!;
  const idx = categories.indexOf(category);
  const next = categories[(idx + 1) % categories.length];
  const others = categories.filter((c) => c !== category && c !== next).slice(0, 4);
  const partnerLogos = [
    ...new Map(category.products.map((p) => [p.partner, p.partnerLogo])).entries(),
  ];

  return (
    <Page>
      <PageHero
        eyebrow={discipline.name}
        title={category.name}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products', to: '/products' }, { label: category.name }]}
        intro={
          <>
            {category.products.length} {category.products.length === 1 ? 'product line' : 'product lines'} from{' '}
            {categoryPartners(category).join(' & ')}:{' '}
            <span className="text-white/85">{category.products.map((p) => p.name).join(' · ')}</span>
          </>
        }
        aside={
          <div>
            <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">Product partner</p>
            <div className="flex flex-wrap gap-3">
              {partnerLogos.map(([name, logo]) => (
                <div key={name} className="flex h-20 min-w-[160px] items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-5">
                  {logo && (
                    <img src={logo} alt={name} style={{ transform: `scale(${logoScale(logo)})` }} className="h-12 max-w-[160px] object-contain" />
                  )}
                  {name === '4 more Labor' && <span className="font-display text-lg font-semibold text-ink">4 more Labor</span>}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <div ref={productsRef}>
        {category.products.map((p, i) => (
          <ProductBlock key={p.name} product={p} index={i} total={category.products.length} />
        ))}
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <AnimatePresence>
        {category.products.length > 1 && showJump && (
          <motion.nav
            aria-label="Products in this category"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.45, ease }}
            className="pointer-events-auto flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-ink/85 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl [scrollbar-width:none]"
          >
            {category.products.map((p, i) => (
              <button
                key={p.name}
                onClick={() => {
                  const el = document.getElementById(anchor(p.name));
                  if (el) scrollToEl(el, -20);
                }}
                className={cn(
                  'relative whitespace-nowrap rounded-full px-4 py-2 text-[13px] transition-colors',
                  active === i ? 'text-ink' : 'text-white/60 hover:text-white',
                )}
              >
                {active === i && (
                  <motion.span layoutId="jump-pill" className="absolute inset-0 rounded-full bg-white" transition={{ duration: 0.4, ease }} />
                )}
                <span className="relative">{p.name}</span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      </div>

      {/* Continue exploring */}
      <section className="bg-paper py-24 text-ink">
        <div className="container-site">
          <Reveal>
            <span className="eyebrow eyebrow-dark">Continue exploring</span>
          </Reveal>
          <Link to={productPath(next.slug)} className="group mt-6 grid items-center gap-8 border-b border-ink/10 pb-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/40">Next category</p>
              <h2 className="mt-3 flex items-center gap-5 text-[clamp(2.2rem,5.5vw,4.8rem)] font-semibold leading-[1] tracking-[-0.04em] transition-colors group-hover:text-lav-deep">
                {next.name}
                <ArrowRight className="hidden h-12 w-12 shrink-0 transition-transform duration-500 group-hover:translate-x-3 md:block" />
              </h2>
            </div>
            <div className="plate aspect-[4/3] ring-1 ring-ink/10 md:col-span-4">
              <img src={next.products[0].image} alt="" className="absolute inset-0 h-full w-full object-contain p-6 mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
            </div>
          </Link>
          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link to={productPath(c.slug)} className="group flex items-center justify-between border-b border-ink/10 py-4 text-lg">
                  <span className="transition-transform duration-300 group-hover:translate-x-2">{c.name}</span>
                  <ArrowUpRight className="h-4 w-4 text-ink/40 transition-all group-hover:rotate-45 group-hover:text-ink" />
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/products" className="btn btn-outline-ink mt-10">
            View all categories
          </Link>
        </div>
      </section>
    </Page>
  );
}

function ProductBlock({ product, index, total }: { product: Product; index: number; total: number }) {
  const [vIdx, setVIdx] = useState(0);
  const variant = product.variants?.[vIdx];
  const image = variant?.image ?? product.image;
  const description = variant?.description ?? product.description;
  const url = variant?.productUrl ?? product.productUrl;
  const label = variant?.name ?? product.name;
  const id = anchor(product.name);

  return (
    <section id={id} className={cn('relative scroll-mt-24 py-20 sm:py-28', index % 2 ? 'bg-ink-800' : 'bg-ink')}>
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Specimen plate */}
        <div className={cn('lg:col-span-6', index % 2 && 'lg:order-2')}>
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="plate aspect-square">
                <div className="grid-bg-dark absolute inset-0 opacity-60" />
                <AnimatePresence mode="popLayout">
                  <motion.img
                    key={image + vIdx}
                    src={image}
                    alt={label}
                    className="absolute inset-0 h-full w-full object-contain p-10 mix-blend-multiply sm:p-14"
                    initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
                    transition={{ duration: 0.55, ease }}
                  />
                </AnimatePresence>
                {/* crosshair corners */}
                {['left-4 top-4 border-l border-t', 'right-4 top-4 border-r border-t', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map((c) => (
                  <span key={c} className={`absolute h-4 w-4 border-ink/25 ${c}`} />
                ))}
                <div className="absolute bottom-6 left-7 font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink/45">
                  {label}
                </div>
                <div className="absolute right-7 top-6 font-mono text-[10.5px] tracking-[0.15em] text-ink/45">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Details */}
        <div className={cn('lg:col-span-6', index % 2 && 'lg:order-1')}>
          <Reveal>
            <span className="eyebrow">{product.tagline}</span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              {product.name}
            </h2>
          </Reveal>

          {product.variants && (
            <Reveal delay={0.05} className="mt-8">
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">
                Select model · {product.variants.length} available
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setVIdx(i)}
                    aria-pressed={vIdx === i}
                    className={cn(
                      'relative rounded-full border px-4 py-2 font-mono text-[12px] transition-colors',
                      vIdx === i ? 'border-transparent text-ink' : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white',
                    )}
                  >
                    {vIdx === i && (
                      <motion.span layoutId={`variant-${id}`} className="absolute inset-0 rounded-full bg-gold" transition={{ duration: 0.4, ease }} />
                    )}
                    <span className="relative">{v.name}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.p
                key={description}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-8 text-[17px] leading-relaxed text-white/70"
              >
                {description}
              </motion.p>
            </AnimatePresence>
          </Reveal>

          {/* Spec readout */}
          {product.specs.length > 0 && (
            <Reveal delay={0.1} className="mt-10">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/50">Key Specifications</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    <span className="h-1.5 w-1.5 animate-blink rounded-full bg-gold" /> Readout
                  </span>
                </div>
                <dl>
                  {product.specs.map((s, si) => {
                    const [k, ...rest] = s.split(':');
                    const hasLabel = rest.length > 0;
                    return (
                      <motion.div
                        key={s}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + si * 0.08 }}
                        className="flex items-baseline justify-between gap-6 border-b border-white/[0.06] px-5 py-3.5 font-mono text-[13px] last:border-b-0"
                      >
                        <dt className="uppercase tracking-[0.1em] text-white/40">{hasLabel ? k.trim() : 'Feature'}</dt>
                        <dd className="text-right text-lav-bright">{hasLabel ? rest.join(':').trim() : s}</dd>
                      </motion.div>
                    );
                  })}
                </dl>
              </div>
            </Reveal>
          )}

          {/* Features */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {product.features.map((f, fi) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: fi * 0.08, duration: 0.6 }}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 transition-colors duration-500 hover:border-gold/40 hover:bg-gold/[0.06]"
              >
                <f.icon className="h-5 w-5 text-gold" strokeWidth={1.6} />
                <h3 className="mt-4 text-[15px] font-medium">{f.title}</h3>
                <p className="mt-1 text-[13px] leading-snug text-white/50">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Partner + actions */}
          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">Partner</span>
              <span className="flex h-12 min-w-[120px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-3">
                {product.partnerLogo && (
                  <img
                    src={product.partnerLogo}
                    alt={product.partner}
                    style={{ transform: `scale(${logoScale(product.partnerLogo)})` }}
                    className="h-8 max-w-[110px] object-contain"
                  />
                )}
                {product.partner === '4 more Labor' && <span className="text-sm font-semibold text-ink">4 more Labor</span>}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={`/contact?subject=${encodeURIComponent(`Quote request: ${label}`)}`} className="btn btn-gold group">
                Request Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  Know More
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
