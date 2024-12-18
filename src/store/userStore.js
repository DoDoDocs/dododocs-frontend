// stores/userStore.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initialState = {
  userNickname: null,
  repositories: [],
};

const useUserStore = create(
  devtools(
    (set) => ({
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

      clearUserInfo: () => set(initialState, false, 'clearUserInfo'),
      // ... other actions
    }),
    { name: 'User Store' },
  ),
);

export default useUserStore;
