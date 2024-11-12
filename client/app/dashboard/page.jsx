'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  FaBoxOpen,
  FaUserFriends,
  FaChartLine,
  FaCogs,
  FaBars,
  FaSignOutAlt,
} from 'react-icons/fa';
import Orders from '@/components/Orders';
import ProductList from '@/components/ProductList';
import UsersList from '@/components/UsersList';
import { useLogoutMutation } from '@/src/slices/userApiSlice';
import { logout } from '@/src/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on mobile when navigating
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='md:flex min-h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-purple-950 text-white p-5 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform lg:relative lg:translate-x-0`}
      >
        <button
          className='block lg:hidden text-white mb-4'
          onClick={() => setIsSidebarOpen(false)}
        >
          Close
        </button>
        <h2 className='text-2xl font-bold mb-6'>Admin Dashboard</h2>
        <nav className='flex flex-col space-y-4'>
          {[
            {
              tab: 'dashboard',
              label: 'Dashboard Overview',
              icon: <FaChartLine />,
            },
            { tab: 'orders', label: 'Manage Orders', icon: <FaBoxOpen /> },
            { tab: 'products', label: 'Manage Products', icon: <FaCogs /> },
            { tab: 'users', label: 'Manage Users', icon: <FaUserFriends /> },
          ].map(({ tab, label, icon }) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex items-center space-x-3 p-2 rounded-md hover:bg-purple-700 ${
                activeTab === tab ? 'bg-purple-700' : ''
              }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className='flex items-center space-x-3 p-2 rounded-md hover:bg-purple-700 '
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className='lg:hidden fixed top-4 right-4 z-30 p-2  text-purple-900 rounded-full shadow-lg'
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars size={24} />
      </button>

      {/* Main Content */}
      <main className='flex-1 p-4 lg:p-6 ml-0  transition-all duration-300'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-4 lg:mb-6'>
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div>
            <p className='text-gray-700'>
              Welcome to the Admin Dashboard. Use the sidebar to navigate.
            </p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-4 lg:mt-6'>
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

        {activeTab === 'orders' && <Orders />}
        {activeTab === 'products' && <ProductList />}
        {activeTab === 'users' && <UsersList />}
      </main>
    </div>
  );
}

export default AdminDashboard;
