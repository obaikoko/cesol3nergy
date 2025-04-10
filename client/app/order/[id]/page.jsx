'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Spinner from '@/components/Spinner';
import { useGetOrderDetailsQuery } from '@/src/slices/orderApiSlice';
import { useParams } from 'next/navigation';
import PaystackPayment from '@/components/PaystackPayment';
import { formatDateTime } from '@/utils';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DeliveredBtn from '@/components/DeliveredBtn';
import PaidBtn from '@/components/PaidBtn';

const OrderDetailsPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const {
    data: order,
    isLoading: loadingOrder,
    isError: orderError,
  } = useGetOrderDetailsQuery(id);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, user);

  return (
    <div>
      <Navbar />
      {loadingOrder && (
        <div className='flex items-center justify-center'>
          <Spinner sync={true} size={10} />
        </div>
      )}
      {!loadingOrder &&
        !order &&
        orderError &&
        'Unable to fetch, please check back later.'}
      {!loadingOrder && order && !orderError && (
        <>
          <div className='flex flex-col items-center p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 md:p-8 mb-8 transform transition-transform '>
              <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                Order Details
              </h2>

              {/* Order Summary */}
              <div className='border-b border-gray-200 pb-4 mb-6'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  Order Summary
                </h3>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Order Date:</strong> {formatDateTime(order.createdAt)}
                </p>
                <p>
                  <strong>Total Amount:</strong> &#8358;
                  {order.totalPrice.toLocaleString()}
                </p>
                <p>
                  <strong>Payment Status:</strong>{' '}
                  {order.isPaid ? 'Paid' : 'Not Paid'}
                </p>
                {order.isPaid && (
                  <p>
                    <strong>Payment Date:</strong>{' '}
                    {formatDateTime(order.paidAt)}
                  </p>
                )}

                <p>
                  <strong>Delivery Status:</strong>{' '}
                  {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                </p>
                {order.isDelivered && (
                  <p>
                    <strong>Delivery Date:</strong>{' '}
                    {formatDateTime(order.deliveredAt)}
                  </p>
                )}
              </div>

              {/* Customer Information */}
              <div className='border-b border-gray-200 pb-4 mb-6'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  Customer Information
                </h3>
                <p>
                  <strong>Name:</strong> {order.user?.firstName}{' '}
                  {order.user?.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {order.user?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {order.user?.phone}
                </p>
                <p>
                  <strong>Delivery Address:</strong>{' '}
                  {order.shippingAddress.address} {order.shippingAddress.city}{' '}
                  {order.shippingAddress.country}{' '}
                  {order.shippingAddress.postalCode}
                </p>
              </div>

              {/* Ordered Items */}
              <div className='border-b border-gray-200 pb-4 mb-6'>
                <h3 className='text-lg font-semibold text-gray-700'>
                  Ordered Items
                </h3>
                <table className='min-w-full border-collapse border border-gray-200 mt-2'>
                  <thead>
                    <tr className='bg-gray-100 text-gray-600 text-sm uppercase'>
                      <th className='py-2 px-4 border border-gray-200 text-left'>
                        Item
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
                    {order.orderItems.map((item, index) => (
                      <tr key={index} className='text-gray-700'>
                        <td className='py-2 px-4 border border-gray-200'>
                          {item.name}
                        </td>
                        <td className='py-2 px-4 border border-gray-200'>
                          {item.qty}
                        </td>
                        <td className='py-2 px-4 border border-gray-200'>
                          &#8358;{item.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className='flex justify-end space-x-4'>
                <PaystackPayment order={order} />
                {user && user.isAdmin ? (
                  <>
                    {order.isPaid === 1 ? (
                      <>
                        <DeliveredBtn order={order} />
                      </>
                    ) : (
                      <>
                        <PaidBtn order={order} />
                        <DeliveredBtn order={order} />
                      </>
                    )}
                  </>
                ) : (
                  <Link
                    href='/profile'
                    className='bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors'
                  >
                    Back to Profile
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
