'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Resizer from 'react-image-file-resizer';
import {
  useGetProfileQuery,
  useProfileMutation,
  useUpdateUserMutation,
} from '@/src/slices/userApiSlice';
import { toast } from 'react-toastify';

const UserInfo = ({ user }) => {
  const [image, setImage] = useState(null);
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { data: profile, isLoading, refetch } = useGetProfileQuery();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const { firstName, lastName, email, phone, address } = formData;

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

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        640,
        510,
        'JPEG',
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const resizedImage = await resizeFile(file);
        setImage(resizedImage);

        // toast.success('Image uploaded successfully!');
      } catch (error) {
        toast.error('Error resizing image');
        console.error('Error resizing image:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mutationFn = loggedInUser.isAdmin ? updateUser : updateProfile;

    try {
      const res = await mutationFn({
        userId: user?._id,
        firstName,
        lastName,
        phone,
        address,
        image,
      }).unwrap();
      // dispatch(setCredentials(res));
      toast.success('Profile updated successfully');
      refetch();
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
                src={user?.image?.url || '/images/profile.jpg'}
                alt='Profile image'
                className='w-32 h-32 md:w-40 md:h-40 rounded-full border-2 p-2'
              />
            </div>

            <h2 className='text-2xl font-semibold text-gray-800'>
              {formData.firstName} {formData.lastName}
            </h2>
            <p className='text-sm text-purple-600 mt-1'>UserID - {user._id}</p>
            <p className='text-gray-600 mt-1'>
              {user.isAdmin ? 'Aministrator' : 'User'}
            </p>
          </div>

          {/* User Info */}
          <div className='bg-white rounded-xl shadow-lg w-full max-w-lg p-6 mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Basic Info
            </h3>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={firstName}
                  onChange={handleFormChange}
                  className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='First Name'
                />

                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={lastName}
                  onChange={handleFormChange}
                  className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Last Name'
                />
                <input
                  type='number'
                  id='phone'
                  name='phone'
                  value={phone}
                  onChange={handleFormChange}
                  className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Phone Number'
                />
                <input
                  type='text'
                  id='address'
                  name='address'
                  value={address}
                  onChange={handleFormChange}
                  className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                  placeholder='Address'
                />

                <div>
                  <label htmlFor='file-input'>Update Profile Picture</label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    id='file-input'
                  />
                </div>
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
