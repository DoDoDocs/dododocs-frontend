// src/api/download.js
import api from './axios.js';

export const downloadAPI = {
  // AI 분석 README 결과 불러오기 API
  postDownloadReadme: async (registeredRepoId) => {
    try {
      console.log('🏃 AI 분석 README 결과 불러오기 조회 API,,,', registeredRepoId);
      const response = await api.post(`/api/download/readme/${registeredRepoId}`);
      console.log('AI 분석 README 결과 : ', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to postDownloadReadme :', error);
      throw new Error(
        error.response?.data?.message || '❌ Failed to post Download Readme',
      );
    }
  },

  //AI 분석 DOCS 결과 목록 불러오기
  postDownloadDocs: async (registeredRepoId) => {
    try {
      console.log('🏃 AI 분석 DOCS 결과 불러오기 조회 API ,,,');
      const response = await api.post(`/api/download/docs/${registeredRepoId}`);
      console.log('AI 분석 DOCS 결과 : ', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to postDownloadDocs :', error);
      throw new Error(error.response?.data?.message || '❌ Failed to post Download Docs');
    }
  },
};
