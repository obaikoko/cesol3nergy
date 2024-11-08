// components/CoreOfferings.js
'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Services from './Services';

const products = [
  {
    title: 'Solar Power Staion',
    description: 'Reliable power solutions on the go.',
  },
  {
    title: 'Inverters',
    description: 'Efficient power inverters for all your needs.',
  },
  {
    title: 'Batteries',
    description: 'High-capacity batteries for energy storage.',
  },
  {
    title: 'Solar Panels',
    description: 'Premium panels for maximum solar energy.',
  },
  {
    title: 'Charge Contollers',
    description: 'Premium panels for maximum solar energy.',
  },
  {
    title: 'Solar Light',
    description: 'Premium panels for maximum solar energy.',
  },
];
const services = [
  {
    title: 'Maintenance & Upgrade',
    description: 'Reliable power solutions on the go.',
  },
  {
    title: 'Installation',
    description: 'Efficient power inverters for all your needs.',
  },
  {
    title: 'Consultation',
    description: 'High-capacity batteries for energy storage.',
  },
  {
    title: 'Delivery',
    description: 'Premium panels for maximum solar energy.',
  },
];

export default function CoreOfferings() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const fadeIn = useSpring({
    opacity: isMounted ? 1 : 0,
    from: { opacity: 0 },
    delay: 300,
  });

  return (
    <section className='relative bg-gradient-to-br from-blue-50 to-blue-100 py-20 overflow-hidden'>
      <motion.div
        className='absolute inset-0 bg-center bg-cover opacity-10'
        style={{ backgroundImage: "url('images/pattern-randomized.svg')" }}
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
      />
      <animated.div style={fadeIn} className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-blue-800'>Our Core Products</h2>
        <p className='text-gray-600 mt-4 mb-10'>
          Explore our range of solar energy Products.
        </p>
        <div className='flex flex-wrap justify-center gap-8 mb-10'>
          {products.map((offering, index) => (
            <animated.div
              key={index}
              style={{
                transform: isMounted ? 'translateY(0px)' : 'translateY(30px)',
                opacity: isMounted ? 1 : 0,
                transition: `all 0.5s ease ${index * 0.2}s`,
              }}
              className='bg-white rounded-lg shadow-lg p-6 w-72 hover:scale-105 transition-transform duration-300'
            >
              <h3 className='text-2xl font-semibold text-blue-700 mb-2'>
                {offering.title}
              </h3>
              <p className='text-gray-500'>{offering.description}</p>
            </animated.div>
          ))}
        </div>
      </animated.div>
      <motion.div
        className='absolute inset-0 bg-center bg-cover opacity-10'
        style={{ backgroundImage: "url('images/pattern-randomized.svg')" }}
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
      />
      <Services/>
    </section>
  );
}
