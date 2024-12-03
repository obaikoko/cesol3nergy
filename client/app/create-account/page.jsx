'use client';

import { toast } from 'react-toastify';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { useVerifyEmailMutation } from '@/src/slices/userApiSlice';

const page = () => {
  const [verifyEmail, { isLoading, isError }] = useVerifyEmailMutation();

  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await verifyEmail({ email }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className='min-h-screen flex flex-col justify-center bg-purple-100'>
        <div className='flex items-center justify-center'>
          <form
            className='bg-white p-10 rounded-lg shadow-lg max-w-md w-full'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col items-center mb-6'>
              <h1 className='text-3xl font-bold text-purple-950 mb-4'>
                Cesol3nergy
              </h1>
              <h1>CREATE ACCOUNT</h1>
            </div>

            <div className='mb-4 w-full'>
              <label
                htmlFor='email'
                className='block text-purple-950 font-bold mb-2'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                placeholder='Please add a valid email address'
                id='email'
                value={email}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-purple-700 to-orange-500 text-white py-2 rounded-md hover:bg-purple-900 transition-colors'
            >
              {isLoading ? 'processing...' : 'submit'}
            </button>

            <div className='mt-6 flex flex-col items-center'>
              <p className='text-gray-600'>Already have an account?</p>
              <Link
                href='/login'
                className='text-purple-950 hover:underline mt-2'
              >
               Login
              </Link>
             
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
