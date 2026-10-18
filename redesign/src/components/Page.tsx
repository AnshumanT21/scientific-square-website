import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Route-level fade used by AnimatePresence in App. */
export default function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      {children}
    </motion.main>
  );
}
