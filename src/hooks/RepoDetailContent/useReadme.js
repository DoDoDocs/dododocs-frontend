// src/hooks/RepoDetailContent/useReadme.js
import { useQuery } from '@tanstack/react-query';
import { downloadAPI } from '../../api/index.js';
import { readmeGuideText } from '../../constants/guides/readmeGuide.js';

export const useReadme = (registeredRepoId) => {
  console.log('useReadme hook called with ID:', registeredRepoId);

  // return useQuery({
  //   queryKey: ['readme', registeredRepoId],
  //   queryFn: async () => {
  //     if (!registeredRepoId) {
  //       throw new Error('Repository ID is required');
  //     }
  //     if (registeredRepoId === 'guide') {
  //       return {
  //         contents: readmeGuideText,
  //       };
  //     }
  //     const response = await downloadAPI.postDownloadReadme(registeredRepoId);
  //     return response?.contents || ''; // contents가 없을 경우 빈 문자열 반환
  //   },
  //   enabled: Boolean(registeredRepoId),
  //   staleTime: 1000 * 60 * 5,
  //   cacheTime: 1000 * 60 * 30,
  //   retry: 1,
  //   refetchOnWindowFocus: false, // 윈도우 포커스 시 리패치 방지
  //   onError: (error) => {
  //     console.error('README 데이터 불러오기 실패:', error);
  //   },
  // });

  return useQuery({
    queryKey: ['readme', registeredRepoId],
    queryFn: async () => {
      if (!registeredRepoId) {
        throw new Error('Repository ID is required');
      }
      if (registeredRepoId === 'guide') {
        console.log('Returning readme guide');
        return {
          contents: readmeGuideText,
        };
      }
      const response = await downloadAPI.postDownloadReadme(registeredRepoId);
      console.log('API Response:', response);
      return response;
    },
    select: (data) => {
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
