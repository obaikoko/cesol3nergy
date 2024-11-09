// components/AboutUs.js
'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useSpring, animated } from '@react-spring/web';

const teamMembers = [
  { name: 'Jane Doe', title: 'CEO', image: '/images/customer2.jpg' },
  {
    name: 'John Smith',
    title: 'Chief Engineer',
    image: '/images/customer1.jpg',
  },
  {
    name: 'Emily Nguyen',
    title: 'Sustainability Officer',
    image: '/images/customer2.jpg',
  },
];

const certifications = [
  { title: 'ISO 9001', description: 'Quality Management Certified' },
  { title: 'Energy Star', description: 'Energy-Efficient Partner' },
  {
    title: 'SolarTech Partner',
    description: 'Certified Solar Installation Partner',
  },
];

export default function AboutUs() {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const slideUp = useSpring({
    transform: 'translateY(0px)',
    from: { transform: 'translateY(20px)' },
    delay: 400,
  });

  return (
    <div>
      <Navbar />
      <section className='py-16 bg-gray-100 text-gray-800'>
        <div className='container mx-auto px-6'>
          {/* Vision and Mission */}
          <div className='text-center mb-12'>
            <div style={fadeIn}>
              <h2 className='text-4xl font-bold mb-6'>Our Vision & Mission</h2>
              <div className='max-w-3xl mx-auto text-lg mb-8'>
                <h3 className='text-2xl font-semibold text-blue-800 mb-2'>
                  Our Vision
                </h3>
                <p className='text-gray-600'>
                  To light up Nigeria with sustainable energy, empowering homes
                  and businesses with affordable solar power and leading the way
                  toward a cleaner, greener future for all.
                </p>
              </div>
              <div className='max-w-3xl mx-auto text-lg'>
                <h3 className='text-2xl font-semibold text-blue-800 mb-2'>
                  Our Mission
                </h3>
                <p className='text-gray-600'>
                  To make clean, reliable solar energy accessible to everyone,
                  helping Nigerians to power their homes and businesses
                  affordably, reduce energy costs, and take control of their
                  power needs for a brighter, sustainable future.
                </p>
              </div>
            </div>
          </div>

          {/* Company Story */}
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-4'>Our Story</h2>
            <p className='max-w-3xl mx-auto text-lg'>
              CESOLE3NERGY is committed to providing sustainable energy
              solutions. Our mission is to empower communities and businesses
              with clean solar power, reducing environmental impact one
              installation at a time.
            </p>
          </div>

          {/* Team Section */}
          <div className='text-center mb-12'>
            <h3 className='text-3xl font-semibold mb-6'>Meet Our Team</h3>
            <div className='flex flex-wrap justify-center space-x-6'>
              {teamMembers.map((member, index) => (
                <animated.div
                  style={slideUp}
                  key={index}
                  className='w-40 text-center mx-4 mb-6'
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className='rounded-full w-32 h-32 object-cover mb-4 mx-auto'
                  />
                  <h4 className='font-bold'>{member.name}</h4>
                  <p className='text-sm text-gray-600'>{member.title}</p>
                </animated.div>
              ))}
            </div>
          </div>

          {/* Certifications and Partnerships */}
          <div className='text-center'>
            <h3 className='text-3xl font-semibold mb-6'>
              Certifications & Partnerships
            </h3>
            <div className='flex flex-wrap justify-center space-x-6'>
              {certifications.map((cert, index) => (
                <animated.div
                  style={slideUp}
                  key={index}
                  className='w-60 p-4 bg-white shadow-md rounded-lg mx-4 mb-6'
                >
                  <h4 className='font-bold text-lg'>{cert.title}</h4>
                  <p className='text-gray-600'>{cert.description}</p>
                </animated.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
