import React from 'react';
import { Link } from 'react-router-dom';

const DashboardOverview = () => {
  const adminTiles = [
    {
      title: 'Products',
      icon: 'fa-box',
      path: '/admin/products',
      color: 'bg-blue-500',
    },
    {
      title: 'Interior Designs',
      icon: 'fa-paint-brush',
      path: '/admin/interior-designs',
      color: 'bg-purple-500',
    },
    {
      title: 'Workers',
      icon: 'fa-users',
      path: '/admin/workers',
      color: 'bg-green-500',
    },
    {
      title: 'Vehicles',
      icon: 'fa-truck',
      path: '/admin/vehicles',
      color: 'bg-red-500',
    },
    {
      title: 'Jobs',
      icon: 'fa-briefcase',
      path: '/admin/jobs',
      color: 'bg-yellow-500',
    },
    {
      title: 'Orders',
      icon: 'fa-shopping-cart',
      path: '/admin/orders',
      color: 'bg-indigo-500',
    },
    {
      title: 'Inquiries',
      icon: 'fa-question-circle',
      path: '/admin/inquiries',
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminTiles.map((tile, index) => (
            <Link
              key={index}
              to={tile.path}
              className={`${tile.color} rounded-lg shadow-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <i className={`fas ${tile.icon} text-4xl mb-4`}></i>
                <h2 className="text-xl font-semibold text-center">{tile.title}</h2>
          </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 