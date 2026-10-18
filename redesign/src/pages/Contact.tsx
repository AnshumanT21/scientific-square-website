import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Clock, Mail, Send } from 'lucide-react';
import Page from '../components/Page';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { company } from '../data/company';

const empty = { name: '', email: '', phone: '', subject: '', message: '' };

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
}: {
  label: string;
  name: keyof typeof empty;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    'peer w-full rounded-none border-0 border-b border-white/15 bg-transparent px-0 pb-3 pt-7 text-[17px] text-white placeholder-transparent outline-none transition-colors focus:border-gold';
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} required={required} rows={4} placeholder={label} className={`${cls} resize-none`} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={label} className={cls} />
      )}
      <span className="pointer-events-none absolute left-0 top-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45 transition-colors peer-focus:text-gold">
        {label}
        {required && <span className="text-gold"> *</span>}
      </span>
    </label>
  );
}

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ ...empty, subject: params.get('subject') ?? '' });
  const [sent, setSent] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const body = `Dear Scientific Square Team,

I am ${form.name}.

${form.message}

--------------------------------
Contact Details provided:
Email: ${form.email}
Phone: ${form.phone}`;
    window.open(
      `mailto:${company.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`,
      '_blank',
    );
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm(empty);
    }, 4000);
  };

  return (
    <Page>
      <PageHero
        eyebrow="Get In Touch"
        title="We'd love to"
        accent="hear from you."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        intro="Whether you have a question about our products, need technical support, or want to discuss a custom solution, our team is ready to help."
      />

      <section className="bg-ink pb-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <Reveal>
              <a
                href={`mailto:${company.email}`}
                className="group block rounded-3xl border border-white/[0.08] bg-ink-800 p-7 transition-colors duration-500 hover:border-gold/50"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/10 text-gold">
                    <Mail className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold" />
                </div>
                <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">Email Us</p>
                <p className="mt-2 break-all font-display text-xl">{company.email}</p>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-white/[0.08] bg-ink-800 p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-lav/10 text-lav-bright">
                  <Clock className="h-5 w-5" />
                </span>
                <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40">Working Hours</p>
                <p className="mt-2 text-lg">{company.hours[0]}</p>
                <p className="text-white/60">{company.hours[1]}</p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <Link
                to="/products"
                className="group flex items-center justify-between rounded-3xl border border-dashed border-white/15 p-7 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                Not sure what you need? Browse the catalogue
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:rotate-45" />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-ink-700 to-ink-800 p-7 sm:p-12">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-[90px]" />
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[460px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                      className="grid h-20 w-20 place-items-center rounded-full bg-emerald-400/15 text-emerald-400"
                    >
                      <CheckCircle2 className="h-10 w-10" />
                    </motion.span>
                    <h2 className="mt-6 text-3xl font-semibold">Redirecting…</h2>
                    <p className="mt-2 text-white/60">Opening your email client to send the message.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0 }} className="relative space-y-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Send us a message</h2>
                    <div className="grid gap-8 sm:grid-cols-2">
                      <Field label="Full Name" name="name" value={form.name} onChange={onChange} required />
                      <Field label="Email Address" name="email" type="email" value={form.email} onChange={onChange} required />
                      <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange} />
                      <Field label="Subject" name="subject" value={form.subject} onChange={onChange} required />
                    </div>
                    <Field label="Your Message" name="message" value={form.message} onChange={onChange} required textarea />
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="text-sm text-white/40">Your message opens in your email app, addressed to our team.</p>
                      <button type="submit" className="btn btn-gold group">
                        Send Message
                        <Send className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
