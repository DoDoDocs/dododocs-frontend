import api from './axios.js';

export const authAPI = {
  // 인증 관련 앤드포인트
  login: async () => {
    const response = await api.get('/api/auth/link');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};
