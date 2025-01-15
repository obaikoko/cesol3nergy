'use client';

import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import store from '../src/app/store';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { hydrateCart } from '../src/slices/cartSlice';
import Head from 'next/head';
import InactivityHandler from '@/components/InactivityHandler';

function RootProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : { cartItems: [], shippingAddress: {}, paymentMethod: '' };

    dispatch(hydrateCart(storedCart));
  }, [dispatch]);

  return (
    <>
      <Head>
        <script src='https://js.paystack.co/v1/inline.js' async></script>
      </Head>
      {children}
      <ToastContainer />
    </>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Provider store={store}>
          <InactivityHandler timeoutDuration={15 * 60 * 1000} />
          <RootProvider>{children}</RootProvider>
        </Provider>
      </body>
    </html>
  );
}
