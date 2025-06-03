import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MailIcon from '@mui/icons-material/Mail';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  const handleLogout = () => {
    authLogout();
    navigate('/');
  };

  const navItems = [
    { path: "/admin", icon: <DashboardIcon />, label: "Dashboard", exact: true },
    { path: "/admin/products", icon: <InventoryIcon />, label: "Products" },
    { path: "/admin/interior-designs", icon: <DesignServicesIcon />, label: "Interior Designs" },
    { path: "/admin/workers", icon: <GroupIcon />, label: "Workers" },
    { path: "/admin/vehicles", icon: <LocalShippingIcon />, label: "Vehicles" },
    { path: "/admin/jobs", icon: <WorkIcon />, label: "Jobs" },
    { path: "/admin/orders", icon: <AttachMoneyIcon />, label: "Orders" },
    { path: "/admin/inquiries", icon: <MailIcon />, label: "Inquiries" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-96 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-yellow-500">
            SmartBuild<span className="text-black"> Market</span>
          </h1>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-3 mt-6 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <span className="mr-3">
                <LogoutIcon />
              </span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
