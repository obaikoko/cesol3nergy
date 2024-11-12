'use client';
import { useGetUserDetailsQuery } from '@/src/slices/userApiSlice';
import AccountSetting from '@/components/AccountSetting';
import OrderHistory from '@/components/OrderHistory';
import UserInfo from '@/components/UserInfo';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Spinner from '@/components/Spinner';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isLoggedIn, setIsLogged] = useState('');

  const { data, isLoading, isError } = useGetUserDetailsQuery(id);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    setIsLogged(user);
  }, [user]);
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
  } else if (!data && !isLoading && isError) {
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
          {isLoggedIn && isLoggedIn.isAdmin ? (
            <UserInfo user={data} />
          ) : (
            <UserInfo user={isLoggedIn} />
          )}

          <OrderHistory />
        </div>
        <AccountSetting user={data} />
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
