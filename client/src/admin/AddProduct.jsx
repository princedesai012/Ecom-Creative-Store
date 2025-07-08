import React, { useState } from "react";
import { addProduct } from "../api/products.api";
import "../css/LoginPage.css"; // Using the same theme

function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await addProduct(formData);
      alert("Product added successfully!");
      setProductData({
        name: "",
        price: "",
        description: "",
        category: "",
        image: null,
      });
    } catch (error) {
      alert("Failed to add product!");
      console.error(error);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <div className="login-form-header">
          <div className="brand-logo">
            <span className="brand-icon">🛒</span>
            Add Product
          </div>
          <h2 className="login-title">New Product Entry</h2>
          <p className="login-subtitle">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <textarea
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleChange}
              rows={4}
              style={{
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                padding: "1rem",
                color: "var(--text-light)",
                fontSize: "1rem",
              }}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={productData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "var(--text-muted)",
              }}
            />
          </div>

          <button type="submit" className="btn-login">
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
