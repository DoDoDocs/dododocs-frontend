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
      const response = await api.get(`/api/member/repos/registered`);
      console.log('💿💿받아온 등록된 레포지터리 목록', response.data);
      const parsingData = response.data.findRegisterRepoResponses;
      return parsingData;
    } catch (error) {
      console.error('Failed to get Repo List :', error);
      throw new Error(error.response?.data?.message || '❌ Failed to get Repo List');
    }
  },

  // deleteRegisteredRepo: async (repoId) => {
  //   try {
  //     console.log('🏃 레포지터리 삭제 ,,,');
  //     console.log('🏃 레포지터리 삭제하는 ID', repoId);

  //     const response = await api.delete(`/api/register`, {
  //       registeredRepoId: repoId,
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error('failed Delete Repo :', error);
  //     throw new Error(error.response?.data?.message || '❌ failed Delete Repo ');
  //   }
  // },

  deleteRegisteredRepo: async (repoId) => {
    try {
      console.log('🏃 레포지터리 삭제 중...');
      console.log('🏃 삭제할 레포지토리 ID:', repoId);

      const response = await api.delete('/api/register', {
        data: {
          registeredRepoId: repoId,
        },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: 'application/json',
        },
      });

      if (response.status === 204) {
        console.log('✅ 레포지토리 삭제 성공');
        return true;
      }

      return response.data;
    } catch (error) {
      console.error('❌ 레포지토리 삭제 실패:', error);
      throw new Error(error.response?.data?.message || '레포지토리 삭제에 실패했습니다.');
    }
  },
};
