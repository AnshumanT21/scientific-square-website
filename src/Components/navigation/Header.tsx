import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { createPageUrl } from '../../utils';

// Updated Product List
const products = [
  { name: 'Lab Water Purification System', slug: 'lab-water-purification-system' },
  { name: 'Online TOC Analyzer BerryPURE TOC', slug: 'online-toc-analyzer-berrypure-toc' }, // Added this new item
  { name: 'Water Quality Analyzer', slug: 'water-quality-analyzer' },
  { name: 'Battery and Fuel Cell Test Systems', slug: 'battery-fuel-cell-test-systems' },
  { name: 'Electrolyzers', slug: 'electrolyzers' },
  { name: 'Electrolyzer Test Stations', slug: 'electrolyzer-test-stations' },
  { name: 'Raman Spectroscopy', slug: 'raman-spectroscopy' },
  { name: 'Lab Furniture', slug: 'lab-furniture' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: createPageUrl('Home') },
    { name: 'News & Events', href: createPageUrl('NewsEvents') },
    { name: 'Products', href: '#', hasDropdown: true },
    { name: 'About Us', href: createPageUrl('AboutUs') },
    { name: 'Contact Us', href: createPageUrl('ContactUs') },
  ];

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setProductsOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to={createPageUrl('Home')} 
            className="flex items-center gap-3 group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <motion.div
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-[#d09b2c] to-[#9391c7] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-[#002a4b] flex items-center justify-center overflow-hidden">
                {/* Logo Image */}
                <img 
                  src="/ScientificSquareLogo.jpeg" 
                  alt="S² Logo" 
                  className="w-full h-full object-contain p-1" 
                />
              </div>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className={`text-lg md:text-xl font-bold transition-colors ${isScrolled ? 'text-[#002a4b]' : 'text-[#002a4b]'}`}>
                ScientificSquare
              </h1>
              <p className="text-xs text-[#9391c7] -mt-0.5">Precision & Innovation</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-1 ${
                      isScrolled 
                        ? 'text-[#002a4b] hover:bg-[#002a4b]/5' 
                        : 'text-[#002a4b] hover:bg-white/50'
                    }`}
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => window.scrollTo(0, 0)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      isScrolled 
                        ? 'text-[#002a4b] hover:bg-[#002a4b]/5' 
                        : 'text-[#002a4b] hover:bg-white/50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown */}
                {item.hasDropdown && (
                  <div
                    className="absolute top-full left-0 pt-2"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[280px] overflow-hidden" 
                        >
                          {products.map((product, idx) => (
                            <Link
                              key={product.slug}
                              to={createPageUrl('ProductDetail') + `?product=${product.slug}`}
                              onClick={() => {
                                window.scrollTo(0, 0);
                                setProductsOpen(false);
                              }}
                              className="block px-4 py-2.5 text-[#002a4b] hover:bg-[#002a4b]/5 hover:text-[#d09b2c] transition-colors"
                            >
                              <motion.span
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                {product.name}
                              </motion.span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-[#002a4b]/5 hover:bg-[#002a4b]/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#002a4b]" />
            ) : (
              <Menu className="w-6 h-6 text-[#002a4b]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-[#002a4b] font-medium hover:bg-[#002a4b]/5"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {productsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 overflow-hidden"
                          >
                            {products.map((product) => (
                              <Link
                                key={product.slug}
                                to={createPageUrl('ProductDetail') + `?product=${product.slug}`}
                                className="block px-4 py-2.5 text-[#002a4b]/70 hover:text-[#d09b2c]"
                                onClick={handleLinkClick}
                              >
                                {product.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-3 rounded-lg text-[#002a4b] font-medium hover:bg-[#002a4b]/5"
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}