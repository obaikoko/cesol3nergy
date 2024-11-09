'use client';
import { Suspense } from 'react';

import { useSearchParams } from 'next/navigation';
import { useSearchProductsQuery } from '@/src/slices/productApiSlice';
import Products from '@/components/Products';
import SearchBox from '@/components/SearchBox';
import Spinner from '@/components/Spinner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
      <Navbar/>
      <SearchBox />
      <p>
        Search Results for {category} {keyword}
      </p>

      {data && <Products data={data} />}
      <Footer/>
    </div>
  );
};

const Search = () => {
  return (
    <Suspense fallback={<Spinner clip={true} size={150} />}>
      <SearchPage />
    </Suspense>
  );
};

export default Search;
