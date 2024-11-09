import { useEffect, useState, useCallback } from 'react';
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from '@/src/slices/productApiSlice';
import Spinner from './Spinner';
import Link from 'next/link';
import { FaEdit, FaPlusSquare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import { debounce } from 'lodash';
import SearchBox from './SearchBox';
import DeleteProductBtn from './DeleteProductBtn';

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { data, isLoading, isError, refetch } = useGetProductsQuery(page, {
    refetchOnMountOrArgChange: true,
  });

  const totalPages = data?.pages || 1;
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  // Create product handler
  const createProductHandler = useCallback(
    debounce(async () => {
      if (window.confirm('Are you sure you want to create a new product?')) {
        try {
          const res = await createProduct();
          refetch();
          toast.success(`${res.data.name} added successfully`);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    }, 300),
    []
  );

  // Handle page change with debounce
  const handlePageChange = useCallback(
    debounce((newPage) => {
      if (newPage !== page) {
        setLoading(true);
        setPage(newPage);
      }
    }, 300),
    [page]
  );

  // Effect hook to handle loading and refetching data
  useEffect(() => {
    setLoading(isLoading);
    if (isError) {
      setLoading(false);
    }
    refetch();
  }, [isError, page, refetch]);

  return (
    <div className='p-4 md:p-6'>
      <SearchBox />
      <h2 className='text-xl font-semibold mb-4'>Product Management</h2>
      <button
        onClick={createProductHandler}
        className='my-3 flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200'
      >
        <FaPlusSquare className='mr-2' />
        Create Product
      </button>

      {isLoading && (
        <div className='flex items-center justify-center'>
          <Spinner sync={true} size={10} />
        </div>
      )}
      {!isLoading && !data && (
        <p className='text-red-500'>
          Failed to load products. Please try again later.
        </p>
      )}
      {data && (
        <div className='overflow-x-auto'>
          <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
            <thead>
              <tr className='bg-purple-950 text-white text-left'>
                <th className='py-3 px-4'>ID</th>
                <th className='py-3 px-4'>Name</th>
                <th className='py-3 px-4'>Amount</th>
                <th className='py-3 px-4'>Stock</th>
                <th className='py-3 px-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id} className='border-b hover:bg-gray-50'>
                  <td className='py-3 px-4 text-sm'>{product._id}</td>
                  <td className='py-3 px-4'>{product.name}</td>
                  <td className='py-3 px-4'>${product.price.toFixed(2)}</td>
                  <td className='py-3 px-4'>{product.countInStock}</td>
                  <td className='py-3 px-4 flex space-x-3 items-center'>
                    <Link
                      href={`/products/edit/${product._id}`}
                      className='text-purple-600 hover:text-purple-800'
                    >
                      <FaEdit />
                    </Link>
                    <DeleteProductBtn product={product} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
