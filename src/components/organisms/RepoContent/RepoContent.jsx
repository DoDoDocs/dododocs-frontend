// src/components/organisms/RepoContent/RepoContent.jsx
import React from 'react';
import { Image, Typo, Button, TextBox, Table, Pagination, Select, } from "../../index.js";
import bgShapeFive from "../../../assets/images/bg-shape-five.png";
import bgShapeFour from "../../../assets/images/bg-shape-four.png";
import { Search, Plus } from 'lucide-react';
import { useRepoStore, useRegisteredRepoStore, useUserStore } from '../../../store/store.js'
import { useRepoManagement } from '../../../hooks/useRepoManagement'
import RepositoryGuide from './RepositoryGuide.jsx';
import RepoBoard from './RepoBoard/RepoBoard.jsx';

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


  // SECTION
  // 레포지토리 관리 관련 커스텀 훅
  const {
    RegisteredRepositories: {
      registeredRepositoriesList,
    },
    modals: { app, addRepo, deleteRepo },
    handlers,
    addRepoForm,
    deleteRepoHandlers
  } = useRepoManagement()

  // Zustand store에서 필요한 상태와 액션 가져오기
  const {
    searchValue,
    selectedCard,
    repoToDelete,
    repos,
    setSearchValue,
  } = useRepoStore();

  const {
    userNickname
  } = useUserStore();

  //NOTE 
  const {
    activeRepository,
    repositoryToRemove,
  } = useRegisteredRepoStore();

  return (
    <>
      <ContentStyle>
        <RepoBoxWrapper>
          {/*NOTE 레포지토리 추가 모달 */}
          <AddRepo isOpen={addRepo.isOpen} onClose={addRepo.close} {...addRepoForm}>
          </AddRepo>

          <DeleteRepo
            isOpen={deleteRepo.isOpen}
            onClose={deleteRepoHandlers.handleCancelDelete}
            onConfirm={deleteRepoHandlers.handleConfirmDelete}
            repository={repositoryToRemove}
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
              {userNickname || `User Name`}
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
              Boost your productivity with Dododocs! Add repositories and get started now.
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

            <RepositoryGuide
              onCardClick={handlers.handleCardClick}
            />

            <RepoBoard
              dataSource={registeredRepositoriesList}
              onCardClick={handlers.handleCardClick}
              selectedCard={activeRepository}
              handleDeleteClick={deleteRepoHandlers.handleDeleteClick}
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

