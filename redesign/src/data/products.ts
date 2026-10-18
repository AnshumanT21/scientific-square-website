import {
  Thermometer,
  Gauge,
  Settings,
  Shield,
  Zap,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  description: string;
  image: string;
  productUrl: string;
}

export interface Product {
  name: string;
  tagline: string;
  description: string;
  image: string;
  partner: string;
  partnerLogo?: string;
  productUrl?: string;
  features: ProductFeature[];
  specs: string[];
  variants?: ProductVariant[];
}

export interface Category {
  slug: string;
  name: string;
  discipline: DisciplineId;
  products: Product[];
}

export type DisciplineId = 'water' | 'analytical' | 'energy' | 'infrastructure';

export interface Discipline {
  id: DisciplineId;
  name: string;
  blurb: string;
}

export const disciplines: Discipline[] = [
  {
    id: 'water',
    name: 'Water & Purity',
    blurb: 'Ultrapure lab water, TOC compliance and continuous water quality monitoring.',
  },
  {
    id: 'analytical',
    name: 'Analytical Instruments',
    blurb: 'Lab-grade chromatography and Raman spectroscopy — in the lab, on the line, in the field.',
  },
  {
    id: 'energy',
    name: 'Hydrogen & Energy',
    blurb: 'Electrolyzers, stack test stations and electrochemical diagnostics for the hydrogen economy.',
  },
  {
    id: 'infrastructure',
    name: 'Lab Infrastructure',
    blurb: 'Containment and modular furniture engineered for safe, adaptable laboratories.',
  },
];

export const categories: Category[] = [
  {
    slug: 'hand-held-portable-gc',
    name: 'Hand Held / Portable GC',
    discipline: 'analytical',
    products: [
      {
        name: 'EN-SCAN Labrador Handheld GC',
        tagline: 'Lab-Grade Gas Chromatography in the Field',
        description:
          'A rugged, portable gas chromatograph that brings laboratory-grade analysis directly to the field. It enables environmental professionals to detect VOCs and contaminants in air, soil, and water within minutes, with parts-per-billion sensitivity and results in as little as 4.5 to 15 minutes, eliminating the wait for off-site lab results.',
        image: '/ENScanPortable.png',
        partner: 'EN-SCAN',
        partnerLogo: '/EnScan.png',
        productUrl: 'https://www.en-scan.com/products/labrador-hhgc',
        features: [
          { icon: Zap, title: 'Real-Time Data', desc: 'On-site results in minutes' },
          { icon: Settings, title: 'Rugged & Portable', desc: 'Built for field deployment' },
          { icon: Shield, title: 'Multi-Media Analysis', desc: 'Analyzes VOCs in air, water & soil' },
        ],
        specs: [
          'Detector: Photoionization (10.6 eV)',
          'Sensitivity: ppb / ppbv',
          'Analysis Time: ~10 min',
          'Weight: 6.80 kg (15 lb)',
        ],
      },
    ],
  },
  {
    slug: 'lab-water-purification-system',
    name: 'Lab Water Purification System',
    discipline: 'water',
    products: [
      {
        name: 'BerryPURE mini',
        tagline: 'Compact Lab Water Solution',
        description:
          'Engineered for laboratories with limited bench space, the BerryPURE mini delivers consistent Type I and Type II water quality. It is an optimal choice for general chemistry, buffer preparation, and glassware rinsing applications.',
        image:
          'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/9deb3416-b768-405a-8b5f-ede41c3c0261/Ultra+Pure+Water+Type+1+Berrypure+Mini+Series.jpg',
        partner: 'Berrytec',
        partnerLogo: '/Berrytec.png',
        productUrl: 'https://www.berrytec.net/en/purewater',
        features: [
          { icon: Settings, title: 'Space Saving', desc: 'Ultra-compact design for tight spaces' },
          { icon: Zap, title: 'Efficient', desc: 'Low energy consumption' },
          { icon: Shield, title: 'Reliable', desc: 'Consistent water quality' },
        ],
        specs: ['Output: 5L/hr', 'Conductivity: < 0.1 µS/cm', 'Dimensions: Compact Footprint'],
      },
      {
        name: 'BerryPURE RO + EDI',
        tagline: 'Advanced Purification Technology',
        description:
          'This system combines Reverse Osmosis with Electro-Deionization (EDI) to produce superior grade water without the need for chemical regeneration. It is designed to minimize wastewater while maintaining high resistivity levels.',
        image:
          'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/1567580253099-9UFFK0Q9PLD37NJHE812/RO.png',
        partner: 'Berrytec',
        partnerLogo: '/Berrytec.png',
        productUrl: 'https://www.berrytec.net/en/ro-class-edi',
        features: [
          { icon: Gauge, title: 'High Purity', desc: 'Consistent Type II water' },
          { icon: Zap, title: 'Eco-Friendly', desc: 'Low wastewater recovery' },
          { icon: Cpu, title: 'Automated', desc: 'Fully automatic operation' },
        ],
        specs: ['Tech: RO + EDI', 'Resistivity: > 5 MΩ-cm', 'TOC: < 30 ppb'],
      },
      {
        name: 'BerryPURE ULTRA',
        tagline: 'Ultrapure Water System',
        description:
          'The BerryPURE ULTRA is built for the most critical laboratory applications, including HPLC, GC-MS, and molecular biology. It utilizes dual-wavelength UV oxidation to ensure virtually zero organic contaminants.',
        image:
          'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/1551781291255-T5DAZF4WPLHSBDXWNTN1/sgkUltra',
        partner: 'Berrytec',
        partnerLogo: '/Berrytec.png',
        productUrl: 'https://www.berrytec.net/en/sgkultra',
        features: [
          { icon: Shield, title: 'Critical Grade', desc: 'For analytical applications' },
          { icon: Thermometer, title: 'UV Oxidation', desc: 'Dual wavelength UV lamp' },
          { icon: Gauge, title: 'Monitoring', desc: 'Real-time TOC monitoring' },
        ],
        specs: ['Type: Ultrapure Type I', 'Resistivity: 18.2 MΩ-cm', 'TOC: < 5 ppb'],
      },
      {
        name: 'BerryPURE Tower',
        tagline: 'High Volume Production',
        description:
          'A robust floor-standing unit designed to meet the demands of facilities with high daily water consumption. It can serve as a central supply unit feeding multiple laboratory points or washing machines.',
        image:
          'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/1567579009015-UPUAHFDXNDPPUTYO3CLV/Berrypure%C2%AE+Tower',
        partner: 'Berrytec',
        partnerLogo: '/Berrytec.png',
        productUrl: 'https://www.berrytec.net/en/sutower',
        features: [
          { icon: Zap, title: 'High Capacity', desc: 'High flow rates available' },
          { icon: Settings, title: 'Robust', desc: 'Heavy-duty construction' },
          { icon: Cpu, title: 'Centralized', desc: 'Can feed multiple points' },
        ],
        specs: ['Output: Up to 100L/hr', 'Tank: Integrated or External', 'Mounting: Floor'],
      },
      {
        name: 'BerryPURE COMPACT',
        tagline: 'All-in-One Benchtop Unit',
        description:
          'A versatile all-in-one system that connects directly to a tap water source to produce both Type I and Type II water. Features an intuitive digital interface for easy volumetric dispensing.',
        image:
          'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/882f270b-9dfc-4e43-ba1b-8baa65bb93b8/compact.png',
        partner: 'Berrytec',
        partnerLogo: '/Berrytec.png',
        productUrl: 'https://www.berrytec.net/en/compact',
        features: [
          { icon: Settings, title: 'Dual Output', desc: 'Type I and Type II water' },
          { icon: Gauge, title: 'User Friendly', desc: 'Intuitive digital display' },
          { icon: Shield, title: 'Easy Maintenance', desc: 'Quick cartridge change' },
        ],
        specs: ['Feed: Potable Tap Water', 'Resistivity: 18.2 MΩ-cm', 'Dispensing: Manual/Volumetric'],
      },
    ],
  },
  {
    slug: 'online-toc-analyzer',
    name: 'Online TOC Analyzer',
    discipline: 'water',
    products: [
      {
        name: 'Online TOC Analyzer BerryPURE TOC',
        tagline: 'Continuous Water Quality Monitoring',
        description:
          'A precision instrument designed for the continuous monitoring of Total Organic Carbon in purified water systems. It ensures strict compliance with pharmaceutical standards such as USP <643> and EP 2.2.44 through reagent-free UV oxidation technology.',
        image:
          'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/d66d51a1-4f8d-4773-8a5c-182d03550dec/TOC.png',
        partner: 'Berrytec',
        partnerLogo: '/Berrytec.png',
        productUrl: 'https://www.berrytec.net/en/berrypure-toc',
        features: [
          { icon: Gauge, title: 'Real-time Analysis', desc: 'Instant TOC readings' },
          { icon: Shield, title: 'Compliance Ready', desc: 'USP <643> and EP 2.2.44 compliant' },
          { icon: Zap, title: 'Low Maintenance', desc: 'Reagent-free oxidation technology' },
        ],
        specs: ['Range: 0.5 to 1000 ppb', 'Response Time: < 1 min', 'Touchscreen Interface'],
      },
    ],
  },
  {
    slug: 'water-quality-analyzer',
    name: 'Water Quality Analyzer',
    discipline: 'water',
    products: [
      {
        name: 'Aqua2000-Series Multiparameter Analyzer',
        tagline: 'The Ultimate All-in-One Water Quality Solution',
        description:
          'The Aqua2000-5x series offers a comprehensive suite of water quality monitoring solutions. From simultaneous multiparameter analysis to dedicated single-parameter tracking, these instruments are designed for precision, durability, and reagent-free operation.',
        image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_5x.png',
        partner: 'BLUESEN',
        partnerLogo: '/Bluesen.png',
        productUrl: 'https://www.bluesen.com/en/product/product1_aqua2000_5x.asp',
        features: [
          { icon: Gauge, title: 'Real-time Analysis', desc: 'Continuous monitoring' },
          { icon: Shield, title: 'Reagent Free', desc: 'Low maintenance operation' },
          { icon: Zap, title: 'Smart Calibration', desc: 'Auto-diagnosis & cleaning' },
        ],
        specs: ['Power: AC100-240V', 'Protection: IP65/IP66', 'Output: 4-20mA / RS485'],
        variants: [
          {
            id: 'aqua-5x',
            name: 'Aqua2000-5x',
            description:
              'The flagship multiparameter analyzer capable of measuring 5 key parameters simultaneously: Turbidity, Residual Chlorine, pH, Electrical Conductivity, and Water Temperature. Ideal for municipal water plants and industrial effluent monitoring.',
            image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_5x.png',
            productUrl: 'https://www.bluesen.com/en/product/product1_aqua2000_5x.asp',
          },
          {
            id: 'aqua-6p',
            name: 'Aqua2000-6P',
            description:
              'An advanced upgrade to the 5x model, the 6P adds Color measurement to the standard 5 parameters. This 6-in-1 analyzer provides the most complete picture of water quality in a single compact unit.',
            image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_6p.png',
            productUrl: 'https://bluesen.com/en/product/product1_aqua2000_6p.asp',
          },
          {
            id: 'aqua-6p-p1',
            name: 'Aqua2000-6P(P1)',
            description:
              'The ruggedized outdoor version of the 6P. Designed with a specialized double-insulated enclosure (IP66) to withstand harsh external environments while delivering the same 6-parameter precision.',
            image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_6p_p1.png',
            productUrl: 'https://www.bluesen.com/en/product/product1_aqua2000_6p_p1.asp',
          },
          {
            id: 'aqua-tu90',
            name: 'Aqua2000-TU90',
            description:
              'A high-precision dedicated Turbidimeter utilizing 90° scattered light method. It features a patented micro-bubble removal system to ensure accurate readings even at ultra-low turbidity levels (<0.1 NTU).',
            image: 'https://www.bluesen.com/en/images/sub/product/img_tu90.png',
            productUrl: 'https://bluesen.com/en/product/product1_aqua2000_tu90.asp',
          },
          {
            id: 'aqua-fcl',
            name: 'Aqua2000-FCL',
            description:
              'Dedicated Free Chlorine analyzer using a reagent-free Polarographic Amperometric sensor. It eliminates the need for DPD reagents, significantly reducing operating costs and maintenance time.',
            image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_fcl.png',
            productUrl: 'https://bluesen.com/en/product/product1_aqua2000_fcl.asp',
          },
          {
            id: 'aqua-tcl',
            name: 'Aqua2000-TCL',
            description:
              'Total Chlorine analyzer designed for wastewater and reuse applications. Like the FCL, it operates without reagents and features a durable membrane cap system for long-term stability.',
            image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_tcl.png',
            productUrl: 'https://bluesen.com/en/product/product1_aqua2000_tcl.asp',
          },
          {
            id: 'aqua-ph',
            name: 'Aqua2000-pH',
            description:
              'Online pH monitor with integrated temperature compensation. Uses a robust composite glass electrode designed to resist fouling in difficult water matrices.',
            image: 'https://bluesen.com/board_upload/tb_product/2025_07_01_grtoObGzyL.png',
            productUrl: 'https://bluesen.com/en/product/product1_aqua2000_ph.asp',
          },
          {
            id: 'aqua-ec',
            name: 'Aqua2000-EC',
            description:
              'Electrical Conductivity analyzer utilizing a Titanium AC 2-pole electrode. It offers wide-range measurement capability with high chemical resistance and durability.',
            image: 'https://bluesen.com/board_upload/tb_product/2025_07_01_grtoObGzyL.png',
            productUrl: 'https://bluesen.com/en/product/product1_aqua2000_ec.asp',
          },
        ],
      },
      {
        name: 'Movable Turbidimeter',
        tagline: 'Portable Field Analysis',
        description:
          'A battery-powered, fully portable turbidimeter designed for immediate field deployment. It requires no installation and is perfect for spot-checking water quality in remote locations or during emergency pipe repairs.',
        image: 'https://bluesen.com/board_upload/tb_product/2025_05_28_mkDcOXSnaU.png',
        partner: 'BLUESEN',
        partnerLogo: '/Bluesen.png',
        productUrl: 'https://www.bluesen.com/en/product/product1_mobile_turbidimeter.asp',
        features: [
          { icon: Settings, title: 'Portable', desc: 'Battery operated & lightweight' },
          { icon: Shield, title: 'No Install', desc: 'Immediate "Drop & Measure" use' },
          { icon: Zap, title: 'Wireless', desc: 'Remote data transmission' },
        ],
        specs: ['Power: Internal Battery', 'Use Case: Field / Emergency', 'Comms: Wireless / LTE'],
      },
    ],
  },
  {
    slug: 'battery-fuel-cell-test-systems',
    name: 'Battery and Fuel Cell Test Systems',
    discipline: 'energy',
    products: [
      {
        name: 'High Power Multichannel EIS',
        tagline: 'Impedance Spectroscopy',
        description:
          'A high-throughput system capable of performing Electrochemical Impedance Spectroscopy (EIS) on multiple channels simultaneously. Essential for grading batteries and analyzing stack homogeneity.',
        image: 'https://www.kolibrik.net/storage/app/media/news/evm128-forntrear.jpg',
        partner: 'Kolibrik',
        partnerLogo: '/Kolibrik2.avif',
        productUrl: 'https://www.kolibrik.net/en/solutions/megaeis-system-for-batteries',
        features: [
          { icon: Zap, title: 'Multi-channel', desc: 'Up to 32 parallel channels' },
          { icon: Cpu, title: 'High Frequency', desc: 'Up to 1 MHz range' },
          { icon: Gauge, title: 'Accuracy', desc: 'High precision ADC' },
        ],
        specs: ['Channels: 8/16/32', 'Frequency: 10µHz - 1MHz', 'Current: 5A/channel'],
      },
      {
        name: 'Cell Voltage Monitoring',
        tagline: 'Stack Health Monitoring',
        description:
          'A compact and modular CVM solution designed to monitor the individual cell voltages of fuel cell and battery stacks. Critical for preventing cell reversal and ensuring long-term stack health.',
        image:
          'https://www.kolibrik.net/storage/app/media/product-images/cell-voltage-monitoring/CVM-S320H.jpg',
        partner: 'Kolibrik',
        partnerLogo: '/Kolibrik2.avif',
        productUrl: 'https://www.kolibrik.net/en/products/cell-voltage-monitoring/cvm-64h',
        features: [
          { icon: Zap, title: 'High Voltage', desc: 'Isolation up to 1000V' },
          { icon: Cpu, title: 'Fast Sampling', desc: '1kHz per channel' },
          { icon: Settings, title: 'Compact', desc: 'Direct stack mounting' },
        ],
        specs: ['Channels: Up to 500', 'Range: ±5V per cell', 'Comms: CAN Bus'],
      },
    ],
  },
  {
    slug: 'electrolyzers',
    name: 'Electrolyzers',
    discipline: 'energy',
    products: [
      {
        name: 'Water Electrolyzers',
        tagline: 'Green Hydrogen Production',
        description:
          'Advanced electrolysis systems utilizing PEM and Alkaline technologies to facilitate efficient, on-site green hydrogen generation for both industrial and research applications.',
        image:
          'https://cdn.prod.website-files.com/69ce2f0c96aef643c5c7b561/69cfb2d42ec12d90d8f361d8_45-hex.avif',
        partner: 'Leancat Electrolyzers',
        partnerLogo: '/LeancatElectro.png',
        productUrl: 'https://www.leancatwe.com/products/water-electrolyzers',
        features: [
          { icon: Zap, title: 'High Efficiency', desc: 'Optimized stack design' },
          { icon: Shield, title: 'Safety Systems', desc: 'Integrated leak detection' },
          { icon: Cpu, title: 'Remote Monitoring', desc: 'IoT enabled control' },
        ],
        specs: ['Output: 1-100 Nm3/hr', 'Purity: 99.999%', 'Pressure: 30 bar'],
      },
      {
        name: 'Hydrogen Generators',
        tagline: 'Industrial Scale Solutions',
        description:
          'Scalable hydrogen production units designed for high-capacity industrial needs and renewable energy storage. Capable of continuous operation with advanced thermal management systems.',
        image:
          'https://cdn.prod.website-files.com/690b0d979a1c16d1f2c07e02/69224572cbf416178c72aed6_rack_new_transparent.png',
        partner: 'Leancat Electrolyzers',
        partnerLogo: '/LeancatElectro.png',
        productUrl: 'https://www.leancatwe.com/products/hydrogen-generators',
        features: [
          { icon: Gauge, title: 'Scalable', desc: 'MW scale capability' },
          { icon: Thermometer, title: 'Thermal Mgmt', desc: 'Advanced cooling loops' },
          { icon: Shield, title: 'Robustness', desc: 'Designed for 24/7 operation' },
        ],
        specs: ['Capacity: 1-5 MW', 'Technology: PEM', 'Lifetime: >80,000 hrs'],
      },
      {
        name: 'Multi Cell Testing Hardware',
        tagline: 'R&D Stack Testing',
        description:
          'Specialized testing hardware that allows researchers to evaluate multiple electrolysis cells simultaneously. Supports a wide range of operating conditions including high pressure and variable temperatures.',
        image: 'https://cdn.prod.website-files.com/69ce2f0c96aef643c5c7b561/69cfb4bbac16522ff2834339_AC.png',
        partner: 'Leancat Electrolyzers',
        partnerLogo: '/LeancatElectro.png',
        productUrl: 'https://www.leancatwe.com/products/testing-hardware',
        features: [
          { icon: Settings, title: 'Versatile', desc: 'Compatible with PEM/AEM' },
          { icon: Gauge, title: 'High Pressure', desc: 'Tests up to 50 bar' },
          { icon: Cpu, title: 'Data Acquisition', desc: 'High frequency logging' },
        ],
        specs: ['Active Area: 5-50 cm2', 'Current: Up to 1000A', 'Temp: Up to 120°C'],
      },
    ],
  },
  {
    slug: 'electrolyzer-test-stations',
    name: 'Electrolyzer Test Stations',
    discipline: 'energy',
    products: [
      {
        name: 'Fuel Cell Stations',
        tagline: 'Comprehensive Stack Analysis',
        description:
          'Fully automated test stations for the characterization of PEM and SOFC fuel cells. Includes regenerative electronic loads and precise humidity control for accurate performance curves.',
        image: 'https://lean-cat.com/wp-content/uploads/2022/03/P1180271_transparent1-2-1229x1536.png',
        partner: 'LEANCAT',
        partnerLogo: '/LEANCAT.png',
        productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-500/',
        variants: [
          {
            id: 'pts-1',
            name: 'PTS-1',
            description:
              'The PTS-1 is a precision test station designed for low-power fuel cell research, ideal for single cell testing up to 1kW. It features high-resolution load banks and precise gas mixing capabilities for fundamental characterization.',
            image: 'https://www.msesupplies.com/cdn/shop/files/Pic7_1024x1024.png?v=1722893070',
            productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-1/',
          },
          {
            id: 'pts-10',
            name: 'PTS-10',
            description:
              'Designed for short-stack evaluation, the PTS-10 handles power ranges up to 10kW. This station integrates advanced thermal management and back-pressure control, making it suitable for automotive and stationary stack development.',
            image: 'https://lean-cat.com/wp-content/uploads/2024/06/7.png',
            productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-10/',
          },
          {
            id: 'pts-100',
            name: 'PTS-100',
            description:
              'A high-power test station built for full-size automotive stacks up to 100kW. The PTS-100 offers regenerative load capabilities to feed energy back to the grid, ensuring energy-efficient testing operations.',
            image: 'https://lean-cat.com/wp-content/uploads/2022/03/P1180271_transparent1-2-1229x1536.png',
            productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-100/',
          },
          {
            id: 'pts-500',
            name: 'PTS-500',
            description:
              'An industrial-grade testing solution for heavy-duty applications up to 500kW. The PTS-500 is engineered for endurance testing of large-scale fuel cell systems used in maritime, rail, and heavy trucking sectors.',
            image: 'https://lean-cat.com/wp-content/uploads/2024/06/9.png',
            productUrl: 'https://lean-cat.com/fuel-cell-test-station-pts-500/',
          },
        ],
        features: [
          { icon: Zap, title: 'Load Banking', desc: 'Regenerative electronic loads' },
          { icon: Thermometer, title: 'Humidity Control', desc: 'Precise dew point control' },
          { icon: Cpu, title: 'Automation', desc: 'Script-based test protocols' },
        ],
        specs: ['Power: 100W - 100kW', 'Flow: Mass flow controllers', 'EIS Capable'],
      },
      {
        name: 'Water Electrolyzer Test Station',
        tagline: 'Electrolysis Performance Testing',
        description:
          'Dedicated stations designed to assess the efficiency and durability of water electrolysis stacks. Features automated back-pressure control and in-line safety gas analysis.',
        image: 'https://lean-cat.com/wp-content/uploads/2024/06/3.png',
        partner: 'LEANCAT',
        partnerLogo: '/LEANCAT.png',
        productUrl: 'https://lean-cat.com/water-electrolyzer-test-station-ets-1/',
        features: [
          { icon: Gauge, title: 'Pressure Control', desc: 'Automated back pressure' },
          { icon: Shield, title: 'Gas Analysis', desc: 'In-line H2 in O2 detection' },
          { icon: Settings, title: 'Fluid Conditioning', desc: 'DI water recirculation' },
        ],
        specs: ['Voltage: 0-100V', 'Current: 0-2000A', 'Safety: SIL-2 Rated'],
      },
    ],
  },
  {
    slug: 'raman-spectroscopy',
    name: 'Raman Spectroscopy',
    discipline: 'analytical',
    products: [
      {
        name: 'Online Raman Analyzer',
        tagline: 'Process Analytical Technology',
        description:
          'A multi-channel system engineered for in-situ process monitoring. It enables real-time chemical composition analysis in bioprocessing and pharmaceutical production lines without interrupting the workflow.',
        image: 'https://www.jinsptech.com/uploads/RS2000-4RS2100-4.png',
        partner: 'JINSP',
        partnerLogo: '/JINSP.png',
        productUrl: 'https://www.jinsptech.com/multi-channel-online-raman-analyzer-for-liquids/',
        features: [
          { icon: Zap, title: 'Real-time Kinetics', desc: 'Track reactions as they happen' },
          { icon: Shield, title: 'Non-Invasive', desc: 'No sample preparation needed' },
          { icon: Cpu, title: 'Automated Software', desc: 'Chemometric modeling included' },
        ],
        specs: ['Laser: 532nm / 785nm', 'Resolution: 4 cm-1', 'Fiber Optic Probe'],
      },
      {
        name: 'Hand Held Raman Spectrometer',
        tagline: 'Portable Material Identification',
        description:
          'This rugged, lightweight device brings laboratory-grade spectroscopy to the field. It is specifically designed for the rapid identification of raw materials, narcotics, and explosives with immediate pass/fail results.',
        image: 'https://www.jinsptech.com/uploads/products-1.jpg',
        partner: 'JINSP',
        partnerLogo: '/JINSP.png',
        productUrl: 'https://www.jinsptech.com/handheld-raman-spectrometer-2/',
        features: [
          { icon: Gauge, title: 'Point & Shoot', desc: 'Results in seconds' },
          { icon: Shield, title: 'Library Matching', desc: '12,000+ compound database' },
          { icon: Settings, title: 'Wireless Sync', desc: 'Cloud data backup' },
        ],
        specs: ['Weight: < 1kg', 'Battery: 8 hours', 'Certification: IP68'],
      },
      {
        name: 'Miniature Spectrometer',
        tagline: 'Compact Optical Bench',
        description:
          'Offering high optical resolution in a small footprint, this spectrometer is ideal for OEM integration and educational setups. It features a reliable CCD array detector ensuring thermal stability and low stray light.',
        image: 'https://cdn.globalso.com/jinsptech/products2.jpg',
        partner: 'JINSP',
        partnerLogo: '/JINSP.png',
        productUrl: 'https://www.jinsptech.com/sr50c-sr75c-miniature-spectrometer-product/',
        features: [
          { icon: Settings, title: 'Modular Design', desc: 'Interchangeable slits' },
          { icon: Zap, title: 'Fast Integration', desc: '1ms to 10s integration time' },
          { icon: Thermometer, title: 'Thermal Stability', desc: 'Low thermal drift' },
        ],
        specs: ['Range: 200-1100nm', 'Detector: CCD Array', 'Interface: USB 3.0'],
      },
    ],
  },
  {
    slug: 'lab-furniture',
    name: 'Lab Furniture',
    discipline: 'infrastructure',
    products: [
      {
        name: 'Fume Hood',
        tagline: 'Operator Safety Priority',
        description:
          'High-performance containment systems designed to protect laboratory personnel from hazardous fumes and vapors. Features advanced aerodynamics and digital airflow monitoring to ensure strict safety compliance.',
        image:
          'https://images.squarespace-cdn.com/content/v1/5806092420099efa03a2080c/c30531b6-68d4-47f2-8bb5-fe7dadff0dbe/stellaair25_D.jpeg',
        partner: '4 more Labor',
        partnerLogo: '/4more.png',
        productUrl: 'https://www.4morelabor.com/en/filter-fume-cupboard',
        features: [
          { icon: Shield, title: 'Airflow Monitor', desc: 'Digital face velocity display' },
          { icon: Settings, title: 'Sash Management', desc: 'Auto-closing safety sash' },
          { icon: Zap, title: 'Energy Efficient', desc: 'Low volume constant flow' },
        ],
        specs: ['Width: 4ft / 6ft / 8ft', 'Liner: Phenolic Resin', 'Compliance: ASHRAE 110'],
      },
      {
        name: 'Lab Furniture',
        tagline: 'Ergonomic Workspace Solutions',
        description:
          'A modular furniture system featuring heavy-duty steel frames and chemical-resistant surfaces. Designed for flexibility, allowing laboratories to reconfigure layouts as research needs evolve.',
        image:
          'https://www.lumbersteel.com.my/images/blog/Lumbersteel.jpg#joomlaImage://local-images/blog/Lumbersteel.jpg?width=900&height=560',
        partner: '4 more Labor',
        partnerLogo: '/4more.png',
        productUrl: 'https://www.4morelabor.com/en/home',
        features: [
          { icon: Gauge, title: 'Load Bearing', desc: 'Heavy duty steel frames' },
          { icon: Shield, title: 'Chemical Resistant', desc: 'Epoxy powder coating' },
          { icon: Settings, title: 'Modular', desc: 'Reconfigurable layout' },
        ],
        specs: ['Material: SEFA 8 Steel', 'Countertop: Granite/Epoxy', 'Custom Colors'],
      },
    ],
  },
];

export const getCategory = (slug?: string) => categories.find((c) => c.slug === slug);

export const categoriesByDiscipline = (id: DisciplineId) =>
  categories.filter((c) => c.discipline === id);

export const categoryPartners = (c: Category) => [...new Set(c.products.map((p) => p.partner))];

export const totalProductCount = categories.reduce((n, c) => n + c.products.length, 0);

/** Featured equipment shown on the home page (same selection as the original site). */
export const featured = [
  {
    slug: 'lab-water-purification-system',
    name: 'BerryPURE ULTRA',
    description:
      'The BerryPURE ULTRA is built for the most critical laboratory applications, including HPLC, GC-MS, and molecular biology. It utilizes dual-wavelength UV oxidation to ensure virtually zero organic contaminants.',
    image:
      'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/1551781291255-T5DAZF4WPLHSBDXWNTN1/sgkUltra',
    partner: 'Berrytec',
  },
  {
    slug: 'water-quality-analyzer',
    name: 'Water Quality Analyzer',
    description:
      'A versatile multiparameter unit measuring Turbidity, Residual Chlorine, pH, Electrical Conductivity and Water Temperature simultaneously. The ultimate all-in-one solution for water quality monitoring.',
    image: 'https://www.bluesen.com/en/images/sub/product/img_aqua2000_5x.png',
    partner: 'BLUESEN',
  },
  {
    slug: 'raman-spectroscopy',
    name: 'Hand Held Raman Spectrometer',
    description:
      'Bring the lab to the sample. Rugged, lightweight, and fast—perfect for incoming raw material verification and field testing.',
    image: 'https://www.jinsptech.com/uploads/products-1.jpg',
    partner: 'JINSP',
  },
  {
    slug: 'electrolyzer-test-stations',
    name: 'Fuel Cell Test Stations',
    description: 'Complete test stations for characterization of PEM and SOFC fuel cells.',
    image: 'https://lean-cat.com/wp-content/uploads/2022/03/P1180271_transparent1-2-1229x1536.png',
    partner: 'LEANCAT',
  },
  {
    slug: 'electrolyzers',
    name: 'Hydrogen Generators',
    description:
      'Large scale electrolysis stacks designed for industrial hydrogen applications and energy storage.',
    image:
      'https://cdn.prod.website-files.com/690b0d979a1c16d1f2c07e02/69224572cbf416178c72aed6_rack_new_transparent.png',
    partner: 'Leancat Electrolyzers',
  },
  {
    slug: 'online-toc-analyzer',
    name: 'Online TOC Analyzer BerryPURE TOC',
    description:
      'A precision instrument designed for the continuous monitoring of Total Organic Carbon in purified water systems. It ensures strict compliance with pharmaceutical standards such as USP <643> and EP 2.2.44 through reagent-free UV oxidation technology.',
    image:
      'https://images.squarespace-cdn.com/content/v1/5c76c9137fdcb8facd7603f4/d66d51a1-4f8d-4773-8a5c-182d03550dec/TOC.png',
    partner: 'Berrytec',
  },
  {
    slug: 'battery-fuel-cell-test-systems',
    name: 'Cell Voltage Monitoring',
    description:
      'A compact and modular CVM solution designed to monitor the individual cell voltages of fuel cell and battery stacks. Critical for preventing cell reversal and ensuring long-term stack health.',
    image:
      'https://www.kolibrik.net/storage/app/media/product-images/cell-voltage-monitoring/CVM-S320H.jpg',
    partner: 'Kolibrik',
  },
  {
    slug: 'lab-furniture',
    name: 'Fume Hood',
    description:
      'High-performance containment systems designed to protect laboratory personnel from hazardous fumes and vapors. Features advanced aerodynamics and digital airflow monitoring to ensure strict safety compliance.',
    image:
      'https://images.squarespace-cdn.com/content/v1/5806092420099efa03a2080c/c30531b6-68d4-47f2-8bb5-fe7dadff0dbe/stellaair25_D.jpeg',
    partner: '4 more Labor',
  },
];
