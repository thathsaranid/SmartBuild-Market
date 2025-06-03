import React, { useState, useEffect } from 'react';
import { materialAPI } from '../../services/api';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    material: '',
    materialType: '',
    price: '',
    supplierName: '',
    description: '',
    dateAdded: new Date().toISOString().split('T')[0]
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await materialAPI.getAllMaterials();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
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
    
    if (!formData.material.trim()) errors.material = 'Material name is required';
    if (!formData.materialType.trim()) errors.materialType = 'Material type is required';
    if (!formData.price) errors.price = 'Price is required';
    else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) 
      errors.price = 'Price must be a positive number';
    if (!formData.supplierName.trim()) errors.supplierName = 'Supplier name is required';
    
    if (!editingProduct && !imageFile) errors.image = 'Image is required';
    
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
      if (editingProduct) {
        // Update existing product
        await materialAPI.updateMaterial(editingProduct._id, formData, imageFile);
      } else {
        // Add new product
        await materialAPI.addMaterial(formData, imageFile);
      }
      
      setSubmitSuccess(true);
      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts(); // Refresh product list
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.response?.data?.message || 'Failed to save product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      material: product.material || '',
      materialType: product.materialType || '',
      price: product.price || '',
      supplierName: product.supplierName || '',
      description: product.description || '',
      dateAdded: product.dateAdded || new Date().toISOString().split('T')[0]
    });
    
    // If product has an image
    if (product._id) {
      setImagePreview(`http://localhost:3001/material/material/${product._id}/image`);
    } else {
      setImagePreview(null);
    }
    
    setShowForm(true);
    setFormErrors({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      setLoading(true);
      await materialAPI.deleteMaterial(id);
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      material: '',
      materialType: '',
      price: '',
      supplierName: '',
      description: '',
      dateAdded: new Date().toISOString().split('T')[0]
    });
    setImageFile(null);
    setImagePreview(null);
    setFormErrors({});
  };

  const openNewProductForm = () => {
    setEditingProduct(null);
    resetForm();
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    resetForm();
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    (product.material && product.material.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.materialType && product.materialType.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (product.supplierName && product.supplierName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Render product image or placeholder
  const renderProductImage = (product) => {
    if (product.image && product.image.data) {
      try {
        // Convert buffer data to base64
        const buffer = product.image.data.data || product.image.data;
        const base64String = btoa(
          new Uint8Array(buffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        return (
          <img
            src={`data:${product.image.contentType};base64,${base64String}`}
            alt={product.material}
            className="w-16 h-16 object-cover rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
              e.target.parentElement.innerHTML = '<div class="w-16 h-16 bg-gray-200 flex items-center justify-center rounded"><ImageIcon /></div>';
            }}
          />
        );
      } catch (error) {
        console.error('Error rendering image:', error);
        return <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded"><ImageIcon /></div>;
      }
    }
    return <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded"><ImageIcon /></div>;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
          <button
            onClick={openNewProductForm}
            className="admin-btn admin-btn-primary flex items-center space-x-1"
          >
            <AddIcon fontSize="small" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Success message */}
        {submitSuccess && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md">
            Product successfully {editingProduct ? 'updated' : 'added'}!
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
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Product Add/Edit Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button 
                    onClick={closeForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <CloseIcon />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="admin-form space-y-4">
                  <div>
                    <label htmlFor="material">Material Name *</label>
                    <input
                      type="text"
                      id="material"
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className={formErrors.material ? 'border-red-500' : ''}
                    />
                    {formErrors.material && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.material}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="materialType">Material Type *</label>
                    <select
                      id="materialType"
                      name="materialType"
                      value={formData.materialType}
                      onChange={handleInputChange}
                      className={formErrors.materialType ? 'border-red-500' : ''}
                    >
                      <option value="">Select a type</option>
                      <option value="structural">Structural Materials</option>
                      <option value="electrical">Electrical Supplies</option>
                      <option value="plumbing">Plumbing Materials</option>
                      <option value="finishing">Finishing Materials</option>
                      <option value="safety">Safety Equipment</option>
                      <option value="tools">Tools & Hardware</option>
                    </select>
                    {formErrors.materialType && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.materialType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="price">Price (LKR) *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className={formErrors.price ? 'border-red-500' : ''}
                    />
                    {formErrors.price && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="supplierName">Supplier Name *</label>
                    <input
                      type="text"
                      id="supplierName"
                      name="supplierName"
                      value={formData.supplierName}
                      onChange={handleInputChange}
                      className={formErrors.supplierName ? 'border-red-500' : ''}
                    />
                    {formErrors.supplierName && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.supplierName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label>Product Image {!editingProduct && '*'}</label>
                    <div className="mt-2">
                      {imagePreview ? (
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
                          >
                            <CloseIcon fontSize="small" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={`w-full p-2 border ${formErrors.image ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                          />
                          {formErrors.image && (
                            <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="admin-btn admin-btn-secondary"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="admin-btn admin-btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No products found. Add your first product to get started.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No products match your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Material</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Supplier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{renderProductImage(product)}</td>
                    <td>{product.material}</td>
                    <td>{product.materialType}</td>
                    <td>{parseFloat(product.price).toLocaleString()} LKR</td>
                    <td>{product.supplierName}</td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <EditIcon fontSize="small" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
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

export default ProductsManagement; 