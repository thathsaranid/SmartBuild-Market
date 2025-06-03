import { useState, useEffect } from "react";
import "../assets/css/seller-dashboard.css";
import { productAPI } from "../services/api";
import { toast } from 'react-toastify';

const SellerDashboard = () => {
  const [product, setProduct] = useState({
    material: "",
    materialType: "",
    price: "",
    description: "",
    supplierName: "",
    category: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAllProducts();
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      toast.error("Failed to load products");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setImageFile(files[0]);
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editMode) {
        await productAPI.updateProduct(currentProductId, product, imageFile);
        toast.success("Product updated successfully");
      } else {
        await productAPI.addProduct(product, imageFile);
        toast.success("Product added successfully");
      }
      
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(editMode ? "Failed to update product" : "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        await productAPI.deleteProduct(id);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (product) => {
    setProduct({
      material: product.material,
      materialType: product.materialType || "",
      price: product.price,
      description: product.description,
      supplierName: product.supplierName || "",
      category: product.category || "",
    });
    setCurrentProductId(product._id);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setProduct({
      material: "",
      materialType: "",
      price: "",
      description: "",
      supplierName: "",
      category: "",
    });
    setImageFile(null);
    setEditMode(false);
    setCurrentProductId(null);
  };

  return (
    <div className="dashboard-container">
      <h1>Seller Dashboard</h1>
      <div className="form-wrapper">
        <form className="product-form" onSubmit={handleSubmit}>
          <h2>{editMode ? "Update Product" : "Add New Product"}</h2>

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select the product type</option>
            <optgroup label="Material Items">
              <option value="Structural Materials">Structural Materials</option>
              <option value="Finishing Materials">Finishing Materials</option>
              <option value="Plumbing & Sanitary Materials">
                Plumbing & Sanitary Materials
              </option>
              <option value="Electrical & Lighting">
                Electrical & Lighting
              </option>
              <option value="Safety & Protective Equipment">
                Safety & Protective Equipment
              </option>
              <option value="Hardware & Fasteners">Hardware & Fasteners</option>
            </optgroup>
            <optgroup label="Interior Design">
              <option value="Historic Formal Type">Historic Formal Type</option>
              <option value="Casual & Comforting Type">
                Casual & Comforting Type
              </option>
              <option value="Relaxed Modern Type">Relaxed Modern Type</option>
              <option value="Traditional Builder's Brick Type">
                Traditional Builder's Brick Type
              </option>
              <option value="Sophisticated Serene Type">
                Sophisticated Serene Type
              </option>
              <option value="Farmhouse Fresh Type">Farmhouse Fresh Type</option>
            </optgroup>
          </select>

          <input
            type="text"
            name="material"
            placeholder="Product Name"
            value={product.material}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="materialType"
            placeholder="Product Type"
            value={product.materialType}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="supplierName"
            placeholder="Brand/Supplier"
            value={product.supplierName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Price (LKR)"
            value={product.price}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {imageFile && <p className="file-selected">Image selected: {imageFile.name}</p>}

          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : editMode ? "Update Product" : "Add Product"}
            </button>
            {editMode && (
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="product-list">
        <h2>My Products</h2>
        {loading && <p>Loading products...</p>}
        {!loading && products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-image">
                {product.image && (
                  <img 
                    src={`data:${product.image.contentType};base64,${Buffer.from(product.image.data).toString('base64')}`} 
                    alt={product.material} 
                  />
                )}
              </div>
              <div className="product-info">
                <h3>{product.material}</h3>
                <p>
                  <strong>Brand/Supplier:</strong> {product.supplierName}
                </p>
                <p>
                  <strong>Price:</strong> LKR {product.price}
                </p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>{product.description}</p>
              </div>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
