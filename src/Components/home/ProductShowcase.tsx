import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { createPageUrl } from "../../utils";

const products = [
  {
    id: 'product-a',
    name: 'Water Quality Analyzer',
    description: 'A versatile unit capable of measuring pH, Conductivity, and TOC simultaneously. The ultimate all-in-one solution for lab water diagnostics.',
    image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_5x.png',
    partner: 'BLUESEN'
  },
  {
    id: 'product-b',
    name: 'Hand Held Raman Spectrometer',
    description: 'Bring the lab to the sample. Rugged, lightweight, and fast—perfect for incoming raw material verification and field testing.',
    image: 'https://www.jinsptech.com/uploads/products-1.jpg',
    partner: 'JINSP'
  },
  {
    id: 'product-c',
    name: 'Hydrogen Generators',
    description: 'Large scale electrolysis stacks designed for industrial hydrogen applications and energy storage.',
    image: 'https://leancatwe.com/wp-content/uploads/2025/03/rack_new-1024x1024.png',
    partner: 'Leancat Electrolyzers'
  },
  {
    id: 'product-d',
    name: 'Fuel Cell Test Stations',
    description: 'Complete test stations for characterization of PEM and SOFC fuel cells.',
    image: 'https://lean-cat.com/wp-content/uploads/2022/03/P1180271_transparent1-2-1229x1536.png',
    partner: 'LEANCAT'
  }
];

export default function ProductShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-[#d09b2c] font-semibold tracking-wider uppercase text-sm">Our Products</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002a4b] mt-3">
              Featured Equipment
            </h2>
          </div>
          <Link to={createPageUrl('ProductDetail') + '?product=product-a'}>
            <Button variant="outline" className="border-[#002a4b] text-[#002a4b] hover:bg-[#002a4b] hover:text-white group">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            >
              <Link to={createPageUrl('ProductDetail') + `?product=${product.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002a4b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* View Details Button */}
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-[#002a4b] font-medium py-2.5 rounded-lg">
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#002a4b] mb-2 group-hover:text-[#d09b2c] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-xs text-[#9391c7] font-medium">
                      Sourced from {product.partner}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}