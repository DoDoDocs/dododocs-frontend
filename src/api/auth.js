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
      console.log('🏃 로그인 링크 가져오기,,,api요청 보냄,,,');
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
      console.log('🏃 로그인 처리,,,api요청 /api/auth/login 보냄,,,');
      const response = await api.post(AUTH_ENDPOINTS.LOGIN, {
        code: code.toString().trim(), // 코드 정제해서 전송
      });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },
};
