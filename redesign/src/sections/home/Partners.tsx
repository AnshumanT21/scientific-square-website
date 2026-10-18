import Marquee from '../../components/Marquee';
import Reveal from '../../components/Reveal';
import SplitWords from '../../components/SplitWords';
import { partners } from '../../data/company';

function Chip({ name, logo, scale = 1 }: { name: string; logo: string; scale?: number }) {
  return (
    <div className="group mx-3 flex h-36 w-60 shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-ink/[0.07] bg-white px-8 transition-all duration-500 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_20px_40px_-20px_rgba(5,11,20,0.25)]">
      <div className="flex h-14 w-full items-center justify-center">
        <img
          src={logo}
          alt={name}
          loading="lazy"
          style={{ transform: `scale(${scale})` }}
          className="max-h-14 max-w-full object-contain"
        />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 transition-colors group-hover:text-ink/70">
        {name}
      </span>
    </div>
  );
}

export default function Partners() {
  const half = Math.ceil(partners.length / 2);
  const rowA = partners;
  const rowB = [...partners.slice(half), ...partners.slice(0, half)];

  return (
    <section className="relative overflow-hidden bg-paper pb-28 pt-12 lg:pt-28">
      <div className="container-site grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="eyebrow eyebrow-dark">Global Network</span>
          </Reveal>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            <SplitWords text="Our strategic partners" />
          </h2>
        </div>
        <Reveal delay={0.15} className="self-end lg:col-span-5 lg:col-start-8">
          <p className="text-lg leading-relaxed text-ink/60">
            Collaborating with world-class manufacturers to bring cutting-edge technology to your laboratory — as an
            authorized and exclusive distributor.
          </p>
        </Reveal>
      </div>

      <div className="mask-fade-x mt-16 space-y-6">
        <Marquee duration={38}>
          {rowA.map((p) => (
            <Chip key={p.name} {...p} />
          ))}
        </Marquee>
        <Marquee duration={44} reverse>
          {rowB.map((p) => (
            <Chip key={p.name} {...p} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
