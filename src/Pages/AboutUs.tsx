import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';
import AnimatedCounter from '../Components/AnimatedCounter';

export default function AboutUs() {
  const storyRef = useRef(null);
  const founderRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });
  const founderInView = useInView(founderRef, { once: true, margin: "-100px" });

  const achievements = [
    { icon: Award, value: 30, suffix: '+', label: 'Years Experience' },
    { icon: Users, value: 500, suffix: '+', label: 'Happy Clients' },
    { icon: Globe, value: 25, suffix: '+', label: 'Countries Served' },
    { icon: TrendingUp, value: 1000, suffix: '+', label: 'Products Delivered' }
  ];

  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-[#002a4b] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-white/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border-2 border-white/40" />
        </div>
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">About Us</h1>
          <p className="text-[#9391c7] text-lg">Discover our story of precision and innovation</p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#d09b2c]/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9391c7]/5 rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#d09b2c] font-semibold tracking-wider uppercase text-sm">Our Journey</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#002a4b] mt-3 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to revolutionize laboratory equipment distribution in India, 
                  ScientificSquare began its journey in 1994. What started as a small venture has grown 
                  into one of the most trusted names in scientific equipment supply.
                </p>
                <p>
                  Our commitment to quality, precision, and customer satisfaction has been the cornerstone 
                  of our success. We understand that in science, accuracy is everything – and that's 
                  exactly what we deliver.
                </p>
                <p>
                  Today, we partner with leading global manufacturers to bring cutting-edge technology 
                  to laboratories across healthcare, research, education, and industrial sectors.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Logo Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-[#d09b2c] to-[#9391c7] p-1 shadow-2xl rotate-6">
                    <div className="w-full h-full rounded-3xl bg-[#002a4b] flex items-center justify-center overflow-hidden">
                      <img 
                        src="/ScientificSquareLogo.jpeg" 
                        alt="Scientific Square Logo" 
                        className="w-full h-full object-cover rounded-3xl" 
                      />
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 rounded-xl bg-[#d09b2c]/20"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-10 left-0 w-16 h-16 rounded-xl bg-[#9391c7]/20"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section ref={founderRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Founder Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative max-w-md mx-auto">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-[#002a4b] to-[#002a4b]/80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto rounded-full bg-[#d09b2c]/20 flex items-center justify-center mb-4">
                        <span className="text-5xl font-bold text-[#d09b2c]">RT</span>
                      </div>
                      <p className="text-white/70 text-sm">Founder & CEO</p>
                    </div>
                  </div>
                </div>
                {/* Experience Badge */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6"
                  initial={{ scale: 0 }}
                  animate={founderInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#d09b2c]">
                      <AnimatedCounter value={30} isInView={founderInView} suffix="+" />
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Years Experience</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Founder Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              animate={founderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-[#d09b2c] font-semibold tracking-wider uppercase text-sm">Leadership</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#002a4b] mt-3 mb-2">Rajeev Tyagi</h2>
              <p className="text-[#9391c7] font-medium mb-6">Founder & CEO</p>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  With over three decades of experience in the scientific equipment industry, 
                  Rajeev Tyagi founded ScientificSquare with a simple yet powerful vision – 
                  to make world-class laboratory equipment accessible to every researcher and scientist in India.
                </p>
                <p>
                  His deep understanding of laboratory needs, combined with an unwavering commitment 
                  to quality, has guided the company through decades of growth and innovation.
                </p>
                <p>
                  Under his leadership, ScientificSquare has established partnerships with leading 
                  global manufacturers and has served over 500 laboratories across healthcare, 
                  research, and educational institutions.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Achievement Stats */}
          <motion.div
            className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={founderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-[#002a4b] rounded-2xl p-6 text-center group hover:shadow-2xl hover:shadow-[#002a4b]/20 transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-[#d09b2c]/20 flex items-center justify-center mb-4 group-hover:bg-[#d09b2c] transition-colors">
                  <item.icon className="w-7 h-7 text-[#d09b2c] group-hover:text-white transition-colors" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter value={item.value} isInView={founderInView} suffix={item.suffix} />
                </p>
                <p className="text-white/70 text-sm">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}