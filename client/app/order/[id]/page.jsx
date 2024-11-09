import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';

export default function OrderDetailsPage() {
  // Sample data for order details
  const order = {
    orderId: '12345',
    orderDate: 'October 15, 2024',
    customerName: 'John Doe',
    customerEmail: 'johndoe@example.com',
    customerPhone: '123-456-7890',
    deliveryAddress: '123 Solar Street, Sun City',
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
    totalAmount: '$300.00',
    items: [
      { name: 'Solar Generator', quantity: 1, price: '$200.00' },
      { name: 'Solar Panel', quantity: 2, price: '$50.00 each' },
    ],
    notes: 'Leave package at the front door if nobody is home.',
  };

  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center p-6 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 md:p-8 mb-8 transform transition-transform hover:scale-105'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Order Details
          </h2>

          {/* Order Summary */}
          <div className='border-b border-gray-200 pb-4 mb-6'>
            <h3 className='text-lg font-semibold text-gray-700'>
              Order Summary
            </h3>
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>Order Date:</strong> {order.orderDate}
            </p>
            <p>
              <strong>Total Amount:</strong> {order.totalAmount}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>
            <p>
              <strong>Delivery Status:</strong> {order.deliveryStatus}
            </p>
          </div>

          {/* Customer Information */}
          <div className='border-b border-gray-200 pb-4 mb-6'>
            <h3 className='text-lg font-semibold text-gray-700'>
              Customer Information
            </h3>
            <p>
              <strong>Name:</strong> {order.customerName}
            </p>
            <p>
              <strong>Email:</strong> {order.customerEmail}
            </p>
            <p>
              <strong>Phone:</strong> {order.customerPhone}
            </p>
            <p>
              <strong>Delivery Address:</strong> {order.deliveryAddress}
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
                {order.items.map((item, index) => (
                  <tr key={index} className='text-gray-700'>
                    <td className='py-2 px-4 border border-gray-200'>
                      {item.name}
                    </td>
                    <td className='py-2 px-4 border border-gray-200'>
                      {item.quantity}
                    </td>
                    <td className='py-2 px-4 border border-gray-200'>
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Notes */}
          <div className='mb-6'>
            <h3 className='text-lg font-semibold text-gray-700'>
              Additional Notes
            </h3>
            <p>{order.notes}</p>
          </div>

          {/* Actions */}
          <div className='flex justify-end space-x-4'>
            <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors'>
              Contact Support
            </button>
            <button className='bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors'>
              Back to Orders
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
