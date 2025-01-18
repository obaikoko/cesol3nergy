'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const categories = [
  'All',
  'Generators',
  'Inverters',
  'Batteries',
  'Panels',
  'Accessories',
];

const AdminProductSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    // Redirects to the search results page with keyword and category as query params
    if (keyword.trim() || category) {
      router.push(
        `/products/search?keyword=${encodeURIComponent(
          keyword
        )}&category=${encodeURIComponent(category)}`
      );
    }
  };

  return (
    <div className='bg-white p-4 shadow-md rounded-md mb-6'>
      <form
        onSubmit={handleSearch}
        className='flex flex-col md:flex-row gap-4 items-center'
      >
        {/* Keyword Input */}
        <input
          type='text'
          placeholder='Search products...'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-purple-500'
        />

        {/* Category Select */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border border-gray-300 rounded-md p-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-purple-500'
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type='submit'
          className='bg-purple-600 text-white px-4 py-2 rounded-md w-full md:w-auto hover:bg-purple-700 transition-colors'
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default AdminProductSearch;
