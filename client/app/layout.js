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
        {/* Static Metadata */}
        <title>Cesol3nergy - Solar Products & Renewable Energy Solutions</title>
        <meta
          name='description'
          content='Cesol3nergy offers premium solar panels, inverters, batteries, and renewable energy solutions. Empower your home or business with clean energy today!'
        />
        <meta
          name='keywords'
          content='solar products, renewable energy, solar panels, solar inverters, solar batteries, clean energy, Cesol3nergy'
        />
        <meta name='author' content='Cesol3nergy' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#FFD700' />

        <Head>
          {/* Open Graph Metadata */}
          <meta
            property='og:image'
            content='https://res.cloudinary.com/dqoiuy0oa/image/upload/v1731071602/IMG-20241024-WA0007_cybwwk.jpg' // Replace with your logo's path
          />
          <meta
            property='og:image:alt'
            content='Cesol3nergy - Renewable Energy Solutions Logo'
          />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />

          {/* Twitter Metadata */}
          <meta
            name='twitter:image'
            content='https://res.cloudinary.com/dqoiuy0oa/image/upload/v1731071602/IMG-20241024-WA0007_cybwwk.jpg' // Replace with your logo's path
          />
          <meta
            name='twitter:image:alt'
            content='Cesol3nergy - Renewable Energy Solutions Logo'
          />
        </Head>

        {/* Paystack script */}
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
