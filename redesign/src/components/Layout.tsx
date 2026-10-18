import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { startSmoothScroll, scrollToTop } from '../lib/smooth';

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => startSmoothScroll(), []);
  useEffect(() => {
    // wait for the outgoing page fade before jumping to the top
    const t = setTimeout(() => scrollToTop(true), 260);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="grain relative min-h-screen bg-ink">
      <a
        href="#main"
        className="btn btn-gold sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
      >
        Skip to content
      </a>
      <Header />
      <div id="main">{children}</div>
      <Footer />
    </div>
  );
}
