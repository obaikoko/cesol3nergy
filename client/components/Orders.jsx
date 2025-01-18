import React, { useEffect, useState } from 'react';
import { useGetOrdersQuery } from '@/src/slices/orderApiSlice';
import Link from 'next/link';
import Spinner from './Spinner';
import Pagination from './Pagination';
import { debounce } from 'lodash';

const Orders = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { data, isLoading, isError } = useGetOrdersQuery(page);
  const totalPages = (data && data.totalPages) || 1;

  useEffect(() => {
    setLoading(isLoading);
    if (isError) {
      setLoading(false);
    }
  }, [data, isError, page]);

  const handlePageChange = debounce((newPage) => {
    if (newPage !== page) {
      setLoading(true);
      setPage(newPage);
    }
  }, 300);
  return (
    <div className='overflow-x-hidden'>
      <h2 className='text-xl font-semibold mb-4'>Order Management</h2>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <Spinner sync={true} size={10} />
        </div>
      ) : (
        <div className=' overflow-x-auto'>
          <table className='w-full bg-white shadow-md rounded-lg'>
            <thead>
              <tr className='bg-purple-950 text-white'>
                <th className='py-3 px-4 text-left'>Order ID</th>
                <th className='py-3 px-4 text-left'>Customer</th>
                <th className='py-3 px-4 text-left'>Total Amount</th>
                <th className='py-3 px-4 text-left'>Payment </th>
                <th className='py-3 px-4 text-left'>Delivered</th>

                <th className='py-3 px-4 text-left'>Actions</th>
              </tr>
            </thead>

            {data && !isLoading && !isError && (
              <tbody>
                {data.orders &&
                  data.orders.map((order) => (
                    <tr key={order._id} className='border-b'>
                      <td className='py-3 px-4'>{order._id}</td>
                      <td className='py-3 px-4'>
                        {order.user?.firstName} {order.user?.lastName}
                      </td>
                      <td className='py-3 px-4'>
                        &#8358;{order.totalPrice.toLocaleString()}
                      </td>
                      <td className='py-3 px-4'>
                        {order.isPaid ? 'Paid' : 'Not Paid'}
                      </td>
                      <td className='py-3 px-4'>
                        {order.isDelivered ? 'Delivered' : 'Not Delivered'}
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
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Orders;
