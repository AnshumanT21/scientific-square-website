import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { categories, categoriesByDiscipline, disciplines } from '../data/products';
import { cn, productPath } from '../lib/cn';
import { lockScroll } from '../lib/smooth';

const links = [
  { name: 'About', to: '/about' },
  { name: 'News & Events', to: '/news-events' },
];

export default function Header() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [preview, setPreview] = useState(categories[1]);
  const closeTimer = useRef<number | undefined>(undefined);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !megaOpen);
  });

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    lockScroll(mobileOpen);
    return () => lockScroll(false);
  }, [mobileOpen]);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  };

  const navLink = 'relative px-4 py-2 text-[14px] text-white/75 transition-colors hover:text-white';

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            'transition-all duration-500',
            scrolled || megaOpen ? 'border-b border-white/[0.06] bg-ink/75 backdrop-blur-xl' : 'bg-transparent',
          )}
        >
          <div className="container-site flex h-[76px] items-center justify-between">
            <Link to="/" aria-label="ScientificSquare home">
              <Logo />
            </Link>

            <nav className="hidden items-center lg:flex" aria-label="Primary">
              <div onMouseEnter={openMega} onMouseLeave={closeMega}>
                <button
                  className={cn(navLink, 'flex items-center gap-1.5', (megaOpen || pathname.startsWith('/products')) && 'text-white')}
                  aria-expanded={megaOpen}
                  onClick={() => setMegaOpen((o) => !o)}
                >
                  Products
                  <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', megaOpen && 'rotate-180')} />
                </button>
              </div>
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => cn(navLink, isActive && 'text-white')}>
                  {({ isActive }) => (
                    <>
                      {l.name}
                      {isActive && (
                        <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              <Link to="/contact" className="btn btn-gold ml-4 !py-2.5">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>

            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-white/[0.06] bg-ink/95 backdrop-blur-2xl lg:block"
            >
              <div className="container-site grid grid-cols-12 gap-8 py-10">
                <div className="col-span-9 grid grid-cols-4 gap-8">
                  {disciplines.map((d, di) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * di }}
                    >
                      <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-lav">
                        0{di + 1} — {d.name}
                      </p>
                      <ul className="space-y-1">
                        {categoriesByDiscipline(d.id).map((c) => (
                          <li key={c.slug}>
                            <Link
                              to={productPath(c.slug)}
                              onMouseEnter={() => setPreview(c)}
                              onFocus={() => setPreview(c)}
                              className="group flex items-start justify-between gap-2 rounded-lg py-2 text-[15px] leading-snug text-white/80 transition-colors hover:text-white"
                            >
                              <span>{c.name}</span>
                              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 text-gold" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                <Link to={productPath(preview.slug)} className="group col-span-3 block">
                  <div className="plate aspect-[4/3]">
                    <AnimatePresence mode="popLayout">
                      <motion.img
                        key={preview.slug}
                        src={preview.products[0].image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-contain p-5 mix-blend-multiply"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    </AnimatePresence>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-white">{preview.name}</span>
                    <span className="font-mono text-[11px] text-white/50">
                      {preview.products.length} {preview.products.length === 1 ? 'product' : 'products'}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="border-t border-white/[0.06]">
                <div className="container-site flex items-center justify-between py-4 text-sm">
                  <span className="text-white/50">9 categories · 4 disciplines · 8 global partners</span>
                  <Link to="/products" className="group inline-flex items-center gap-2 text-gold">
                    View the full catalogue
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [productsOpen, setProductsOpen] = useState(false);
  const item = 'block border-b border-white/10 py-5 font-display text-3xl text-white';
  return (
    <motion.div
      className="fixed inset-0 z-[65] flex flex-col overflow-y-auto bg-ink lg:hidden"
      initial={{ clipPath: 'circle(0% at 100% 0%)' }}
      animate={{ clipPath: 'circle(150% at 100% 0%)' }}
      exit={{ clipPath: 'circle(0% at 100% 0%)' }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      data-lenis-prevent
    >
      <div className="container-site flex h-[76px] shrink-0 items-center justify-between">
        <Logo />
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15" onClick={onClose} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="container-site flex-1 pb-10 pt-6" aria-label="Mobile">
        <Link to="/" className={item}>Home</Link>
        <button className={cn(item, 'flex w-full items-center justify-between text-left')} onClick={() => setProductsOpen((o) => !o)} aria-expanded={productsOpen}>
          Products
          <ChevronDown className={cn('h-6 w-6 transition-transform', productsOpen && 'rotate-180')} />
        </button>
        <AnimatePresence initial={false}>
          {productsOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className="space-y-6 py-5">
                {disciplines.map((d) => (
                  <div key={d.id}>
                    <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-lav">{d.name}</p>
                    {categoriesByDiscipline(d.id).map((c) => (
                      <Link key={c.slug} to={productPath(c.slug)} className="block py-1.5 text-lg text-white/80">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link to="/products" className="inline-flex items-center gap-2 text-gold">
                  Full catalogue <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Link to="/about" className={item}>About</Link>
        <Link to="/news-events" className={item}>News &amp; Events</Link>
        <Link to="/contact" className={item}>Contact Us</Link>
      </nav>
    </motion.div>
  );
}
