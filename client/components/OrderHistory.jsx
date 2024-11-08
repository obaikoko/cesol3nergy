import React from 'react';

const OrderHistory = () => {
  const orderHistory = [
    {
      orderId: '12345',
      totalAmount: '$300.00',
      paymentStatus: 'Paid',
      deliveryStatus: 'Delivered',
      date: 'October 15, 2024',
    },
    {
      orderId: '67890',
      totalAmount: '$450.00',
      paymentStatus: 'Pending',
      deliveryStatus: 'Processing',
      date: 'November 5, 2024',
    },
    // Add more orders as needed
  ];
  return (
    <div>
      
      {/* Order History Table */}
      <div className='bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 mb-8 transform transition-transform overflow-auto max-h-screen'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          Order History
        </h3>
        {orderHistory ? (<table className='min-w-full border-collapse border border-gray-200'>
          <thead>
            <tr className='bg-gray-100 text-gray-600 text-sm uppercase'>
              <th className='py-3 px-4 border border-gray-200 text-left'>
                Order ID
              </th>
              <th className='py-3 px-4 border border-gray-200 text-left'>
                Total Amount
              </th>
              <th className='py-3 px-4 border border-gray-200 text-left'>
                Payment Status
              </th>
              <th className='py-3 px-4 border border-gray-200 text-left'>
                Delivery Status
              </th>
              <th className='py-3 px-4 border border-gray-200 text-left'>
                Date
              </th>
              <th className='py-3 px-4 border border-gray-200 text-center'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-3 px-4 border border-gray-200'>
                  {order.orderId}
                </td>
                <td className='py-3 px-4 border border-gray-200'>
                  {order.totalAmount}
                </td>
                <td className='py-3 px-4 border border-gray-200'>
                  {order.paymentStatus}
                </td>
                <td className='py-3 px-4 border border-gray-200'>
                  {order.deliveryStatus}
                </td>
                <td className='py-3 px-4 border border-gray-200'>
                  {order.date}
                </td>
                <td className='py-3 px-4 border border-gray-200 text-center'>
                  <button className='bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600 transition-colors'>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>) : ('you have not made any order yet')}
        
      </div>
    </div>
  );
};

export default OrderHistory;
