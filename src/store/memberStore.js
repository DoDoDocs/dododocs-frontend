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
      initialState,

      setUserNickname: (nickname) => set({ userNickname: nickname }),

      setRepositories: (repos) => set({ repositories: repos }),

      // ... other actions
    })),
    { name: 'User Store' },
  ),
);

export default useMemberStore;
