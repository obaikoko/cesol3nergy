'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import { useForgetPasswordMutation } from '@/src/slices/userApiSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function forgetPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;

  const [forgetPassword, { isLoading, isError }] = useForgetPasswordMutation();

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await forgetPassword({ email }).unwrap();
      toast.success(`${res}`);
    } catch (err) {
      console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
    <Navbar/>
      <div className='min-h-screen flex flex-col justify-center bg-blue-100'>
        <div className='flex items-center justify-center'>
          <form
            className='bg-white p-10 rounded-lg shadow-lg max-w-md w-full'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col items-center mb-6'>
              <h1 className='text-3xl font-bold text-purple-950 mb-4'>
                Cesol3nergy
              </h1>
              <h1>FORGET PASSWORD</h1>
            </div>

            <div className='mb-4 w-full'>
              <label
                htmlFor='resetEmail'
                className='block text-blue-950 font-bold mb-2'
              >
                Enter Email Address
              </label>
              <input
                type='email'
                name='email'
                id='resetEmail'
                value={email}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-purple-700 to-orange-500 text-white py-2 rounded-md hover:bg-purple-900 transition-colors'
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default forgetPassword;
