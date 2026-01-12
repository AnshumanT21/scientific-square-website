import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Thermometer, 
  Gauge, 
  Settings, 
  Shield, 
  Zap, 
  Cpu,
  CheckCircle,
  ArrowRight,
  ExternalLink 
} from 'lucide-react';
import { Button } from '../Components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '../utils';

// --- Types ---
interface ProductFeature {
  icon: React.ElementType;
  title: string;
  desc: string;
}

// New interface for Variants (PTS-1, PTS-10, etc.)
interface ProductVariant {
  id: string;
  name: string; // The button label (e.g., "PTS-1")
  description: string;
  image: string;
  productUrl: string;
}

interface Product {
  name: string;
  tagline: string;
  description: string;
  image: string;
  partner: string;
  partnerLogo?: string;
  productUrl?: string;
  features: ProductFeature[];
  specs: string[];
  variants?: ProductVariant[]; // Added variants array
}

// --- Data: Categories containing Arrays of Products ---
const categoriesData: Record<string, Product[]> = {
  'lab-water-purification-system': [
    {
      name: 'Online TOC Analyzer BerryPURE TOC',
      tagline: 'Continuous Water Quality Monitoring',
      description: 'A precision instrument designed for the continuous monitoring of Total Organic Carbon in purified water systems. It ensures strict compliance with pharmaceutical standards such as USP <643> and EP 2.2.44 through reagent-free UV oxidation technology.',
      image: 'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/d66d51a1-4f8d-4773-8a5c-182d03550dec/TOC.png',
      partner: 'Berrytec',
      partnerLogo: '/Berrytec.png', 
      productUrl: 'https://www.berrytec.net/en/berrypure-toc',
      features: [
        { icon: Gauge, title: 'Real-time Analysis', desc: 'Instant TOC readings' },
        { icon: Shield, title: 'Compliance Ready', desc: 'USP <643> and EP 2.2.44 compliant' },
        { icon: Zap, title: 'Low Maintenance', desc: 'Reagent-free oxidation technology' }
      ],
      specs: ['Range: 0.5 to 1000 ppb', 'Response Time: < 1 min', 'Touchscreen Interface']
    },
    {
      name: 'BerryPURE mini',
      tagline: 'Compact Lab Water Solution',
      description: 'Engineered for laboratories with limited bench space, the BerryPURE mini delivers consistent Type I and Type II water quality. It is an optimal choice for general chemistry, buffer preparation, and glassware rinsing applications.',
      image: 'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/9deb3416-b768-405a-8b5f-ede41c3c0261/Ultra+Pure+Water+Type+1+Berrypure+Mini+Series.jpg',
      partner: 'Berrytec',
      partnerLogo: '/Berrytec.png',
      productUrl: 'https://www.berrytec.net/en/purewater',
      features: [
        { icon: Settings, title: 'Space Saving', desc: 'Ultra-compact design for tight spaces' },
        { icon: Zap, title: 'Efficient', desc: 'Low energy consumption' },
        { icon: Shield, title: 'Reliable', desc: 'Consistent water quality' }
      ],
      specs: ['Output: 5L/hr', 'Conductivity: < 0.1 µS/cm', 'Dimensions: Compact Footprint']
    },
    {
      name: 'BerryPURE RO + EDI',
      tagline: 'Advanced Purification Technology',
      description: 'This system combines Reverse Osmosis with Electro-Deionization (EDI) to produce superior grade water without the need for chemical regeneration. It is designed to minimize wastewater while maintaining high resistivity levels.',
      image: 'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/1567580253099-9UFFK0Q9PLD37NJHE812/RO.png',
      partner: 'Berrytec',
      partnerLogo: '/Berrytec.png',
      productUrl: 'https://www.berrytec.net/en/ro-class-edi',
      features: [
        { icon: Gauge, title: 'High Purity', desc: 'Consistent Type II water' },
        { icon: Zap, title: 'Eco-Friendly', desc: 'Low wastewater recovery' },
        { icon: Cpu, title: 'Automated', desc: 'Fully automatic operation' }
      ],
      specs: ['Tech: RO + EDI', 'Resistivity: > 5 MΩ-cm', 'TOC: < 30 ppb']
    },
    {
      name: 'BerryPURE ULTRA',
      tagline: 'Ultrapure Water System',
      description: 'The BerryPURE ULTRA is built for the most critical laboratory applications, including HPLC, GC-MS, and molecular biology. It utilizes dual-wavelength UV oxidation to ensure virtually zero organic contaminants.',
      image: 'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/1551781291255-T5DAZF4WPLHSBDXWNTN1/sgkUltra',
      partner: 'Berrytec',
      partnerLogo: '/Berrytec.png',
      productUrl: 'https://www.berrytec.net/en/sgkultra',
      features: [
        { icon: Shield, title: 'Critical Grade', desc: 'For analytical applications' },
        { icon: Thermometer, title: 'UV Oxidation', desc: 'Dual wavelength UV lamp' },
        { icon: Gauge, title: 'Monitoring', desc: 'Real-time TOC monitoring' }
      ],
      specs: ['Type: Ultrapure Type I', 'Resistivity: 18.2 MΩ-cm', 'TOC: < 5 ppb']
    },
    {
      name: 'BerryPURE Tower',
      tagline: 'High Volume Production',
      description: 'A robust floor-standing unit designed to meet the demands of facilities with high daily water consumption. It can serve as a central supply unit feeding multiple laboratory points or washing machines.',
      image: 'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/1567579009015-UPUAHFDXNDPPUTYO3CLV/Berrypure%C2%AE+Tower',
      partner: 'Berrytec',
      partnerLogo: '/Berrytec.png',
      productUrl: 'https://www.berrytec.net/en/sutower',
      features: [
        { icon: Zap, title: 'High Capacity', desc: 'High flow rates available' },
        { icon: Settings, title: 'Robust', desc: 'Heavy-duty construction' },
        { icon: Cpu, title: 'Centralized', desc: 'Can feed multiple points' }
      ],
      specs: ['Output: Up to 100L/hr', 'Tank: Integrated or External', 'Mounting: Floor']
    },
    {
      name: 'BerryPURE COMPACT',
      tagline: 'All-in-One Benchtop Unit',
      description: 'A versatile all-in-one system that connects directly to a tap water source to produce both Type I and Type II water. Features an intuitive digital interface for easy volumetric dispensing.',
      image: 'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/882f270b-9dfc-4e43-ba1b-8baa65bb93b8/compact.png',
      partner: 'Berrytec',
      partnerLogo: '/Berrytec.png',
      productUrl: 'https://www.berrytec.net/en/compact',
      features: [
        { icon: Settings, title: 'Dual Output', desc: 'Type I and Type II water' },
        { icon: Gauge, title: 'User Friendly', desc: 'Intuitive digital display' },
        { icon: Shield, title: 'Easy Maintenance', desc: 'Quick cartridge change' }
      ],
      specs: ['Feed: Potable Tap Water', 'Resistivity: 18.2 MΩ-cm', 'Dispensing: Manual/Volumetric']
    },
    {
      name: 'Water Quality Analyzer',
      tagline: 'Comprehensive Multiparameter Testing',
      description: 'This multiparameter analyzer offers simultaneous measurement of pH, conductivity, and TOC. Its robust IP54 enclosure makes it suitable for demanding lab environments where rapid diagnostics are required.',
      image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_5x.png',
      partner: 'Bluesen',
      partnerLogo: '/Bluesen.png', // Fixed filename
      productUrl: 'https://www.bluesen.com/en/product/product1.asp',
      features: [
        { icon: Gauge, title: 'Multiparameter', desc: 'pH, Conductivity, TOC in one' },
        { icon: Shield, title: 'Robust Design', desc: 'IP54 rated enclosure' },
        { icon: Zap, title: 'Rapid Results', desc: 'Full profile in under 3 mins' }
      ],
      specs: ['pH Range: 0-14', 'Conductivity: 0.055 µS/cm', 'Power: 110/220V']
    },
  ],
  'raman-spectroscopy': [
    {
      name: 'Online Raman Analyzer',
      tagline: 'Process Analytical Technology',
      description: 'A multi-channel system engineered for in-situ process monitoring. It enables real-time chemical composition analysis in bioprocessing and pharmaceutical production lines without interrupting the workflow.',
      image: 'https://www.jinsptech.com/uploads/RS2000-4RS2100-4.png',
      partner: 'JINSP',
      partnerLogo: '/JINSP.png',
      productUrl: 'https://www.jinsptech.com/multi-channel-online-raman-analyzer-for-liquids/',
      features: [
        { icon: Zap, title: 'Real-time Kinetics', desc: 'Track reactions as they happen' },
        { icon: Shield, title: 'Non-Invasive', desc: 'No sample preparation needed' },
        { icon: Cpu, title: 'Automated Software', desc: 'Chemometric modeling included' }
      ],
      specs: ['Laser: 532nm / 785nm', 'Resolution: 4 cm-1', 'Fiber Optic Probe']
    },
    {
      name: 'Hand Held Raman Spectrometer',
      tagline: 'Portable Material Identification',
      description: 'This rugged, lightweight device brings laboratory-grade spectroscopy to the field. It is specifically designed for the rapid identification of raw materials, narcotics, and explosives with immediate pass/fail results.',
      image: 'https://www.jinsptech.com/uploads/products-1.jpg',
      partner: 'JINSP',
      partnerLogo: '/JINSP.png',
      productUrl: 'https://www.jinsptech.com/handheld-raman-spectrometer-2/',
      features: [
        { icon: Gauge, title: 'Point & Shoot', desc: 'Results in seconds' },
        { icon: Shield, title: 'Library Matching', desc: '12,000+ compound database' },
        { icon: Settings, title: 'Wireless Sync', desc: 'Cloud data backup' }
      ],
      specs: ['Weight: < 1kg', 'Battery: 8 hours', 'Certification: IP68']
    },
    {
      name: 'Miniature Spectrometer',
      tagline: 'Compact Optical Bench',
      description: 'Offering high optical resolution in a small footprint, this spectrometer is ideal for OEM integration and educational setups. It features a reliable CCD array detector ensuring thermal stability and low stray light.',
      image: 'https://cdn.globalso.com/jinsptech/products2.jpg',
      partner: 'JINSP',
      partnerLogo: '/JINSP.png',
      productUrl: 'https://www.jinsptech.com/sr50c-sr75c-miniature-spectrometer-product/',
      features: [
        { icon: Settings, title: 'Modular Design', desc: 'Interchangeable slits' },
        { icon: Zap, title: 'Fast Integration', desc: '1ms to 10s integration time' },
        { icon: Thermometer, title: 'Thermal Stability', desc: 'Low thermal drift' }
      ],
      specs: ['Range: 200-1100nm', 'Detector: CCD Array', 'Interface: USB 3.0']
    }
  ],
  'lab-furniture': [
    {
      name: 'Fume Hood',
      tagline: 'Operator Safety Priority',
      description: 'High-performance containment systems designed to protect laboratory personnel from hazardous fumes and vapors. Features advanced aerodynamics and digital airflow monitoring to ensure strict safety compliance.',
      image: 'https://images.squarespace-cdn.com/content/v1/5806092420099efa03a2080c/c30531b6-68d4-47f2-8bb5-fe7dadff0dbe/stellaair25_D.jpeg',
      partner: '4 more Labor',
      partnerLogo: '/4more.png',
      productUrl: 'https://www.4morelabor.com/en/filter-fume-cupboard',
      features: [
        { icon: Shield, title: 'Airflow Monitor', desc: 'Digital face velocity display' },
        { icon: Settings, title: 'Sash Management', desc: 'Auto-closing safety sash' },
        { icon: Zap, title: 'Energy Efficient', desc: 'Low volume constant flow' }
      ],
      specs: ['Width: 4ft / 6ft / 8ft', 'Liner: Phenolic Resin', 'Compliance: ASHRAE 110']
    },
    {
      name: 'Lab Furniture',
      tagline: 'Ergonomic Workspace Solutions',
      description: 'A modular furniture system featuring heavy-duty steel frames and chemical-resistant surfaces. Designed for flexibility, allowing laboratories to reconfigure layouts as research needs evolve.',
      image: 'https://www.lumbersteel.com.my/images/blog/Lumbersteel.jpg#joomlaImage://local-images/blog/Lumbersteel.jpg?width=900&height=560',
      partner: '4 more Labor',
      partnerLogo: '/4more.png',
      productUrl: 'https://www.4morelabor.com/en/home',
      features: [
        { icon: Gauge, title: 'Load Bearing', desc: 'Heavy duty steel frames' },
        { icon: Shield, title: 'Chemical Resistant', desc: 'Epoxy powder coating' },
        { icon: Settings, title: 'Modular', desc: 'Reconfigurable layout' }
      ],
      specs: ['Material: SEFA 8 Steel', 'Countertop: Granite/Epoxy', 'Custom Colors']
    }
  ],
  'electrolyzers': [
    {
      name: 'Water Electrolyzers',
      tagline: 'Green Hydrogen Production',
      description: 'Advanced electrolysis systems utilizing PEM and Alkaline technologies to facilitate efficient, on-site green hydrogen generation for both industrial and research applications.',
      image: 'https://leancatwe.com/wp-content/uploads/2024/05/hex_2.png',
      partner: 'Leancat Electrolyzers',
      partnerLogo: '/LeancatElectro.png',
      productUrl: 'https://leancatwe.com/water-electrolyzers/',
      features: [
        { icon: Zap, title: 'High Efficiency', desc: 'Optimized stack design' },
        { icon: Shield, title: 'Safety Systems', desc: 'Integrated leak detection' },
        { icon: Cpu, title: 'Remote Monitoring', desc: 'IoT enabled control' }
      ],
      specs: ['Output: 1-100 Nm3/hr', 'Purity: 99.999%', 'Pressure: 30 bar']
    },
    {
      name: 'Hydrogen Generators',
      tagline: 'Industrial Scale Solutions',
      description: 'Scalable hydrogen production units designed for high-capacity industrial needs and renewable energy storage. Capable of continuous operation with advanced thermal management systems.',
      image: 'https://leancatwe.com/wp-content/uploads/2025/03/rack_new-1024x1024.png',
      partner: 'Leancat Electrolyzers',
      partnerLogo: '/LeancatElectro.png',
      productUrl: 'https://leancatwe.com/hydrogen-generators/',
      features: [
        { icon: Gauge, title: 'Scalable', desc: 'MW scale capability' },
        { icon: Thermometer, title: 'Thermal Mgmt', desc: 'Advanced cooling loops' },
        { icon: Shield, title: 'Robustness', desc: 'Designed for 24/7 operation' }
      ],
      specs: ['Capacity: 1-5 MW', 'Technology: PEM', 'Lifetime: >80,000 hrs']
    },
    {
      name: 'Multi Cell Testing Hardware',
      tagline: 'R&D Stack Testing',
      description: 'Specialized testing hardware that allows researchers to evaluate multiple electrolysis cells simultaneously. Supports a wide range of operating conditions including high pressure and variable temperatures.',
      image: 'https://leancatwe.com/wp-content/uploads/2024/07/les_slozeny_new-e1722330282797.png',
      partner: 'Leancat Electrolyzers',
      partnerLogo: '/LeancatElectro.png',
      productUrl: 'https://leancatwe.com/laboratory-electrolyzer-stack/',
      features: [
        { icon: Settings, title: 'Versatile', desc: 'Compatible with PEM/AEM' },
        { icon: Gauge, title: 'High Pressure', desc: 'Tests up to 50 bar' },
        { icon: Cpu, title: 'Data Acquisition', desc: 'High frequency logging' }
      ],
      specs: ['Active Area: 5-50 cm2', 'Current: Up to 1000A', 'Temp: Up to 120°C']
    }
  ],
  'electrolyzer-test-stations': [
    {
      name: 'Fuel Cell Stations',
      tagline: 'Comprehensive Stack Analysis',
      // Base description (will be overridden by variants if selected)
      description: 'Fully automated test stations for the characterization of PEM and SOFC fuel cells. Includes regenerative electronic loads and precise humidity control for accurate performance curves.',
      image: 'https://lean-cat.com/wp-content/uploads/2022/03/P1180271_transparent1-2-1229x1536.png',
      partner: 'LEANCAT',
      partnerLogo: '/LEANCAT.png',
      productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-500/',
      // ADDED VARIANTS HERE
      variants: [
        {
          id: 'pts-1',
          name: 'PTS-1',
          description: 'The PTS-1 is a precision test station designed for low-power fuel cell research, ideal for single cell testing up to 1kW. It features high-resolution load banks and precise gas mixing capabilities for fundamental characterization.',
          image: 'https://www.msesupplies.com/cdn/shop/files/Pic7_1024x1024.png?v=1722893070',
          productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-1/' // Assumed URL structure, update if specific
        },
        {
          id: 'pts-10',
          name: 'PTS-10',
          description: 'Designed for short-stack evaluation, the PTS-10 handles power ranges up to 10kW. This station integrates advanced thermal management and back-pressure control, making it suitable for automotive and stationary stack development.',
          image: 'https://lean-cat.com/wp-content/uploads/2024/06/7.png',
          productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-10/' 
        },
        {
          id: 'pts-100',
          name: 'PTS-100',
          description: 'A high-power test station built for full-size automotive stacks up to 100kW. The PTS-100 offers regenerative load capabilities to feed energy back to the grid, ensuring energy-efficient testing operations.',
          image: 'https://lean-cat.com/wp-content/uploads/2022/03/P1180271_transparent1-2-1229x1536.png',
          productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-100/' 
        },
        {
          id: 'pts-500',
          name: 'PTS-500',
          description: 'An industrial-grade testing solution for heavy-duty applications up to 500kW. The PTS-500 is engineered for endurance testing of large-scale fuel cell systems used in maritime, rail, and heavy trucking sectors.',
          image: 'https://lean-cat.com/wp-content/uploads/2024/06/9.png',
          productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-500/' 
        }
      ],
      features: [
        { icon: Zap, title: 'Load Banking', desc: 'Regenerative electronic loads' },
        { icon: Thermometer, title: 'Humidity Control', desc: 'Precise dew point control' },
        { icon: Cpu, title: 'Automation', desc: 'Script-based test protocols' }
      ],
      specs: ['Power: 100W - 100kW', 'Flow: Mass flow controllers', 'EIS Capable']
    },
    {
      name: 'Water Electrolyzer Test Station',
      tagline: 'Electrolysis Performance Testing',
      description: 'Dedicated stations designed to assess the efficiency and durability of water electrolysis stacks. Features automated back-pressure control and in-line safety gas analysis.',
      image: 'https://lean-cat.com/wp-content/uploads/2024/06/3.png',
      partner: 'LEANCAT',
      partnerLogo: '/LEANCAT.png',
      productUrl: 'https://lean-cat.com/water-electrolyzer-test-station-ets-1/',
      features: [
        { icon: Gauge, title: 'Pressure Control', desc: 'Automated back pressure' },
        { icon: Shield, title: 'Gas Analysis', desc: 'In-line H2 in O2 detection' },
        { icon: Settings, title: 'Fluid Conditioning', desc: 'DI water recirculation' }
      ],
      specs: ['Voltage: 0-100V', 'Current: 0-2000A', 'Safety: SIL-2 Rated']
    }
  ],
  'battery-fuel-cell-test-systems': [
    {
      name: 'High Power Multichannel EIS',
      tagline: 'Impedance Spectroscopy',
      description: 'A high-throughput system capable of performing Electrochemical Impedance Spectroscopy (EIS) on multiple channels simultaneously. Essential for grading batteries and analyzing stack homogeneity.',
      image: 'https://www.kolibrik.net/storage/app/media/news/evm128-forntrear.jpg',
      partner: 'Kolibrik',
      partnerLogo: '/Kolibrik2.avif', 
      productUrl: 'https://www.kolibrik.net/en/solutions/megaeis-system-for-batteries',
      features: [
        { icon: Zap, title: 'Multi-channel', desc: 'Up to 32 parallel channels' },
        { icon: Cpu, title: 'High Frequency', desc: 'Up to 1 MHz range' },
        { icon: Gauge, title: 'Accuracy', desc: 'High precision ADC' }
      ],
      specs: ['Channels: 8/16/32', 'Frequency: 10µHz - 1MHz', 'Current: 5A/channel']
    },
    {
      name: 'Cell Voltage Monitoring',
      tagline: 'Stack Health Monitoring',
      description: 'A compact and modular CVM solution designed to monitor the individual cell voltages of fuel cell and battery stacks. Critical for preventing cell reversal and ensuring long-term stack health.',
      image: 'https://www.kolibrik.net/storage/app/media/product-images/cell-voltage-monitoring/CVM-S320H.jpg',
      partner: 'Kolibrik',
      partnerLogo: '/Kolibrik2.avif', 
      productUrl: 'https://www.kolibrik.net/en/products/cell-voltage-monitoring/cvm-64h',
      features: [
        { icon: Zap, title: 'High Voltage', desc: 'Isolation up to 1000V' },
        { icon: Cpu, title: 'Fast Sampling', desc: '1kHz per channel' },
        { icon: Settings, title: 'Compact', desc: 'Direct stack mounting' }
      ],
      specs: ['Channels: Up to 500', 'Range: ±5V per cell', 'Comms: CAN Bus']
    }
  ],
};

// --- Sub-Component for Rendering a Single Product ---
const ProductSection = ({ product, index }: { product: Product; index: number }) => {
  const ref = useRef(null);
  const featuresRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: false, margin: "-100px" });
  
  // State for selected variant (index)
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);

  // Alternate alignment based on index (even = image right, odd = image left)
  const isEven = index % 2 === 0;

  // Determine which data to display based on whether variants exist
  const hasVariants = product.variants && product.variants.length > 0;
  
  // If variants exist, use the active one, otherwise use the base product data
  const currentData = hasVariants ? product.variants![activeVariantIdx] : product;
  const displayImage = currentData.image || product.image;
  const displayDescription = currentData.description || product.description;
  const displayUrl = currentData.productUrl || product.productUrl;

  return (
    <div className="pb-20 border-b border-gray-100 last:border-0">
      {/* Product Hero */}
      <section ref={ref} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Text Content */}
            <motion.div
              className={`${isEven ? 'order-1' : 'order-1 lg:order-2'}`}
              initial={{ opacity: 0, x: isEven ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002a4b] mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-[#9391c7] font-medium mb-6">{product.tagline}</p>
              
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                {displayDescription}
              </p>

              {/* Partner Field below description */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl border-l-4 border-[#d09b2c]">
                <p className="text-xs font-bold text-[#d09b2c] uppercase tracking-wide mb-2">Product Partner</p>
                {/* Logic: Show Logo if available, else Show Text */}
                {product.partnerLogo ? (
                    <div className="flex items-center gap-2">
                         <img 
                            src={product.partnerLogo} 
                            alt={product.partner} 
                            className="h-16 object-contain" // INCREASED SIZE TO h-16
                        />
                        {/* Specific override: Show text for 4 more Labor AFTER logo */}
                        {product.partner === '4 more Labor' && (
                             <span className="text-xl font-bold text-[#002a4b]">4 more Labor</span>
                        )}
                    </div>
                ) : (
                    <p className="text-lg font-bold text-[#002a4b]">{product.partner}</p>
                )}

                {/* VARIANT BUTTONS SECTION */}
                {hasVariants && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-[#002a4b] mb-2">Select Model:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants!.map((variant, vIdx) => (
                        <button
                          key={variant.id}
                          onClick={() => setActiveVariantIdx(vIdx)}
                          className={`px-3 py-1 text-sm rounded-full transition-all border ${
                            activeVariantIdx === vIdx
                              ? 'bg-[#002a4b] text-white border-[#002a4b]'
                              : 'bg-transparent text-gray-600 border-gray-300 hover:border-[#002a4b] hover:text-[#002a4b]'
                          }`}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Specs List */}
              {product.specs && product.specs.length > 0 && (
                <div className="bg-[#002a4b]/5 rounded-2xl p-6 mb-8">
                  <h3 className="font-semibold text-[#002a4b] mb-4">Key Specifications</h3>
                  <ul className="space-y-2">
                    {product.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-[#d09b2c] flex-shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <Link 
                  to={createPageUrl('ContactUs')}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <Button className="bg-[#002a4b] hover:bg-[#002a4b]/90 text-white px-8 py-6 text-lg rounded-xl">
                    Request Quote
                  </Button>
                </Link>

                {/* <Button variant="outline" className="border-[#002a4b] text-[#002a4b] hover:bg-[#002a4b] hover:text-white px-8 py-6 text-lg rounded-xl">
                  Download Brochure
                </Button> */}

                {/* NEW BUTTON: Know More */}
                <a 
                  href={displayUrl || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button variant="outline" className="border-[#002a4b] text-[#002a4b] hover:bg-[#002a4b] hover:text-white px-8 py-6 text-lg rounded-xl flex items-center gap-2">
                    Know More
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Product Image */}
            <motion.div
              className={`relative ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}
              initial={{ opacity: 0, x: isEven ? 40 : -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-[#d09b2c]/20 to-[#9391c7]/20 transform ${isEven ? 'rotate-6' : '-rotate-6'}`} />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={displayImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {product.features && product.features.length > 0 && (
        <section ref={featuresRef} className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="group p-6 rounded-2xl bg-gray-50 hover:bg-[#002a4b] transition-all duration-300 hover:shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * idx }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-[#d09b2c]/10 group-hover:bg-[#d09b2c] flex items-center justify-center mb-5 transition-colors"
                  >
                    <feature.icon className="w-7 h-7 text-[#d09b2c] group-hover:text-white transition-colors" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-[#002a4b] group-hover:text-white mb-2 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/80 transition-colors">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// --- Main Component ---
export default function ProductDetail() {
  const [categorySlug, setCategorySlug] = useState('lab-water-purification-system');
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramSlug = urlParams.get('product'); // This is now the CATEGORY slug
    
    // Safety check: if slug exists and has data, use it; otherwise default
    const slug = (paramSlug && categoriesData[paramSlug]) ? paramSlug : 'lab-water-purification-system';
    
    setCategorySlug(slug);
    setProducts(categoriesData[slug]);
    window.scrollTo(0, 0);
  }, [location.search]);

  // Get other category keys for "Other Products" section
  const otherCategories = Object.keys(categoriesData)
    .filter(key => key !== categorySlug)
    .slice(0, 3);

  // Helper to get formatted name from slug
  const getCategoryName = (slug: string) => {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <main className="pt-20 bg-white">
      {/* Category Header */}
      <div className="bg-[#002a4b] py-12 text-center text-white">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[#d09b2c] uppercase tracking-wide text-sm font-semibold">Category</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">{getCategoryName(categorySlug)}</h1>
        </div>
      </div>

      {/* Render Product Sections */}
      {products.map((product, index) => (
        <ProductSection key={index} product={product} index={index} />
      ))}

      {/* Other Categories Link */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002a4b]">Explore Other Categories</h2>
            <Link to={createPageUrl('Home')}>
              <Button variant="ghost" className="text-[#d09b2c] group">
                View All
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherCategories.map((slug, idx) => (
              <Link key={slug} to={createPageUrl('ProductDetail') + `?product=${slug}`}>
                <motion.div
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      // Use the image of the first product in that category as thumbnail
                      src={categoriesData[slug][0].image}
                      alt={slug}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#002a4b] group-hover:text-[#d09b2c] transition-colors">
                      {getCategoryName(slug)}
                    </h3>
                    <p className="text-[#9391c7] text-sm mt-1">{categoriesData[slug].length} Products</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}