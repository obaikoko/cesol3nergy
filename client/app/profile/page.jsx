'use client';

import AccountSetting from '@/components/AccountSetting';
import OrderHistory from '@/components/OrderHistory';
import UserInfo from '@/components/UserInfo';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);
  return (
    <div className='mx-auto mt-2'>
      <div className='flex flex-col md:flex-row md:items-start justify-center'>
        <UserInfo user={user} />
        <OrderHistory />
      </div>
      <AccountSetting user={user} />
    </div>
  );
};

export default ProfilePage;
