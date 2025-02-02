'use client';
import { Suspense, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '@/src/slices/userApiSlice';
import { setCredentials } from '@/src/slices/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';
import Spinner from '@/components/Spinner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function RegisterPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const { firstName, lastName, phone, address, password, confirmPassword } =
    formData;

  const [register, { isLoading }] = useRegisterMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await register({
        token,
        firstName,
        lastName,
        phone,
        address,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));

      toast.success(
        `Welcome to CESOL3NERGY, ${res.firstName} ${res.lastName}!`
      );
      router.push(`/profile`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen flex flex-col justify-center bg-purple-100'>
        <div className='flex items-center justify-center'>
          <form
            className='bg-white my-4 p-10 rounded-lg shadow-lg max-w-md w-full'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col items-center mb-6'>
              <h1 className='text-3xl font-bold text-purple-950 mb-4'>
                CESOL3NERGY
              </h1>
              <h2 className='text-lg text-gray-700'>Create an Account</h2>
            </div>

            <div className='mb-4 w-full'>
              <label
                htmlFor='firstName'
                className='block text-purple-950 font-bold mb-2'
              >
                First Name
              </label>
              <input
                type='text'
                name='firstName'
                id='firstName'
                value={firstName}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950'
              />
            </div>

            <div className='mb-4 w-full'>
              <label
                htmlFor='lastName'
                className='block text-purple-950 font-bold mb-2'
              >
                Last Name
              </label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                value={lastName}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950'
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                htmlFor='email'
                className='block text-purple-950 font-bold mb-2'
              >
                Phone Number
              </label>
              <input
                type='number'
                name='phone'
                id='phone'
                value={phone}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950'
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                htmlFor='email'
                className='block text-purple-950 font-bold mb-2'
              >
                Address
              </label>
              <input
                type='text'
                name='address'
                id='address'
                value={address}
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

            <div className='mb-6 w-full relative'>
              <label
                htmlFor='confirmPassword'
                className='block text-purple-950 font-bold mb-2'
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
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
              className='w-full bg-gradient-to-r from-purple-700 to-orange-500 text-white py-2 rounded-md hover:bg-purple-900 transition-colors'
            >
              {isLoading ? 'Creating Account...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

const Register = () => {
  return (
    <Suspense fallback={<Spinner clip={true} size={150} />}>
      <RegisterPage />
    </Suspense>
  );
};

export default Register;
