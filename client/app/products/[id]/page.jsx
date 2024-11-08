'use client';
import { useParams } from 'next/navigation';
import { useGetProductByIdQuery } from '@/src/slices/productApiSlice';
import { useSpring, animated } from '@react-spring/web';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';

// const product = {
//   id: 1,
//   name: 'Portable Solar Generator 1000W',
//   images: [
//     '/images/solar-gen-1000w.jpg',
//     '/images/solar-gen-1000w-angle.jpg',
//     '/images/solar-gen-1000w-closeup.jpg',
//   ],
//   description: 'A high-capacity portable generator for on-the-go power needs.',
//   specs: {
//     wattage: '1000W',
//     capacity: '1000Wh',
//     compatibleDevices: 'Laptops, Smartphones, Lights',
//   },
//   usageTips:
//     'Ideal for camping, backup power at home, or as a portable energy solution.',
// };

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
            <animated.div style={fadeIn} className='rounded-lg shadow-lg'>
              <img
                src={product.image?.url}
                alt={`${product.name} `}
                className='w-full h-96 object-cover rounded-lg'
              />
            </animated.div>
          </div>

          {/* Product Details */}
          <div className='md:w-1/2 px-6'>
            <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
            <p className='text-gray-700 mb-4'>{product.category}</p>
            <h3 className='text-lg font-semibold mb-2'>Description:</h3>
            <p>{product.description}</p>

            {/* CTA Buttons */}
            <div className='flex space-x-4 my-4'>
              <button className='px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors'>
                Add to Cart
              </button>
              <button className='px-6 py-3 bg-transparent border border-purple-600 text-purple-600 rounded hover:bg-purple-600 hover:text-white transition-colors'>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductPage;
