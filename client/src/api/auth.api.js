import { API } from './api';

// Register User
export const registerUser = async (userData) => {
    try {
        const response = await API.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
        throw error;
    }
};

// Login User
export const loginUser = async (credentials) => {
    try {
        const response = await API.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error.response?.data || error.message);
        throw error;
    }
};

// Verify OTP
export const verifyOtp = async (otpData) => {
    try {
        const response = await API.post('/auth/verify-otp', otpData);
        return response.data;
    } catch (error) {
        console.error("Error verifying OTP:", error.response?.data || error.message);
        throw error;
    }
};

// Logout
export const logoutUser = async () => {
    try {
        const response = await API.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error.response?.data || error.message);
        throw error;
    }
};

// Get User Profile
export const getUserProfile = async (userId) => {
    try {
        const response = await API.get(`/auth/profile/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        throw error;
    }
};

// Update User Profile
export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await API.put(`/auth/profile/${userId}`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating user profile:", error.response?.data || error.message);
        throw error;
    }
};

// Update Password
export const updatePassword = async (passwordData) => {
    try {
        const response = await API.put('/auth/update-password', passwordData);
        return response.data;
    } catch (error) {
        console.error("Error updating password:", error.response?.data || error.message);
        throw error;
    }
};
