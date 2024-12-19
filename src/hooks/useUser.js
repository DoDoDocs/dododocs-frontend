// src/hooks/useUser.js

import { useQuery } from '@tanstack/react-query';
import { useAuthStore, useUserStore } from '../store/store.js';
import { memberAPI } from '../api/index.js';
import { useEffect } from 'react';

export const useUser = () => {
  const { isAuthenticated } = useAuthStore();
  const { setUserNickname, setRepositories, repositories } = useUserStore();

  const userInfoQuery = useQuery({
    queryKey: ['user', 'info'],
    queryFn: memberAPI.getMemberInfo,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    refetchOnWindowFocus: false, // 창 포커스시 자동 갱신 비활성화
    onSuccess: (data) => {
      // 사용자 정보를 store에 업데이트
      setUserNickname(data.nickname);
    },
  });

  const repoListQuery = useQuery({
    queryKey: ['user', 'repos'],
    queryFn: memberAPI.getMemberAllRepoList,
    enabled:
      isAuthenticated && (userInfoQuery.data !== undefined || repositories.length === 0), // userInfo 로드 후 실행
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      console.log('⭐️ 레포지토리 목록 요청 성공:', data);
      // 레포지토리 목록을 store에 업데이트
      setRepositories(data.names);
    },
  });

  // 캐시된 데이터를 포함한 모든 데이터 상태 동기화
  useEffect(() => {
    if (userInfoQuery.data) {
      console.log(
        'zustand에 저장된 데이터 : memberStore nickname : ',
        userInfoQuery.data.nickname,
      );
      setUserNickname(userInfoQuery.data.nickname);
    }
  }, [userInfoQuery.data, setUserNickname]);

  useEffect(() => {
    if (repoListQuery.data?.names) {
      console.log(
        'zustand에 저장된 데이터 : memberStore repositories : ',
        repoListQuery.data.names,
      );
      setRepositories(repoListQuery.data.names);
    }
  }, [repoListQuery.data, setRepositories]);

  return {
    userInfo: userInfoQuery.data,
    repoList: repoListQuery.data,
    isUserDataLoading: userInfoQuery.isLoading || repoListQuery.isLoading,
    isUserDataSuccess: userInfoQuery.isSuccess && repoListQuery.isSuccess, // 둘 다 성공한 경우
    userDataError: userInfoQuery.error || repoListQuery.error,
    // 리프레시 함수도 제공
    refresh: () => {
      userInfoQuery.refetch();
      repoListQuery.refetch();
    },
    repoListRefetch: repoListQuery.refetch,
    userInfoRefetch: userInfoQuery.refetch,
  };
};
