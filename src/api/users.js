import api from './axios.js';

export const userAPI = {
  // 사용자 관련 엔드포인트
  getProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.patch('/users/profile', data);
    return response.data;
  },

  getPreferences: async () => {
    const response = await api.get('/users/preferences');
    return response.data;
  },
};
