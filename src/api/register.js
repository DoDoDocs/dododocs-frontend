// src/api/register.js
import api from './axios.js';

export const registerAPI = {
  /**
   *
   * @param {*} repo
   * repo {
   *   repoName: string;
   *   branchName: string;
   *   korean : boolean;
   *   includeTest : boolean;
   * }
   */
  postUploadRepo: async (repo) => {
    try {
      console.log('🏃 레포지터리 등록 요청,,,');
      const response = await api.post(`/api/upload/s3`, {
        repoName: repo.repoName,
        repoUrl: repo.repoUrl,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to post Upload Repo :', error);
      throw new Error(error.response?.data?.message || '❌ Failed to post Upload Repo');
    }
  },

  getRegisteredRepoList: async () => {
    try {
      console.log('🏃 레포지터리 등록한 리스트 목록 가져오기,,,');
      const response = await api.get(`/api/register`);
      return response.data;
    } catch (error) {
      console.error('Failed to get Repo List :', error);
      throw new Error(error.response?.data?.message || '❌ Failed to get Repo List');
    }
  },

  deleteRegisteredRepo: async (repo) => {
    const repoId = repo.registeredRepoId;
    try {
      console.log('🏃 레포지터리 삭제 ,,,');
      const response = await api.post(`/api/register`, {
        registeredRepoId: repoId,
      });
      return response.data;
    } catch (error) {
      console.error('failed Delete Repo :', error);
      throw new Error(error.response?.data?.message || '❌ failed Delete Repo ');
    }
  },
};
