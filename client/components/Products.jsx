import React from 'react';
import Link from 'next/link';

const Products = ({data}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
      {data &&
        data.products.map((product) => (
          <Link href={`/products/${product._id}`} key={product.name}>
            <div className='bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 h-80 flex flex-col'>
              <img
                src={product.image.url}
                alt={product.name}
                className='w-full h-40 object-cover rounded'
              />
              <h3 className='text-xl font-semibold mt-4'>{product.name}</h3>
              <p className='text-gray-600 mt-2 line-clamp-3'>
                {product.description}
              </p>
              <p className='text-purple-600 mt-2'>&#8358;{product.price}</p>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Products;
