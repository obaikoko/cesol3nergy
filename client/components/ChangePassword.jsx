'use client';
import React, { useEffect, useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { useForgetPasswordMutation } from '@/src/slices/userApiSlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ChangePassword = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState('');

  const [changePassword, { isLoading }] = useForgetPasswordMutation();

  useEffect(() => {
    if (user) {
      setUserId(user.email);
    }
  }, [user]);
  const handleChangePassword = async () => {
    try {
      const res = await changePassword({ email: user.email }).unwrap();
      toast.success(res);
      setShowModal(false); // Close the modal after deletion
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const confirmChangePassword = () => {
    setShowModal(true); // Show the confirmation modal
  };
  return (
    <div>
      <button
        className='w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200'
        onClick={confirmChangePassword}
      >
        {isLoading ? <Spinner clip={true} size={25} /> : 'Change Password'}
      </button>
      {!isLoading && (
        <ConfirmationModal
          isOpen={showModal}
          message='Are you sure you want to update your current password?'
          onConfirm={handleChangePassword}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ChangePassword;
