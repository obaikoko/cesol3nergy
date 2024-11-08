import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://localhost:5000',
  baseUrl: 'https://cesol3nergy-server.onrender.com',
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Products', 'User', 'Oders'],
  endpoints: (builder) => ({}),
});
