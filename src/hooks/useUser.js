// src/hooks/useUser.js
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '../store/authStore.js';
import useMemberStore from '../store/memberStore.js';
import { memberAPI } from '../api/index.js';

export const useUser = () => {
  const { isAuthenticated } = useAuthStore();
  const { setUserNickname, setRepositories } = useMemberStore();

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
    enabled: isAuthenticated && userInfoQuery.data !== undefined, // userInfo 로드 후 실행
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      // 레포지토리 목록을 store에 업데이트
      setRepositories(data.names);
    },
  });

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
