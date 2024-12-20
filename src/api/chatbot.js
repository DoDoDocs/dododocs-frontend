// src/api/download.js
import api from './axios.js';

export const chatBotAPI = {
  // chatbot 대화 내역 불러오기 API
  getChatbotHistory: async (registeredRepoId) => {
    try {
      console.log('🏃 chatbot 대화 내역 불러오기 조회 API,,,', registeredRepoId);
      const response = await api.get(`/api/chatbot/logs/${registeredRepoId}`);
      console.log('chatbot 대화 내역 불러오기 : ', response.data);
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
