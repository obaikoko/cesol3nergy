'use client';
import { Suspense, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/src/slices/userApiSlice';
import { setCredentials } from '@/src/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Spinner from '@/components/Spinner';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      toast.success(`Welcome ${res.firstName} ${res.lastName}`);
      if (res.isAdmin) {
        router.push(`/dashboard`);
      } else {
        router.push(redirect);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='min-h-screen flex flex-col justify-center bg-purple-100'>
        <div className='flex items-center justify-center'>
          <form
            className='bg-white p-10 rounded-lg shadow-lg max-w-md w-full'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col items-center mb-6'>
              <h1 className='text-3xl font-bold text-purple-950 mb-4'>
                Cesol3nergy
              </h1>
              <h1>SIGN IN</h1>
            </div>

            <div className='mb-4 w-full'>
              <label
                htmlFor='email'
                className='block text-purple-950 font-bold mb-2'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950'
              />
            </div>

            <div className='mb-6 w-full relative'>
              <label
                htmlFor='password'
                className='block text-purple-950 font-bold mb-2'
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                value={password}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950'
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-10 cursor-pointer text-gray-600'
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-900 transition-colors'
            >
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>

            <div className='mt-6 flex flex-col items-center'>
              <p className='text-gray-600'>Don't have an account?</p>
              <Link
                href='/create-account'
                className='text-purple-950 hover:underline mt-2'
              >
                Create Account
              </Link>
              <Link
                href='/forget-password'
                className='text-purple-950 hover:underline mt-2'
              >
                Forgotten password?
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Login = () => {
  return (
    <Suspense fallback={<Spinner clip={true} size={150} />}>
      <LoginPage />
    </Suspense>
  );
};

export default Login;
