'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { clearCartItems } from '@/src/slices/cartSlice';
import { toast } from 'react-toastify';
// import CheckoutSteps from '../components/CheckoutSteps';
import Spinner from '@/components/Spinner';
import { useCreateOrderMutation } from '@/src/slices/orderApiSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PlaceOrder = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      router.push(`/order/${res._id}`);
    } catch (err) {
      toast.error(err.data?.message || 'Error placing order');
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      router.push('/shipping');
    } else if (!cart.paymentMethod) {
      router.push('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, router]);

  return (
    <div>
      <Navbar />
      <div className='min-h-screen p-6 bg-gray-100'>
        {/* <CheckoutSteps step1 step2 step3 step4 /> */}
        <div className='flex flex-col lg:flex-row lg:gap-8'>
          <div className='w-full lg:w-2/3 mb-6 lg:mb-0'>
            <div className='bg-white p-6 shadow rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Shipping</h2>
              <p className='text-gray-700'>
                <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
              <hr className='my-4' />
              <h2 className='text-xl font-semibold mb-4'>Payment Method</h2>
              <p className='text-gray-700'>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
              <hr className='my-4' />
              <h2 className='text-xl font-semibold mb-4'>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.cartItems.map((item, index) => (
                  <div key={index} className='flex items-center mb-4'>
                    <img
                      src={item.image.url}
                      alt={item.name}
                      className='w-16 h-16 object-cover rounded-md'
                    />
                    <div className='flex-1 ml-4'>
                      <Link
                        href={`/product/${item.product}`}
                        className='text-blue-600'
                      >
                        {item.name}
                      </Link>
                      <p className='text-gray-500'>
                        {item.qty} x &#8358;{item.price.toLocaleString()} =
                        &#8358;
                        {(item.qty * item.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className='w-full lg:w-1/3'>
            <div className='bg-white p-6 shadow rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
              <div className='flex justify-between mb-2'>
                <span>Items</span>
                <span>&#8358;{Number(cart.itemsPrice).toLocaleString()}</span>
              </div>

              <div className='flex justify-between font-semibold text-lg mb-4'>
                <span>Total</span>
                <span>&#8358;{Number(cart.totalPrice).toLocaleString()}</span>
              </div>
              {error && <p className='text-red-600'>{error.data.message}</p>}
              <button
                type='button'
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
                className='w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors'
              >
                Place Order
              </button>
              {isLoading && <Spinner />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceOrder;
