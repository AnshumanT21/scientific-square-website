import React, { useState, useEffect } from 'react';

// Define the types for the props
interface AnimatedCounterProps {
  value: number;
  isInView: boolean;
  suffix?: string; // The '?' means this prop is optional
}

export default function AnimatedCounter({ value, isInView, suffix = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span>{count}{suffix}</span>;
}