import { create } from '@reduxjs/toolkit';
import { devtools } from 'zustand/middleware';

//이미 완료된 repo 목록을 관리하는 store
const initialState = {
  repoToDelete: null,
  selectedCard: null,
  registeredRepo: [
    {
      key: '0',
      RepositoryTitle: 'moheng',
      Branch: 'main',
      Action: 'Delete',
      isUpload: false,
      Status: 'completed',
    },
  ],
};

/**
 * Repository 관리를 위한 Zustand store
 *
 * @store
 * @property {string} searchValue - 레포지토리 검색어
 * @property {Object|null} selectedCard - 현재 선택된 레포지토리 카드
 * @property {Object|null} repoToDelete - 삭제 예정인 레포지토리
 * @property {Array} repos - 레포지토리 목록
 */
const useRegisteredRepoStore = create(
  devtools((set, get) => ({
    // 초기 상태
    ...initialState,
  })),
);

export default useRegisteredRepoStore;
