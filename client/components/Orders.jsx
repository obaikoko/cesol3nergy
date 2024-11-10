import React from 'react';

const Orders = () => {
  const orders = [
    { id: '#1001', customer: 'John Doe', total: '$150', status: 'Delivered' },
    { id: '#1002', customer: 'Jane Smith', total: '$250', status: 'Pending' },
    // Add more orders here as needed
  ];

  return (
    <div className='overflow-x-hidden'>
      <h2 className='text-xl font-semibold mb-4'>Order Management</h2>

      {/* Table view for medium and larger screens */}
      <div className='hidden sm:block overflow-x-auto'>
        <table className='w-full bg-white shadow-md rounded-lg'>
          <thead>
            <tr className='bg-purple-950 text-white'>
              <th className='py-3 px-4 text-left'>Order ID</th>
              <th className='py-3 px-4 text-left'>Customer</th>
              <th className='py-3 px-4 text-left'>Total Amount</th>
              <th className='py-3 px-4 text-left'>Status</th>
              <th className='py-3 px-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className='border-b'>
                <td className='py-3 px-4'>{order.id}</td>
                <td className='py-3 px-4'>{order.customer}</td>
                <td className='py-3 px-4'>{order.total}</td>
                <td className='py-3 px-4'>{order.status}</td>
                <td className='py-3 px-4'>
                  <button className='text-blue-500 hover:underline'>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for smaller screens */}
      <div className='block sm:hidden space-y-4'>
        {orders.map((order) => (
          <div key={order.id} className='bg-white shadow-md rounded-lg p-4'>
            <p className='text-gray-700 font-semibold'>Order ID: {order.id}</p>
            <p className='text-gray-600'>Customer: {order.customer}</p>
            <p className='text-gray-600'>Total Amount: {order.total}</p>
            <p className='text-gray-600'>Status: {order.status}</p>
            <button className='mt-2 text-blue-500 hover:underline'>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
