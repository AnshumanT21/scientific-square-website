import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import ParticleRing from './ParticleRing';
import SplitWords from './SplitWords';
import Reveal from './Reveal';
import { company } from '../data/company';

/** Closing call-to-action band, reused across pages. */
export default function CTA() {
  const layout = useCallback(
    (w: number, h: number) => ({ cx: w / 2, cy: h / 2, R: Math.min(w * 0.3, h * 0.36) }),
    [],
  );
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="container-site py-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-ink-700 to-ink-800">
          <div className="absolute inset-0 opacity-40">
            <ParticleRing layout={layout} dust={260} />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,11,20,0.75),rgba(5,11,20,0.2)_70%)]" />
          <div className="relative px-6 py-24 text-center sm:py-32">
            <Reveal>
              <span className="eyebrow">Start a conversation</span>
            </Reveal>
            <h2 className="mx-auto mt-6 max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <SplitWords text="Let's equip your" />
              <br />
              <SplitWords text="next breakthrough." delay={0.15} wordClassName="text-gradient" />
            </h2>
            <Reveal delay={0.2}>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
                Whether you have a question about our products, need technical support, or want to discuss a custom
                solution, our team is ready to help.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact" className="btn btn-gold group">
                  Request a Quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href={`mailto:${company.email}`} className="btn btn-ghost">
                  <Mail className="h-4 w-4" />
                  {company.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
