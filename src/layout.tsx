import React from 'react';
import Header from './Components/navigation/Header';
import Footer from './Components/navigation/Footer';

// Define the type for the props
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>
        {`
          :root {
            --primary-navy: #002a4b;
            --accent-gold: #d09b2c;
            --accent-lavender: #9391c7;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          
          ::selection {
            background-color: #d09b2c;
            color: white;
          }
        `}
      </style>
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}