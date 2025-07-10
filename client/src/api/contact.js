import { API } from './api';

// Create a new contact message
export const createContactMessage = async (email, message) => {
  const response = await API.post('/contact', { email, message });
  return response.data;
};

// Get messages by current user
export const getMyContactMessages = async () => {
  const response = await API.get('/contact/user/me');
  return response.data;
};

// Admin: Get all contact messages
export const getAllContactMessages = async () => {
  const response = await API.get('/contact');
  return response.data;
};

// Admin: Delete a contact message
export const deleteContactMessageById = async (id) => {
  const response = await API.delete(`/contact/${id}`);
  return response.data;
};
