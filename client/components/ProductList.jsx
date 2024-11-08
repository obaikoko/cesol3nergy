import React from 'react';

const ProductList = () => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Product Management</h2>
      <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
        <thead>
          <tr className='bg-purple-950 text-white'>
            <th className='py-3 px-4 text-left'>ID</th>
            <th className='py-3 px-4 text-left'>name</th>
            <th className='py-3 px-4 text-left'>amount</th>
            <th className='py-3 px-4 text-left'>count in stuck</th>
            <th className='py-3 px-4 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dummy data rows */}
          <tr className='border-b'>
            <td className='py-3 px-4'>#1001</td>
            <td className='py-3 px-4'>Solar Generator</td>
            <td className='py-3 px-4'>$150</td>
            <td className='py-3 px-4'>200</td>
            <td className='py-3 px-4'>
              <button className='text-blue-500 hover:underline'>View</button>
            </td>
          </tr>
          <tr className='border-b'>
            <td className='py-3 px-4'>#1002</td>
            <td className='py-3 px-4'>Solar Panel</td>
            <td className='py-3 px-4'>$50</td>
            <td className='py-3 px-4'>500</td>
            <td className='py-3 px-4'>
              <button className='text-blue-500 hover:underline'>View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
