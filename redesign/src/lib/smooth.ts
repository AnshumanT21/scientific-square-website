import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  let id = 0;
  const raf = (t: number) => {
    lenis?.raf(t);
    id = requestAnimationFrame(raf);
  };
  id = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(id);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTop(immediate = true) {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToEl(el: HTMLElement, offset = -100) {
  if (lenis) lenis.scrollTo(el, { offset });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
