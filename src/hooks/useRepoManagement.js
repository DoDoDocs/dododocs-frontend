// src/hooks/useRepoManagement.js
import { useCallback, useState } from 'react';
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
  const setSelectedCard = useRepoStore((state) => state.setSelectedCard);
  const setRepoToDelete = useRepoStore((state) => state.setRepoToDelete);
  const deleteRepo = useRepoStore((state) => state.deleteRepo);
  const repos = useRepoStore((state) => state.repos);

  //NOTE Store
  const { setRegisteredRepositories, setIsLoadingRepository } = useRegisteredRepoStore();

  /**
   * @axios React Query를 사용한 레포지토리 데이터 페칭
   * @axios registerAPI.getRegisteredRepoList
   * @desc 레포지터리 등록한 리스트 목록 가져오기
   * @desc 레포지토리 데이터를 스토어에 저장
   */
  const {
    data: registeredRepositoriesData,
    isError: isRegisteredRepositoriesError,
    error: RegisteredRepositoriesError,
  } = useQuery({
    queryKey: ['registeredRepos'],
    queryFn: registerAPI.getRegisteredRepoList,
    onSuccess: (data) => {
      console.log(data);
      console.log('💿💿받아온 등록된 레포지터리 목록[hooks] : ', data);

      // 레포지토리 데이터를 스토어에 저장
      console.log('레포지토리 데이터를 스토어에 저장');
      setRegisteredRepositories(data);

      // 로딩 중인 레포지토리 체크
      const hasLoadingRepo = data.some(
        (repo) => !repo.readmeComplete || !repo.chatbotComplete || !repo.docsComplete,
      );

      // 로딩 상태 업데이트
      console.log('로딩 상태 업데이트');
      setIsLoadingRepository(hasLoadingRepo);
    },
  });

  //SECTION - App Modal 관리

  // App Modal Store
  const { isAppModalOpen, setOpenAppModal, setAppRepo, setCloseAppModal } =
    useAppModalStore();

  // Modal Management
  const addRepoModal = useModal();
  const deleteRepoModal = useModal();

  // Add Repository Form Management with success callback
  const {
    formData,
    validationErrors,
    isLoading: isAddingRepoLoading,
    error: addRepoError,
    handleChange,
    handleSubmit,
    resetForm,
  } = useAddRepo((newRepo) => {
    // 성공 시 처리
    resetForm();
    modalHandlers.addRepo.close();
    // TODO: 토스트 메시지 추가
    console.log('Repository added successfully:', newRepo);

    // React Query 캐시 갱신
    queryClient.invalidateQueries({ queryKey: ['addRepositories'] });

    // NOTE: registeredRepoStore 레포지토리 스토어 업데이트
  });

  /**
   * 모달 관련 핸들러
   */
  const modalHandlers = {
    app: {
      open: useCallback(
        (card) => {
          const repo = repos.find((r) => r.registeredRepoId === card.registeredRepoId);
          if (repo) {
            setAppRepo(repo);
            setOpenAppModal();
            navigate(`/repositories/${repo.Repository}`);
          }
        },
        [navigate, setOpenAppModal, setAppRepo, repos],
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
        resetForm(); // 폼 초기화
        addRepoModal.closeModal();
      }, [resetForm, addRepoModal]),
    },
  };
  //!SECTION - 모달관리

  /**
   * 이벤트 핸들러
   */
  const eventHandlers = {
    handleCardClick: useCallback(
      (card) => {
        setSelectedCard(card);
        modalHandlers.app.open(card);
      },
      [setSelectedCard, modalHandlers.app],
    ),
  };

  const deleteRepoHandlers = {
    handleDeleteClick: useCallback(
      (e, repo) => {
        e.stopPropagation();
        setRepoToDelete(repo);
        deleteRepoModal.openModal();
      },
      [deleteRepoModal, setRepoToDelete],
    ),

    handleConfirmDelete: useCallback(async () => {
      try {
        const success = deleteRepo();
        if (success) {
          // React Query 캐시 갱신
          queryClient.invalidateQueries({ queryKey: ['repositories'] });
          deleteRepoModal.closeModal();
          // TODO: 성공 토스트 메시지 표시
          console.log('Repository deleted successfully');
        }
      } catch (error) {
        console.error('Failed to delete repository:', error);
        // TODO: 에러 토스트 메시지 표시
      }
    }, [deleteRepoModal, deleteRepo, queryClient]),

    handleCancelDelete: useCallback(() => {
      setRepoToDelete(null);
      deleteRepoModal.closeModal();
    }, [deleteRepoModal, setRepoToDelete]),
  };

  return {
    //RegisteredRepositories Data
    RegisteredRepositories: {
      registeredRepositoriesData,
      isRegisteredRepositoriesError,
      RegisteredRepositoriesError,
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
      isLoading: isAddingRepoLoading,
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
