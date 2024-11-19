'use client';
import { useRouter } from 'next/navigation';
import { useCreateTransactionMutation } from '@/src/slices/transactionSlice';

const PaystackPayment = ({ order }) => {
  const router = useRouter();
  const [createTransaction, { isLoading, isError }] =
    useCreateTransactionMutation();

  const handlePayment = async () => {
    try {
      // Create a transaction on your server or API
      const res = await createTransaction({
        email: order.user.email,
        amount: order.totalPrice,
        orderId: order._id,
      }).unwrap();
      router.push(`${res.data.authorization_url}`);
      console.log(res);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className='bg-purple-500 rounded p-2 text-white'
      >
        {isLoading ? 'processing' : 'Pay now'}
      </button>
    </div>
  );
};

export default PaystackPayment;
