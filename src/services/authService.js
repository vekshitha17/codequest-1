import API from './api';

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('cq_token', response.data.token);
    localStorage.setItem('cq_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('cq_token');
  localStorage.removeItem('cq_user');
};

export const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  if (response.data.user) {
    localStorage.setItem('cq_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const getUserProfile = async () => {
  const response = await API.get('/users/profile');
  return response.data;
};

export const updateUserProfile = async (updates) => {
  const response = await API.put('/users/profile', updates);
  if (response.data.user) {
    localStorage.setItem('cq_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const getUserProgress = async () => {
  const response = await API.get('/users/progress');
  return response.data;
};
