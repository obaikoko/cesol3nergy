'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useProfileMutation,
  useUpdateUserMutation,
} from '@/src/slices/userApiSlice';
import { setCredentials } from '@/src/slices/authSlice';
import { toast } from 'react-toastify';

const UserInfo = ({ user }) => {
  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const [updateUser, { isLoading: loadingUpdateUser }] =
    useUpdateUserMutation();

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mutationFn = loggedInUser.isAdmin ? updateUser : updateProfile;

    try {
      const res = await mutationFn({
        userId: user?._id,
        ...formData,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className='w-full md:w-1/3'>
      {user && (
        <>
          {/* Profile Header */}
          <div className='flex flex-col items-center mb-8'>
            <div className='relative w-32 h-32 md:w-40 md:h-40 shadow-lg rounded-full border-4 border-purple-500 flex items-center justify-center'>
              <img
                src='/images/customer1.jpg'
                alt='Profile'
                className='w-32 h-32 md:w-40 md:h-40 rounded-full border-2 p-2'
              />
            </div>
            <h2 className='text-2xl font-semibold text-gray-800'>
              {formData.firstName} {formData.lastName}
            </h2>
            <p className='text-gray-600 mt-1'>Customer</p>
          </div>

          {/* User Info */}
          <div className='bg-white rounded-xl shadow-lg w-full max-w-lg p-6 mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Basic Info
            </h3>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                {['firstName', 'lastName', 'phone', 'address'].map((field) => (
                  <input
                    key={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleFormChange}
                    className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                ))}
                <button
                  type='submit'
                  disabled={loadingUpdateProfile || loadingUpdateUser}
                  className={`mt-4 w-full ${
                    loadingUpdateProfile || loadingUpdateUser
                      ? 'bg-gray-400'
                      : 'bg-purple-500'
                  } text-white py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 ease-in-out`}
                >
                  {loadingUpdateProfile || loadingUpdateUser
                    ? 'Updating...'
                    : 'Save changes'}
                </button>
              </form>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {formData.firstName}{' '}
                  {formData.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Address:</strong> {formData.address}
                </p>
              </>
            )}
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
