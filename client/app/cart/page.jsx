'use client';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '@/src/slices/cartSlice';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const metadata = {
  title: 'Cesol3nergy - Solar Products & Renewable Energy Solutions',
  description:
    'Cesol3nergy offers premium solar panels, inverters, batteries, and renewable energy solutions. Empower your home or business with clean energy today!',
  keywords:
    'solar products, renewable energy, solar panels, solar inverters, solar batteries, clean energy, Cesol3nergy',
  image: '/images/logo.jpg',
};



export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = cart;

  // Update quantity
  const handleQuantityChange = (item, amount) => {
    const newQty = Math.max(1, item.qty + amount);
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  // Remove item
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total
  const calculateTotal = cartItems
    .reduce((total, item) => total + item.price * item.qty, 0)
    .toFixed(2);
  const checkOutHandler = () => {
    if (user) {
      router.push('/shipping');
    } else {
      router.push('/login?redirect=shipping');
      // router.push('/login');
    }
  };

  return (
    <div>
      <Navbar />

      <div className='md:flex md:flex-col items-center p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 md:p-8 mb-8 transform transition-transform '>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            Shopping Cart
          </h2>

          {cartItems.length === 0 ? (
            <p className='text-gray-600'>Your cart is empty.</p>
          ) : (
            <div className=' overflow-x-auto'>
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
                    <tr key={item._id} className='text-gray-700'>
                      <td className='py-2 px-4 border border-gray-200'>
                        {item.name}
                      </td>
                      <td className='py-2 px-4 border border-gray-200'>
                        &#8358;{item.price.toLocaleString()}
                      </td>
                      <td className='py-2 px-4 border border-gray-200'>
                        <div className='flex items-center space-x-2'>
                          <button
                            onClick={() => handleQuantityChange(item, -1)}
                            className='bg-gray-200 px-2 rounded hover:bg-gray-300 transition-colors'
                          >
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => handleQuantityChange(item, 1)}
                            className='bg-gray-200 px-2 rounded hover:bg-gray-300 transition-colors'
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className='py-2 px-4 border border-gray-200'>
                        &#8358;
                        {(item.price * item.qty).toLocaleString()}
                      </td>
                      <td className='py-2 px-4 border border-gray-200 text-center'>
                        <button
                          onClick={() => handleRemoveItem(item._id)}
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
              <div className='flex  flex-col md:flex-row md:justify-between items-center border-t border-gray-200 pt-4'>
                <div className='text-lg font-semibold text-gray-800'>
                  Total: &#8358;{Number(calculateTotal).toLocaleString()}
                </div>
                <button
                  onClick={checkOutHandler}
                  className=' my-2 bg-gradient-to-r from-purple-500 to-orange-600 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition-colors'
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
