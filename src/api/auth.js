// src/api/auth.js
import api from './axios.js';

const AUTH_ENDPOINTS = {
  GET_OAUTH_LINK: '/api/auth/link',
  LOGIN: '/api/auth/login',
};

export const authAPI = {
  // OAuth 로그인 링크 요청
  /**
   * Retrieves the OAuth login link for the application.
   * @returns {Promise<string>} The OAuth login link.
   * @throws {Error} If there is an error retrieving the OAuth link.
   */
  getOAuthLink: async () => {
    try {
      const response = await api.get(AUTH_ENDPOINTS.GET_OAUTH_LINK);
      return response.data;
    } catch (error) {
      console.error('Failed to get OAuth link:', error);
      throw new Error(error.response?.data?.message || 'Failed to get OAuth link');
    }
  },

  // OAuth 로그인 처리
  login: async (code) => {
    try {
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, { code }, { timeout: 30000 });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
};
