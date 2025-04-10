// components/Testimonials.js
'use client';

import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Michael Okereke',
    title: 'Eco Enthusiast',
    quote: 'CESOL3NERGY has transformed our energy consumption at home!',
    // image: '/images/customer1.jpg',
  },
  {
    name: 'Lawal Ibrahim',
    title: 'Business Owner',
    quote: 'Our solar setup has saved us thousands on energy costs!',
    // image: '/images/customer2.jpg',
  },
  {
    name: 'Kemi Folashade',
    title: 'Homeowner',
    quote: 'Reliable, efficient, and eco-friendly—perfect for our home.',
    // image: '/images/customer1.jpg',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Update testimonial every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const slideIn = useSpring({
    opacity: 1,
    transform: 'translateX(0)',
    from: { opacity: 0, transform: 'translateX(10px)' },
    reset: true,
    config: { duration: 500 }, // animation duration for smooth transition
  });

  return (
    <section className='py-20 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-purple-800 mb-8'>
          Testimonials
        </h2>
        <div className='relative w-full max-w-lg mx-auto'>
          <animated.div
            style={slideIn}
            key={index}
            className='p-8 bg-white shadow-lg rounded-lg w-full max-w-sm mx-auto'
          >
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className='w-20 h-20 rounded-full mx-auto mb-4'
            />
            <h3 className='text-xl font-semibold text-gray-700'>
              {testimonials[index].name}
            </h3>
            <p className='text-sm text-gray-500'>{testimonials[index].title}</p>
            <p className='mt-4 text-gray-600'>"{testimonials[index].quote}"</p>
          </animated.div>
          <div className='flex justify-between mt-6'>
            <button
              onClick={() =>
                setIndex(
                  (index - 1 + testimonials.length) % testimonials.length
                )
              }
              className='text-purple-500 hover:text-purple-700'
            >
              &#8592; Prev
            </button>
            <button
              onClick={() => setIndex((index + 1) % testimonials.length)}
              className='text-purple-500 hover:text-purple-700'
            >
              Next &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
