import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import ConfirmationModal from './ConfirmationModal';
import {
  useDeleteAccountMutation,
  useDeleteUserMutation,
  useLogoutMutation,
} from '@/src/slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/src/slices/authSlice';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AccountSetting = ({ user }) => {
  const { id } = useParams();
  const router = useRouter();
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [deleteAccount, { isLoading: loadingDeleteAccount }] =
    useDeleteAccountMutation();
  const [deleteUser, { isLoading: loadingDeleteUser }] =
    useDeleteUserMutation();
  const [logoutApi] = useLogoutMutation();

  const handleDelete = async () => {
    const mutationFn = loggedInUser.isAdmin ? deleteUser : deleteAccount;

    try {
      const res = await mutationFn({ userId: id }).unwrap();

      if (res.error) {
        toast.info(res.error.data.message);
      } else {
        toast.success('Account deleted successfully');
        if (loggedInUser.isAdmin) {
          router.push('/dashboard');
        } else {
          await logoutApi().unwrap();
          dispatch(logout());
          router.push('/products');
        }
      }
    } catch (err) {
      toast.error(
        err?.data?.message || 'An error occurred while deleting the account'
      );
    }

    setShowModal(false); // Close the modal after deletion
  };

  return (
    <div>
      {/* Account Settings */}
      <div className='bg-white rounded-xl shadow-lg w-full max-w-lg p-6'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4'>
          Account Settings
        </h3>
        <div className='space-y-3'>
          <ChangePassword user={user} />
          <button
            className='w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-200'
            onClick={() => setShowModal(true)}
          >
            {loadingDeleteAccount || loadingDeleteUser
              ? 'Deleting...'
              : 'Delete Account'}
          </button>
          <ConfirmationModal
            isOpen={showModal}
            message='Are you sure you want to delete your account? All records will be lost.'
            onConfirm={handleDelete} // Trigger the delete action on confirmation
            onCancel={() => setShowModal(false)} // Close modal without action
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
