import React, { useState } from 'react';
import { addToCart } from '@/src/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

const AddToCartBtn = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success(`${product.name} added to cart`);
  };
  return (
    <div>
      <button
        className='px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors'
        onClick={addToCartHandler}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartBtn;
