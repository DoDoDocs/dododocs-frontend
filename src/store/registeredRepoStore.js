// src/store/registeredRepo.js
/**
 * 등록된 레포지토리 목록을 관리하기 위한 Zustand 스토어.
 * 레포지토리 관련 작업을 위한 상태 관리와 액션을 제공합니다.
 */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// NOTE 레포지토리 스토어 초기 상태
const initialState = {
  repositoryToRemove: null, // 삭제할 레포지토리
  activeRepository: null, // 현재 활성화된(선택된) 레포지토리
  registeredRepoList: [
    {
      registeredRepoId: 0,
      repositoryName: 'moheng',
      branchName: 'main',
      createdAt: '2024-12-18',
      readmeComplete: false,
      chatbotComplete: false,
      docsComplete: false,
    },
  ],
};

/**
 * 레포지토리 관리를 위한 Zustand 스토어.
 *
 * @store
 * @property {Object|null} activeRepository - 현재 선택된 레포지토리.
 * @property {Object|null} repositoryToRemove - 삭제 예정인 레포지토리.
 * @property {Array} registeredRepoList - 등록된 레포지토리 목록.
 */
const useRegisteredRepoStore = create(
  devtools(
    (set, get) => ({
      // 초기 상태
      ...initialState,

      //SECTION RegisteredRepoStore Actions

      /**NOTE 레포지터리 목록 등록하기
       *  @desc 등록된 레포지토리를 받아와서 목록에 설정합니다.
       *       이 메서드는 주로 초기 상태를 설정하는 데 사용됩니다.
       * @param {Array} repositories - 등록된 레포지토리 목록.
       */
      setRegisteredRepositories: (repositories) =>
        set(
          (state) => ({
            ...state,
            registeredRepoList: repositories,
          }),
          false,
          'setRegisteredRepositories',
        ),

      /** NOTE 레포지터리 목록 추가
       * @desc 등록된 레포지토리에 하나의 레포지토리를 추가합니다.
       * @param {Object} repository - 활성화할 레포지토리.
       */
      addRegisteredRepo: (repository) =>
        set(
          (state) => ({
            ...state,
            registeredRepoList: [...state.registeredRepoList, repository],
          }),
          false,
          'addRegisteredRepo',
        ),

      /** NOTE 레포지터리 선택(활성화)
       * @desc 활성화된 레포지토리를 설정합니다.
       * @param {Object} repository - 활성화할 레포지토리.
       */
      setActiveRepository: (repository) =>
        set(
          (state) => ({
            ...state,
            activeRepository: repository,
          }),
          false,
          'setActiveRepository',
        ),

      /** NOTE 삭제할 레포지토리를 설정
       * @desc 삭제할 레포지토리를 설정합니다.
       * @param {Object} repository - 삭제할 레포지토리.
       */
      setRepositoryToRemove: (repository) =>
        set(
          (state) => ({
            ...state,
            repositoryToRemove: repository,
          }),
          false,
          'setRepositoryToRemove',
        ),

      /**NOTE 삭제할 레포지터리 삭제
       * @desc 삭제할 레포지토리를 삭제합니다.
       * @detail 지정된 키를 가진 레포지토리를 목록에서 제외합니다.
       *
       * @returns {boolean} 레포지토리가 삭제되었으면 true, 아니면 false.
       */
      deleteRegisteredRepo: () => {
        const { repositoryToRemove, registeredRepoList } = get();

        if (!repositoryToRemove) {
          console.warn('No repository selected for deletion');
          return false;
        }
        if (registeredRepoList.length === 0) {
          console.warn('No repository exists');
          return false;
        }

        const updatedRepoList = registeredRepoList.filter(
          (repo) => repo.key !== repositoryToRemove.key,
        );

        set((state) => ({
          ...state,
          registeredRepoList: updatedRepoList,
          repositoryToRemove: null,
        }));

        return true;
      },

      /**NOTE 스토어 초기화
       * @desc 스토어를 초기 상태로 리셋합니다.
       */
      resetRegisteredRepoStore: () =>
        set(() => ({ ...initialState }), false, 'resetRegisteredRepoStore'),

      getActiveRepository: () => get().activeRepository,

      //!SECTION RegisteredRepoStore Actions
    }),
    {
      name: 'RegisteredRepo Store', // Devtools용 스토어 이름
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
);

export default useRegisteredRepoStore;
