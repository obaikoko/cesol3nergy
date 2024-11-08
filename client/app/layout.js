'use client';

import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import store from '../src/app/store';
import { Provider } from 'react-redux';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
