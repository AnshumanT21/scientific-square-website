import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const productPath = (slug: string) => `/products/${slug}`;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
