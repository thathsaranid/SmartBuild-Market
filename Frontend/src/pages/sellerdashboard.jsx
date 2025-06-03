import React, { useState } from "react";
import "../assets/css//SellerDashboard.css";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productname: "",
    category: "",
    subcategory: "",
    brand: "",
    price: "",
    description: "",
    quantity: "",
    image: null,
  });

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else if (name === "category") {
      // Reset subcategory when category changes
      setNewProduct({ 
        ...newProduct, 
        [name]: value, 
        subcategory: "" 
      });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, newProduct]);
    setNewProduct({
      productname: "",
      category: "",
      subcategory: "",
      brand: "",
      price: "",
      description: "",
      quantity: "",
      image: null,
    });
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div className="dashboard">
      <h1>Seller Dashboard</h1>
      
      <div className="dashboard-header">
        <Link to="/add-product" className="add-product-button">
          <AddIcon /> Add New Product
        </Link>
      </div>

      <form className="add-product-form" onSubmit={handleAddProduct}>
        <h2>Quick Add Product</h2>
        
        {/* Category Selection */}
        <div className="form-group">
          <label htmlFor="category">Product Category</label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">-- Select Category --</option>
            {Object.keys(productCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Selection (only shown if category has subcategories) */}
        {newProduct.category && productCategories[newProduct.category].length > 0 && (
          <div className="form-group">
            <label htmlFor="subcategory">Subcategory</label>
            <select
              id="subcategory"
              name="subcategory"
              value={newProduct.subcategory}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">-- Select Subcategory --</option>
              {productCategories[newProduct.category].map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <input
          type="text"
          name="productname"
          placeholder="Product Name"
          value={newProduct.productname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={newProduct.brand}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity in Stock"
          value={newProduct.quantity}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      <div className="product-list">
        <h2>My Products</h2>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <ul>
            {products.map((product, index) => (
              <li key={index} className="product-item">
                <div className="product-details">
                  <strong>{product.productname}</strong> ({product.brand})<br />
                  Category: {product.category} {product.subcategory && `> ${product.subcategory}`}<br />
                  Price: LKR {product.price}<br />
                  Quantity: {product.quantity} units<br />
                  {product.description}
                </div>
                <div className="product-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
