import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
  /** add thousands separators (off for years like 2024) */
  group?: boolean;
}

export default function Counter({ value, suffix = '', duration = 1.8, group = true }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {group ? n.toLocaleString('en-US') : n}
      {suffix}
    </span>
  );
}
