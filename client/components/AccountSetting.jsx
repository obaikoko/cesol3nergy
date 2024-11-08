import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import { useDeleteAccountMutation } from '@/src/slices/userApiSlice';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '@/src/slices/userApiSlice';
import { logout } from '@/src/slices/authSlice';

const AccountSetting = ({ user }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [deleteAccount, { isLoading, isError }] = useDeleteAccountMutation();
  const [logoutApi] = useLogoutMutation();


  const handleDelete = async () => {
    try {
      const res = await deleteAccount();

      if (res.error) {
        toast.info(res.error.data.message);
      } else {
        await logoutApi().unwrap();
        dispatch(logout());
        toast.success('Account deleted successfully');
        router.push('/login');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setShowModal(false); // Close the modal after deletion
  };

  const confirmDelete = () => {
    setShowModal(true);
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
            onClick={() => confirmDelete()}
          >
            {isLoading ? 'Deleting...' : ' Delete Account'}
          </button>
          <ConfirmationModal
            isOpen={showModal}
            message='Are you sure you want to delete Your Account, all records will be lost?'
            onConfirm={handleDelete} // Trigger the delete action on confirmation
            onCancel={() => setShowModal(false)} // Close modal without action
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
