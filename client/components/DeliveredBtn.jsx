import { useDeliverOrderMutation, useGetOrderDetailsQuery } from '@/src/slices/orderApiSlice';

const DeliveredBtn = ({ order }) => {
  const [deliverOrder, { isLoading, isError }] = useDeliverOrderMutation();
  const { refetch } = useGetOrderDetailsQuery(order._id);

  const deliverHandler = async () => {
    await deliverOrder(order._id);
    refetch();
  };
  return (
    <button
      className={`${order.isDelivered ? 'bg-purple-600' : 'bg-green-600'} rounded p-2 text-white`}
      onClick={deliverHandler}
      disabled={order.isDelivered}
    >
      {isLoading
        ? 'Processing...'
        : order.isDelivered
        ? 'Delivered'
        : ' Mark as delivered'}
    </button>
  );
};

export default DeliveredBtn;
