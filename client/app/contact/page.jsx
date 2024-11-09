// components/ContactUs.js
'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <div>
      <Navbar />
      <section className='py-16 bg-white text-gray-800'>
        <div className='container mx-auto px-6'>
          {/* Contact Form */}
          <div className='mb-12 text-center'>
            <h2 className='text-4xl font-bold mb-4'>Contact Us</h2>
            <p className='max-w-2xl mx-auto text-lg'>
              Reach out for inquiries, support, or service requests. We’re here
              to help you with all your solar energy needs.
            </p>
          </div>

          <div className='flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-8'>
            {/* Form Section */}
            <form className='md:w-1/2 space-y-4'>
              <input
                type='text'
                placeholder='Your Name'
                className='w-full p-3 border rounded'
                required
              />
              <input
                type='email'
                placeholder='Email Address'
                className='w-full p-3 border rounded'
                required
              />
              <input
                type='tel'
                placeholder='Phone Number'
                className='w-full p-3 border rounded'
              />
              <select className='w-full p-3 border rounded'>
                <option>Product Inquiry</option>
                <option>Service Request</option>
                <option>General Inquiry</option>
              </select>
              <textarea
                placeholder='Your Message'
                className='w-full p-3 border rounded h-32'
                required
              ></textarea>
              <button
                type='submit'
                className='w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300'
              >
                Submit
              </button>
            </form>

            {/* Location and Contact Details */}
            <div className='md:w-1/2 space-y-6'>
              <div className='text-center md:text-left'>
                <h3 className='text-2xl font-semibold'>Our Location</h3>
                <p className='text-gray-600'>
                  456 Solar Avenue, Lagos, Nigeria
                </p>
                <p className='text-gray-600'>Phone: +234 123 456 7890</p>
              </div>

              {/* Map Integration */}
              <div className='rounded-lg overflow-hidden shadow-md'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.7246436757744!2d3.379205715208371!3d6.524379195271204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b0f0c3d1c9d%3A0x7f0135762d4d3d5!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1698773248415!5m2!1sen!2sng'
                  width='100%'
                  height='250'
                  frameBorder='0'
                  allowFullScreen=''
                  aria-hidden='false'
                  tabIndex='0'
                ></iframe>
              </div>

              {/* Social Media Links */}
              <div className='flex justify-center md:justify-start space-x-4 mt-4'>
                <Link href='https://facebook.com' className='text-blue-600'>
                  <FaFacebook className='text-2xl' />
                </Link>
                <Link href='https://twitter.com' className='text-blue-400'>
                  <FaTwitter className='text-2xl' />
                </Link>
                <Link href='https://linkedin.com' className='text-blue-700'>
                  <FaLinkedin className='text-2xl' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
