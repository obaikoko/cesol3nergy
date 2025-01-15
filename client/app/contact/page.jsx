'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useMakeContactMutation } from '@/src/slices/contactSlice';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';


export const metadata = {
  title: 'Cesol3nergy - Solar Products & Renewable Energy Solutions',
  description:
    'Cesol3nergy offers premium solar panels, inverters, batteries, and renewable energy solutions. Empower your home or business with clean energy today!',
  keywords:
    'solar products, renewable energy, solar panels, solar inverters, solar batteries, clean energy, Cesol3nergy',
  image: '/images/logo.jpg',
};

const ContactUs = () => {
  const [contact, { isLoading }] = useMakeContactMutation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    msg: '',
    msgTitle: '',
  });

  const { fullName, email, phone, msg, msgTitle } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!msgTitle) {
      toast.error('Please select a message title.');
      return;
    }

    try {
      const res = await contact({
        fullName,
        email,
        msg,
        msgTitle,
        phone,
      }).unwrap();
      toast.success(`Thank you for Contacting Cesol3nergy!`);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        msg: '',
        msgTitle: '',
      });
    } catch (err) {
      toast.error(
        err?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

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
            <form onSubmit={handleSubmit} className='md:w-1/2 space-y-4'>
              <input
                type='text'
                placeholder='Your Full Name'
                name='fullName'
                value={fullName}
                onChange={handleInputChange}
                className='w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
                required
                aria-label='Full Name'
              />
              <input
                type='email'
                name='email'
                value={email}
                onChange={handleInputChange}
                placeholder='Email Address'
                className='w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
                required
                aria-label='Email'
              />
              <input
                type='tel'
                name='phone'
                value={phone}
                onChange={handleInputChange}
                placeholder='Phone Number'
                className='w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
                aria-label='Phone Number'
              />
              <select
                name='msgTitle'
                value={msgTitle}
                onChange={handleInputChange}
                className='w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
                required
              >
                <option value='' disabled>
                  Select Message Title
                </option>
                <option value='Product Inquiry'>Product Inquiry</option>
                <option value='Service Request'>Service Request</option>
                <option value='General Inquiry'>General Inquiry</option>
              </select>
              <textarea
                placeholder='Your Message'
                name='msg'
                value={msg}
                onChange={handleInputChange}
                className='w-full p-3 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-purple-500'
                required
                aria-label='Message'
              ></textarea>
              <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-3 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-orange-500 hover:bg-purple-800'
                } text-white rounded transition duration-300`}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>

            {/* Location and Contact Details */}
            <div className='md:w-1/2 space-y-6'>
              <div className='text-center md:text-left'>
                <h3 className='text-2xl font-semibold'>Our Location</h3>
                <p className='text-gray-600'>
                  F1647, F-LINE Alaba International Market, Ojo Lagos Nigeria.
                </p>
                <p className='text-gray-600'>Phone: (+234) 906 699 6674</p>
              </div>

              {/* Map Integration */}
              {/* <div className='rounded-lg overflow-hidden shadow-md'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15761.949497222933!2d3.3792057!3d6.5243792!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b0f0c3d1c9d%3A0x7f0135762d4d3d5!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1698773248415'
                  width='100%'
                  height='250'
                  frameBorder='0'
                  allowFullScreen=''
                  aria-hidden='false'
                  tabIndex='0'
                ></iframe>
              </div> */}

              {/* Social Media Links */}
              <div className='flex justify-center md:justify-start space-x-4 mt-4'>
                <Link
                  href='https://www.facebook.com/share/15a4sSFtNc/?mibextid=JRoKGi'
                  aria-label='Visit our Facebook page'
                  className='text-purple-800'
                >
                  <FaFacebook className='text-2xl' />
                </Link>
                <Link
                  href='https://api.whatsapp.com/send?phone=09066996674&text=thank you for contacting Cesol3nery! how can we assist you?'
                  aria-label='Visit our Facebook page'
                  className='text-purple-800'
                >
                  <FaWhatsapp className='text-2xl' />
                </Link>
                <Link
                  href='https://x.com/benjami81230393?s=11'
                  aria-label='Visit our Twitter profile'
                  className='text-purple-800'
                >
                  <FaTwitter className='text-2xl' />
                </Link>
                <Link
                  href='https://www.instagram.com/cesol3nergy/profilecard/?igsh=dnR5ZzV2OWc4NGk3'
                  aria-label='Visit our Twitter profile'
                  className='text-purple-800'
                >
                  <FaInstagram className='text-2xl' />
                </Link>
                <Link
                  href='https://www.linkedin.com/in/chizaram-okoye-a89507238'
                  aria-label='Visit our LinkedIn profile'
                  className='text-purple-800'
                >
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
};

export default ContactUs;
