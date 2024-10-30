import React from 'react';
// Sample Product Data
const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$49.99',
    image:
      'https://res.cloudinary.com/dzajrh9z7/image/upload/v1703252752/J-Cassy/colorful-t-shirts-in-front-of-dark-background-ai-generative-free-photo_avtdlx.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$59.99',
    image:
      'https://res.cloudinary.com/dzajrh9z7/image/upload/v1703680277/J-Cassy/mlv76idxgyrtozyhq5os.jpg',
  },
  {
    id: 3,
    name: 'Product 3',
    price: '$69.99',
    image:
      'https://res.cloudinary.com/dzajrh9z7/image/upload/v1703633252/J-Cassy/n9cxw9eqfu7q2sktasiv.jpg',
  },
  {
    id: 4,
    name: 'Product 4',
    price: '$79.99',
    image:
      'https://res.cloudinary.com/dzajrh9z7/image/upload/v1703253112/J-Cassy/images_2_pdeuer.jpg',
  },
  // Add more products as needed
];

const ProductListing = () => {
  return (
    <section className='py-12'>
        
      <h2 className='text-3xl font-bold text-center mb-10'>Our Products</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4'>
        
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'
          >
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-48 object-cover'
            />

            <div className='p-4 text-center'>
              <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
              <p className='text-gray-600 mb-4'>{product.price}</p>

              <button
                className='px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full
                           hover:scale-105 transition-transform duration-200'
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductListing;
