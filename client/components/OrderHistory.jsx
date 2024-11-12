import React from 'react';
import { useGetMyOrdersQuery } from '@/src/slices/orderApiSlice';
import Link from 'next/link';
import Spinner from './Spinner';

const OrderHistory = () => {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  return (
    <div className='overflow-x-hidden'>
      <h2 className='text-xl font-semibold mb-4'>Ordered History</h2>
      {!orders && isLoading && (
        <div className='flex items-center justify-center'>
          <Spinner sync={true} size={10} />
        </div>
      )}
      {/* Table view for medium and larger screens */}
      <div className=' overflow-x-auto'>
        <table className='w-full bg-white shadow-md rounded-lg'>
          <thead>
            <tr className='bg-purple-600 text-white'>
              <th className='py-3 px-4 text-left'>Order ID</th>
              <th className='py-3 px-4 text-left'>Amount</th>
              <th className='py-3 px-4 text-left'>Payment </th>
              <th className='py-3 px-4 text-left'>Delivered</th>
              <th className='py-3 px-4 text-left'>Actions</th>
            </tr>
          </thead>

          {orders && !isLoading && !isError && (
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className='border-b'>
                  <td className='py-3 px-4'>{order._id}</td>

                  <td className='py-3 px-4'>
                    &#8358;{order.totalPrice.toLocaleString()}
                  </td>
                  <td className='py-3 px-4'>
                    {order.isPaid ? 'Paid' : 'Not Paid'}
                  </td>
                  <td className='py-3 px-4'>
                    {order.isPaidisDelivered ? 'Delivered' : 'Not Delivered'}
                  </td>
                  <td className='py-3 px-4'>
                    <Link
                      href={`/order/${order._id}`}
                      className='text-blue-500 hover:underline'
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
