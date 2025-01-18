import { useGetOrderDetailsQuery } from '@/src/slices/orderApiSlice';
import { usePayOrderMutation } from '@/src/slices/orderApiSlice';
import React from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

const PaidBtn = ({ order }) => {
  const params = useParams();

  const [payOrder, { isLoading, isError }] = usePayOrderMutation();
  const { refetch } = useGetOrderDetailsQuery(order._id);
  const handlePayment = async () => {
    try {
      await payOrder(order._id);
      refetch();
      toast.success('Payment successful');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className={`${
        order.isPaid && 'hidden'
      }bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors`}
      onClick={handlePayment}
    >
      {isLoading ? 'Processing...' : 'Mark as Paid'}
    </button>
  );
};

export default PaidBtn;
