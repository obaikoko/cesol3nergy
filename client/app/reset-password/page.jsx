'use client';
import { useState, Suspense } from 'react';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import { useResetPasswordMutation } from '@/src/slices/userApiSlice';
import { useRouter, useSearchParams } from 'next/navigation';

function resetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: '',
    newPassword2: '',
  });

  // Wrap this part in Suspense
  return (
    <Suspense fallback={<Spinner />}>
      <PasswordForm
        formData={formData}
        setFormData={setFormData}
        useResetPasswordMutation={useResetPasswordMutation}
        useSearchParams={useSearchParams}
        router={router}
      />
    </Suspense>
  );
}

function PasswordForm({
  formData,
  setFormData,
  useResetPasswordMutation,
  useSearchParams,
  router,
}) {
  const { newPassword, newPassword2 } = formData;
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      toast.error('Passwords do not match!');
    } else {
      try {
        const res = await resetPassword({ newPassword, token }).unwrap();
        toast.success(`${res}`);
        router.push('/login');
      } catch (err) {
        console.log(err?.data?.message || err.error);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
      {/* Rest of your JSX remains the same */}
      <div className='bg-blue-950 h-20'></div>
      <div className='min-h-screen flex flex-col justify-center bg-blue-100'>
        <div className='flex items-center justify-center'>
          <form
            className='bg-white p-10 rounded-lg shadow-lg max-w-md w-full'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col items-center mb-6'>
              <h1 className='text-3xl font-bold text-purple-950 mb-4'>
                Cesol3nergy
              </h1>
              <h1>RESET PASSWORD</h1>
            </div>

            <div className='mb-4 w-full'>
              <label
                htmlFor='newPassword'
                className='block text-blue-950 font-bold mb-2'
              >
                Enter New Password
              </label>
              <input
                type='password'
                name='newPassword'
                id='newPassword'
                value={newPassword}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950'
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                htmlFor='newPassword2'
                className='block text-blue-950 font-bold mb-2'
              >
                Confirm Password
              </label>
              <input
                type='password'
                name='newPassword2'
                id='newPassword2'
                value={newPassword2}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-purple-700 to-orange-500 text-white py-2 rounded-md hover:bg-purple-900 transition-colors'
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default resetPassword;
