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
  const visionRef = useRef(null); 
  const valuesRef = useRef(null);
  const statsRef = useRef(null);

  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

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
      desc: "We don't just sell equipment; we curate the latest technological advancements from around the globe to solve complex challenges."
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
                  <strong className="text-[#002a4b]">ScientificSquare</strong> was founded in 2024, but its roots go much deeper. After spending over 30 years shaping the scientific equipment landscape, our founder, <span className="text-[#002a4b] font-semibold">our company</span>, identified a critical gap in the market.
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
                  Ready to serve laboratories with our global partner network.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* "Our Vision" Section */}
      <section ref={visionRef} className="py-24 bg-[#002a4b] text-white overflow-hidden relative">
        {/* Animated Background Elements for "Pop" */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <motion.div 
             className="absolute top-20 right-20 w-32 h-32 rounded-full border border-white/5"
             animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
             transition={{ duration: 6, repeat: Infinity }}
           />
           <motion.div 
             className="absolute bottom-40 left-10 w-64 h-64 rounded-full border border-[#d09b2c]/10"
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Representation of Moving Items (Vision Graphic) */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={visionInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="relative flex items-center justify-center aspect-square"
              >
                {/* Orbital Ring 1 (Outer Orange) */}
                <motion.div 
                  className="absolute w-full h-full rounded-full border border-dashed border-[#d09b2c]/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Orbital Ring 2 (Inner Purple) */}
                <motion.div 
                  className="absolute w-[80%] h-[80%] rounded-full border border-[#9391c7]/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* ----- ATOMS ----- */}

                {/* Outer Orbit Container (Matches Orange Ring size & rotation direction) */}
                <motion.div
                  className="absolute w-full h-full rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                   {/* EXISTING PURPLE ATOM (TOP) */}
                   <motion.div 
                     className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-[#9391c7] rounded-full shadow-[0_0_10px_#9391c7]"
                     animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                     transition={{ duration: 3, repeat: Infinity }}
                   />
                   {/* NEW ORANGE ATOM (BOTTOM - OPPOSITE) */}
                   <motion.div 
                     className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-1.5 w-3 h-3 bg-[#d09b2c] rounded-full shadow-[0_0_10px_#d09b2c]"
                     animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                     transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                   />
                </motion.div>

                {/* Inner Orbit Container (Matches Purple Ring size & rotation direction) */}
                <motion.div
                  className="absolute w-[80%] h-[80%] rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                   {/* EXISTING ORANGE ATOM (TOP) */}
                   <motion.div 
                     className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-[#d09b2c] rounded-full shadow-[0_0_15px_#d09b2c]"
                     animate={{ scale: [1, 1.5, 1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   />
                   {/* NEW PURPLE ATOM (BOTTOM - OPPOSITE) */}
                   <motion.div 
                     className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-2 w-4 h-4 bg-[#9391c7] rounded-full shadow-[0_0_15px_#9391c7]"
                     animate={{ scale: [1, 1.5, 1] }}
                     transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                   />
                </motion.div>

                {/* Central Image Container */}
                <div className="relative z-10 w-[60%] h-[60%] rounded-full overflow-hidden border-4 border-[#d09b2c]/20 shadow-[0_0_40px_rgba(208,155,44,0.1)] bg-black flex items-center justify-center group">
                    <img 
                      src="/ScientificSquareLogo.jpeg" // Company Logo
                      alt="ScientificSquare" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                </div>
              </motion.div>
            </div>

            {/* Vision Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={visionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mb-8">
                  <h3 className="text-[#d09b2c] text-lg font-medium mb-2 tracking-wide uppercase">Our Ambition</h3>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Empowering Science. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Enabling the Future.</span>
                  </h2>
                </div>

                <div className="space-y-6 text-gray-300 text-lg leading-relaxed text-justify">
                  <p>
                    At <span className="text-white font-semibold">ScientificSquare</span>, our vision is to architect a scientific ecosystem where breakthrough research is powered by the world's finest instrumentation. We see a future where geographical boundaries do not limit scientific potential.
                  </p>
                  <p>
                    We aim to be the catalyst that transforms laboratories into global hubs of innovation. By bridging the gap between cutting-edge global technology and diverse applications, we strive to solve humanity's most pressing challenges—from <span className="text-[#d09b2c]">sustainable energy storage</span> to <span className="text-[#d09b2c]">water security</span>.
                  </p>
                  <p>
                    We are not just distributors; we are enablers of the hydrogen economy and guardians of analytical precision, committed to building a resilient and self-reliant scientific infrastructure for the global community.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Authentic Stats Grid with Counters */}
          <div ref={statsRef} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
             {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
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