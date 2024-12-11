// src/components/organisms/RepoContent/RepoContent.jsx
import React, { useState, useCallback } from 'react';
import { Image, Typo, Button, TextBox, Table, Pagination, Select, } from "../../index.js";
import bgShapeFive from "../../../assets/images/bg-shape-five.png";
import bgShapeFour from "../../../assets/images/bg-shape-four.png";
import { Search, Trash2, Plus, Trash } from 'lucide-react';
import useRepoStore from '../../../store/useRepoStore'
import { useRepoManagement } from '../../../hooks/useRepoManagement'
import { useParams, useNavigate } from 'react-router-dom';

import Board from './Board.jsx';
import {
  BgShape,
  ContentStyle,
  TitleWrapper,
  RepoContentWrapper,
  RepoBoxWrapper,
  Divider,
  ButtonWrapper,
  SearchTextWrapper,
  SearchInput,
  DeleteBtn,
  PaginationWrapper,
} from "./RepoContent.style.js";

import AddRepo from './RepoContentModal/AddRepoModal.jsx';
import DeleteRepo from './RepoContentModal/DeleteRepoModal.jsx';


import { RepoDetailContent } from "../../index.js";;


/**
 * 레포지토리 목록 및 관리 컴포넌트
 * 
 * @component
 * @description 레포지토리 목록을 표시하고 관리하는 메인 컴포넌트
 * 검색, 추가, 삭제, 상세보기 등의 기능을 제공
 */
const RepoContent = () => {
  // const [searchValue, setSearchValue] = useState('');
  // const [currentPage, setCurrentPage] = useState(1);
  // const [selectedCard, setSelectedCard] = useState(null);
  // const [repoToDelete, setRepoToDelete] = useState(null);

  /**
   * @description 모달 hooks
   */
  // const { isOpen: isAddRepoModal, openModal: openAddRepoModal, closeModal: closeAddRepoModal } = useModal();
  // const { isOpen: isDeleteRepoModal, openModal: openDeleteRepoModal, closeModal: closeDeleteRepoModal } = useModal();
  // // const { isOpen: isDetailRepoModal, openModal: openDetailRepoModal, closeModal: closeDetailRepoModal } = useModal();

  /**
   * @description App 관련 함수
   */
  // const navigate = useNavigate();

  // const { repoTitle } = useParams();

  // const [isAppModalOpen, setIsAppModalOpen] = useState(!!repoTitle);

  // const openAppModal = (card) => {
  //   navigate(`/repositories/${card.Repository}`);
  //   setIsAppModalOpen(true);
  // };

  // const closeAppModal = () => {
  //   navigate(-1);
  //   setIsAppModalOpen(false);
  // };


  const data = [
    {
      key: '1',
      Repository: 'spring-boot_test',
      Status: 'In Progress',
      Branch: 'main',
      Action: 'Delete'
    },
    {
      key: '3',
      Repository: 'moheng',
      Status: 'Code Imported',
      Branch: ['main', 'develop'],
      Action: 'Delete'
    },
  ];

  // const handleSearchChange = useCallback((e) => {
  //   setSearchValue(e.target.value);
  // }, []);

  // const handleCardClick = ((card) => {
  //   console.log('Card clicked:', card);
  //   setSelectedCard(card);
  //   openAppModal(card);
  // });

  // const handleDeleteClick = useCallback((e, repo) => {
  //   e.stopPropagation(); // 이벤트 버블링 방지
  //   setRepoToDelete(repo); // 삭제할 레포지토리 정보 저장
  //   console.log('Delete clicked Repo : ', repo);
  //   openDeleteRepoModal();
  // }, [openDeleteRepoModal]);

  // const handleConfirmDelete = useCallback(async () => {
  //   try {
  //     // API 호출 로직
  //     // await deleteRepository(repoToDelete.key);

  //     // 성공적으로 삭제된 후의 처리
  //     closeDeleteRepoModal();
  //     setRepoToDelete(null);

  //     // 필요한 경우 데이터 리로드 또는 상태 업데이트
  //     // reloadData();

  //   } catch (error) {
  //     console.error('Failed to delete repository:', error);
  //     // 에러 처리 로직
  //   }
  // }, [closeDeleteRepoModal]);


  // const handleCancelDelete = useCallback(() => {
  //   closeDeleteRepoModal();
  //   setRepoToDelete(null);
  // }, [closeDeleteRepoModal]);

  // SECTION
  // 레포지토리 관리 관련 커스텀 훅
  const {
    modals: { app, addRepo, deleteRepo },
    appModal,
    handlers
  } = useRepoManagement()

  // Zustand store에서 필요한 상태와 액션 가져오기
  const {
    searchValue,
    selectedCard,
    repoToDelete,
    repos,
    setSearchValue,
  } = useRepoStore()

  return (
    <>

      <ContentStyle>
        <RepoBoxWrapper>
          {/*NOTE 레포지토리 추가 모달 */}
          <AddRepo
            isOpen={addRepo.isOpen} onClose={addRepo.close}>
          </AddRepo>

          <DeleteRepo
            isOpen={deleteRepo.isOpen}
            onClose={handlers.handleCancelDelete}
            onConfirm={handlers.handleConfirmDelete}
            repository={repoToDelete}
          />

          <RepoDetailContent onClose={app.close}>
          </RepoDetailContent>

          <TitleWrapper>
            <Typo
              color="#ffffff"
              weight={600}
              size="3rem"
              style={{ letterSpacing: '-0.025em' }}
            >
              User Name
            </Typo>
          </TitleWrapper>

          <TitleWrapper>
            <Typo
              color="#ffffff"
              weight={600}
              size="1.3rem"
            >
              Import from your GitHub organizations
            </Typo>
            <Typo
              color="#a1a1aa"
              size="1.1rem"
            >
              Earn 1 month for free for each 3 new paid subscribers
            </Typo>
          </TitleWrapper>

          <RepoContentWrapper>
            <ButtonWrapper>
              <Button
                btnType="gradient"
                style={{
                  padding: "0.875rem 1.5rem",
                  fontSize: "1.1rem",
                  color: "#000000",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}
                onClick={addRepo.open}
              >
                <Plus size={20} />
                Add Repository
              </Button>
            </ButtonWrapper>

            <Divider />

            <SearchTextWrapper>
              <SearchInput>
                <TextBox
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search repositories..."
                  plane={true}
                />
                <Search />
              </SearchInput>
            </SearchTextWrapper>



            <Board
              dataSource={repos}
              onCardClick={handlers.handleCardClick}
              selectedCard={selectedCard}
              handleDeleteClick={handlers.handleDeleteClick}
              MAX_PROJECTS={3}
              onAddClick={addRepo.open}
            />

            <PaginationWrapper>
            </PaginationWrapper>
          </RepoContentWrapper >



        </RepoBoxWrapper >

      </ContentStyle >

      <BgShape>
        <Image src={bgShapeFour} width={'640px'} height={'949px'} style={{ position: 'absolute', top: '5dvh', left: '0', loading: 'lazy', filter: 'brightness(0.4) opacity(90%)', pointerEvents: "none" }} />
        <Image src={bgShapeFive} width={'626px'} height={'1004px'} style={{ position: 'absolute', top: '5dvh', right: '0', loading: 'lazy', filter: 'brightness(0.7)', pointerEvents: "none" }} />
      </BgShape>
    </>
  );
};

export default RepoContent;

