import React, { useState, useEffect } from 'react';
import { workerAPI } from '../../services/api';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const WorkersManagement = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    NICNumber: '',
    address: '',
    specialization: '',
    experience: '',
    grossSalary: '',
    hourlyRate: '',
    status: 'available',
    image: null
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch workers on component mount
  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await workerAPI.getAllWorkers();
      setWorkers(data);
    } catch (err) {
      console.error('Error fetching workers:', err);
      setError('Failed to load workers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setFormErrors(prev => ({
          ...prev,
          image: 'Please select an image file'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors(prev => ({
          ...prev,
          image: 'Image size should be less than 5MB'
        }));
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error for image
      if (formErrors.image) {
        setFormErrors(prev => ({
          ...prev,
          image: null
        }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.NICNumber.trim()) errors.NICNumber = 'NIC number is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.specialization.trim()) errors.specialization = 'Specialization is required';
    if (!formData.experience.trim()) errors.experience = 'Experience is required';
    if (!formData.grossSalary.trim()) errors.grossSalary = 'Gross salary is required';
    if (!formData.hourlyRate.trim()) errors.hourlyRate = 'Hourly rate is required';
    
    if (!editingWorker && !imageFile) errors.image = 'Profile image is required';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Create a copy of form data
      const processedFormData = { ...formData };
      
      // Convert numeric fields
      const numericFields = ['experience', 'grossSalary', 'hourlyRate'];
      numericFields.forEach(field => {
        if (processedFormData[field]) {
          processedFormData[field] = Number(processedFormData[field]);
        }
      });

      if (editingWorker) {
        await workerAPI.updateWorker(editingWorker._id, processedFormData, imageFile);
      } else {
        await workerAPI.addWorker(processedFormData, imageFile);
      }
      
      setSubmitSuccess(true);
      setShowForm(false);
      setEditingWorker(null);
      resetForm();
      fetchWorkers();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving worker:', err);
      const errorMessage = err.message || err.response?.data?.message || 'Failed to save worker. Please try again.';
      setError(errorMessage);
      
      // If it's an email conflict error, highlight the email field
      if (errorMessage.includes('email already exists')) {
        setFormErrors(prev => ({
          ...prev,
          email: 'This email is already registered. Please use a different email address.'
        }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (worker) => {
    setEditingWorker(worker);
    setFormData({
      name: worker.name || '',
      email: worker.email || '',
      phone: worker.phone || '',
      NICNumber: worker.NICNumber || '',
      address: worker.address || '',
      specialization: worker.specialization || '',
      experience: worker.experience || '',
      grossSalary: worker.grossSalary || '',
      hourlyRate: worker.hourlyRate || '',
      status: worker.status || 'available',
      image: worker.image || null
    });
    
    // If worker has an image
    if (worker.image && worker.image.data) {
      try {
        // Convert buffer data to base64
        const buffer = worker.image.data.data || worker.image.data;
        const base64String = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const contentType = worker.image.contentType || 'image/jpeg';
        setImagePreview(`data:${contentType};base64,${base64String}`);
      } catch (err) {
        console.error('Error processing image:', err);
        setImagePreview(null);
      }
    } else {
      setImagePreview(null);
    }
    
    setShowForm(true);
    setFormErrors({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this worker?')) return;
    
    try {
      setLoading(true);
      await workerAPI.deleteWorker(id);
      fetchWorkers(); // Refresh worker list
    } catch (err) {
      console.error('Error deleting worker:', err);
      setError('Failed to delete worker. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      NICNumber: '',
      address: '',
      specialization: '',
      experience: '',
      grossSalary: '',
      hourlyRate: '',
      status: 'available',
      image: null
    });
    setImageFile(null);
    setImagePreview(null);
    setFormErrors({});
  };

  const openNewWorkerForm = () => {
    setEditingWorker(null);
    resetForm();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingWorker(null);
    resetForm();
  };

  // Filter workers based on search term
  const filteredWorkers = workers.filter(worker => 
    (worker.name && worker.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (worker.email && worker.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (worker.specialization && worker.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Render worker image or placeholder
  const renderWorkerImage = (worker) => {
    if (worker.image && worker.image.data) {
      try {
        // Convert buffer data to base64
        const buffer = worker.image.data.data || worker.image.data;
        const base64String = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const contentType = worker.image.contentType || 'image/jpeg';
        return <img 
          src={`data:${contentType};base64,${base64String}`} 
          alt={worker.name} 
          className="w-12 h-12 object-cover rounded-full"
        />;
      } catch (err) {
        return <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full"><PersonIcon /></div>;
      }
    }
    return <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full"><PersonIcon /></div>;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Workers Management</h1>
          <button
            onClick={openNewWorkerForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors duration-200"
          >
            <AddIcon fontSize="small" />
            <span>Add Worker</span>
          </button>
        </div>

        {/* Success message */}
        {submitSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Worker successfully {editingWorker ? 'updated' : 'added'}!
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search workers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Worker Add/Edit Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingWorker ? 'Edit Worker' : 'Add New Worker'}
                  </h2>
                  <button 
                    onClick={closeForm}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <CloseIcon />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <PersonIcon className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="w-full">
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md cursor-pointer text-center transition-colors duration-200"
                      >
                        {imagePreview ? 'Change Image' : 'Upload Image'}
                      </label>
                      {formErrors.image && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>
                      )}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter full name"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter phone number"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NIC Number *
                      </label>
                      <input
                        type="text"
                        name="NICNumber"
                        value={formData.NICNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.NICNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter NIC number"
                      />
                      {formErrors.NICNumber && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.NICNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter address"
                      />
                      {formErrors.address && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization *
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.specialization ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter specialization"
                      />
                      {formErrors.specialization && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.specialization}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience *
                      </label>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.experience ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter years of experience"
                      />
                      {formErrors.experience && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.experience}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gross Salary (LKR) *
                      </label>
                      <input
                        type="number"
                        name="grossSalary"
                        value={formData.grossSalary}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.grossSalary ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter gross salary"
                      />
                      {formErrors.grossSalary && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.grossSalary}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hourly Rate (LKR) *
                      </label>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter hourly rate"
                      />
                      {formErrors.hourlyRate && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.hourlyRate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="unavailable">Unavailable</option>
                      </select>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-3 pt-6">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        editingWorker ? 'Update Worker' : 'Add Worker'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Workers List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : workers.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No workers found. Add your first worker to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => (
              <div key={worker._id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    {worker.image ? (
                      <img
                        src={`data:${worker.image.contentType};base64,${worker.image.data.toString('base64')}`}
                        alt={worker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PersonIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{worker.name}</h3>
                    <p className="text-sm text-gray-600">{worker.specialization}</p>
                    <p className="text-sm text-gray-500">{worker.experience} years experience</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(worker)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(worker._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <EmailIcon className="w-4 h-4 mr-1" />
                      <span>{worker.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <LocalPhoneIcon className="w-4 h-4 mr-1" />
                      <span>{worker.phone}</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">NIC:</span> {worker.NICNumber}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Address:</span> {worker.address}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Salary:</span> LKR {worker.grossSalary}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Rate:</span> LKR {worker.hourlyRate}/hr
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      worker.status === 'available' ? 'bg-green-100 text-green-800' :
                      worker.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {worker.status ? worker.status.charAt(0).toUpperCase() + worker.status.slice(1) : 'Available'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkersManagement; 