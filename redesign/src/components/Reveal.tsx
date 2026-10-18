import { motion, type HTMLMotionProps } from 'framer-motion';

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number };

/** Fades and lifts its children in when scrolled into view. */
export default function Reveal({ delay = 0, y = 28, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
