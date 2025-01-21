'use client';
import { Suspense, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import { useSearchProductsQuery } from '@/src/slices/productApiSlice';
import Products from '@/components/Products';
import SearchBox from '@/components/SearchBox';
import Spinner from '@/components/Spinner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { debounce } from 'lodash';
import Pagination from '@/components/Pagination';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError } = useSearchProductsQuery({
    keyword,
    category,
    page,
  });
  const totalPages = data && data.totalPages;
  data && console.log(data);

  useEffect(() => {
    setLoading(isLoading);
       if (isError) {
         setLoading(false);
       }
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
      <SearchBox />
      <p>
        Search Results for {category} {keyword}
      </p>
      {loading && <Spinner sync={true} size={10} />}

      {data && <Products data={data} />}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
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
