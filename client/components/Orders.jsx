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
      <div className=' overflow-x-auto'>
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

     
    </div>
  );
};

export default Orders;
