'use client';
import { useLogoutMutation } from '@/src/slices/userApiSlice';
import { logout } from '@/src/slices/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import CartBtn from './CartBtn';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  const [logoutApi, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    setIsLoggedIn(user);
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
    setIsOpen(!open);
  };

  return (
    <nav className='bg-gradient-to-r from-purple-700 to-orange-500 p-4 text-white relative z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        {/* Logo */}
        <div className='text-2xl font-bold'>
          <Link href='/'>Cesol3nergy</Link>
        </div>

        {/* Hamburger Icon */}
        <div className=' flex md:hidden'>
          <CartBtn cartItems={cartItems} />
          <button onClick={toggleMenu} className=' ml-3 focus:outline-none'>
            <div className={`hamburger ${isOpen ? 'open' : ''}`}>
              <span className='block w-7 h-0.5 bg-white transition-transform duration-300 ease-in-out'></span>
              <span className='block w-7 h-0.5 bg-white mt-1 transition-transform duration-300 ease-in-out'></span>
              <span className='block w-7 h-0.5 bg-white mt-1 transition-transform duration-300 ease-in-out'></span>
            </div>
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`flex flex-col py-10 md:p-2 md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0 bg-grad bg-purple-800 md:bg-transparent w-full md:w-auto left-0 absolute md:static transition-all duration-500 ease-in-out ${
            isOpen ? 'top-16 z-40' : 'top-[-500px]'
          }`}
        >
          <Link
            onClick={() => {
              setIsOpen(!isOpen), setIsProfileOpen(false);
            }}
            href='/'
            className='hover:text-yellow-200 transition duration-300'
          >
            Home
          </Link>
          <Link
            onClick={() => {
              setIsOpen(!isOpen), setIsProfileOpen(false);
            }}
            href='/about'
            className='hover:text-yellow-200 transition duration-300'
          >
            About
          </Link>
          <Link
            onClick={() => {
              setIsOpen(!isOpen), setIsProfileOpen(false);
            }}
            href='/services'
            className='hover:text-yellow-200 transition duration-300'
          >
            Services
          </Link>
          <Link
            onClick={() => {
              setIsOpen(!isOpen), setIsProfileOpen(false);
            }}
            href='/contact'
            className='hover:text-yellow-200 transition duration-300'
          >
            Contact
          </Link>
          <Link
            onClick={() => {
              setIsOpen(!isOpen), setIsProfileOpen(false);
            }}
            href='/products'
            className='hover:text-yellow-200 transition duration-300'
          >
            Products
          </Link>
          <CartBtn cartItems={cartItems} />

          {isLoggedIn ? (
            <>
              {/* Profile Section */}
              <div className='relative'>
                <button
                  onClick={toggleProfile}
                  className='flex items-center space-x-2 focus:outline-none'
                >
                  <span>Profile</span>
                </button>
                {isProfileOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-50'>
                    <Link
                      onClick={() => {
                        setIsOpen(!isOpen), setIsProfileOpen(false);
                      }}
                      href={`/profile/${isLoggedIn._id}`}
                      className='block px-4 py-2 hover:bg-gray-100 transition-colors'
                    >
                      My Profile
                    </Link>
                    {isLoggedIn.isAdmin && (
                      <>
                        <Link
                          onClick={() => {
                            setIsOpen(!isOpen), setIsProfileOpen(false);
                          }}
                          href='/dashboard'
                          className='block px-4 py-2 hover:bg-gray-100 transition-colors'
                        >
                          Dashboard
                        </Link>
                      </>
                    )}

                    <button
                      className='w-full text-left block px-4 py-2 text-red-500 hover:bg-gray-100 transition-colors'
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href='/login'
              className='hover:text-yellow-200 transition duration-300'
            >
              Login
            </Link>
          )}
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
