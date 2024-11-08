const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <section className='flex items-center justify-center mt-8 space-x-4'>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors 
                    ${
                      page === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>

      <span className='text-gray-700 text-sm font-medium'>
        Page <span className='font-semibold'>{page}</span> of{' '}
        <span className='font-semibold'>{totalPages}</span>
      </span>

      <button
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors 
                    ${
                      page === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
