import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '../lib/cn';

/** Paragraph whose words "develop" from dim to bright as it scrolls through the viewport. */
export default function ScrollText({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={cn('flex flex-wrap', className)} aria-label={text}>
      {words.map((w, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={highlight.some((h) => w.toLowerCase().startsWith(h))}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.25em]" aria-hidden>
      <motion.span style={{ opacity }} className={accent ? 'text-gradient' : undefined}>
        {children}
      </motion.span>
    </span>
  );
}
