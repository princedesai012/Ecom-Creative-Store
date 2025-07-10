import { API } from '../api/api';

// Add item to cart


export const addToCart = async (productId, quantity) => {
  const response = await API.post(`/cart/add/${productId}`, { quantity });
  return response.data;
};
// Get all items in user's cart
export const getCartItems = async () => {
  try {
    const response = await API.get('/cart/');
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error.response?.data || error.message);
    throw error;
  }
};

// Remove item from cart by ID
export const removeCartItem = async (itemId) => {
  try {
    const response = await API.delete(`/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error.response?.data || error.message);
    throw error;
  }
};

// Clear entire cart (optional route)
export const clearCart = async () => {
  try {
    const response = await API.delete('/cart/clear');
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error.response?.data || error.message);
    throw error;
  }
};
