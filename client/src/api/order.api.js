import { API } from '../api/api';

export const createOrder = async (orderData) => {
  try {
    const response = await API.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await API.get('/orders');
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await API.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error.response?.data || error.message);
    throw error;
  }
};

export const updateOrderStatus = async (id, statusData) => {
  try {
    const response = await API.put(`/orders/${id}`, statusData);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteOrderById = async (id) => {
  try {
    const response = await API.delete(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error.response?.data || error.message);
    throw error;
  }
};

export const getOrdersByUserId = async () => {
  try {
    const response = await API.get(`/orders/User/Order`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error.response?.data || error.message);
    throw error;
  }
};

export const cancelOrder = async (id) => {
  try {
    const response = await API.post(`/orders/cancel/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling order:", error.response?.data || error.message);
    throw error;
  }
};
