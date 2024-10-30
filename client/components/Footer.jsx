// components/Footer.js
'use client';

import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';

const Footer = () => {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  return (
    <footer className='bg-gray-800 text-white py-10'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {/* Company Info */}

          <div>
            <h4 className='text-lg font-bold mb-4'>CESOLE#NERGY</h4>
            <p className='mb-2'>
              Your trusted partner for clean solar energy solutions.
            </p>
            <p>Empowering homes and businesses with sustainable energy.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-bold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='hover:underline'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/shop' className='hover:underline'>
                  Shop
                </Link>
              </li>
              <li>
                <Link href='/about' className='hover:underline'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:underline'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-bold mb-4'>Contact Us</h4>
            <p className='mb-2'>Email: support@cesoleenergy.com</p>
            <p>Phone: (123) 456-7890</p>
            <div className='flex space-x-4 mt-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <i className='fab fa-facebook-f'></i> {/* Font Awesome icon */}
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <i className='fab fa-twitter'></i> {/* Font Awesome icon */}
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <i className='fab fa-instagram'></i> {/* Font Awesome icon */}
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <i className='fab fa-linkedin-in'></i> {/* Font Awesome icon */}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className='text-center py-4 border-t border-gray-700 mt-6'>
        <p>
          &copy; {new Date().getFullYear()} CESOLE#NERGY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
