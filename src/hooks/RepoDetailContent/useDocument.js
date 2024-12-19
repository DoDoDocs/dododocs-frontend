// src/hooks/RepoDetailContent/useDocument.js
import { useQuery } from '@tanstack/react-query';
import { downloadAPI } from '../../api/index.js';

export const useDocument = (registeredRepoId) => {
  console.log('useDocument hook called with ID:', registeredRepoId);

  return useQuery({
    queryKey: ['downloadDocs', registeredRepoId],
    queryFn: async () => {
      if (!registeredRepoId) {
        throw new Error('Repository ID is required');
      }
      const response = await downloadAPI.postDownloadDocs(registeredRepoId);
      console.log('API Response:', response);
      return response;
    },
    select: (data) => {
      console.log('Processing data:', data);
      // API 응답에서 content 필드를 추출하고 유효성 검사
      if (!data) return '';
      return data;
    },
    enabled: Boolean(registeredRepoId),
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30, // 30분
    retry: 1,
    onError: (error) => {
      console.error('useDocument 데이터 불러오기 실패:', error);
    },
    onSuccess: (data) => {
      console.log('useDocument 데이터 로드 성공:', data);
    },
  });
};
