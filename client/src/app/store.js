import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/apiSlice';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
