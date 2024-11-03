// components/BlogResources.js
'use client';

import { useState } from 'react';

const articles = [
  {
    title: 'How to Choose the Right Solar System for Your Needs',
    category: 'Product Guides',
    snippet:
      'Learn the key factors in selecting a solar system that fits your energy requirements...',
    link: '/blog/choose-right-solar-system',
  },
  {
    title: 'Maintaining Your Solar Power System',
    category: 'Maintenance',
    snippet:
      'Proper maintenance is essential for the longevity and efficiency of your solar setup...',
    link: '/blog/maintain-solar-system',
  },
  {
    title: 'Understanding Solar Batteries and Inverters',
    category: 'Product Guides',
    snippet:
      'Explore the components that make up your solar system and how they work together...',
    link: '/blog/solar-batteries-inverters',
  },
];

const categories = [
  'All',
  'Product Guides',
  'Maintenance',
  'Renewable Energy Benefits',
];

export default function BlogResources() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className='py-16 bg-gray-50 text-gray-800'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4'>Blog & Resources</h2>
          <p className='max-w-3xl mx-auto text-lg'>
            Explore our articles on solar energy, maintenance tips, product
            guides, and more.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className='flex justify-between items-center mb-8'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search articles...'
            className='p-3 border rounded w-full max-w-md'
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='p-3 border rounded ml-4'
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Articles List */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredArticles.map((article, index) => (
            <div key={index} className='bg-white p-6 rounded shadow-lg'>
              <h3 className='text-2xl font-semibold mb-2'>{article.title}</h3>
              <p className='text-gray-600 mb-4'>{article.snippet}</p>
              <a href={article.link} className='text-blue-600 hover:underline'>
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
