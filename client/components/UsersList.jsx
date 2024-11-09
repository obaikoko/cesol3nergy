import React from 'react';
import { useGetUsersQuery } from '@/src/slices/userApiSlice';
import Spinner from './Spinner';
import Link from 'next/link';

const UsersList = () => {
  const { data, isLoading, isError } = useGetUsersQuery();

  

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Product Management</h2>
      {isLoading && (
        <div className='flex items-center justify-center'>
          <Spinner sync={true} size={10} />
        </div>
      )}
      {!isLoading && !data && (
        <p className='text-red-500'>
          Failed to load users. Please try again later.
        </p>
      )}
      {data && (
        <table className='w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-purple-950 text-white'>
              <th className='py-3 px-4 text-left'>Email</th>
              <th className='py-3 px-4 text-left'>Name</th>
              <th className='py-3 px-4 text-left'>Phone</th>
              <th className='py-3 px-4 text-left'>Address</th>
              <th className='py-3 px-4 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Dummy data rows */}
            {data.map((user) => (
              <tr key={user._id} className='border-b'>
                <td className='py-3 px-4'>{user.email}</td>
                <td className='py-3 px-4'>
                  {user.firstName} {user.lastName}
                </td>
                <td className='py-3 px-4'>{user.phone}</td>
                <td className='py-3 px-4'>{user.address}</td>
                <td className='py-3 px-4'>
                  <Link
                    href={`/users/${user._id}`}
                    className='text-blue-500 hover:underline'
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersList;
