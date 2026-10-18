import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Page from '../components/Page';
import PageHero from '../components/PageHero';
import CTA from '../components/CTA';
import Reveal from '../components/Reveal';
import { categories, categoriesByDiscipline, categoryPartners, disciplines, totalProductCount } from '../data/products';
import { productPath } from '../lib/cn';

export default function Products() {
  return (
    <Page>
      <PageHero
        eyebrow="Product Catalogue"
        title="World-class instruments,"
        accent="curated for your lab."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
        intro="Every instrument in our portfolio comes from a vetted global partner, and every one is backed by our own application support."
        aside={
          <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              [disciplines.length, 'Disciplines'],
              [categories.length, 'Categories'],
              [totalProductCount, 'Product lines'],
            ].map(([v, l]) => (
              <div key={l}>
                <dd className="font-display text-4xl font-semibold">{v}</dd>
                <dt className="mt-1 text-xs text-white/50">{l}</dt>
              </div>
            ))}
          </dl>
        }
      />

      <div className="bg-ink pb-24">
        {disciplines.map((d, di) => (
          <section key={d.id} className="container-site border-t border-white/[0.08] py-16">
            <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs text-gold">0{di + 1}</span>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{d.name}</h2>
              </div>
              <p className="max-w-md text-white/50">{d.blurb}</p>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categoriesByDiscipline(d.id).map((c, i) => (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={productPath(c.slug)} className="group block overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-800 transition-colors duration-500 hover:border-white/20">
                    <div className="plate aspect-[16/11] rounded-none">
                      <div className="absolute inset-0 flex">
                        {c.products.slice(0, 3).map((p, pi) => (
                          <img
                            key={p.name}
                            src={p.image}
                            alt=""
                            loading="lazy"
                            className="h-full min-w-0 flex-1 object-contain p-5 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                            style={{ transitionDelay: `${pi * 60}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-4 p-6">
                      <div>
                        <h3 className="text-xl font-medium">{c.name}</h3>
                        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40">
                          {c.products.length} {c.products.length === 1 ? 'product' : 'products'} · {categoryPartners(c).join(', ')}
                        </p>
                      </div>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <CTA />
    </Page>
  );
}
