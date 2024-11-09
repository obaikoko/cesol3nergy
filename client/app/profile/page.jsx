'use client';

import AccountSetting from '@/components/AccountSetting';
import OrderHistory from '@/components/OrderHistory';
import UserInfo from '@/components/UserInfo';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <>
      <Navbar />
      <div className='mx-auto mt-2'>
        <div className='flex flex-col md:flex-row md:items-start justify-center'>
          <UserInfo user={user} />
          <OrderHistory />
        </div>
        <AccountSetting user={user} />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
