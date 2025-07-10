import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProductById } from '../api/products.api';
import "../css/EditProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const { name, description, price, category, brand, stock } = res.product;
        setProductData((prev) => ({
          ...prev,
          name,
          description,
          price,
          category,
          brand,
          stock,
        }));
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('brand', productData.brand);
    formData.append('stock', productData.stock);
    if (productData.image) {
      formData.append('image', productData.image); // New image only if selected
    }

    try {
      await updateProductById(id, formData);
      alert('Product updated successfully');
      navigate('/admin'); // redirect to admin panel
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="edit-product-form">
        <label>Name:</label>
        <input type="text" name="name" value={productData.name} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={productData.description} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={productData.price} onChange={handleChange} required />

        <label>Category:</label>
        <input type="text" name="category" value={productData.category} onChange={handleChange} required />

        <label>Brand:</label>
        <input type="text" name="brand" value={productData.brand} onChange={handleChange} required />

        <label>Stock:</label>
        <input type="number" name="stock" value={productData.stock} onChange={handleChange} required />

        <label>Change Image (optional):</label>
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
