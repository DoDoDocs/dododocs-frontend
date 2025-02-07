import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const repo이렇게설정해야할듯 = {
  registeredRepoId: 0,
};

const initialState = {
  searchValue: '',
  selectedCard: null,
  repoToDelete: null,
  repos: [
    {
      registeredRepoId: '0',
      Repository: 'spring-boot_test',
      repositoryName: 'spring-boot_test',
      Status: 'Code Imported',
      Branch: 'main',
      Action: 'Delete',
    },
    {
      registeredRepoId: '1',
      Repository: 'moheng',
      repositoryName: 'moheng',
      Status: 'Code Imported',
      Branch: 'main',
      Action: 'Delete',
    },
  ],
  testRepo: {
    registeredRepoId: 1,
    repositoryName: 'testREpo',
    branchName: 'main',
    createdAt: '2024-12-18',
    readmeComplete: true,
    chatbotComplete: true,
    docsComplete: true,
  },
};

/**
 * Repository 관리를 위한 Zustand store
 * @store
 * @property {string} searchValue - 레포지토리 검색어
 * @property {Object|null} selectedCard - 현재 선택된 레포지토리 카드
 * @property {Object|null} repoToDelete - 삭제 예정인 레포지토리
 * @property {Array} repos - 레포지토리 목록
 */
const useRepoStore = create(
  devtools(
    (set, get) => ({
      // 초기 상태
      ...initialState,

      // Actions
      setSearchValue: (value) => set({ searchValue: value }, false, 'setSearchValue'),

      setSelectedCard: (card) =>
        set(
          (state) => ({
            ...state,
            selectedCard: card,
          }),
          false,
          'setSelectedCard',
        ),

      setRepoToDelete: (repo) => set({ repoToDelete: repo }, false, 'setRepoToDelete'),

      addRepo: (repo) =>
        set(
          (state) => ({
            repos: [...state.repos, repo],
          }),
          false,
          'addRepo',
        ),

      deleteRepo: () => {
        const { repoToDelete, repos } = get();

        if (!repoToDelete) {
          console.warn('No repository selected for deletion');
          return false;
        }
        if (!repos) {
          console.warn('No repository exists');
          return false;
        }

        set(
          {
            repos: repos.filter((repo) => repo.key !== repoToDelete.key),
            repoToDelete: null,
          },
          false,
          'deleteRepo',
        );

        return true;
      },

      // 전체 store reset 함수 추가
      reset: () => set(initialState, false, 'reset'),
    }),
    {
      name: 'Repository Store',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);

export default useRepoStore;
