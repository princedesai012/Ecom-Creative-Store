import { API } from "./api" 
// ✅ Add a new product (Admin only)
export const addProduct = async (formData) => {
  const res = await API.post('/products/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

// ✅ Get all products with optional query params
export const getAllProducts = async (query = '') => {
  const res = await API.get(`/products${query}`);
  return res.data;
};

// ✅ Get product by ID
export const getProductById = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

// ✅ Update a product (Admin only)
export const updateProductById = async (id, formData) => {
  const res = await API.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

// ✅ Delete a product (Admin only)
export const deleteProductById = async (id) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

// ✅ Add a review (User only)
export const addReviewToProduct = async (productId, reviewData) => {
  const res = await API.post(`/products/review/pr/${productId}`, reviewData);
  return res.data;
};


export const getReviewtoproduct = async(productId) => {
  const res = await API.get(`/products/review/pr/${productId}`)
  return res.data;
}