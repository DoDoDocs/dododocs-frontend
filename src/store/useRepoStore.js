import { create } from 'zustand';

/**
 * Repository 관리를 위한 Zustand store
 *
 * @store
 * @property {string} searchValue - 레포지토리 검색어
 * @property {Object|null} selectedCard - 현재 선택된 레포지토리 카드
 * @property {Object|null} repoToDelete - 삭제 예정인 레포지토리
 * @property {Array} repos - 레포지토리 목록
 */
const useRepoStore = create((set, get) => ({
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
  /**
   * 검색어 설정
   * @param {string} value - 새로운 검색어
   */
  setSearchValue: (value) => set({ searchValue: value }),

  /**
   * 선택된 카드 설정
   * @param {Object} card - 선택된 레포지토리 카드
   */
  setSelectedCard: (card) => set({ selectedCard: card }),

  /**
   * 삭제할 레포지토리 설정
   * @param {Object} repo - 삭제할 레포지토리
   */
  setRepoToDelete: (repo) => set({ repoToDelete: repo }),

  /**
   * 새로운 레포지토리 추가
   * @param {Object} repo - 추가할 레포지토리 정보
   */
  addRepo: (repo) =>
    set((state) => ({
      repos: [...state.repos, repo],
    })),

  /**
   * 저장된 repoToDelete를 기반으로 레포지토리를 삭제하는 액션
   * @returns {boolean} 삭제 성공 여부
   */
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
    set({
      repos: repos.filter((repo) => repo.key !== repoToDelete.key),
      repoToDelete: null, // 삭제 후 상태 초기화
    });

    return true;
  },
}));

export default useRepoStore;
