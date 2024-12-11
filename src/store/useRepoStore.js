import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import useAuthStore from './authStore';

// 인증 상태와 연동하는 미들웨어
const authMiddleware = (config) => (set, get, api) =>
  config(
    (...args) => {
      // 인증되지 않은 상태면 초기 상태로 리셋
      if (!useAuthStore.getState().isAuthenticated) {
        set({
          searchValue: '',
          selectedCard: null,
          repoToDelete: null,
          repos: [],
        });
        return;
      }
      set(...args);
    },
    get,
    api,
  );

/**
 * Repository 관리를 위한 Zustand store
 *
 * @store
 * @property {string} searchValue - 레포지토리 검색어
 * @property {Object|null} selectedCard - 현재 선택된 레포지토리 카드
 * @property {Object|null} repoToDelete - 삭제 예정인 레포지토리
 * @property {Array} repos - 레포지토리 목록
 */
const useRepoStore = create(
  devtools(
    authMiddleware((set, get) => ({
      // State
      searchValue: '',
      selectedCard: null,
      repoToDelete: null,
      repos: [
        {
          key: '1',
          Repository: 'spring-boot_test',
          Status: 'In Progress',
          Branch: 'main',
          Action: 'Delete',
        },
        {
          key: '3',
          Repository: 'moheng',
          Status: 'Code Imported',
          Branch: ['main', 'develop'],
          Action: 'Delete',
        },
      ],

      // Actions
      setSearchValue: (value) => set({ searchValue: value }, false, 'setSearchValue'),

      setSelectedCard: (card) => set({ selectedCard: card }, false, 'setSelectedCard'),

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

      // 전체 저장소 목록 초기화
      clearRepos: () =>
        set(
          {
            searchValue: '',
            selectedCard: null,
            repoToDelete: null,
            repos: [],
          },
          false,
          'clearRepos',
        ),
    })),
    {
      name: 'Repository Store',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);

export default useRepoStore;
