import React, { useState, useEffect } from 'react';
import { paymentAPI } from '../../services/api';
import SearchIcon from '@mui/icons-material/Search';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For demonstration, we'll use a mock data array since we don't have a specific orders endpoint
      // In a real application, this would be replaced with an actual API call
      // const data = await orderAPI.getAllOrders();
      
      // Mock data for demonstration
      const mockOrders = [
        {
          _id: 'ORD-00001',
          customerName: 'John Smith',
          customerEmail: 'john.smith@example.com',
          orderDate: new Date('2023-06-10T08:30:00').toISOString(),
          items: [
            { name: 'Portland Cement', quantity: 10, price: 1200 },
            { name: 'Steel Rebar (10mm)', quantity: 20, price: 850 }
          ],
          total: 29000,
          status: 'completed',
          paymentMethod: 'Credit Card',
          shippingAddress: '123 Main St, Colombo 5',
          contactNumber: '+94 77 123 4567'
        },
        {
          _id: 'ORD-00002',
          customerName: 'Sarah Johnson',
          customerEmail: 'sarah.j@example.com',
          orderDate: new Date('2023-06-12T14:15:00').toISOString(),
          items: [
            { name: 'Brick Set (1000 pcs)', quantity: 1, price: 25000 },
            { name: 'Sand (1 cubic meter)', quantity: 2, price: 5500 }
          ],
          total: 36000,
          status: 'processing',
          paymentMethod: 'Bank Transfer',
          shippingAddress: '45 Park Avenue, Kandy',
          contactNumber: '+94 76 789 0123'
        },
        {
          _id: 'ORD-00003',
          customerName: 'David Wilson',
          customerEmail: 'david.w@example.com',
          orderDate: new Date('2023-06-13T11:20:00').toISOString(),
          items: [
            { name: 'Paint - White (20L)', quantity: 3, price: 7500 },
            { name: 'Paint Brushes Set', quantity: 2, price: 1200 }
          ],
          total: 24900,
          status: 'shipped',
          paymentMethod: 'Cash on Delivery',
          shippingAddress: '78 Beach Road, Galle',
          contactNumber: '+94 71 345 6789'
        },
        {
          _id: 'ORD-00004',
          customerName: 'Emily Brown',
          customerEmail: 'emily.b@example.com',
          orderDate: new Date('2023-06-14T09:45:00').toISOString(),
          items: [
            { name: 'Electrical Wiring Kit', quantity: 1, price: 15000 },
            { name: 'Light Switches (5 pcs)', quantity: 2, price: 2500 }
          ],
          total: 20000,
          status: 'pending',
          paymentMethod: 'Credit Card',
          shippingAddress: '15 Hill Street, Nuwara Eliya',
          contactNumber: '+94 75 567 8901'
        },
        {
          _id: 'ORD-00005',
          customerName: 'Michael Lee',
          customerEmail: 'michael.l@example.com',
          orderDate: new Date('2023-06-15T16:30:00').toISOString(),
          items: [
            { name: 'Plumbing Pipes Kit', quantity: 1, price: 8500 },
            { name: 'Bathroom Fittings Set', quantity: 1, price: 12000 }
          ],
          total: 20500,
          status: 'cancelled',
          paymentMethod: 'Online Payment',
          shippingAddress: '33 Main Road, Jaffna',
          contactNumber: '+94 77 890 1234'
        }
      ];
      
      setOrders(mockOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // In a real application, this would be an API call
      // await orderAPI.updateOrderStatus(orderId, { status: newStatus });
      
      // For demo, we'll update the local state
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status. Please try again.');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Apply filters
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    
    // Search term filter (case insensitive)
    const searchLower = searchTerm.toLowerCase();
    return searchTerm === '' || 
      order._id.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower) ||
      order.items.some(item => item.name.toLowerCase().includes(searchLower));
  });

  // Get badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'admin-badge-warning';
      case 'processing': return 'admin-badge-info';
      case 'shipped': return 'admin-badge-info';
      case 'completed': return 'admin-badge-success';
      case 'cancelled': return 'admin-badge-danger';
      default: return 'admin-badge-secondary';
    }
  };
  
  // Get human-readable status
  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Orders Management</h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="md:w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <div className="md:w-1/4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No orders match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="font-medium">{order._id}</td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <div className="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center">
                          <PersonIcon fontSize="small" className="text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.customerEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center text-sm">
                        <CalendarTodayIcon fontSize="small" className="text-gray-400 mr-1" />
                        <span>{formatDate(order.orderDate)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700 flex items-center">
                          <InventoryIcon fontSize="small" className="text-gray-400 mr-1" />
                          <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                        </div>
                        <div className="mt-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <div key={index} className="text-xs text-gray-500">
                              {item.quantity} × {item.name}
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{order.items.length - 2} more items
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-medium flex items-center">
                        <AttachMoneyIcon fontSize="small" className="text-gray-600 mr-1" />
                        {order.total.toLocaleString()} LKR
                      </div>
                    </td>
                    <td>
                      <span className={`admin-badge ${getStatusBadgeClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal could be added here for viewing full order details */}
    </div>
  );
};

export default OrdersManagement; 