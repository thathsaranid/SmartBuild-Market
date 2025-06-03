import React, { useState, useEffect } from 'react';
import { machineAPI } from '../../services/api';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ConstructionIcon from '@mui/icons-material/Construction';

const VehiclesManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    modelNumber: '',
    country: '',
    category: 'Earth-moving equipment',
    type: '',
    dailyRate: '',
    name: '',
    licensePlate: '',
    year: '',
    capacity: '',
    fuelType: '',
    availability: 'available'
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Add this array of categories somewhere before the render return
  const categories = [
    'Earth-moving equipment',
    'Hauling vehicles',
    'Lifting equipment',
    'Specialized',
    'Material Handling',
    'Concrete Equipment',
    'Road Construction',
    'Compaction Equipment'
  ];

  // Fetch vehicles on component mount
  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await machineAPI.getAllMachines();
      console.log('Vehicles data received:', data);
      setVehicles(data || []);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
      setError('Failed to load vehicles. Please ensure the backend server is running at http://localhost:3001');
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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error for image
      if (formErrors.image) {
        setFormErrors({
          ...formErrors,
          image: null
        });
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.brand.trim()) errors.brand = 'Brand is required';
    if (!formData.model.trim()) errors.model = 'Model is required';
    if (!formData.modelNumber.trim()) errors.modelNumber = 'Model number is required';
    if (!formData.country.trim()) errors.country = 'Country is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.type.trim()) errors.type = 'Vehicle type is required';
    
    if (!formData.dailyRate.trim()) {
      errors.dailyRate = 'Daily rate is required';
    } else if (isNaN(formData.dailyRate) || parseFloat(formData.dailyRate) <= 0) {
      errors.dailyRate = 'Daily rate must be a positive number';
    }
    
    if (!formData.licensePlate.trim()) errors.licensePlate = 'License plate is required';
    
    if (!editingVehicle && !imageFile) errors.image = 'Vehicle image is required';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', errors);
      setFormErrors(errors);
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Create a backend-compatible data object
      const backendData = {
        brand: formData.brand,
        model: formData.model,
        modelNumber: formData.modelNumber,
        country: formData.country,
        category: formData.category,
        type: formData.type,
        dailyRate: parseFloat(formData.dailyRate),
        name: formData.name || `${formData.brand} ${formData.model}`,
        licensePlate: formData.licensePlate,
        year: formData.year ? parseInt(formData.year) : undefined,
        capacity: formData.capacity,
        fuelType: formData.fuelType,
        availability: formData.availability
      };

      console.log('Sending data to backend:', backendData);

      if (editingVehicle) {
        console.log('Updating existing vehicle:', editingVehicle._id);
        await machineAPI.updateMachine(editingVehicle._id, backendData, imageFile);
      } else {
        console.log('Adding new vehicle');
        await machineAPI.addMachine(backendData, imageFile);
      }
      
      console.log('Vehicle saved successfully');
      setSubmitSuccess(true);
      setShowForm(false);
      setEditingVehicle(null);
      resetForm();
      fetchVehicles(); // Refresh vehicle list
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving vehicle:', err);
      setError(err.response?.data?.message || 'Failed to save vehicle. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      brand: vehicle.brand || '',
      model: vehicle.model || '',
      modelNumber: vehicle.modelNumber || '',
      country: vehicle.country || '',
      category: vehicle.category || 'Earth-moving equipment',
      type: vehicle.type || '',
      dailyRate: vehicle.dailyRate || '',
      
      // Frontend display fields
      name: vehicle.name || vehicle.brand + ' ' + vehicle.model || '',
      licensePlate: vehicle.licensePlate || '',
      year: vehicle.year || '',
      capacity: vehicle.capacity || '',
      fuelType: vehicle.fuelType || '',
      availability: vehicle.availability || 'available'
    });
    
    // If vehicle has an image
    if (vehicle.image && vehicle.image.data) {
      try {
        // Convert buffer data to base64
        const buffer = vehicle.image.data.data || vehicle.image.data;
        const base64String = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const contentType = vehicle.image.contentType || 'image/jpeg';
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
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    
    try {
      setLoading(true);
      await machineAPI.deleteMachine(id);
      fetchVehicles(); // Refresh vehicle list
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      setError('Failed to delete vehicle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      brand: '',
      model: '',
      modelNumber: '',
      country: '',
      category: 'Earth-moving equipment',
      type: '',
      dailyRate: '',
      name: '',
      licensePlate: '',
      year: '',
      capacity: '',
      fuelType: '',
      availability: 'available'
    });
    setImageFile(null);
    setImagePreview(null);
    setFormErrors({});
  };

  const openNewVehicleForm = () => {
    setEditingVehicle(null);
    resetForm();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingVehicle(null);
    resetForm();
  };

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle => 
    (vehicle.name && vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (vehicle.type && vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (vehicle.category && vehicle.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (vehicle.licensePlate && vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Render vehicle image or placeholder
  const renderVehicleImage = (vehicle) => {
    if (vehicle.image && vehicle.image.data) {
      try {
        // Handle string-based mock data
        if (typeof vehicle.image.data === 'string') {
          return <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded"><LocalShippingIcon /></div>;
        }
        
        // Convert buffer data to base64
        const buffer = vehicle.image.data.data || vehicle.image.data;
        const base64String = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const contentType = vehicle.image.contentType || 'image/jpeg';
        return <img 
          src={`data:${contentType};base64,${base64String}`} 
          alt={vehicle.name} 
          className="w-16 h-16 object-cover rounded"
        />;
      } catch (err) {
        console.error('Error processing image:', err);
        return <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded"><LocalShippingIcon /></div>;
      }
    }
    return <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded"><LocalShippingIcon /></div>;
  };

  // Get icon based on vehicle type
  const getVehicleIcon = (type) => {
    type = type ? type.toLowerCase() : '';
    
    if (type.includes('truck') || type.includes('lorry')) {
      return <LocalShippingIcon className="text-gray-600" />;
    } else if (type.includes('car') || type.includes('van')) {
      return <DirectionsCarIcon className="text-gray-600" />;
    } else if (type.includes('motorcycle') || type.includes('bike')) {
      return <TwoWheelerIcon className="text-gray-600" />;
    } else if (type.includes('tractor') || type.includes('excavator')) {
      return <AgricultureIcon className="text-gray-600" />;
    } else {
      return <ConstructionIcon className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Vehicles & Equipment Management</h1>
          <button
            onClick={openNewVehicleForm}
            className="admin-btn admin-btn-primary flex items-center space-x-1"
          >
            <AddIcon fontSize="small" />
            <span>Add Vehicle/Equipment</span>
          </button>
        </div>

        {/* Success message */}
        {submitSuccess && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md">
            Vehicle successfully {editingVehicle ? 'updated' : 'added'}!
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, type, license plate..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Vehicle Add/Edit Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingVehicle ? 'Edit Vehicle/Equipment' : 'Add New Vehicle/Equipment'}
                  </h2>
                  <button 
                    onClick={closeForm}
                    className="text-gray-500 hover:text-gray-700"
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
                          <LocalShippingIcon className="w-16 h-16 text-gray-400" />
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
                        Brand/Manufacturer *
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.brand ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. Toyota, Caterpillar"
                      />
                      {formErrors.brand && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.brand}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model *
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.model ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. Hilux, 320D"
                      />
                      {formErrors.model && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.model}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Model Number *
                      </label>
                      <input
                        type="text"
                        name="modelNumber"
                        value={formData.modelNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.modelNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. 2023-ABC123"
                      />
                      {formErrors.modelNumber && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.modelNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country of Origin *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.country ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. Japan, USA"
                      />
                      {formErrors.country && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.category ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {formErrors.category && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type *
                      </label>
                      <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.type ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. Truck, Excavator"
                      />
                      {formErrors.type && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        License Plate/ID *
                      </label>
                      <input
                        type="text"
                        name="licensePlate"
                        value={formData.licensePlate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.licensePlate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. ABC-1234"
                      />
                      {formErrors.licensePlate && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.licensePlate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        placeholder="e.g. 2023"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Capacity/Size
                      </label>
                      <input
                        type="text"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        placeholder="e.g. 5 tons, 2.5 cubic meters"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Daily Rate (LKR) *
                      </label>
                      <input
                        type="number"
                        name="dailyRate"
                        value={formData.dailyRate}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                          formErrors.dailyRate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g. 5000"
                      />
                      {formErrors.dailyRate && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.dailyRate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fuel Type
                      </label>
                      <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        <option value="">Select fuel type</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="CNG">CNG</option>
                        <option value="N/A">Not Applicable</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Availability Status
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        <option value="available">Available</option>
                        <option value="inUse">In Use</option>
                        <option value="maintenance">Under Maintenance</option>
                        <option value="notAvailable">Not Available</option>
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
                        editingVehicle ? 'Update Vehicle' : 'Add Vehicle'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No vehicles or equipment found. Add your first item to get started.</p>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No vehicles or equipment match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>License/ID</th>
                  <th>Details</th>
                  <th>Rental Rate</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle._id}>
                    <td>{renderVehicleImage(vehicle)}</td>
                    <td className="font-medium">{vehicle.name}</td>
                    <td>
                      <div className="flex items-center space-x-1">
                        {getVehicleIcon(vehicle.type)}
                        <span>{vehicle.type}</span>
                      </div>
                    </td>
                    <td>{vehicle.licensePlate}</td>
                    <td>
                      <div className="text-sm">
                        {vehicle.make && vehicle.model ? `${vehicle.make} ${vehicle.model}` : ''}
                        {vehicle.year ? `, ${vehicle.year}` : ''}
                        {vehicle.capacity ? `, ${vehicle.capacity}` : ''}
                      </div>
                    </td>
                    <td>{parseFloat(vehicle.dailyRate || 0).toLocaleString()} LKR</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          vehicle.availability === 'available'
                            ? 'admin-badge-success'
                            : vehicle.availability === 'inUse'
                            ? 'admin-badge-info'
                            : vehicle.availability === 'maintenance'
                            ? 'admin-badge-warning'
                            : 'admin-badge-danger'
                        }`}
                      >
                        {vehicle.availability === 'available'
                          ? 'Available'
                          : vehicle.availability === 'inUse'
                          ? 'In Use'
                          : vehicle.availability === 'maintenance'
                          ? 'Maintenance'
                          : 'Not Available'}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(vehicle)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <EditIcon fontSize="small" />
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclesManagement; 