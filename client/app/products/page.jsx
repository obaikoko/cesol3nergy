'use client';
import { useState, useEffect } from 'react';

import { useGetProductsQuery } from '@/src/slices/productApiSlice';
import Spinner from '@/components/Spinner';
import SearchBox from '@/components/SearchBox';
import Pagination from '@/components/Pagination';
import { debounce } from 'lodash';
import Products from '@/components/Products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';



const ProductCategories = () => {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetProductsQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  const totalPages = data && data.pages;

  
  useEffect(() => {
    setLoading(isLoading);
    if (isError) {
      setLoading(false);
    }
    refetch();
  }, [data, isError, page]);

  const handlePageChange = debounce((newPage) => {
    if (newPage !== page) {
      setLoading(true);
      setPage(newPage);
    }
  }, 300);

  return (
    <div>
      <Navbar />
      <section className='py-16 bg-gradient-to-br from-blue-50 to-gray-100'>
        <div className='container mx-auto text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8'>
            Our Products
          </h2>
          <SearchBox />

          {isLoading && (
            <div className='flex justify-center items-center w-full h-40'>
              <Spinner sync={true} size={10} />
            </div>
          )}

          {!isLoading && !data && (
            <p className='text-red-500'>
              Failed to load products. Please try again later.
            </p>
          )}

          <Products data={data} />
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
      <Footer />
    </div>
  );
};

export default ProductCategories;
