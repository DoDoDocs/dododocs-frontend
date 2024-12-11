// src/api/auth.js
import api from './axios.js';

export const memberAPI = {
  //멤버의 기본 프로필 정보 조회 API
  getMemberInfo: async () => {
    try {
      console.log('🏃 멤버의 기본 프로필 정보 조회 API,,,');
      const response = await api.get(`/api/member/info`);
      return response.data;
    } catch (error) {
      console.error('Failed to getMemberAllRepoList :', error);
      throw new Error(error.response?.data?.message || '❌ Failed to get Repo List');
    }
  },

  //멤버의 깃허브 레포지토리 이름 리스트 조회
  getMemberAllRepoList: async () => {
    try {
      console.log('🏃 멤버의 깃허브 레포지토리 이름 리스트 조회,,,');
      const response = await api.get(`/api/member/repos/all`);
      return response.data;
    } catch (error) {
      console.error('Failed to getMemberAllRepoList :', error);
      throw new Error(error.response?.data?.message || '❌ Failed to get Repo List');
    }
  },
};
