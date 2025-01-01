import { apiSlice } from './apiSlice';
import { CONTACT_URL } from '../constants';

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    makeContact: builder.mutation({
      query: (data) => ({
        url: `${CONTACT_URL}/`,
        method: 'POST',
        body: data,
      }),
   
    }),
  }),
});

export const { useMakeContactMutation } = contactApiSlice;
