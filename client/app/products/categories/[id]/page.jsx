// pages/products/[category]/[id].js
'use client';

import { useSpring, animated } from '@react-spring/web';
import Slider from 'react-slick';

const product = {
  id: 1,
  name: 'Portable Solar Generator 1000W',
  images: [
    '/images/solar-gen-1000w.jpg',
    '/images/solar-gen-1000w-angle.jpg',
    '/images/solar-gen-1000w-closeup.jpg',
  ],
  description: 'A high-capacity portable generator for on-the-go power needs.',
  specs: {
    wattage: '1000W',
    capacity: '1000Wh',
    compatibleDevices: 'Laptops, Smartphones, Lights',
  },
  usageTips:
    'Ideal for camping, backup power at home, or as a portable energy solution.',
};

export default function ProductPage() {
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto flex flex-col md:flex-row'>
        {/* Product Images with Slider */}
        <div className='md:w-1/2 mb-8 md:mb-0'>
          <animated.div style={fadeIn} className='rounded-lg shadow-lg'>
            <Slider {...sliderSettings}>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className='w-full h-96 object-cover rounded-lg'
                  />
                </div>
              ))}
            </Slider>
          </animated.div>
        </div>

        {/* Product Details */}
        <div className='md:w-1/2 px-6'>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
          <p className='text-gray-700 mb-4'>{product.description}</p>
          <h3 className='text-lg font-semibold mb-2'>Specifications</h3>
          <ul className='list-disc list-inside mb-4 text-gray-700'>
            <li>Wattage: {product.specs.wattage}</li>
            <li>Capacity: {product.specs.capacity}</li>
            <li>Compatible Devices: {product.specs.compatibleDevices}</li>
          </ul>
          <h3 className='text-lg font-semibold mb-2'>Usage Tips</h3>
          <p className='text-gray-700 mb-6'>{product.usageTips}</p>

          {/* CTA Buttons */}
          <div className='flex space-x-4'>
            <button className='px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>
              Add to Cart
            </button>
            <button className='px-6 py-3 bg-transparent border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-colors'>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
