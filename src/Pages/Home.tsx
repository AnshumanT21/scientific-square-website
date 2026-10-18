import React from 'react';
import HeroSection from '../Components/home/HeroSection';
import WhyChooseUs from '../Components/home/WhyChooseUs';
import ProductShowcase from '../Components/home/ProductShowcase';
import PartnersSection from '../Components/home/PartnersSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyChooseUs />
      <ProductShowcase />
      <PartnersSection />
    </main>
  );
}
