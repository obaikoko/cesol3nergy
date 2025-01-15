'use client';
import { useParams } from 'next/navigation';
import { useGetProductByIdQuery } from '@/src/slices/productApiSlice';
import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import AddToCartBtn from '@/components/AddToCartBtn';


export const metadata = {
  title: 'Cesol3nergy - Solar Products & Renewable Energy Solutions',
  description:
    'Cesol3nergy offers premium solar panels, inverters, batteries, and renewable energy solutions. Empower your home or business with clean energy today!',
  keywords:
    'solar products, renewable energy, solar panels, solar inverters, solar batteries, clean energy, Cesol3nergy',
  image: '/images/logo.jpg',
};

const ProductPage = () => {
  const { id } = useParams();
  const [productId, setProductId] = useState('');

  useEffect(() => {
    setProductId(id);
  }, [id]);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);

  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  return (
    <div>
      <Navbar />
      <section className='py-16 bg-gray-50'>
        {isLoading && (
          <div className='flex items-center justify-center'>
            <Spinner sync={true} size={10} />
          </div>
        )}
        {product && (
          <div className='container mx-auto flex flex-col md:flex-row'>
            {/* Product Images with Slider */}
            <div className='md:w-1/2 mb-8 md:mb-0'>
              <div style={fadeIn} className='rounded-lg shadow-lg'>
                <img
                  src={product.image?.url}
                  alt={`${product.name}`}
                  className='w-full h-96 object-cover rounded-lg'
                />
              </div>
            </div>

            {/* Product Details */}
            <div className='md:w-1/2 px-6'>
              <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
              <p className='text-gray-700 mb-2'>
                <strong>Category:</strong> {product.category}
              </p>
              <p className='text-gray-700 mb-2'>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p className='text-gray-700 mb-2'>
                <strong>Price:</strong> &#8358;{product.price.toLocaleString()}
              </p>
              <p className='text-gray-700 mb-2'>
                <strong>In Stock:</strong> {product.countInStock}
              </p>
              {/* <p className='text-gray-700 mb-4'>
                <strong>Rating:</strong> {product.rating} ({product.numReviews}{' '}
                reviews)
              </p> */}

              <h3 className='text-lg font-semibold mb-2'>Description:</h3>
              <p>{product.description}</p>

              <div className='flex space-x-4 my-4'>
                <AddToCartBtn product={product} />
                <Link
                  href='/contact'
                  className='px-6 py-3 bg-transparent border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white transition-colors'
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ProductPage;
