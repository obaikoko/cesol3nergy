// components/WhyChooseUs.js
'use client';

import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const reasons = [
  {
    icon: '🌞',
    title: 'Eco-Friendly',
    description: 'Harnessing clean and renewable energy.',
  },
  {
    icon: '💰',
    title: 'Cost Effective',
    description: 'Save on electricity bills long-term.',
  },
  {
    icon: '🔋',
    title: 'Reliable Power',
    description: 'High-quality products ensuring durability.',
  },
  {
    icon: '⚙️',
    title: 'Expert Support',
    description: 'Skilled team for installation and support.',
  },
];

export default function WhyChooseUs() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const slideUp = useSpring({
    transform: isMounted ? 'translateY(0px)' : 'translateY(50px)',
    opacity: isMounted ? 1 : 0,
    from: { opacity: 0 },
    delay: 400,
  });

  return (
    <section className='relative py-20 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden'>
      <motion.div
        className='absolute inset-0 bg-center bg-cover opacity-10'
        style={{ backgroundImage: "url('images/pattern-randomized.svg')" }}
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
      />
      <animated.div style={slideUp} className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-green-800'>Why Choose Us?</h2>
        <p className='text-gray-600 mt-4 mb-10'>
          Reasons to make the switch to solar with us.
        </p>
        <div className='flex flex-wrap justify-center gap-8'>
          {reasons.map((reason, index) => (
            <animated.div
              key={index}
              style={{
                transform: isMounted ? 'translateY(0px)' : 'translateY(30px)',
                opacity: isMounted ? 1 : 0,
                transition: `all 0.5s ease ${index * 0.2}s`,
              }}
              className='bg-white rounded-lg shadow-lg p-6 w-72 text-center hover:scale-105 transition-transform duration-300'
            >
              <div className='text-4xl mb-4'>{reason.icon}</div>
              <h3 className='text-2xl font-semibold text-green-700 mb-2'>
                {reason.title}
              </h3>
              <p className='text-gray-500'>{reason.description}</p>
            </animated.div>
          ))}
        </div>
      </animated.div>
    </section>
  );
}
