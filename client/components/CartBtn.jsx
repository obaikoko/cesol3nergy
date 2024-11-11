import Link from 'next/link';
import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';

const CartBtn = ({cartItems}) => {
  return (
    <Link href='/cart' className=' items-center space-x-1 '>
      <div className='flex'>
        <FaShoppingCart className='inline mt-1 mr-1' />
        <span>CART</span>
        {cartItems.length > 0 && (
          <span className='ml-2 bg-purple-500 text-white text-xs rounded-full px-2 py-1'>
            {cartItems.reduce((a, c) => a + c.qty, 0)}
          </span>
        )}
      </div>
    </Link>
  );
}

export default CartBtn