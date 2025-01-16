'use client';

import Link from 'next/link';

const HeroSection = () => {
  return (
    <section
      className='relative bg-cover bg-center h-screen text-white'
      style={{
        backgroundImage: "url('/images/panels.jpeg')", // Replace with the actual background image path
      }}
    >
      <div className='absolute inset-0 bg-black bg-opacity-60'></div>
      <div className='container mx-auto relative z-10 flex flex-col items-center justify-center h-full text-center px-6'>
        {/* Text Content */}
        <h1 className='text-4xl md:text-6xl font-bold leading-tight mb-4'>
          Powering Your Future with Solar Energy
        </h1>
        <p className='text-lg md:text-xl mb-8 max-w-3xl'>
          At Cesol3nergy, we provide innovative and sustainable solar solutions
          to transform your energy needs into a brighter future.
        </p>
        <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
          <Link
            href='/products'
            className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-center'
          >
            Explore Products
          </Link>
          <Link
            href='/contact'
            className='bg-transparent border border-white hover:bg-white hover:text-black font-bold py-3 px-6 rounded-lg text-center'
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
