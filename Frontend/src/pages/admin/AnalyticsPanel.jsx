import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  DoughnutController 
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPanel = () => {
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);
  
  // Mock data for demonstration
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales Revenue (LKR)',
        data: [25000, 30000, 35000, 40000, 38000, 42000, 45000, 48000, 50000, 55000, 60000, 65000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const orderCounts = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Number of Orders',
        data: [42, 48, 55, 62, 58, 65, 70, 75, 80, 86, 92, 98],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const productCategoryData = {
    labels: ['Structural', 'Electrical', 'Plumbing', 'Finishing', 'Safety', 'Tools'],
    datasets: [
      {
        label: 'Product Distribution',
        data: [35, 20, 15, 10, 10, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const customerData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Customers',
        data: [18, 22, 25, 30, 28, 32, 35, 38, 40, 42, 45, 48],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Summary statistics
  const summaryStats = [
    {
      title: 'Total Revenue',
      value: '538,000 LKR',
      change: 15.2,
      increasing: true,
      icon: <AttachMoneyIcon />,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Total Orders',
      value: '831',
      change: 12.5,
      increasing: true,
      icon: <ReceiptIcon />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Customers',
      value: '403',
      change: 8.7,
      increasing: true,
      icon: <PeopleIcon />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Product Inventory',
      value: '1,254',
      change: -3.2,
      increasing: false,
      icon: <InventoryIcon />,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  // Top selling products
  const topProducts = [
    { name: 'Portland Cement (50kg)', category: 'Structural', sales: 124, value: 148800 },
    { name: 'Steel Rebar (12mm)', category: 'Structural', sales: 98, value: 122500 },
    { name: 'Electrical Wiring Kit', category: 'Electrical', sales: 87, value: 130500 },
    { name: 'PVC Pipes (2-inch)', category: 'Plumbing', sales: 76, value: 91200 },
    { name: 'Paint - White (20L)', category: 'Finishing', sales: 65, value: 78000 },
  ];

  // Recent orders
  const recentOrders = [
    { id: 'ORD-00123', customer: 'John Smith', date: '2023-06-15', amount: 25000, items: 4 },
    { id: 'ORD-00122', customer: 'Sarah Johnson', date: '2023-06-14', amount: 36000, items: 7 },
    { id: 'ORD-00121', customer: 'David Wilson', date: '2023-06-13', amount: 18500, items: 3 },
    { id: 'ORD-00120', customer: 'Emily Brown', date: '2023-06-12', amount: 42000, items: 5 },
    { id: 'ORD-00119', customer: 'Michael Lee', date: '2023-06-11', amount: 15000, items: 2 },
  ];

  // Chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Business performance overview and insights</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1 rounded-md ${
                period === 'month'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('quarter')}
              className={`px-3 py-1 rounded-md ${
                period === 'quarter'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setPeriod('year')}
              className={`px-3 py-1 rounded-md ${
                period === 'year'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {summaryStats.map((stat, idx) => (
                <div key={idx} className="bg-white border rounded-lg shadow-sm p-4 stats-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div className={`p-2 rounded-full ${stat.color}`}>{stat.icon}</div>
                  </div>
                  <div className="flex items-center mt-2">
                    {stat.increasing ? (
                      <TrendingUpIcon className="text-green-500 mr-1" fontSize="small" />
                    ) : (
                      <TrendingDownIcon className="text-red-500 mr-1" fontSize="small" />
                    )}
                    <span
                      className={stat.increasing ? 'text-green-500' : 'text-red-500'}
                    >
                      {stat.increasing ? '+' : ''}{stat.change}%
                    </span>
                    <span className="text-gray-500 ml-1">vs last period</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Sales Revenue</h3>
                <div className="h-80">
                  <Bar data={salesData} options={barOptions} />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Orders Trend</h3>
                <div className="h-80">
                  <Line data={orderCounts} options={lineOptions} />
                </div>
              </div>
            </div>

            {/* More Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
                <div className="h-64 flex justify-center">
                  <div className="w-64">
                    <Doughnut data={productCategoryData} options={doughnutOptions} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">New Customers</h3>
                <div className="h-64">
                  <Bar data={customerData} options={barOptions} />
                </div>
              </div>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Top Selling Products</h3>
                  <button className="text-primary text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Units Sold</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, idx) => (
                        <tr key={idx}>
                          <td className="font-medium">{product.name}</td>
                          <td>{product.category}</td>
                          <td>{product.sales}</td>
                          <td>{product.value.toLocaleString()} LKR</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Orders</h3>
                  <button className="text-primary text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, idx) => (
                        <tr key={idx}>
                          <td className="font-medium">{order.id}</td>
                          <td>{order.customer}</td>
                          <td className="text-sm whitespace-nowrap">
                            <div className="flex items-center">
                              <CalendarTodayIcon fontSize="small" className="text-gray-400 mr-1" />
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td>{order.items}</td>
                          <td>{order.amount.toLocaleString()} LKR</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPanel; 