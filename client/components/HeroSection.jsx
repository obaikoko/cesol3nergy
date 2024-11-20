'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const HeroSection = () => {
  const content = [
    {
      heading: 'Clean Solar Energy',
      description: 'Harness the power of the sun with CESOL3NERGY.',
      image: 'images/panels1.jpg',
    },
    {
      heading: 'A Sustainable Future',
      description: 'Join the movement towards renewable energy.',
      image: 'images/solar-future.jpg',
    },
    {
      heading: 'Eco-Friendly Living',
      description: 'Transform your lifestyle with green energy solutions.',
      image: 'images/solar-panels.png',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, [content]);

  return (
    <section className='relative bg-gradient-to-br from-purple-700 to-orange-500 h-screen flex items-center justify-center text-white'>
      <AnimatePresence mode='wait'>
        <motion.div
          key={content[currentIndex].heading}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0'
        >
          {/* Animated Text Section */}
          <div className='md:w-1/2'>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-4xl md:text-5xl font-bold leading-tight'
            >
              {content[currentIndex].heading}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='mt-4 text-lg md:text-xl max-w-md'
            >
              {content[currentIndex].description}
            </motion.p>
            <div className='mt-8 space-x-4'>
              <Link
                href='/products'
                className='bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300'
              >
                Shop Now
              </Link>
              <Link
                href='/contact'
                className='bg-transparent border border-white hover:border-orange-400 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-lg transition duration-300'
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Animated Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className='md:w-1/2'
          >
            <img
              src={content[currentIndex].image}
              alt={content[currentIndex].heading}
              className='w-full h-auto transform hover:scale-105 transition-transform duration-500'
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
