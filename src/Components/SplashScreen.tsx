import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the type for the props
interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#002a4b] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            // FIX: Moved the transition definition INSIDE the exit prop
            exit={{ 
              scale: 0.3, 
              opacity: 0, 
              x: -400, 
              y: -300,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Icon */}
            <motion.div
              className="relative mb-6"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, type: "spring" }}
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-[#d09b2c] to-[#9391c7] flex items-center justify-center shadow-2xl">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-[#002a4b] flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-white">S²</span>
                </div>
              </div>
              <motion.div
                className="absolute -inset-2 rounded-2xl border-2 border-[#d09b2c]/30"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Company Name */}
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-white tracking-wide"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              ScientificSquare
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-[#9391c7] mt-3 text-sm md:text-lg tracking-widest uppercase"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Precision in Every Measure
            </motion.p>

            {/* Loading Bar */}
            <motion.div
              className="mt-8 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#d09b2c] to-[#9391c7]"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}