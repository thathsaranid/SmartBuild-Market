// src/components/ProductManagement.jsx
import React, { useState } from "react";
import "../assets/css/admin-dashboard.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      type: "Structural Materials",
      name: "Cement",
      brand: "UltraTech",
      price: 500,
      description: "High-quality cement for construction",
      quantity: 100,
    },
    {
      id: 2,
      type: "Finishing Materials",
      name: "Paint",
      brand: "Asian Paints",
      price: 200,
      description: "Premium wall paint",
      quantity: 50,
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    type: "",
    name: "",
    brand: "",
    price: "",
    description: "",
    quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const { type, name, brand, price, description, quantity } = newProduct;
    if (!type || !name || !brand || !price || !description || !quantity) return;

    setProducts((prevProducts) => [
      ...prevProducts,
      {
        id: prevProducts.length + 1,
        type,
        name,
        brand,
        price: parseFloat(price),
        description,
        quantity: parseInt(quantity, 10),
      },
    ]);

    setNewProduct({
      type: "",
      name: "",
      brand: "",
      price: "",
      description: "",
      quantity: "",
    });
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="management-section">
      <h2>Product Management</h2>
      <div className="form">
        <select
          name="type"
          value={newProduct.type}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Product Type --</option>
          <optgroup label="Material Items">
            <option value="Structural Materials">Structural Materials</option>
            <option value="Finishing Materials">Finishing Materials</option>
            <option value="Plumbing & Sanitary Materials">
              Plumbing & Sanitary Materials
            </option>
            <option value="Electrical & Lighting">Electrical & Lighting</option>
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
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={newProduct.brand}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
          rows="3"
        ></textarea>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleChange}
        />

        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> ({product.type})<br />
            Brand: {product.brand}
            <br />
            Price: LKR{product.price}
            <br />
            Description: {product.description}
            <br />
            Quantity: {product.quantity} units
            <br />
            <button onClick={() => handleDeleteProduct(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
