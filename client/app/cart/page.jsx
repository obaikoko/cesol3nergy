'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function CartPage() {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Solar Generator', price: 200.0, quantity: 1 },
    { id: 2, name: 'Solar Panel', price: 50.0, quantity: 2 },
    { id: 3, name: 'Inverter', price: 150.0, quantity: 1 },
  ]);

  // Calculate total
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Increase or decrease quantity
  const handleQuantityChange = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Navbar />

      <div className='flex flex-col items-center p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 md:p-8 mb-8 transform transition-transform hover:scale-105'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            Shopping Cart
          </h2>

          {cartItems.length === 0 ? (
            <p className='text-gray-600'>Your cart is empty.</p>
          ) : (
            <>
              {/* Cart Items Table */}
              <table className='min-w-full border-collapse border border-gray-200 mb-6'>
                <thead>
                  <tr className='bg-gray-100 text-gray-600 text-sm uppercase'>
                    <th className='py-2 px-4 border border-gray-200 text-left'>
                      Product
                    </th>
                    <th className='py-2 px-4 border border-gray-200 text-left'>
                      Price
                    </th>
                    <th className='py-2 px-4 border border-gray-200 text-left'>
                      Quantity
                    </th>
                    <th className='py-2 px-4 border border-gray-200 text-left'>
                      Total
                    </th>
                    <th className='py-2 px-4 border border-gray-200 text-center'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className='text-gray-700'>
                      <td className='py-2 px-4 border border-gray-200'>
                        {item.name}
                      </td>
                      <td className='py-2 px-4 border border-gray-200'>
                        ${item.price.toFixed(2)}
                      </td>
                      <td className='py-2 px-4 border border-gray-200'>
                        <div className='flex items-center space-x-2'>
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className='bg-gray-200 px-2 rounded hover:bg-gray-300 transition-colors'
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className='bg-gray-200 px-2 rounded hover:bg-gray-300 transition-colors'
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className='py-2 px-4 border border-gray-200'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className='py-2 px-4 border border-gray-200 text-center'>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className='bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors'
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Cart Summary */}
              <div className='flex justify-between items-center border-t border-gray-200 pt-4'>
                <div className='text-lg font-semibold text-gray-800'>
                  Total: ${calculateTotal()}
                </div>
                <button className='bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors'>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
