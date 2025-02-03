import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://api.cesol3nergy.com',
  baseUrl: 'http://localhost:5000',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Products', 'User', 'Oders', 'Data', 'TRANSACTIONS'],
  endpoints: (builder) => ({}),
});
