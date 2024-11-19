import { apiSlice } from './apiSlice';
import { TRANSACTION_URL } from '../constants';
export const trancasctionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (data) => ({
        url: `${TRANSACTION_URL}/initialize`,
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['TRANSACTIONS'],
    }),
  }),
});

export const { useCreateTransactionMutation } = trancasctionApiSlice;
