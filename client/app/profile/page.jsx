'use client';
import { useGetProfileQuery } from '@/src/slices/userApiSlice';
import AccountSetting from '@/components/AccountSetting';
import OrderHistory from '@/components/OrderHistory';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';
import UserInfo from '@/components/UserInfo';
import { useGetMyOrdersQuery } from '@/src/slices/orderApiSlice';

const ProfilePage = () => {
  const router = useRouter();
  const {user} = useSelector(state => state.auth)

  const [isLoggedIn, setIsLogged] = useState('');

  const { data: profile, isLoading } = useGetProfileQuery();
  const { data: orders } = useGetMyOrdersQuery();
 
  

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
    setIsLogged(profile);
  }, [profile]);
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className='flex items-center '>
          <Spinner sync={true} size={10} />
        </div>
        <Footer />
      </>
    );
  } else if (!profile && !isLoading) {
    return (
      <div>
        <Navbar />
        <p>Unable to retrieve data, Please try again later</p>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className='mx-auto mt-2'>
        <div className='flex flex-col md:flex-row md:items-start justify-center'>
          <UserInfo user={profile} />

          <OrderHistory orders={orders} />
        </div>
        <AccountSetting user={profile} />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
