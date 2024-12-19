// src/hooks/useRepoManagement.js
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useModal from './useModal';
import { useAddRepo } from './useAddRepo';
import { registerAPI } from '../api/index.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  useAppModalStore,
  useRepoStore,
  useRegisteredRepoStore,
} from '../store/store.js';

/**
 * 레포지토리 관리를 위한 통합 커스텀 훅
 */
export const useRepoManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /** NOTE 로직 생각
   * @desc 페이지 진입 시 레포지터리 데이터 받아오기
   * @detail store에 setRegisteredRepositories
   * @detail 각 레포별로 readmeComplete,chatbotComplete ,docsComplete를 각각 확인해서  로딩중인 레포지터리가 있는지 확인
   * @detail 로딩중인 레포지터리가 있으면 store에 setIsLoadingRepository
   */

  //TODO 지울거 Store Actions
  // const setSelectedCard = useRepoStore((state) => state.setSelectedCard);

  //NOTE Store
  const { setActiveRepositoryId, setRepositoryToRemove, repositoryToRemove } =
    useRegisteredRepoStore();

  /**
   * @axios React Query를 사용한 레포지토리 데이터 페칭
   * @axios registerAPI.getRegisteredRepoList
   * @desc 레포지터리 등록한 리스트 목록 가져오기
   * @desc 레포지토리 데이터를 스토어에 저장
   */

  // useState로 폴링 관련 상태 관리
  const [pollingStartTime, setPollingStartTime] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  // 5분 체크 함수
  const checkPollingTimeout = useCallback(() => {
    if (!pollingStartTime) return false;
    const timeElapsed = Date.now() - pollingStartTime;
    // return timeElapsed >= 5 * 60 * 1000; // 5분
    return timeElapsed >= 1 * 30 * 1000; // 5분
  }, [pollingStartTime]);

  const {
    data: registeredRepositoriesList,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['registeredRepos'],
    // queryFn: registerAPI.getRegisteredRepoList,
    queryFn: async () => {
      try {
        // API 호출 전에 시작 시간 기록
        const response = await registerAPI.getRegisteredRepoList();

        // 첫 번째 로딩중인 레포지토리 발견 시 시작 시간 기록
        if (Array.isArray(response)) {
          const hasLoadingRepo = response.some(
            (repo) => !repo.readmeComplete || !repo.chatbotComplete || !repo.docsComplete,
          );

          if (hasLoadingRepo && !pollingStartTime) {
            console.log('🕒 폴링 시작 시간 기록');
            setPollingStartTime(Date.now());
            setIsPolling(true);
          }
        }

        return response;
      } catch (error) {
        throw error;
      }
    },
    refetchInterval: (queryInfo) => {
      const data = queryInfo?.state?.data;
      if (!data) return false;
      // if (!pollingStartTime) {
      //   setPollingStartTime(Date.now());
      // }
      // if (!isPolling) {
      //   if (!checkPollingTimeout()) {
      //     setIsPolling(true);
      //   }
      // }
      // 경과 시간 계산 및 표시
      const currentTime = Date.now();
      console.log(isPolling, pollingStartTime);
      if (isPolling && pollingStartTime) {
        const elapsedMinutes = Math.floor((currentTime - pollingStartTime) / 1000 / 60);
        const elapsedSeconds = Math.floor(((currentTime - pollingStartTime) / 1000) % 60);
        console.log(
          `⏰ 폴링 경과 시간: ${String(elapsedMinutes).padStart(2, '0')}:${String(
            elapsedSeconds,
          ).padStart(2, '0')}`,
        );
      }

      // 5분 초과 체크
      if (checkPollingTimeout()) {
        console.log('⚠️ 폴링 시간 초과 (5분)');
        // setIsPolling(false);
        // setPollingStartTime(null);
        return false;
      }

      const hasLoadingRepo =
        Array.isArray(data) &&
        data.some(
          (repo) => !repo.readmeComplete || !repo.chatbotComplete || !repo.docsComplete,
        );

      return hasLoadingRepo ? 10000 : false;
    },
    onSuccess: (data) => {
      if (!Array.isArray(data)) {
        console.error('잘못된 데이터 형식:', data);
        return;
      }

      const hasLoadingRepo = data.some(
        (repo) => !repo.readmeComplete || !repo.chatbotComplete || !repo.docsComplete,
      );

      // 폴링 시작 시간 설정 (최초 폴링 시작 시에만)
      if (hasLoadingRepo && !isPolling) {
        setPollingStartTime(Date.now());
        setIsPolling(true);
      }

      // 모든 레포지토리 로딩 완료 시
      if (!hasLoadingRepo) {
        console.log('✅ 모든 레포지토리 로딩 완료');
        setIsPolling(false);
        setPollingStartTime(null);
        queryClient.invalidateQueries(['registeredRepos']);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  //SECTION - App Modal 관리

  // App Modal Store
  const { isAppModalOpen, setOpenAppModal, setAppRepo, setCloseAppModal } =
    useAppModalStore();

  // Modal Management
  const addRepoModal = useModal();
  const deleteRepoModal = useModal();

  // Add Repository Form Management with success callback

  const [extendedLoading, setExtendedLoading] = useState(false);
  useEffect(() => {
    return () => {
      setExtendedLoading(false);
    };
  }, []);
  const {
    formData,
    validationErrors,
    // isLoading,
    isPending: isAddingRepoLoading,
    error: addRepoError,
    handleChange,
    handleSubmit,
    resetForm,
  } = useAddRepo(async (newRepo) => {
    // 확장된 로딩 상태 시작
    setExtendedLoading(true);

    try {
      // React Query 캐시 무효화 및 즉시 새로고침
      await queryClient.invalidateQueries({
        queryKey: ['registeredRepos'],
        refetchType: 'active',
        exact: true,
      });

      // 새로운 데이터 즉시 페칭
      await queryClient.refetchQueries({
        queryKey: ['registeredRepos'],
        type: 'active',
        exact: true,
      });

      // 폴링 상태 초기화 및 시작
      setPollingStartTime(Date.now());
      setIsPolling(true);

      console.log('✅ Repository added and list refreshed successfully:', newRepo);

      setExtendedLoading(false);
      modalHandlers.addRepo.close();
      // 모든 데이터 작업이 완료된 후 모달 닫기
    } catch (error) {
      console.error('Failed to refresh repository list:', error);
      // TODO: 에러 토스트 메시지 표시
    }
  });

  /**
   * 모달 관련 핸들러
   */
  const modalHandlers = {
    app: {
      open: useCallback(
        (registeredRepoId) => {
          const repo = registeredRepositoriesList.find(
            (repo) => repo.registeredRepoId === registeredRepoId,
          );
          if (repo) {
            setAppRepo(repo);
            setOpenAppModal();
            navigate(`/repositories/${repo.repositoryName}`);
          }
        },
        [navigate, setOpenAppModal, setAppRepo, registeredRepositoriesList],
      ),

      close: useCallback(() => {
        setCloseAppModal();
        navigate('/repositories');
      }, [navigate, setCloseAppModal]),
    },

    addRepo: {
      open: useCallback(() => {
        resetForm(); // 폼 초기화
        addRepoModal.openModal();
      }, [resetForm, addRepoModal]),

      close: useCallback(() => {
        addRepoModal.closeModal();
      }, [addRepoModal]),
    },
  };
  //!SECTION - 모달관리

  /**
   * 이벤트 핸들러
   */
  const eventHandlers = {
    handleCardClick: useCallback(
      (cardId) => {
        console.log('useRepoManagement cardClick', cardId);
        setActiveRepositoryId(cardId);
        modalHandlers.app.open(cardId);
      },
      [setActiveRepositoryId, modalHandlers.app],
    ),
  };

  const deleteRepoHandlers = {
    handleDeleteClick: useCallback(
      (e, repo) => {
        e.stopPropagation();
        setRepositoryToRemove(repo);
        deleteRepoModal.openModal();
      },
      [deleteRepoModal, setRepositoryToRemove],
    ),

    // handleConfirmDelete: useCallback(async () => {
    //   try {
    //     const success = deleteRepo();
    //     if (success) {
    //       // React Query 캐시 갱신
    //       queryClient.invalidateQueries({ queryKey: ['repositories'] });
    //       deleteRepoModal.closeModal();
    //       // TODO: 성공 토스트 메시지 표시
    //       console.log('Repository deleted successfully');
    //     }
    //   } catch (error) {
    //     console.error('Failed to delete repository:', error);
    //     // TODO: 에러 토스트 메시지 표시
    //   }
    // }, [deleteRepoModal, deleteRepo, queryClient]),
    handleConfirmDelete: useCallback(async () => {
      console.log(repositoryToRemove);
      if (!repositoryToRemove) {
        console.error('No repository selected for deletion');
        return;
      }

      try {
        // API를 통한 레포지토리 삭제
        await registerAPI.deleteRegisteredRepo(repositoryToRemove.registeredRepoId);

        // React Query 캐시 무효화 및 즉시 새로고침
        await queryClient.invalidateQueries({
          queryKey: ['registeredRepos'],
          refetchType: 'active',
          exact: true,
        });

        // 새로운 데이터 즉시 페칭
        await queryClient.refetchQueries({
          queryKey: ['registeredRepos'],
          type: 'active',
          exact: true,
        });

        console.log('✅ Repository deleted successfully');

        // 상태 초기화
        setRepositoryToRemove(null);

        // 모든 작업이 완료된 후 모달 닫기
        deleteRepoModal.closeModal();
      } catch (error) {
        console.error('Failed to delete repository:', error);
        // TODO: 에러 토스트 메시지 표시
      }
    }, [deleteRepoModal, repositoryToRemove, queryClient, setRepositoryToRemove]),

    handleCancelDelete: useCallback(() => {
      setRepositoryToRemove(null);
      deleteRepoModal.closeModal();
    }, [deleteRepoModal, setRepositoryToRemove]),
  };

  return {
    //RegisteredRepositories Data
    RegisteredRepositories: {
      registeredRepositoriesList,
    },

    // Modal States & Controls
    modals: {
      app: {
        isOpen: isAppModalOpen,
        ...modalHandlers.app,
      },
      addRepo: {
        isOpen: addRepoModal.isOpen,
        ...modalHandlers.addRepo,
      },
      deleteRepo: {
        isOpen: deleteRepoModal.isOpen,
        open: deleteRepoModal.openModal,
        close: deleteRepoModal.closeModal,
      },
    },

    // Add Repository 관련 상태와 핸들러
    addRepoForm: {
      formData,
      validationErrors,
      isAddingRepoLoading: isAddingRepoLoading || extendedLoading,
      error: addRepoError,
      handleChange,
      handleSubmit,
      resetForm,
    },
    // Delete Repository 관련 상태와 핸들러
    deleteRepoHandlers,

    // Event Handlers
    handlers: eventHandlers,
  };
};
