'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation } from '@/src/slices/userApiSlice';
import { setCredentials } from '@/src/slices/authSlice';
import { toast } from 'react-toastify';

const UserInfo = ({user}) => {
  const dispatch = useDispatch();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const { firstName, lastName, email, phone, address } = formData;
  

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures that this code runs only on the client-side
    setIsClient(true);
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({
        firstName,
        lastName,
        email,
        phone,
        address,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update profile');
    }
  };

  // Early return while waiting for the client to hydrate
  if (!isClient) return null;

  return (
    <div className='w-full md:w-1/3'>
      {user && (
        <>
          {/* Profile Header */}
          <div className='flex flex-col items-center mb-8'>
            <div className='relative w-32 h-32 md:w-40 md:h-40 m-2 shadow-lg rounded-full border-4 border-purple-500 flex items-center justify-center'>
              <img
                src={'/images/customer1.jpg'}
                alt='Profile'
                className='relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 p-2'
              />
            </div>
            <h2 className='text-2xl font-semibold text-gray-800'>
              {user.firstName} {user.lastName}
            </h2>
            <p className='text-gray-600 mt-1'>Customer</p>
          </div>

          {/* User Info */}
          <div className='bg-white rounded-xl shadow-lg w-full max-w-lg p-6 mb-8 transform transition-transform'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Basic Info
            </h3>
            <div className='space-y-4'>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <input
                    name='firstName'
                    value={firstName}
                    onChange={handleFormChange}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='First Name'
                  />
                  <input
                    name='lastName'
                    value={lastName}
                    onChange={handleFormChange}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Last Name'
                  />
                  <input
                    name='phone'
                    value={phone}
                    onChange={handleFormChange}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Phone'
                  />
                  <input
                    name='address'
                    value={address}
                    onChange={handleFormChange}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder='Address'
                  />
                  <button
                    type='submit'
                    disabled={loadingUpdateProfile}
                    className={`mt-4 w-full ${
                      loadingUpdateProfile ? 'bg-gray-400' : 'bg-purple-500'
                    } text-white py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 ease-in-out`}
                  >
                    {loadingUpdateProfile ? 'Updating...' : 'Save changes'}
                  </button>
                </form>
              ) : (
                <>
                  <p>
                    <strong>Name:</strong> {user.firstName} {user.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {user.address}
                  </p>
                </>
              )}
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className='mt-4 w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 ease-in-out'
              >
                Edit profile
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
