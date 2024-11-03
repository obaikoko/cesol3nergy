'use client';

import Link from 'next/link';

const productCategories = [
  {
    name: 'Solar Generators',
    image: '/images/solar-generator.jpg',
    description: 'Reliable and portable solar generators for on-the-go power.',
  },
  {
    name: 'Inverters',
    image: '/images/inverter.jpg',
    description: 'Efficient inverters for home and business energy needs.',
  },
  {
    name: 'Batteries',
    image: '/images/battery.jpg',
    description: 'High-capacity batteries for energy storage.',
  },
  {
    name: 'Accessories',
    image: '/images/accessories.jpg',
    description: 'Solar accessories to complement your setup.',
  },
];

export default function ProductCategories() {
  return (
    <section className='py-16 bg-gradient-to-br from-blue-50 to-gray-100'>
      <div className='container mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>
          Our Product Categories
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {productCategories.map((category) => (
            <Link href={`/products/categories`} key={category.name}>
              <div className='bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300'>
                <img
                  src={category.image}
                  alt={category.name}
                  className='w-full h-40 object-cover rounded'
                />
                <h3 className='text-xl font-semibold mt-4'>{category.name}</h3>
                <p className='text-gray-600 mt-2'>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
