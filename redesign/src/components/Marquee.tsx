import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../lib/cn';

interface Props {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/** CSS-driven infinite marquee. Children are rendered twice for a seamless loop. */
export default function Marquee({ children, duration = 40, reverse = false, className }: Props) {
  const style = { '--marquee-duration': `${duration}s` } as CSSProperties;
  return (
    <div className={cn('pause-on-hover flex overflow-hidden', className)}>
      <div className={cn('flex w-max shrink-0', reverse ? 'animate-marquee-reverse' : 'animate-marquee')} style={style}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
