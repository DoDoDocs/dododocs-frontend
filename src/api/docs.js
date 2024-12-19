// src/api/docs.js
import api from './axios.js';

export const docsAPI = {
  //AI 분석 및 문서화 요청 (레포 등록) API
  postUploadRepo: async (uploadRepo) => {
    try {
      console.log('🏃 AI 분석 및 문서화 요청 (레포 등록) API,,, ', uploadRepo);

      // Request body validation
      if (!uploadRepo?.repositoryName || !uploadRepo?.branchName) {
        throw new Error('Repository name and branch name are required');
      }

      const response = await api.post('/api/upload/s3', {
        repositoryName: uploadRepo.repositoryName,
        branchName: uploadRepo.branchName,
        korean: uploadRepo.korean, // default to true if not specified
        includeTest: uploadRepo.includeTest ?? true, // default to true if not specified
      });

      console.log('⭐️ AI 분석 요청 성공:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to postUploadRepo:', error);
      throw new Error(error.response?.data?.message || '❌ Failed to postUploadRepo');
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
