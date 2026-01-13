import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Award, 
  Globe2, 
  Microscope, 
  HeartHandshake, 
  Lightbulb, 
  ShieldCheck,
  Rocket
} from 'lucide-react';
import AnimatedCounter from '../Components/AnimatedCounter';

export default function AboutUs() {
  const storyRef = useRef(null);
  const founderRef = useRef(null);
  const valuesRef = useRef(null);
  // NEW: Dedicated ref for the stats grid to ensure late triggering
  const statsRef = useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const founderInView = useInView(founderRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  // NEW: Triggers only when the stats grid is actually on screen
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  // Authentic Stats for a Startup
  const stats = [
    { icon: Award, value: 30, suffix: '+', label: 'Years of Founder Expertise' },
    { icon: Globe2, value: 7, suffix: '+', label: 'Global Tech Partners' },
    { icon: Microscope, value: 4, suffix: '', label: 'Core Scientific Disciplines' },
    { icon: HeartHandshake, value: 100, suffix: '%', label: 'Commitment to Service' }
  ];

  const coreValues = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      desc: "We don't just sell equipment; we curate the latest technological advancements from around the globe to solve local challenges."
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Quality",
      desc: "Every partner we choose and every product we deliver undergoes rigorous vetting to ensure it meets the highest scientific standards."
    },
    {
      icon: Rocket,
      title: "Future Ready",
      desc: "Born in 2024, we are built for the modern lab—focusing on digitalization, automation, and sustainable technologies like Green Hydrogen."
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-[#002a4b] overflow-hidden">
        {/* Abstract Background with Floating Animation */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#d09b2c]/10 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" 
          />
          <motion.div 
            animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-[#9391c7]/10 to-transparent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" 
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <motion.div
          className="text-center relative z-10 max-w-4xl px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-[#d09b2c] text-sm font-medium mb-6 backdrop-blur-sm"
          >
            EST. 2024
          </motion.span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Built on Experience.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d09b2c] to-[#fcd34d]">
              Designed for the Future.
            </span>
          </h1>
          <p className="text-[#9391c7] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A new chapter in scientific excellence, founded on three decades of industry mastery.
          </p>
        </motion.div>
      </section>

      {/* The Origin Story */}
      <section ref={storyRef} className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-[#d09b2c] font-bold tracking-widest uppercase text-sm">The Genesis</span>
                <div className="h-px w-12 bg-[#d09b2c]" />
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-[#002a4b] mb-8 leading-tight">
                Not Just Another Startup. <br/>
                <span className="text-gray-400">A Legacy Reimagined.</span>
              </h2>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-justify">
                <p>
                  <strong className="text-[#002a4b]">ScientificSquare</strong> was founded in 2024, but its roots go much deeper. After spending over 30 years shaping the scientific equipment landscape in India, our founder, <span className="text-[#002a4b] font-semibold">Rajeev Tyagi</span>, identified a critical gap in the market.
                </p>
                <p>
                  The industry was flooded with products, but starved of true application support. Researchers weren't just looking for boxes; they needed partners who understood the science behind the machine.
                </p>
                <p>
                  Driven by this insight, ScientificSquare was born—not to compete on volume, but to lead on <span className="italic text-[#d09b2c]">value</span>. We are a young company with an old soul, combining the agility of a startup with the wisdom of a veteran industry leader.
                </p>
              </div>
            </motion.div>

            {/* Visual Element: The "Bridge" Graphic */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={storyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=800&q=80" 
                  alt="Modern Laboratory" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002a4b]/90 via-[#002a4b]/20 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  {/* ANIMATED COUNTER FOR 2024 */}
                  <div className="text-6xl font-bold text-[#d09b2c] mb-2 flex items-center">
                    <AnimatedCounter value={2024} isInView={storyInView} />
                  </div>
                  <div className="h-1 w-20 bg-white/30 mb-4" />
                  <p className="text-lg font-light">
                    Marking the beginning of a new era in precision instrumentation.
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="font-bold text-[#002a4b] text-sm">Open for Business</span>
                </div>
                <p className="text-xs text-gray-500">
                  Ready to serve laboratories across India with our global partner network.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Profile - "The Anchor" */}
      <section ref={founderRef} className="py-24 bg-[#002a4b] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Founder Image Area */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={founderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="relative z-10 rounded-2xl overflow-hidden border-4 border-[#d09b2c]/30 shadow-2xl aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                  <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                     {/* Placeholder for Rajeev Tyagi's Image */}
                     <div className="text-center p-8">
                        <div className="w-24 h-24 rounded-full bg-[#d09b2c] mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-[#002a4b]">RT</div>
                     </div>
                  </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-10 -left-10 w-full h-full border-2 border-[#d09b2c] rounded-2xl -z-0 opacity-50 hidden lg:block" />
              </motion.div>
            </div>

            {/* Founder Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={founderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-8">
                  <h3 className="text-[#d09b2c] text-lg font-medium mb-2">Meet the Visionary</h3>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">Rajeev Tyagi</h2>
                  <p className="text-xl text-gray-300">Founder & CEO</p>
                </div>

                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    "Experience is not just about the years you serve, but the problems you solve."
                  </p>
                  <p>
                    With over 30 years of hands-on experience in the scientific domain, Rajeev has witnessed the evolution of laboratory technology first-hand. He founded ScientificSquare to answer a simple question: <span className="text-white font-semibold">How can we make world-class technology accessible and understandable for Indian researchers?</span>
                  </p>
                  <p>
                    His vision drives our selection of partners—focusing only on manufacturers like Berrytec and Leancat who share our ethos of precision and durability.
                  </p>
                </div>

                {/* Signature / Quote */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="font-handwriting text-2xl text-[#d09b2c] italic">
                    "We are just getting started."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Authentic Stats Grid with Counters - USING statsRef HERE */}
          <div ref={statsRef} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
             {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  // Only animate when the STATS grid is in view, not the founder header
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + (idx * 0.1) }}
                >
                   <motion.div
                     whileHover={{ scale: 1.1, rotate: 5 }}
                     className="w-8 h-8 mx-auto mb-4"
                   >
                    <stat.icon className="w-full h-full text-[#d09b2c]" />
                   </motion.div>
                   
                   <div className="text-3xl lg:text-4xl font-bold text-white mb-1 flex justify-center">
                      {/* Pass statsInView here to trigger counting */}
                      <AnimatedCounter value={stat.value} isInView={statsInView} suffix={stat.suffix} />
                   </div>
                   <div className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Core Values Section with Pop and Glow */}
      <section ref={valuesRef} className="py-24 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-[#002a4b]">What Drives Us</h2>
               <div className="w-12 h-1 bg-[#d09b2c] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {coreValues.map((value, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-[#d09b2c] transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    whileHover={{ 
                      y: -15, 
                      borderColor: '#002a4b',
                      boxShadow: '0 20px 40px -10px rgba(208, 155, 44, 0.3)' // Golden glow on hover
                    }}
                    transition={{ delay: 0.2 * idx }}
                  >
                     <div className="w-12 h-12 rounded-lg bg-[#002a4b] text-white flex items-center justify-center mb-6">
                        <value.icon className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-[#002a4b] mb-4">{value.title}</h3>
                     <p className="text-gray-600 leading-relaxed">
                        {value.desc}
                     </p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
    </main>
  );
}