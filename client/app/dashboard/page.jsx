'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBoxOpen, FaUserFriends, FaChartLine, FaCogs } from 'react-icons/fa';
import Orders from '@/components/Orders';
import ProductList from '@/components/ProductList';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-purple-950 text-white p-5'>
        <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>
        <nav className='flex flex-col space-y-4'>
          <button
            onClick={() => handleTabChange('dashboard')}
            className={`flex items-center space-x-3 p-2 rounded-md hover:bg-purple-700 ${
              activeTab === 'dashboard' ? 'bg-purple-700' : ''
            }`}
          >
            <FaChartLine />
            <span>Dashboard Overview</span>
          </button>
          <button
            onClick={() => handleTabChange('orders')}
            className={`flex items-center space-x-3 p-2 rounded-md hover:bg-purple-700 ${
              activeTab === 'orders' ? 'bg-purple-700' : ''
            }`}
          >
            <FaBoxOpen />
            <span>Manage Orders</span>
          </button>
          <button
            onClick={() => handleTabChange('products')}
            className={`flex items-center space-x-3 p-2 rounded-md hover:bg-purple-700 ${
              activeTab === 'products' ? 'bg-purple-700' : ''
            }`}
          >
            <FaCogs />
            <span>Manage Products</span>
          </button>
          <button
            onClick={() => handleTabChange('users')}
            className={`flex items-center space-x-3 p-2 rounded-md hover:bg-purple-700 ${
              activeTab === 'users' ? 'bg-purple-700' : ''
            }`}
          >
            <FaUserFriends />
            <span>Manage Users</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-8'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-6'>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div>
            <p className='text-gray-700'>
              Welcome to the Admin Dashboard. Use the sidebar to navigate.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-lg font-bold'>Total Orders</h2>
                <p className='text-2xl mt-4'>123</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-lg font-bold'>Total Users</h2>
                <p className='text-2xl mt-4'>57</p>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-lg font-bold'>Total Products</h2>
                <p className='text-2xl mt-4'>42</p>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && <Orders />}

        {/* Products Tab */}
        {activeTab === 'products' && <ProductList />}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className='text-xl font-semibold mb-4'>User Management</h2>
            {/* User table or list component can go here */}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
