'use client';

import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className='bg-gradient-to-r from-purple-700 to-orange-500 p-4 text-white relative z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        {/* Logo */}
        <div className='text-2xl font-bold'>
          <Link href='/'>Cesol3nergy</Link>
        </div>

        {/* Hamburger Icon */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='focus:outline-none'>
            <div className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span className='block w-7 h-0.5 bg-white transition-transform duration-300 ease-in-out'></span>
              <span className='block w-7 h-0.5 bg-white mt-1 transition-transform duration-300 ease-in-out'></span>
              <span className='block w-7 h-0.5 bg-white mt-1 transition-transform duration-300 ease-in-out'></span>
            </div>
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0 bg-purple-800 md:bg-transparent w-full md:w-auto left-0 absolute md:static transition-all duration-500 ease-in-out ${
            isOpen ? 'top-16 z-40' : 'top-[-500px]'
          }`}
        >
          <Link
            href='/'
            className='hover:text-yellow-200 transition duration-300'
          >
            Home
          </Link>
          <Link
            href='/about'
            className='hover:text-yellow-200 transition duration-300'
          >
            About
          </Link>
          <Link
            href='/services'
            className='hover:text-yellow-200 transition duration-300'
          >
            Services
          </Link>
          <Link
            href='/contact'
            className='hover:text-yellow-200 transition duration-300'
          >
            Contact
          </Link>
          <Link
            href='/products'
            className='hover:text-yellow-200 transition duration-300'
          >
            Products
          </Link>

          {/* Profile Section */}
          <div className='relative'>
            <button
              onClick={toggleProfile}
              className='flex items-center space-x-2 focus:outline-none'
            >
              <span className='hidden md:inline-block'>Profile</span>
            </button>
            {isProfileOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50'>
                <Link
                  href='/profile'
                  className='block px-4 py-2 hover:bg-gray-100 transition-colors'
                >
                  My Profile
                </Link>
                <Link
                  href='/settings'
                  className='block px-4 py-2 hover:bg-gray-100 transition-colors'
                >
                  Settings
                </Link>
                <button className='w-full text-left block px-4 py-2 text-red-500 hover:bg-gray-100 transition-colors'>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translateY(10px);
          background-color: yellow;
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translateY(-10px);
          background-color: yellow;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
