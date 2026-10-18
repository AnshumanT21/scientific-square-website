import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Clock, Mail } from 'lucide-react';
import { Logo } from './Logo';
import { categories } from '../data/products';
import { company } from '../data/company';
import { productPath } from '../lib/cn';
import { scrollToTop } from '../lib/smooth';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-lav/10 blur-[120px]" />

      <div className="container-site relative grid gap-12 pb-12 pt-20 md:grid-cols-12">
        <div className="md:col-span-12 lg:col-span-3">
          <Logo />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
            Your dedicated partner for advanced scientific instrumentation. We bridge the gap between global innovation and
            local application, delivering world-class precision to laboratories and research facilities.
          </p>
        </div>

        <div className="md:col-span-6 lg:col-span-4">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Products</p>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={productPath(c.slug)} className="text-sm text-white/70 transition-colors hover:text-gold">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-2">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Company</p>
          <ul className="space-y-2.5 text-sm">
            {[
              ['Home', '/'],
              ['All Products', '/products'],
              ['About Us', '/about'],
              ['News & Events', '/news-events'],
              ['Contact', '/contact'],
            ].map(([name, to]) => (
              <li key={to}>
                <Link to={to} className="text-white/70 transition-colors hover:text-gold">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-3">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Contact</p>
          <a href={`mailto:${company.email}`} className="group flex items-start gap-2 text-sm text-white/80 hover:text-gold">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{company.email}</span>
          </a>
          <div className="mt-4 flex items-start gap-2 text-sm text-white/60">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {company.hours[0]}
              <br />
              {company.hours[1]}
            </span>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="container-site relative select-none" aria-hidden>
        <svg viewBox="0 0 1200 170" className="block w-full">
          <defs>
            <linearGradient id="wordmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text
            x="600"
            y="150"
            textAnchor="middle"
            textLength="1196"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="600"
            fontSize="190"
            fill="url(#wordmark)"
          >
            ScientificSquare
          </text>
        </svg>
      </div>

      <div className="relative border-t border-white/[0.06]">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-[13px] text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} ScientificSquare. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="inline-flex items-center gap-1 hover:text-white">
              Request a quote <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <button onClick={() => scrollToTop(false)} className="inline-flex items-center gap-1.5 hover:text-white">
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
