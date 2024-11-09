import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@/src/slices/productApiSlice';
import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { FaTrash } from 'react-icons/fa';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

const DeleteProductBtn = ({ product }) => {
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const { data, isLoading, isError, refetch } = useGetProductsQuery(page, {
    refetchOnMountOrArgChange: true,
  });

  // Delete handler
  const deleteHandler = async (id) => {
    try {
      await deleteProduct(id);
      refetch();
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  // Confirm delete action
  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setShowModal(true);
  };

  return (
    <div>
      {' '}
      <button
        onClick={() => confirmDelete(product._id)}
        aria-label='Delete product'
      >
        {loadingDelete ? (
          <Spinner clip={true} size={15} />
        ) : (
          <FaTrash className='text-red-600 mr-2 text-sm ' />
        )}
      </button>
      <ConfirmationModal
        isOpen={showModal}
        message='Are you sure you want to delete this product? All records will be lost.'
        onConfirm={() => {
          deleteHandler(productToDelete);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default DeleteProductBtn;
