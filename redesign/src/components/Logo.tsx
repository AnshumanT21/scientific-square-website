import { cn } from '../lib/cn';

/**
 * The original ScientificSquare mark. The JPEG has a near-black background,
 * so `mix-blend-screen` lets it sit cleanly on the dark UI without altering the logo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/ScientificSquareLogo.jpeg"
      alt="ScientificSquare logo"
      className={cn('select-none mix-blend-screen', className)}
      draggable={false}
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-[#111] ring-1 ring-white/10">
        <LogoMark className="h-full w-full scale-[1.35] object-cover" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[17px] font-semibold tracking-tight text-white">
            ScientificSquare
          </span>
          <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.22em] text-lav">
            Precision &amp; Innovation
          </span>
        </span>
      )}
    </span>
  );
}
