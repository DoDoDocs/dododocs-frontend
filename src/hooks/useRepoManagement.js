import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRepoStore from '../store/useRepoStore';
import useModal from './useModal';
import useAppModalStore from '../store/useAppModalStore';

/**
 * 레포지토리 관리를 위한 커스텀 훅
 * 모달, 라우팅, 이벤트 핸들링 등의 비즈니스 로직을 관리
 *
 * @returns {Object} 모달 상태와 이벤트 핸들러들을 포함한 객체
 */
export const useRepoManagement = () => {
  const navigate = useNavigate();

  const setSelectedCard = useRepoStore((state) => state.setSelectedCard);
  const setRepoToDelete = useRepoStore((state) => state.setRepoToDelete);
  const deleteRepo = useRepoStore((state) => state.deleteRepo);

  const { isAppModalOpen, setOpenAppModal, setAppRepo, setCloseAppModal } =
    useAppModalStore();
  // 모달 상태 관리
  const {
    isOpen: isAddRepoModal,
    openModal: openAddRepoModal,
    closeModal: closeAddRepoModal,
  } = useModal();

  const {
    isOpen: isDeleteRepoModal,
    openModal: openDeleteRepoModal,
    closeModal: closeDeleteRepoModal,
  } = useModal();

  /**
   * 레포지토리 상세 모달 열기
   * @param {Object} card - 선택된 레포지토리 카드 정보
   */
  const openAppModal = useCallback(
    (card) => {
      setAppRepo(card);
      setOpenAppModal();
      navigate(`/repositories/${card.Repository}`);
    },
    [navigate, setOpenAppModal, setAppRepo],
  );

  /**
   * 레포지토리 상세 모달 닫기
   */
  const closeAppModal = useCallback(() => {
    setCloseAppModal();
    navigate(-1);
  }, [navigate, setCloseAppModal]);

  /**
   * 카드 클릭 이벤트 핸들러
   * @param {Object} card - 클릭된 레포지토리 카드
   */
  const handleCardClick = useCallback(
    (card) => {
      setSelectedCard(card);
      openAppModal(card);
    },
    [setSelectedCard, openAppModal],
  );

  /**
   * 삭제 버튼 클릭 이벤트 핸들러
   * @param {Event} e - 이벤트 객체
   * @param {Object} repo - 삭제할 레포지토리 정보
   */
  const handleDeleteClick = useCallback(
    (e, repo) => {
      e.stopPropagation();
      setRepoToDelete(repo);
      openDeleteRepoModal();
    },
    [openDeleteRepoModal, setRepoToDelete],
  );

  /**
   * 레포지토리 삭제 확인 핸들러
   */
  const handleConfirmDelete = useCallback(async () => {
    try {
      // API 호출이 있다면 여기서 수행
      // await deleteRepositoryAPI(repoToDelete.key)

      // store에서 삭제 수행
      const success = deleteRepo();

      if (success) {
        console.log('Repository deleted successfully');

        closeDeleteRepoModal();
        // 추가적인 성공 처리 (예: 토스트 메시지)
      } else {
        // 에러 처리
        console.error('Failed to delete repository: No repository selected');
      }
    } catch (error) {
      console.error('Failed to delete repository:', error);
      // 에러 처리 (예: 에러 메시지 표시)
    }
  }, [closeDeleteRepoModal, deleteRepo]);

  /**
   * 삭제 취소 핸들러
   */
  const handleCancelDelete = useCallback(() => {
    setRepoToDelete(null); // 삭제 대상 초기화
    closeDeleteRepoModal();
  }, [closeDeleteRepoModal, setRepoToDelete]);

  return {
    modals: {
      addRepo: {
        isOpen: isAddRepoModal,
        open: openAddRepoModal,
        close: closeAddRepoModal,
      },
      deleteRepo: {
        isOpen: isDeleteRepoModal,
        open: openDeleteRepoModal,
        close: closeDeleteRepoModal,
      },
    },
    appModal: {
      open: openAppModal,
      close: closeAppModal,
    },
    handlers: {
      handleCardClick,
      handleDeleteClick,
      handleConfirmDelete,
      handleCancelDelete,
    },
  };
};
