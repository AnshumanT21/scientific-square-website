import {
  FlaskConical,
  Zap,
  GraduationCap,
  Atom,
  Factory,
  Droplets,
  TrendingUp,
  Target,
  BadgeCheck,
  Headphones,
  Lightbulb,
  ShieldCheck,
  Rocket,
} from 'lucide-react';

export const company = {
  name: 'ScientificSquare',
  tagline: 'Precision & Innovation',
  motto: ['Precision in Every Measure.', 'Innovation in Every Step.'],
  email: 'info@scientificsquare.in',
  hours: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 2:00 PM'],
  founded: 2024,
};

export const partners: { name: string; logo: string; scale?: number }[] = [
  { name: 'JINSP', logo: '/JINSP.png' },
  { name: 'Berrytec', logo: '/Berrytec.png' },
  { name: '4 more Labor', logo: '/4more.png' },
  { name: 'Leancat Electrolyzers', logo: '/LeancatElectro.png' },
  { name: 'LEANCAT', logo: '/LEANCAT.png' },
  { name: 'Kolibrik', logo: '/Kolibrik.png' },
  { name: 'Bluesen', logo: '/Bluesen.png', scale: 2.4 },
  { name: 'EN-SCAN', logo: '/EnScan.png' },
];

export const heroStats = [
  { value: 30, suffix: '+', label: 'Years Experience' },
  { value: partners.length, suffix: '', label: 'Global Partners' },
  { value: 100, suffix: '%', label: 'Application Support' },
];

export const whyFeatures = [
  {
    icon: TrendingUp,
    title: 'Tailored Solution',
    description: 'Custom equipment configurations to meet your specific lab requirements',
  },
  {
    icon: Target,
    title: 'Scientific Precision',
    description: 'Industry-leading accuracy in all measurements and calibrations',
  },
  {
    icon: BadgeCheck,
    title: 'High Reliability',
    description: 'Durable equipment built to perform consistently under demanding conditions',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Dedicated technical assistance from our team of application specialists',
  },
];

export const industries = [
  {
    icon: FlaskConical,
    title: 'Pharmaceuticals',
    desc: 'Ensuring compliance and purity with advanced TOC analysis and water systems.',
  },
  {
    icon: Zap,
    title: 'Green Energy',
    desc: 'Supporting the hydrogen revolution with electrolyzer testing stations.',
  },
  {
    icon: GraduationCap,
    title: 'Academic Research',
    desc: 'Empowering universities with precision spectroscopy and electrochemical tools.',
  },
  {
    icon: Atom,
    title: 'Material Science',
    desc: 'High-resolution Raman spectroscopy for advanced material characterization.',
  },
  {
    icon: Factory,
    title: 'Industrial QA/QC',
    desc: 'Robust instruments designed for rigorous quality control environments.',
  },
  {
    icon: Droplets,
    title: 'Environmental',
    desc: 'Precise water quality analysis for sustainable environmental monitoring.',
  },
];

export const coreValues = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    desc: "We don't just sell equipment; we curate the latest technological advancements from around the globe to solve complex challenges.",
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromising Quality',
    desc: 'Every partner we choose and every product we deliver undergoes rigorous vetting to ensure it meets the highest scientific standards.',
  },
  {
    icon: Rocket,
    title: 'Future Ready',
    desc: 'Born in 2024, we are built for the modern lab—focusing on digitalization, automation, and sustainable technologies like Green Hydrogen.',
  },
];

/** Real figures pulled from the product catalogue, shown as the hero "instrument readout". */
export const readouts = [
  { label: 'Resistivity', value: '18.2 MΩ·cm', source: 'BerryPURE ULTRA' },
  { label: 'TOC', value: '< 5 ppb', source: 'BerryPURE ULTRA' },
  { label: 'H₂ Purity', value: '99.999%', source: 'Water Electrolyzers' },
  { label: 'PID', value: '10.6 eV', source: 'Labrador HHGC' },
  { label: 'EIS', value: '10µHz – 1MHz', source: 'Multichannel EIS' },
  { label: 'TOC Range', value: '0.5 – 1000 ppb', source: 'BerryPURE TOC' },
  { label: 'Turbidity', value: '< 0.1 NTU', source: 'Aqua2000-TU90' },
  { label: 'Raman Library', value: '12,000+', source: 'Hand Held Raman' },
  { label: 'Stack Power', value: 'up to 500 kW', source: 'PTS-500' },
  { label: 'CVM', value: '500 ch', source: 'Cell Voltage Monitoring' },
];

/** Some partner files have lots of built-in padding; scale them so they read at a similar size. */
export const logoScale = (src?: string) => partners.find((p) => p.logo === src)?.scale ?? 1;
