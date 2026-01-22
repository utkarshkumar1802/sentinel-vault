import axios from 'axios';

// The base URL for our backend
const API_URL = '/api/auth/';

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data.token) {
    // Save the "Passport" (JWT) to the browser's memory
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem('user');
};

const authService = { register, login, logout };
export default authService;