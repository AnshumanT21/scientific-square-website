import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

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

const testimonials = [
  {
    quote: "Scientific Square has been our trusted partner for over 15 years. Their commitment to quality and exceptional service has made them indispensable to our research operations.",
    author: "Dr. Sarah Mitchell",
    role: "Director, National Research Laboratory",
    avatar: "SM"
  },
  {
    quote: "The precision and reliability of equipment from Scientific Square has significantly improved our testing capabilities. Their technical support is unmatched in the industry.",
    author: "Prof. James Chen",
    role: "Head of Biochemistry, Stanford University",
    avatar: "JC"
  },
  {
    quote: "Partnering with Scientific Square was one of the best decisions for our hospital laboratory. They understand healthcare needs and deliver solutions that exceed expectations.",
    author: "Dr. Priya Sharma",
    role: "Chief Pathologist, Apollo Hospitals",
    avatar: "PS"
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
          <span className="text-[#d09b2c] font-semibold tracking-wider uppercase text-sm">Our Partners</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002a4b] mt-3">
            Our Proud Partners
          </h2>
        </motion.div>

        {/* Partner Marquee */}
        <motion.div
          className="mb-20 relative"
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
                    {/* UPDATED: Image Container */}
                    <div className="w-full h-12 flex items-center justify-center mb-2">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                    {/* Optional: You can remove the name below if the logo is clear enough */}
                    <p className="text-xs text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{partner.name}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-lg bg-[#d09b2c] flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 mt-4">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#002a4b] flex items-center justify-center">
                  <span className="text-white font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-[#002a4b]">{testimonial.author}</p>
                  <p className="text-sm text-[#9391c7]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}