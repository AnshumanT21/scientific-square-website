import { motion } from 'framer-motion';
import { cn } from '../lib/cn';

interface Props {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean;
}

/** Masked word-by-word rise, like type being set. */
export default function SplitWords({ text, className, wordClassName, delay = 0, stagger = 0.06, immediate }: Props) {
  const words = text.split(' ');
  const trigger = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '-60px' } };
  return (
    <motion.span className={cn('inline', className)} initial="hidden" {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className={cn('inline-block', wordClassName)}
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: {
                y: '0%',
                rotate: 0,
                transition: { duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
