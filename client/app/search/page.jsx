'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearchProductsQuery } from '@/src/slices/productApiSlice';
import Products from '@/components/Products';
import SearchBox from '@/components/SearchBox';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');

  const { data, isLoading, isError } = useSearchProductsQuery({
    keyword,
    category,
  });
  return (
    <div>
      <SearchBox />
      <p>
        Search Results for {category} {keyword}
      </p>

      {data && <Products data={data} />}
    </div>
  );
};

export default SearchPage;
