import React, { useState, useEffect } from 'react';
import SplashScreen from '../Components/SplashScreen';
import HeroSection from '../Components/home/HeroSection';
import WhyChooseUs from '../Components/home/WhyChooseUs';
import ProductShowcase from '../Components/home/ProductShowcase';
import PartnersSection from '../Components/home/PartnersSection';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('splashSeen');
    if (seen) {
      setShowSplash(false);
      setHasSeenSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setHasSeenSplash(true);
    sessionStorage.setItem('splashSeen', 'true');
  };

  return (
    <>
      {showSplash && !hasSeenSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <main>
        <HeroSection />
        <WhyChooseUs />
        <ProductShowcase />
        <PartnersSection />
      </main>
    </>
  );
}