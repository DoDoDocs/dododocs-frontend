// src/hooks/RepoDetailContent/useReadme.js
import { useQuery } from '@tanstack/react-query';
import { downloadAPI } from '../../api/index.js';

export const useReadme = (registeredRepoId) => {
  console.log('useReadme hook called with ID:', registeredRepoId);

  return useQuery({
    queryKey: ['readme', registeredRepoId],
    queryFn: async () => {
      if (!registeredRepoId) {
        throw new Error('Repository ID is required');
      }
      const response = await downloadAPI.postDownloadReadme(registeredRepoId);
      console.log('API Response:', response);
      return response;
    },
    select: (data) => {
      console.log('Processing data:', data);
      // API 응답에서 content 필드를 추출하고 유효성 검사
      if (!data?.contents) return '';
      return data.contents;
    },
    enabled: Boolean(registeredRepoId),
    staleTime: 1000 * 60 * 5, // 5분
    cacheTime: 1000 * 60 * 30, // 30분
    retry: 1,
    onError: (error) => {
      console.error('README 데이터 불러오기 실패:', error);
    },
    onSuccess: (data) => {
      console.log('README 데이터 로드 성공:', data);
    },
  });
};
