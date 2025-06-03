import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/AddProduct.css';

// MUI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';

const AddProduct = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Define the nested category structure
  const productCategories = {
    "Material Item": [
      "Structural Material",
      "Finishing Material",
      "Plumbing & Sanitary Material",
      "Electrical & Lighting Material",
      "Safety & Protective Equipment",
      "Hardware & Fasteners"
    ],
    "Interior Item": [
      "Historic Formal",
      "Casual & Comforting",
      "Relaxed Modern",
      "Traditional Builder's",
      "Sophisticated Serere",
      "Farmhouse Fresh Type"
    ],
    "Brick Type": []
  };

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    brand: '',
    price: '',
    quantity: '',
    description: '',
    specifications: '',
    supplierName: currentUser?.firstName || '',
    supplierContact: currentUser?.phoneNumb || '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "category") {
      // Reset subcategory when category changes
      setFormData({ 
        ...formData, 
        [name]: value, 
        subcategory: "" 
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      setError("Product image is required");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const productData = {
        ...formData,
        dateAdded: new Date().toISOString(),
        sellerEmail: currentUser.email || 'unknown'
      };
      
      await productAPI.addProduct(productData, imageFile);
      
      setSuccess(true);
      
      // Clear form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          category: '',
          subcategory: '',
          brand: '',
          price: '',
          quantity: '',
          description: '',
          specifications: '',
          supplierName: currentUser?.firstName || '',
          supplierContact: currentUser?.phoneNumb || '',
        });
        setImageFile(null);
        setImagePreview(null);
        setSuccess(false);
        navigate('/seller-dashboard');
      }, 2000);
      
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.response?.data?.message || "Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark mb-6"
        >
          <ArrowBackIcon className="mr-1" fontSize="small" />
          <span>Back</span>
        </button>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
              Product added successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Basic Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter product name"
                />
              </div>
              
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Enter brand name"
                />
              </div>
            </div>
            
            {/* Category Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">-- Select Category --</option>
                  {Object.keys(productCategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {formData.category && productCategories[formData.category].length > 0 && (
                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Subcategory *
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">-- Select Subcategory --</option>
                    {productCategories[formData.category].map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            {/* Price and Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (LKR) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="input-field"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Available Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="input-field"
                  placeholder="1"
                />
              </div>
            </div>
            
            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Product Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="input-field"
                placeholder="Provide detailed description..."
              ></textarea>
            </div>
            
            {/* Specifications */}
            <div>
              <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-1">
                Specifications
              </label>
              <textarea
                id="specifications"
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                rows="3"
                className="input-field"
                placeholder="Enter product specifications, size, weight, color, etc..."
              ></textarea>
            </div>
            
            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image *
              </label>
              
              {imagePreview ? (
                <div className="relative w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                  >
                    <CloseIcon fontSize="small" />
                  </button>
                </div>
              ) : (
                <div 
                  className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <PhotoCameraIcon className="text-gray-400 text-4xl mb-2" />
                  <p className="text-sm text-gray-500">Click to upload product image</p>
                  <p className="text-xs text-gray-400 mt-1">Recommended size: 800x800px</p>
                </div>
              )}
              
              <input
                type="file"
                id="image-upload"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            
            {/* Supplier Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="supplierName" className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier Name
                </label>
                <input
                  type="text"
                  id="supplierName"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="supplierContact" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="supplierContact"
                  name="supplierContact"
                  value={formData.supplierContact}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your contact number"
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium text-white bg-primary 
                  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary 
                  focus:ring-offset-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct; 