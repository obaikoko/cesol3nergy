import { apiSlice } from './apiSlice';
import { DATA_URL } from '../constants';
import { includes } from 'lodash';
export const dataApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => ({
        url: `${DATA_URL}`,
        credentials: 'include',
      }),
      invalidatesTags: ['Data'],
    }),
  }),
});

export const { useGetDataQuery } = dataApiSlice;
