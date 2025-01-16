// components/Services.js
'use client';

import { useSpring, animated } from '@react-spring/web';
import { FaTools, FaSolarPanel, FaUserTie, FaTruck } from 'react-icons/fa';

const services = [
  {
    title: 'Maintenance',
    description: 'Reliable maintenance to ensure peak performance.',
    icon: <FaTools className='text-blue-700 text-4xl mx-auto mb-4' />,
  },
  {
    title: 'Installation',
    description: 'Professional installation for your solar systems.',
    icon: <FaSolarPanel className='text-blue-700 text-4xl mx-auto mb-4' />,
  },
  {
    title: 'Consultation',
    description: 'Expert advice for your solar energy needs.',
    icon: <FaUserTie className='text-blue-700 text-4xl mx-auto mb-4' />,
  },
  {
    title: 'Delivery',
    description: 'Timely delivery of all solar energy products.',
    icon: <FaTruck className='text-blue-700 text-4xl mx-auto mb-4' />,
  },
];

export default function Services() {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const slideUp = useSpring({
    transform: 'translateY(0px)',
    from: { transform: 'translateY(20px)' },
    delay: 400,
  });

  return (
    <section className='py-16 bg-white text-gray-800'>
      <div className='container mx-auto px-6'>
        {/* Services Intro */}
        <div style={fadeIn} className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4'>Our Services</h2>
          <p className='max-w-3xl mx-auto text-lg'>
            From installations to custom solutions, CESOLE3NERGY offers a range
            of services to bring clean energy to your doorstep.
          </p>
        </div>

        {/* Service Cards */}
        <div className='flex flex-wrap justify-center space-x-6'>
          {services.map((service, index) => (
            <animated.div
              style={slideUp}
              key={index}
              className='w-80 p-6 bg-gray-100 shadow-md rounded-lg mx-4 mb-6 text-center'
            >
              {service.icon}
              <h3 className='text-2xl font-semibold mb-2'>{service.title}</h3>
              <p className='text-gray-600'>{service.description}</p>
            </animated.div>
          ))}
        </div>
      </div>
    </section>
  );
}
