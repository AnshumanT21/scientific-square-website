import { useEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * A living version of the ScientificSquare mark: rings of lavender "nodes"
 * (mirroring the dotted logo) surrounded by orbiting molecular dust.
 *
 * - On mount every particle starts scattered and springs home, assembling the logo.
 * - The cursor acts like a probe: particles are repelled and faint gold lines connect to it.
 * - `scatter` (0..1, e.g. scroll progress) blows the ring apart again.
 */

interface Layout {
  cx: number;
  cy: number;
  R: number;
}

interface Props {
  className?: string;
  layout: (w: number, h: number) => Layout;
  scatter?: MotionValue<number>;
  dust?: number;
  interactive?: boolean;
  /** ms to hold the particles scattered before they assemble (e.g. while a splash screen is showing) */
  startDelay?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  r: number; // radius as fraction of R
  size: number; // as fraction of R
  phase: number;
  spread: number; // how far it flies on scatter
}

interface Dust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  r: number;
  speed: number;
  size: number;
  gold: boolean;
  alpha: number;
  spread: number;
}

// deterministic PRNG so the ring looks identical on every load
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ring definitions modelled on the logo: [count, radius, minSize, maxSize]
const RINGS: [number, number, number, number][] = [
  [15, 1.0, 0.062, 0.098],
  [13, 0.74, 0.034, 0.058],
  [10, 0.56, 0.016, 0.026],
  [9, 1.21, 0.014, 0.024],
];

export default function ParticleRing({ className, layout, scatter, dust = 650, interactive = true, startDelay = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = prefersReducedMotion();
    const rand = mulberry32(2024);

    let W = 0;
    let H = 0;
    let L: Layout = { cx: 0, cy: 0, R: 100 };
    let rot = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const startAt = last + startDelay;
    const mouse = { x: -9999, y: -9999, active: false };

    const nodes: Node[] = [];
    RINGS.forEach(([count, r, min, max], ringIdx) => {
      const offset = rand() * Math.PI * 2;
      for (let i = 0; i < count; i++) {
        const a = offset + (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.18;
        // smooth size variation around the ring like the logo
        const wave = 0.5 + 0.5 * Math.sin(a * 2 + ringIdx);
        nodes.push({
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          angle: a,
          r: r * (1 + (rand() - 0.5) * 0.06),
          size: min + (max - min) * (0.35 * rand() + 0.65 * wave),
          phase: rand() * Math.PI * 2,
          spread: 1.6 + rand() * 2.8,
        });
      }
    });

    const isSmall = window.innerWidth < 768;
    const dustCount = Math.round(isSmall ? dust * 0.45 : dust);
    const motes: Dust[] = Array.from({ length: dustCount }, () => {
      // concentrate dust in a halo around the ring, with a long tail outward
      const r = 0.35 + Math.pow(rand(), 1.6) * 2.4;
      return {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        angle: rand() * Math.PI * 2,
        r,
        speed: (0.06 + rand() * 0.12) / Math.max(r, 0.6),
        size: 0.5 + rand() * 1.3,
        gold: rand() < 0.09,
        alpha: 0.25 + rand() * 0.55,
        spread: 1.5 + rand() * 3,
      };
    });

    const target = (angle: number, r: number, spread: number, s: number) => {
      const k = 1 + s * spread;
      const a = angle + rot + s * 0.6;
      return { x: L.cx + Math.cos(a) * r * L.R * k, y: L.cy + Math.sin(a) * r * L.R * k };
    };

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      L = layout(W, H);
    };

    const scatterStart = () => {
      // everything begins dispersed across the canvas — the assembly is the intro
      for (const p of [...nodes, ...motes]) {
        p.x = rand() * W;
        p.y = rand() * H;
      }
    };

    const settle = () => {
      for (const n of nodes) Object.assign(n, target(n.angle, n.r, 0, 0));
      for (const d of motes) Object.assign(d, target(d.angle, d.r, 0, 0));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const s = scatter ? Math.min(Math.max(scatter.get(), 0), 1) : 0;
      const fade = 1 - s * 0.85;

      // dust
      ctx.globalCompositeOperation = 'lighter';
      for (const d of motes) {
        ctx.globalAlpha = d.alpha * fade;
        ctx.fillStyle = d.gold ? '#e6bd62' : '#a9a7ee';
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // node constellation lines
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 1;
      const maxD = L.R * 0.42;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxD) {
            ctx.globalAlpha = (1 - dist / maxD) * 0.16 * fade;
            ctx.strokeStyle = '#9391c7';
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // probe lines from the cursor
      if (mouse.active) {
        const reach = Math.max(170, L.R * 0.75);
        for (const n of nodes) {
          const dist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (dist < reach) {
            ctx.globalAlpha = (1 - dist / reach) * 0.55 * fade;
            ctx.strokeStyle = '#d09b2c';
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // nodes: soft halo + solid core
      for (const n of nodes) {
        const pulse = 1 + Math.sin(t * 0.0012 + n.phase) * 0.06;
        const rad = Math.max(n.size * L.R * pulse, 1.2);
        ctx.globalAlpha = 0.1 * fade;
        ctx.fillStyle = '#9b99f0';
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad * 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.95 * fade;
        ctx.fillStyle = '#9d9bf2';
        ctx.beginPath();
        ctx.arc(n.x, n.y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = (dt: number) => {
      const s = scatter ? Math.min(Math.max(scatter.get(), 0), 1) : 0;
      rot += 0.00011 * dt;
      const probe = Math.max(140, L.R * 0.55);

      const physics = (p: Node | Dust, tx: number, ty: number, k: number, damp: number, push: number) => {
        p.vx += (tx - p.x) * k * dt;
        p.vy += (ty - p.y) * k * dt;
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < probe * probe && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / probe) * push * dt;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }
        const dpow = Math.pow(damp, dt / 16.67);
        p.vx *= dpow;
        p.vy *= dpow;
        p.x += p.vx * (dt / 16.67);
        p.y += p.vy * (dt / 16.67);
      };

      for (const n of nodes) {
        const tg = target(n.angle, n.r, n.spread, s);
        physics(n, tg.x, tg.y, 0.00042, 0.86, 0.09);
      }
      for (const d of motes) {
        d.angle += d.speed * dt * 0.001;
        const tg = target(d.angle, d.r, d.spread, s);
        physics(d, tg.x, tg.y, 0.00022, 0.9, 0.14);
      }
    };

    const loop = (t: number) => {
      const dt = Math.min(t - last, 48);
      last = t;
      if (visible) {
        if (t >= startAt) step(dt);
        draw(t);
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (!interactive || e.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y > 0 && mouse.y < rect.height;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) {
        settle();
        draw(0);
      }
    });
    ro.observe(canvas.parentElement!);

    if (reduced) {
      settle();
      draw(0);
      return () => ro.disconnect();
    }

    scatterStart();
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame((t) => {
      last = t;
      loop(t);
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [layout, scatter, dust, interactive, startDelay]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className ?? ''}`} aria-hidden />;
}
