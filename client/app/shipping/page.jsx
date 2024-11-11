'use client';
import { useState } from 'react';
import { getData } from 'country-list';
import { states } from 'naija-state-local-government';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '@/src/slices/cartSlice';

const ShippingInformation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const countries = getData();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [formData, setFormData] = useState({
    address: shippingAddress?.address || '',
    city: shippingAddress?.city || '',
    postalCode: shippingAddress?.postalCode || '',
    country: shippingAddress?.country || '',
    state: shippingAddress?.state || '',
    phone: shippingAddress?.phone || '',
  });

  const { address, city, postalCode, country, state, phone } = formData;

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    router.push('/payment');
  };

  const nigerianStates = states();

  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center min-h-screen p-6 bg-gray-100'>
        <h1 className='text-2xl font-bold mb-6'>Shipping Information</h1>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-lg bg-white p-6 rounded-lg shadow-md'
        >
          {/* Country Field */}
          <div className='mb-6'>
            <label
              htmlFor='country'
              className='block text-gray-700 font-medium mb-2'
            >
              {country !== 'Nigeria' ? (
                <p className='text-red-500'>
                  Shipping is currently available only in Nigeria
                </p>
              ) : (
                'Country'
              )}
            </label>
            <select
              name='country'
              id='country'
              value={country}
              onChange={handleFormChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-700'
              required
            >
              <option value=''>Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Field (Changes based on selected country) */}
          <div className='mb-6'>
            <label
              htmlFor='state'
              className='block text-gray-700 font-medium mb-2'
            >
              State
            </label>
            <select
              name='state'
              id='state'
              value={state}
              onChange={handleFormChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-700'
              required
            >
              <option value=''>Select State </option>
              {country === 'Nigeria' &&
                nigerianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
            </select>
          </div>

          {/* City Field */}
          <div className='mb-6'>
            <label
              htmlFor='city'
              className='block text-gray-700 font-medium mb-2'
            >
              City
            </label>
            <input
              type='text'
              name='city'
              id='city'
              value={city}
              onChange={handleFormChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-700'
              required
            />
          </div>
          {/* Address Field */}
          <div className='mb-6'>
            <label
              htmlFor='address'
              className='block text-gray-700 font-medium mb-2'
            >
              Address
            </label>
            <input
              type='text'
              name='address'
              id='address'
              value={address}
              onChange={handleFormChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-700'
              required
            />
          </div>

          {/* Postal Code Field */}
          <div className='mb-6'>
            <label
              htmlFor='postalCode'
              className='block text-gray-700 font-medium mb-2'
            >
              Postal Code
            </label>
            <input
              type='text'
              name='postalCode'
              id='postalCode'
              value={postalCode}
              onChange={handleFormChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-700'
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className='mb-6'>
            <label
              htmlFor='phone'
              className='block text-gray-700 font-medium mb-2'
            >
              Phone Number
            </label>
            <input
              type='tel'
              name='phone'
              id='phone'
              value={phone}
              onChange={handleFormChange}
              className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-purple-700'
              required
            />
          </div>

          <button
            type='submit'
            className='w-full p-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors'
          >
            Continue to Payment
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default ShippingInformation;
