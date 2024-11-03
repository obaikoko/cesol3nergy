// pages/products/[category].js
'use client';

import Link from 'next/link';
import { useState } from 'react';

const products = [
  // Sample product data for solar generators; add actual product details here
  {
    id: 1,
    name: 'Portable Solar Generator 1000W',
    image: '/images/solar-gen-1000w.jpg',
    wattage: '1000W',
    price: 599,
    capacity: '1000Wh',
  },
  {
    id: 2,
    name: 'Heavy-Duty Solar Generator 2000W',
    image: '/images/solar-gen-2000w.jpg',
    wattage: '2000W',
    price: 999,
    capacity: '2000Wh',
  },
];

export default function ProductCategoryPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleFilter = (e) => {
    // Implement filtering logic here (e.g., by wattage or price)
  };

  return (
    <section className='py-16 bg-white'>
      <div className='container mx-auto'>
        <h2 className='text-2xl font-bold mb-8'>Solar Generators</h2>

        {/* Filter and Sort Options */}
        <div className='flex space-x-4 mb-6'>
          <select onChange={handleFilter} className='p-2 border rounded'>
            <option value=''>Filter by Capacity</option>
            <option value='1000Wh'>1000Wh</option>
            <option value='2000Wh'>2000Wh</option>
          </select>
          <select onChange={handleFilter} className='p-2 border rounded'>
            <option value=''>Sort by Price</option>
            <option value='low'>Low to High</option>
            <option value='high'>High to Low</option>
          </select>
        </div>

        {/* Product List */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className='bg-gray-100 p-6 rounded-lg shadow-md'
            >
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-40 object-cover rounded mb-4'
              />
              <h3 className='text-xl font-semibold'>{product.name}</h3>
              <p className='text-gray-700'>Capacity: {product.capacity}</p>
              <p className='text-gray-700'>Wattage: {product.wattage}</p>
              <p className='text-gray-800 font-bold'>Price: ${product.price}</p>
              <Link
                href='/products/categories/1'
                className='mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
