import {
  useAuthStore,
  useUserStore,
  useAppModalStore,
  useRepoStore,
} from '../store/store';

export const resetAllStores = () => {
  // 각 store의 초기화 함수 실행
  useAuthStore.getState().clearAuth();
  useUserStore.getState().clearMemberInfo();
  useAppModalStore.getState().reset();
  useRepoStore.getState().reset();
};
