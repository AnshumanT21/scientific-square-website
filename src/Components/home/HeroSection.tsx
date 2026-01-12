import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { createPageUrl } from '../../utils';
import AnimatedCounter from '../AnimatedCounter'

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80',
    alt: 'Laboratory Equipment'
  },
  {
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
    alt: 'Microscope Analysis'
  },
  {
    url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
    alt: 'Lab Research'
  },
  {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    alt: 'Scientific Instruments'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <section className="min-h-screen pt-20 lg:pt-0 flex items-center relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-[#9391c7]/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#d09b2c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9391c7]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#002a4b]/5 text-[#002a4b] text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#d09b2c] animate-pulse" />
              {/* CHANGED: From "Trusted by 500+ Labs" to something authoritative but true */}
              Authorized & Exclusive Distributor
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#002a4b] leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Welcome to{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-[#d09b2c] to-[#9391c7] bg-clip-text text-transparent">
                  ScientificSquare
                </span>
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-3 bg-[#d09b2c]/20 -z-0"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Precision in Every Measure, Innovation in Every Step.{' '}
              <span className="text-[#9391c7]">Empowering scientific discovery</span> with world-class laboratory equipment.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link to={createPageUrl('ContactUs')}>
                <Button className="bg-[#002a4b] hover:bg-[#002a4b]/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-[#002a4b]/20 group">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={createPageUrl('AboutUs')}>
                <Button variant="outline" className="border-2 border-[#002a4b] text-[#002a4b] hover:bg-[#002a4b] hover:text-white px-8 py-6 text-lg rounded-xl">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              className="flex gap-8 mt-12 pt-8 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {/* UPDATED STATS TO BE FACTUAL FOR A STARTUP */}
              {[
                { value: 30, suffix: '+', label: 'Years Experience' }, // Founder's experience
                { value: 7, suffix: '+', label: 'Global Partners' },   // Berrytec, JINSP, Leancat, Kolibrik, etc.
                { value: 100, suffix: '%', label: 'Application Support' } // Commitment to quality service
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-2xl sm:text-3xl font-bold text-[#d09b2c]">
                    <AnimatedCounter value={stat.value} isInView={statsInView} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide}
                    src={heroImages[currentSlide].url}
                    alt={heroImages[currentSlide].alt}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                  />
                </AnimatePresence>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002a4b]/30 to-transparent" />
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-[#d09b2c] shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-32 h-32 rounded-2xl bg-[#9391c7] shadow-xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Navigation Arrows */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-[#002a4b]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-[#002a4b]" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide 
                        ? 'w-8 bg-[#d09b2c]' 
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}