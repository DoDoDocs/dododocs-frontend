// src/stores/useAppModalStore.js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initialState = {
  AppRepo: null,
};

const useAppModalStore = create(
  devtools(
    (set, get) => ({
      ...initialState,

      // 선택된 repo 설정
      setAppRepo: (repo) => set({ AppRepo: repo }),

      // repo 데이터로 모달 열기
      openAppModal: (registeredRepoId, registeredReposList) => {
        const repo =
          registeredRepoId === 'guide'
            ? {
                registeredRepoId: 'guide',
                repositoryName: 'guide',
                branchName: 'main',
                createdAt: '2024-12-18',
                readmeComplete: true,
                chatbotComplete: true,
                docsComplete: true,
              }
            : registeredReposList?.find(
                (repo) => repo.registeredRepoId === registeredRepoId,
              );

        if (repo) {
          set({ AppRepo: repo });
          return repo; // 라우팅을 위해 repo 반환
        }
        return null;
      },

      // 모달 닫기
      closeAppModal: () => set({ AppRepo: null }),

      // store 초기화
      reset: () => set(initialState, false, 'resetAppModalStore'),
    }),
    {
      name: 'AppModalStore',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);

export default useAppModalStore;
