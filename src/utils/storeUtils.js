import {
  useAuthStore,
  useMemberStore,
  useAppModalStore,
  useRepoStore,
} from '../store/store';

export const resetAllStores = () => {
  // 각 store의 초기화 함수 실행
  useAuthStore.getState().clearAuth();
  useMemberStore.getState().clearMemberInfo();
  useAppModalStore.getState().reset();
  useRepoStore.getState().reset();
};
