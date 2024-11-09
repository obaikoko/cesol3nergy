import React from 'react';

const Orders = () => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Order Management</h2>
      <table className='w-full bg-white shadow-md rounded-lg overflow-x-auto'>
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
          {/* Dummy data rows */}
          <tr className='border-b'>
            <td className='py-3 px-4'>#1001</td>
            <td className='py-3 px-4'>John Doe</td>
            <td className='py-3 px-4'>$150</td>
            <td className='py-3 px-4'>Delivered</td>
            <td className='py-3 px-4'>
              <button className='text-blue-500 hover:underline'>View</button>
            </td>
          </tr>
          <tr className='border-b'>
            <td className='py-3 px-4'>#1002</td>
            <td className='py-3 px-4'>Jane Smith</td>
            <td className='py-3 px-4'>$250</td>
            <td className='py-3 px-4'>Pending</td>
            <td className='py-3 px-4'>
              <button className='text-blue-500 hover:underline'>View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
