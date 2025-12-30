import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Helper to merge Tailwind classes (needed for UI components)
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Helper to manage internal links
export function createPageUrl(pageName) {
  const routes = {
    'Home': '/',
    'AboutUs': '/about',
    'ContactUs': '/contact',
    'NewsEvents': '/news-events',
    'ProductDetail': '/products/detail',
    'Products': '/products' // Fallback
  };
  return routes[pageName] || '/';
}