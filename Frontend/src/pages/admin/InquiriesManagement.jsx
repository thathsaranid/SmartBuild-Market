import React, { useState, useEffect } from 'react';
import { inquiryAPI } from '../../services/api';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

const InquiriesManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    fetchInquiries();
  }, []);
  
  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await inquiryAPI.getAllInquiries();
      setInquiries(response.data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };
  
  const handleStatusChange = async (id, newStatus) => {
    try {
      await inquiryAPI.updateInquiryStatus(id, newStatus);
      
      // Update local state
      setInquiries(prevInquiries => 
        prevInquiries.map(inquiry => 
          inquiry._id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );
      
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      // Show error notification
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      await inquiryAPI.deleteInquiry(id);
      
      // Remove from local state
      setInquiries(prevInquiries => 
        prevInquiries.filter(inquiry => inquiry._id !== id)
      );
      
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry(null);
        setShowDetails(false);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      // Show error notification
    }
  };
  
  const viewInquiryDetails = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetails(true);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return <NewReleasesIcon fontSize="small" />;
      case 'in-progress':
        return <PendingIcon fontSize="small" />;
      case 'resolved':
        return <CheckCircleIcon fontSize="small" />;
      default:
        return null;
    }
  };
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'rental':
        return <span className="text-purple-500">Rental</span>;
      case 'service':
        return <span className="text-blue-500">Service</span>;
      case 'product':
        return <span className="text-orange-500">Product</span>;
      case 'job':
        return <span className="text-green-500">Job</span>;
      default:
        return <span className="text-gray-500">General</span>;
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Filter inquiries
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    const matchesType = typeFilter === 'all' || inquiry.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Customer Inquiries</h1>
          <p className="text-gray-600">Manage and respond to customer inquiries and requests</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search inquiries..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center">
          <FilterListIcon className="mr-2 text-gray-500" fontSize="small" />
          <span className="text-sm text-gray-500 mr-2">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md text-sm p-1"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <FilterListIcon className="mr-2 text-gray-500" fontSize="small" />
          <span className="text-sm text-gray-500 mr-2">Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-md text-sm p-1"
          >
            <option value="all">All Types</option>
            <option value="general">General</option>
            <option value="service">Service</option>
            <option value="rental">Rental</option>
            <option value="product">Product</option>
            <option value="job">Job</option>
          </select>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Inquiry list */}
        <div className={`${showDetails ? 'md:w-1/2' : 'w-full'} overflow-hidden`}>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-500">No inquiries found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry) => (
                    <tr 
                      key={inquiry._id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => viewInquiryDetails(inquiry)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <PersonIcon />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                            <div className="text-sm text-gray-500">{inquiry.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getTypeIcon(inquiry.type)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(inquiry.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(inquiry.status)}`}>
                          {getStatusIcon(inquiry.status)}
                          <span className="ml-1 capitalize">{inquiry.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(inquiry._id);
                          }}
                          className="text-red-600 hover:text-red-900 ml-2"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Inquiry detail panel */}
        {showDetails && selectedInquiry && (
          <div className="md:w-1/2 bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold">Inquiry Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="text-sm">Close</span>
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedInquiry.status)}`}>
                  {getStatusIcon(selectedInquiry.status)}
                  <span className="ml-1 capitalize">{selectedInquiry.status}</span>
                </span>
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Change status:</span>
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleStatusChange(selectedInquiry._id, 'new')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedInquiry.status === 'new'
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                      }`}
                    >
                      New
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedInquiry._id, 'in-progress')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedInquiry.status === 'in-progress'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedInquiry._id, 'resolved')}
                      className={`px-3 py-1 text-xs rounded-full ${
                        selectedInquiry.status === 'resolved'
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      Resolved
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Customer Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <PersonIcon className="text-gray-400 mr-2" fontSize="small" />
                      <span className="text-sm text-gray-800">{selectedInquiry.name}</span>
                    </div>
                    <div className="flex items-center">
                      <EmailIcon className="text-gray-400 mr-2" fontSize="small" />
                      <a 
                        href={`mailto:${selectedInquiry.email}`} 
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <PhoneIcon className="text-gray-400 mr-2" fontSize="small" />
                      <a 
                        href={`tel:${selectedInquiry.phone}`} 
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">Inquiry Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <MessageIcon className="text-gray-400 mr-2 mt-1" fontSize="small" />
                      <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-800 whitespace-pre-wrap w-full">
                        {selectedInquiry.message}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <AccessTimeIcon className="text-gray-400 mr-2" fontSize="small" />
                      <span className="text-sm text-gray-600">
                        Submitted on {formatDate(selectedInquiry.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark flex items-center"
                    onClick={() => window.open(`mailto:${selectedInquiry.email}?subject=RE: Your inquiry to SmartBuild Market&body=Dear ${selectedInquiry.name},%0D%0A%0D%0AThank you for your inquiry.%0D%0A%0D%0ARegards,%0D%0ASmartBuild Market Team`)}
                  >
                    <MarkEmailReadIcon className="mr-2" fontSize="small" />
                    <span>Reply via Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiriesManagement; 