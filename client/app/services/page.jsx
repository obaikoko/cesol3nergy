// components/Services.js
'use client';

import { useSpring, animated } from '@react-spring/web';

const services = [
  {
    title: 'Solar Installations',
    description: 'Comprehensive solar installation services for residential, commercial, and industrial needs.',
    icon: '/icons/installation.svg',
  },
  {
    title: 'Consultations & Custom Solutions',
    description: 'Get tailored advice and solutions to meet your specific energy requirements.',
    icon: '/icons/consultation.svg',
  },
  {
    title: 'Maintenance & Support',
    description: 'Ongoing maintenance plans and support for a reliable energy experience.',
    icon: '/icons/maintenance.svg',
  },
];

export default function Services() {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const slideUp = useSpring({ transform: 'translateY(0px)', from: { transform: 'translateY(20px)' }, delay: 400 });

  return (
    <section className="py-16 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        
        {/* Services Intro */}
        <div style={fadeIn} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="max-w-3xl mx-auto text-lg">
            From installations to custom solutions, CESOLE#NERGY offers a range of services to bring clean energy to your doorstep.
          </p>
        </div>

        {/* Service Cards */}
        <div className="flex flex-wrap justify-center space-x-6">
          {services.map((service, index) => (
            <div style={slideUp} key={index} className="w-80 p-6 bg-gray-100 shadow-md rounded-lg mx-4 mb-6 text-center">
              <img src={service.icon} alt={service.title} className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
