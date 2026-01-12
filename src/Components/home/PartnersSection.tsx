import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FlaskConical, 
  Zap, 
  GraduationCap, 
  Atom, 
  Factory, 
  Droplets 
} from 'lucide-react';

// Updated partners array with image paths
const partners = [
  { name: 'JINSP', logo: '/JINSP.png' },
  { name: 'Berrytec', logo: '/Berrytec.png' },
  { name: '4 more Labor', logo: '/4more.png' },
  { name: 'Leancat Electrolyzers', logo: '/LeancatElectro.png' },
  { name: 'LEANCAT', logo: '/LEANCAT.png' }, 
  { name: 'Kolibrik', logo: '/Kolibrik.png' },
  { name: 'Bluesen', logo: '/Bluesen.png' },
];

// New "Industries" data instead of Testimonials
const industries = [
  {
    icon: FlaskConical,
    title: "Pharmaceuticals",
    desc: "Ensuring compliance and purity with advanced TOC analysis and water systems.",
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    icon: Zap,
    title: "Green Energy",
    desc: "Supporting the hydrogen revolution with electrolyzer testing stations.",
    color: "text-green-600",
    bg: "bg-green-50"
  },
  {
    icon: GraduationCap,
    title: "Academic Research",
    desc: "Empowering universities with precision spectroscopy and electrochemical tools.",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    icon: Atom,
    title: "Material Science",
    desc: "High-resolution Raman spectroscopy for advanced material characterization.",
    color: "text-purple-600",
    bg: "bg-purple-50"
  },
  {
    icon: Factory,
    title: "Industrial QA/QC",
    desc: "Robust instruments designed for rigorous quality control environments.",
    color: "text-slate-600",
    bg: "bg-slate-50"
  },
  {
    icon: Droplets,
    title: "Environmental",
    desc: "Precise water quality analysis for sustainable environmental monitoring.",
    color: "text-cyan-600",
    bg: "bg-cyan-50"
  }
];

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#d09b2c] font-semibold tracking-wider uppercase text-sm">Global Network</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002a4b] mt-3">
            Our Strategic Partners
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Collaborating with world-class manufacturers to bring cutting-edge technology to your laboratory.
          </p>
        </motion.div>

        {/* Partner Marquee */}
        <motion.div
          className="mb-24 relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Marquee Container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {[...partners, ...partners, ...partners].map((partner, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-40 h-24 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 hover:border-[#d09b2c]/30 hover:shadow-lg transition-all group"
                >
                  <div className="text-center w-full px-4">
                    {/* Image Container */}
                    <div className="w-full h-12 flex items-center justify-center mb-2">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Industries Section (Replaces Testimonials) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#002a4b]">Industries We Empower</h3>
            <div className="w-16 h-1 bg-[#d09b2c] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, idx) => (
              <motion.div
                key={idx}
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#d09b2c]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              >
                <div className={`w-14 h-14 rounded-xl ${industry.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <industry.icon className={`w-7 h-7 ${industry.color}`} />
                </div>
                
                <h4 className="text-xl font-bold text-[#002a4b] mb-3 group-hover:text-[#d09b2c] transition-colors">
                  {industry.title}
                </h4>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {industry.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}