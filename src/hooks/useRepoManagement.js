// src/hooks/useRepoManagement.js
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useRepoStore from '../store/useRepoStore';
import useModal from './useModal';
import useAppModalStore from '../store/useAppModalStore';
import { useAddRepo } from './useAddRepo';

/**
 * 레포지토리 관리를 위한 통합 커스텀 훅
 */
export const useRepoManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Store Actions
  const setSelectedCard = useRepoStore((state) => state.setSelectedCard);
  const setRepoToDelete = useRepoStore((state) => state.setRepoToDelete);
  const deleteRepo = useRepoStore((state) => state.deleteRepo);
  const repos = useRepoStore((state) => state.repos);

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
    isLoading: isAddingRepo,
    error: addRepoError,
    handleChange,
    handleSubmit,
    resetForm,
  } = useAddRepo((newRepo) => {
    // 성공 시 처리
    modalHandlers.addRepo.close();
    // TODO: 토스트 메시지 추가
    console.log('Repository added successfully:', newRepo);

    // React Query 캐시 갱신
    queryClient.invalidateQueries({ queryKey: ['repositories'] });
  });

  /**
   * 모달 관련 핸들러
   */
  const modalHandlers = {
    app: {
      open: useCallback(
        (card) => {
          const repo = repos.find((r) => r.key === card.key);
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
        navigate(-1);
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

    // Add Repository Form State & Handlers
    addRepoForm: {
      formData,
      validationErrors,
      isLoading: isAddingRepo,
      error: addRepoError,
      handleChange,
      handleSubmit,
    },

    // Event Handlers
    handlers: eventHandlers,
  };
};
