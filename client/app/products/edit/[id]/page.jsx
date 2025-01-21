'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from '@/src/slices/productApiSlice';
import { toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import Spinner from '@/components/Spinner';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { FaArrowLeft } from 'react-icons/fa';

const ProductEdit = () => {
  const { id: productId } = useParams();
  const router = useRouter();

  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    brand: '',
    category: '',
    countInStock: '',
    description: '',
  });

  const { name, price, brand, category, countInStock, description } = formData;

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        640,
        510,
        'JPEG',
        70,
        0,
        (uri) => resolve(uri),
        'base64'
      );
    });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const resizedImage = await resizeFile(file);
        setImage(resizedImage);
      } catch (error) {
        toast.error('Error resizing image');
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      }).unwrap();
      toast.success('Product updated');
      refetch();
      router('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
      });
    }
  }, [product]);

  return (
    <>
      <Navbar />
      <Link
        href='/dashboard'
        className='text-purple-500 hover:text-purple-700 font-semibold m-4 inline-block'
      >
        <FaArrowLeft className='inline mb-1 text-purple-600' /> Go Back
      </Link>
      <div className='max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Edit Product</h1>

        {isLoading ? (
          <Spinner sync={true} size={10} />
        ) : error ? (
          'Something went wrong'
        ) : (
          <form onSubmit={submitHandler} className='space-y-4'>
            <div className='flex flex-col'>
              <label className='text-gray-600 font-medium'>Name</label>
              <input
                type='text'
                placeholder='Enter name'
                name='name'
                value={name}
                onChange={handleFormChange}
                className='mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 font-medium'>Price</label>
              <input
                type='number'
                placeholder='Enter price'
                name='price'
                value={price}
                onChange={handleFormChange}
                className='mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 font-medium'>Image</label>
              <input
                type='file'
                onChange={handleImageChange}
                className='mt-1'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 font-medium'>Brand</label>
              <input
                type='text'
                placeholder='Enter brand'
                name='brand'
                value={brand}
                onChange={handleFormChange}
                className='mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500'
              />
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 font-medium'>
                Count In Stock
              </label>
              <input
                type='number'
                placeholder='Enter count in stock'
                name='countInStock'
                value={countInStock}
                onChange={handleFormChange}
                className='mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500'
              />
            </div>

            <div className='flex flex-col'>
              <select onChange={handleFormChange} name='category' id='category'>
                <option value=''>Select Category</option>
                <option value='Generators'>Generators</option>
                <option value='Inverters'>Inverters</option>
                <option value='Batteries'>Batteries</option>
                <option value='Panels'>Panels</option>
                <option value='Controllers'>Controllers</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-600 font-medium'>Description</label>
              <textarea
                placeholder='Enter description'
                name='description'
                value={description}
                onChange={handleFormChange}
                className='mt-1 px-3 py-2 border border-gray-300 rounded focus:ring-purple-500 focus:border-purple-500'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold py-2 rounded hover:bg-purple-700 transition mt-4'
            >
              {loadingUpdate ? 'Updating...' : 'Update'}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ProductEdit;
