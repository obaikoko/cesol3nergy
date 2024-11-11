'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

const CheckoutPage = () => {
  // Sample data for order summary
  const orderItems = [
    { id: 1, name: 'Solar Generator', price: 200.0, quantity: 1 },
    { id: 2, name: 'Solar Panel', price: 50.0, quantity: 2 },
  ];

  const calculateTotal = () => {
    return orderItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // States for form inputs
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 md:p-8 mb-8 '>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            Checkout
          </h2>

          <form>
            {/* Shipping Information */}
            <div className='mb-8'>
              <h3 className='text-lg font-semibold text-gray-700 mb-4'>
                Shipping Information
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input
                  type='text'
                  name='name'
                  placeholder='Full Name'
                  value={shippingDetails.name}
                  onChange={handleInputChange}
                  className='p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500'
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email Address'
                  value={shippingDetails.email}
                  onChange={handleInputChange}
                  className='p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500'
                />
                <input
                  type='text'
                  name='phone'
                  placeholder='Phone Number'
                  value={shippingDetails.phone}
                  onChange={handleInputChange}
                  className='p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500'
                />
                <input
                  type='text'
                  name='address'
                  placeholder='Street Address'
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  className='p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500'
                />
                <input
                  type='text'
                  name='city'
                  placeholder='City'
                  value={shippingDetails.city}
                  onChange={handleInputChange}
                  className='p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500'
                />
                <input
                  type='text'
                  name='zip'
                  placeholder='Zip Code'
                  value={shippingDetails.zip}
                  onChange={handleInputChange}
                  className='p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500'
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className='mb-8'>
              <h3 className='text-lg font-semibold text-gray-700 mb-4'>
                Payment Method
              </h3>
              <div className='flex items-center space-x-4'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='payment'
                    value='credit-card'
                    className='mr-2'
                  />
                  Credit Card
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='payment'
                    value='paypal'
                    className='mr-2'
                  />
                  PayPal
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='payment'
                    value='bank-transfer'
                    className='mr-2'
                  />
                  Bank Transfer
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div className='mb-8'>
              <h3 className='text-lg font-semibold text-gray-700 mb-4'>
                Order Summary
              </h3>
              <table className='min-w-full border-collapse border border-gray-200'>
                <thead>
                  <tr className='bg-gray-100 text-gray-600 text-sm uppercase'>
                    <th className='py-2 px-4 border border-gray-200 text-left'>
                      Product
                    </th>
                    <th className='py-2 px-4 border border-gray-200 text-left'>
                      Quantity
                    </th>
                    <th className='py-2 px-4 border border-gray-200 text-left'>
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className='text-gray-700'>
                      <td className='py-2 px-4 border border-gray-200'>
                        {item.name}
                      </td>
                      <td className='py-2 px-4 border border-gray-200'>
                        {item.quantity}
                      </td>
                      <td className='py-2 px-4 border border-gray-200'>
                        ${item.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className='flex justify-end mt-4 text-lg font-semibold'>
                Total: ${calculateTotal()}
              </div>
            </div>

            {/* Place Order Button */}
            <div className='flex justify-center'>
              <button
                type='submit'
                className='bg-blue-500 text-white py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors'
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
