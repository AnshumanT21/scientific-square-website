import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Clock, X, Zap, Globe, Users, Sparkles } from 'lucide-react';
import { Button } from '../Components/ui/button';

// --- Data ---
const launchNews = {
  id: 1,
  title: 'Unveiling Scientific Square: The Future of Precision Science',
  excerpt: 'Today marks a paradigm shift in laboratory instrumentation. We are bridging the gap between theoretical potential and practical mastery.',
  date: '2024-07-24',
  category: 'Strategic Launch',
  image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=80',
  readTime: '2 min read',
  // Content is rendered dynamically in the component to allow animations
};

export default function NewsEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedNews, setSelectedNews] = useState<typeof launchNews | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Animation variants for the modal text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-[#002a4b] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d09b2c]/10 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9391c7]/10 rounded-full -translate-x-1/2 translate-y-1/2" />
          <Sparkles className="absolute top-1/3 left-1/4 text-white/10 w-12 h-12 animate-pulse" />
        </div>
        
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-[#d09b2c]/20 text-[#d09b2c] text-sm font-bold tracking-wide mb-4 border border-[#d09b2c]/30">
            OFFICIAL ANNOUNCEMENT
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">News & Events</h1>
          <p className="text-[#9391c7] text-lg max-w-2xl mx-auto px-4">
            Shaping the tomorrow of scientific discovery
          </p>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Highlight Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative group bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-blue-900/10"
          >
            <div className="grid lg:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-72 lg:h-auto overflow-hidden">
                <div className="absolute inset-0 bg-[#002a4b]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={launchNews.image} 
                  alt="Laboratory Innovation" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Date Badge */}
                <div className="absolute bottom-6 right-6 z-20 bg-[#002a4b] px-5 py-3 rounded-xl shadow-lg border border-white/10 text-white text-center">
                   <span className="block text-xs font-medium text-[#d09b2c] uppercase tracking-wider">July</span>
                   <span className="block text-2xl font-bold">24</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center relative bg-white">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#002a4b] text-xs font-bold tracking-wider uppercase border border-blue-100">
                      {launchNews.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {launchNews.readTime}
                    </div>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-[#002a4b] mb-6 leading-tight group-hover:text-[#d09b2c] transition-colors duration-300">
                    {launchNews.title}
                  </h2>

                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {launchNews.excerpt}
                  </p>

                  <Button 
                    onClick={() => setSelectedNews(launchNews)}
                    className="bg-transparent hover:bg-[#002a4b] text-[#002a4b] hover:text-white border-2 border-[#002a4b] px-8 py-6 rounded-xl text-lg group transition-all duration-300"
                  >
                    Explore the Vision
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* NEW: Immersive Dark Modal */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f172a] text-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row relative border border-white/10"
            >
              {/* Animated Background Elements inside Modal */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-32 -left-32 w-96 h-96 bg-[#002a4b]/30 rounded-full blur-3xl" 
                />
                <motion.div 
                   animate={{ 
                    scale: [1, 1.5, 1],
                    x: [0, 50, 0],
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 right-0 w-80 h-80 bg-[#d09b2c]/10 rounded-full blur-3xl" 
                />
              </div>

              {/* Left Side: Visuals */}
              <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover opacity-80"
                />
                {/* Visual Representation Animation: A scanning line */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d09b2c] to-transparent opacity-70 z-20"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f172a]" />
                
                <div className="absolute top-6 left-6 z-30">
                  <span className="px-3 py-1 rounded-md bg-white/10 backdrop-blur-md text-white text-xs font-mono border border-white/20">
                    ID: SCISQ-LAUNCH-24
                  </span>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="lg:w-3/5 p-8 lg:p-12 overflow-y-auto relative z-10 custom-scrollbar">
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-[#d09b2c] text-white rounded-full transition-colors border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-8"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                      {selectedNews.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {formatDate(selectedNews.date)}</span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                      <span>Delhi, India</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="text-lg text-gray-300 leading-relaxed border-l-2 border-[#d09b2c] pl-6 italic">
                    "Precision isn't just a metric; it's the foundation of truth. At Scientific Square, we aren't just selling instruments; we are curating the future of reliability."
                  </motion.div>

                  <motion.div variants={itemVariants} className="text-gray-400 space-y-4">
                    <p>
                      Today, we open the doors to <strong>Scientific Square</strong>, an entity forged in the fires of necessity. We recognized a growing void in the market: the disconnect between advanced analytical potential and the practical realities of the modern laboratory.
                    </p>
                    <p>
                      Our inception is not merely a business launch; it is a declaration of intent. We are here to dismantle the complexities of spectroscopy and electrochemistry, replacing them with streamlined, robust workflows.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <Zap className="w-8 h-8 text-[#d09b2c] mb-3" />
                      <h4 className="text-white font-bold mb-1">Precision Architecture</h4>
                      <p className="text-sm text-gray-400">Technology sourced not for its novelty, but for its unyielding accuracy in critical environments.</p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                      <Globe className="w-8 h-8 text-blue-400 mb-3" />
                      <h4 className="text-white font-bold mb-1">Adaptive Ecosystems</h4>
                      <p className="text-sm text-gray-400">Tailored instrumentation workflows that mold to your research needs, not the other way around.</p>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors sm:col-span-2">
                      <Users className="w-8 h-8 text-green-400 mb-3" />
                      <h4 className="text-white font-bold mb-1">Knowledge-First Support</h4>
                      <p className="text-sm text-gray-400">We move beyond transactional relationships. Our application scientists are partners in your discovery, offering deep-dive training and lifecycle mentorship.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-6 border-t border-white/10">
                    <p className="text-sm text-gray-500">
                      Scientific Square is now operational and ready to serve laboratories across the world. Join us as we redefine the benchmarks of scientific excellence.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}