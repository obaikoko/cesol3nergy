'use client';

import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Trigger animations only after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fadeIn = useSpring({
    opacity: isMounted ? 1 : 0,
    delay: 200,
  });

  const slideIn = useSpring({
    transform: isMounted ? 'translateY(0px)' : 'translateY(-50px)',
    delay: 400,
  });

  return (
    <section className='relative bg-gradient-to-br from-yellow-400 to-blue-500 h-screen flex items-center justify-center text-white'>
      <div className='container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0'>
        {/* Animated Text Section */}
        <animated.div style={fadeIn} className='md:w-1/2'>
          <h1 className='text-4xl md:text-5xl font-bold leading-tight'>
            Power Your Life with{' '}
            <span className='text-yellow-300'>Clean Solar Energy</span>
          </h1>
          <p className='mt-4 text-lg md:text-xl max-w-md'>
            CESOLE#NERGY brings sustainable energy solutions to your home and
            business.
          </p>
          <div className='mt-8 space-x-4'>
            <Link
              href='/shop'
              className='bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition duration-300'
            >
              Shop Now
            </Link>
            <Link
              href='/contact'
              className='bg-transparent border border-white hover:border-yellow-500 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300'
            >
              Get a Quote
            </Link>
          </div>
        </animated.div>

        {/* Animated Image Section */}
        <animated.div style={slideIn} className='md:w-1/2'>
          <img
            src='images/panels.jpeg'
            alt='Solar Panels'
            className='w-full h-auto transform hover:scale-105 transition-transform duration-500'
          />
        </animated.div>
      </div>
    </section>
  );
};

export default HeroSection;
