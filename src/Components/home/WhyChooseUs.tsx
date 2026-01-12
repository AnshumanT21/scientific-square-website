import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Target, BadgeCheck, Headphones, ChevronLeft, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Tailored Solution',
    description: 'Custom equipment configurations to meet your specific lab requirements'
  },
  {
    icon: Target,
    title: 'Scientific Precision',
    description: 'Industry-leading accuracy in all measurements and calibrations'
  },
  {
    icon: BadgeCheck,
    title: 'High Reliability',
    description: 'Durable equipment built to perform consistently under demanding conditions'
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: '24/7 technical assistance from our team of specialists'
  }
];

const carouselImages = [
  'https://static.vecteezy.com/system/resources/thumbnails/039/302/250/small/ai-generated-back-to-school-science-lab-excitement-highlight-the-excitement-of-a-science-experiment-in-a-laboratory-setting-background-image-generative-ai-photo.jpg',
  'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&q=80',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=600&q=80'
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#9391c7]/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#d09b2c] font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002a4b] mt-3">
            Why Choose ScientificSquare?
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At ScientificSquare, we understand that precision and reliability are paramount in scientific research. 
              With over three decades of industry experience, we've built our reputation on delivering 
              <span className="text-[#002a4b] font-medium"> cutting-edge laboratory equipment</span> that meets the most demanding standards.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our commitment goes beyond just selling products – we partner with laboratories worldwide to 
              understand their unique challenges and provide 
              <span className="text-[#9391c7] font-medium"> tailored solutions</span> that drive innovation and discovery.
            </p>
          </motion.div>

          {/* Image Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              {carouselImages.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`Lab equipment ${idx + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: idx === currentImage ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#002a4b]/40 to-transparent" />
              
              {/* Navigation */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center"
                >
                  <ChevronLeft className="w-4 h-4 text-[#002a4b]" />
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % carouselImages.length)}
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center"
                >
                  <ChevronRight className="w-4 h-4 text-[#002a4b]" />
                </button>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#d09b2c]/30 rounded-2xl -z-10" />
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
            >
              <div className="bg-[#002a4b] rounded-2xl p-6 h-full hover:shadow-2xl hover:shadow-[#002a4b]/20 transition-all duration-300 hover:-translate-y-1">
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#d09b2c] to-[#d09b2c]/70 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}