import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-dark-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;