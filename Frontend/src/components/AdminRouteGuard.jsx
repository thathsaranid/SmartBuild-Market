import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminRouteGuard = () => {
  // Allow unrestricted access to admin routes
  return <Outlet />;
};

export default AdminRouteGuard; 