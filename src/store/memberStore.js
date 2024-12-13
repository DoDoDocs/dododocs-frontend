// stores/userStore.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import useAuthStore from './authStore';

const authMiddleware = (config) => (set, get, api) =>
  config(
    (...args) => {
      // isAuthenticated가 false면 초기 상태로 리셋
      if (!useAuthStore.getState().isAuthenticated) {
        set({ userNickname: null, repositories: [] });
        return;
      }
      set(...args);
    },
    get,
    api,
  );

const initialState = {
  userNickname: null,
  repositories: [],
};

const useMemberStore = create(
  devtools(
    authMiddleware((set) => ({
      ...initialState,

      setUserNickname: (nickname) =>
        set({ userNickname: nickname }, false, 'setUserNickname'),

      setRepositories: (repos) =>
        set(
          (state) => ({
            ...state,
            repositories: Array.isArray(repos) ? repos : [], // repos가 배열이 아닌 경우 빈 배열로 설정
          }),
          false,
          'setRepositories',
        ),

      clearMemberInfo: () => set(initialState, false, 'clearMemberInfo'),
      // ... other actions
    })),
    { name: 'User Store' },
  ),
);

export default useMemberStore;
