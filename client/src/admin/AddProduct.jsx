import React, { useRef, useState } from "react";
import { addProduct } from "../api/products.api";
import "../css/AddProduct.css";

function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    imageurl: null,
  });

  const fileRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === "imageurl" ? files[0] : value,
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
      alert("✅ Product added successfully!");
      console.log("Product added:", productData);

      // Reset form and file input
      setProductData({
        name: "",
        brand: "",
        price: "",
        stock: "",
        description: "",
        category: "",
        imageurl: null,
      });
      if (fileRef.current) fileRef.current.value = null;
    } catch (error) {
      alert("❌ Failed to add product!");
      console.error(error);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2>New Product Entry</h2>
        <p>Fill in the product details below</p>

        <form onSubmit={handleSubmit} className="add-product-form">
          {/* Product Name */}
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

          {/* Brand */}
          <div className="input-group">
            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={productData.brand}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
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

          {/* Stock */}
          <div className="input-group">
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={productData.stock}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="input-group">
            <textarea
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* Category */}
          <div className="input-group">
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
              className="category-select"
            >
              <option value="" disabled>Select Category</option>
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
              <option value="tablet">Tablet</option>
              <option value="accessory">Accessory</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="input-group">
            <input
              type="file"
              name="imageurl"
              accept="image/*"
              onChange={handleChange}
              ref={fileRef}
              required
            />
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">Submit Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
