// components/FeaturedProducts.js
'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

const products = [
  {
    title: 'Portable Solar Generator',
    description: 'Compact and powerful, ideal for on-the-go.',
    price: '600K',
    image: '/images/solar-gen.jpg',
  },
  {
    title: 'Home Inverter System',
    description: 'Efficient and reliable inverter solution.',
    price: '2M',
    image: '/images/home-inverter-system.jpg',
  },
  {
    title: 'Solar Battery Pack',
    description: 'High-capacity storage for continuous power.',
    price: '300K',
    image: '/images/battery.jpg',
  },
  {
    title: 'Premium Solar Panel',
    description: 'High-efficiency panel for maximum output.',
    price: '250K',
    image: '/images/solar-panels.png',
  },
];

export default function FeaturedProducts() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-blue-800 mb-8'>
          Featured Products
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
          {products.map((product, index) => (
            <animated.div
              key={index}
              style={{
                opacity: isMounted ? 1 : 0,
                transform: isMounted ? 'translateY(0px)' : 'translateY(30px)',
                transition: `opacity 0.5s ease ${
                  index * 0.2
                }s, transform 0.5s ease ${index * 0.2}s`,
              }}
              className='bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300'
            >
              <img
                src={product.image}
                alt={product.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-6 text-left'>
                <h3 className='text-lg font-semibold text-blue-800'>
                  {product.title}
                </h3>
                <p className='text-gray-600 my-2'>{product.description}</p>
                <p className='text-yellow-500 font-bold'>
                  &#8358;{product.price}
                </p>
              </div>
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  );
}
