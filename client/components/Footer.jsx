'use client';

import Link from 'next/link';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-10'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <h4 className='text-lg font-bold mb-4'>CESOL3NERGY</h4>
            <img src='/images/logo.jpg' className='w-full my-4' />
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
              {/* <li>
                <Link href='/products' className='hover:underline'>
                  Products
                </Link>
              </li> */}
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
            <p className='mb-2'>Email: cesol3nergy@gmail.com</p>
            <p>Phone: (+234) 906 699 6674</p>
            <div className='flex space-x-4 mt-4'>
              <Link
                href='https://www.facebook.com/share/15a4sSFtNc/?mibextid=JRoKGi'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <FaFacebook />
              </Link>
              <Link
                href='https://api.whatsapp.com/send?phone=09066996674&text=thank you for contacting Cesol3nery! how can we assist you?'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <FaWhatsapp />
              </Link>
              <Link
                href='https://www.instagram.com/cesol3nergy/profilecard/?igsh=dnR5ZzV2OWc4NGk3'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <FaInstagram />
              </Link>
              <Link
                href='https://www.linkedin.com/in/chizaram-okoye-a89507238'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <FaLinkedin />
              </Link>
              <Link
                href='https://x.com/benjami81230393?s=11'
                className='text-gray-400 hover:text-white transition-colors duration-300'
              >
                <FaTwitter />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className='text-center py-4 border-t border-gray-700 mt-6'>
        <p>
          &copy; {new Date().getFullYear()} CESOL3NERGY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
