import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../constants';
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page) => ({
        url: `${PRODUCTS_URL}?pageNumber=${page}`, 
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    searchProducts: builder.query({
      query: ({ keyword, category, page }) => ({
        url: `${PRODUCTS_URL}?keyword=${keyword}&category=${category}&pageNumber=${page}`,
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
