import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowUp } from 'lucide-react';
import { createPageUrl } from '../../utils';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: createPageUrl('Home') },
    { name: 'News & Events', href: createPageUrl('NewsEvents') },
    { name: 'About Us', href: createPageUrl('AboutUs') },
    { name: 'Contact', href: createPageUrl('ContactUs') },
  ];

  return (
    <footer className="bg-[#002a4b] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d09b2c]/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9391c7]/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#d09b2c] to-[#9391c7] flex items-center justify-center">
                <div className="w-10 h-10 rounded-md bg-[#002a4b] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/ScientificSquareLogo.jpeg" 
                    alt="S² Logo" 
                    className="w-full h-full object-contain p-1" 
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">ScientificSquare</h3>
                <p className="text-xs text-[#9391c7]">Precision & Innovation</p>
              </div>
            </div>
            
            <p className="text-white/70 mb-6 leading-relaxed">
              Your dedicated partner for advanced scientific instrumentation. 
              We bridge the gap between global innovation and local application, 
              delivering world-class precision to laboratories and research facilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#d09b2c]" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo(0, 0)} // Added scroll to top
                    className="text-white/70 hover:text-[#d09b2c] transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#d09b2c] transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#d09b2c]" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@scientificsquare.in"
                  className="flex items-center gap-3 text-white/70 hover:text-[#d09b2c] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-[#d09b2c]/20 flex items-center justify-center transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>info@scientificsquare.in</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-white/70 hover:text-[#d09b2c] transition-colors group"
                >
                  {/* Uncomment when phone number is ready
                  <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-[#d09b2c]/20 flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+91 9958797197</span> */}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-white/50 text-sm">
            © {new Date().getFullYear()} ScientificSquare. All rights reserved. 
            <span className="mx-2">|</span>
            Developed with precision by ScientificSquare Team
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#d09b2c] text-white shadow-lg flex items-center justify-center z-50 transition-all ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}