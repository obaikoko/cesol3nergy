import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
        credentials: 'include',
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        method: 'GET',
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),

    payOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/pay/${orderId}`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: (page) => ({
        url: `${ORDERS_URL}/?pageNumber=${page}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),
    getUserOrders: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/user/${id}`,
        credentials: 'include',
      }),
      keepUnusedDataFor: 5,
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useGetUserOrdersQuery,
  useDeliverOrderMutation,
} = ordersApiSlice;
