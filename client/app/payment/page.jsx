'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '@/src/slices/cartSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PaymentInformation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  
  

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    }
  }, [router, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    router.push('/order');
  };

  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center min-h-screen p-6 bg-gray-100'>
        <h1 className='text-2xl font-bold mb-6'>Payment Information</h1>
        <form
          onSubmit={submitHandler}
          className='w-full max-w-lg bg-white p-6 rounded-lg shadow-md'
        >
          {/* Payment Method Selection */}
          <div className='mb-6'>
            <label
              htmlFor='paymentMethod'
              className='block text-gray-700 font-medium mb-2'
            >
              Select Payment Method
            </label>
            <select
              name='paymentMethod'
              id='paymentMethod'
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-700'
              required
            >
              <option value=''>Select Method</option>
              <option value='Card'>Credit/Debit Card</option>
              <option value='Bank Transfer'>Bank Transfer</option>
            </select>
          </div>

          <button
            type='submit'
            className='w-full p-2 text-sm bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors'
          >
            Continue
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentInformation;
