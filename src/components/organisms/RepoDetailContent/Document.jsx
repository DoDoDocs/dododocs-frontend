// src/components/organisms/RepoDetailContent/ReadMe.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Camera, Pencil, Video, Palette, Layout, Box, MoreVertical } from 'lucide-react';
import api from "../../../api/axios.js";
import { Splitter } from "../../index.js"
import { MarkdownRenderer, LoadingSpinner } from '../../index.js';
import documentText from './documentText.jsx';
import { useDocument } from '../../../hooks/RepoDetailContent/useDocument.js';
import { useRegisteredRepoStore } from "../../../store/store.js"

const Container = styled.div`
  display: flex;
  height: 100%;
  width : 100%;
  background: #10121b66;
`;

const SideBar = styled.div`
  display : flex;
  flex-direction : column;
  justify-content: space-between;
  gap :1rem;
  background: rgba(24, 24, 27, 0.5);
  padding: 1.5rem 0;
  /* overflow-y: auto; */
  height : 100%;

`;

const Section = styled.div`
  margin-bottom: ${props => props.mb || 0}rem;
  flex: ${props => props.flex || 1};
  min-height: 0; // 중요: flex 자식 요소의 overflow 처리를 위해 필요
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  text-transform: uppercase;
  color: #71717a;
  font-size: 0.75rem;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
`;


const SectionContent = styled.div`
flex: 1; // Section 내부에서 남은 공간을 모두 차지
  display: flex;
  flex-direction: column;
  overflow-x : hidden;
  overflow-y: auto;

// 스크롤바 기본 상태
&::-webkit-scrollbar {
    width: 6px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::-webkit-scrollbar {
    opacity: 1;
  }

  &::-webkit-scrollbar-track {
    background: rgb(1 2 3 / 40%);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }

  // Firefox용 스크롤바 스타일
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  
  &:hover {
    scrollbar-color: rgba(255, 255, 255, 0.3) rgb(1 2 3 / 40%);
  }
`





const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  color: ${props => props.active ? 'white' : '#a1a1aa'};
  background: ${props => props.active ? 'rgba(147, 51, 234, 0.1)' : 'transparent'};
  position: relative;

  &:hover {
    background: ${props => props.active ? 'rgba(147, 51, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
    color: white;
  }

  ${props => props.active && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 2px;
      height: 100%;
      background: #9333ea;
    }
  `}
`;

const IconWrapper = styled.div`
  margin-right: 0.75rem;
  opacity: 0.7;
`;

const Badge = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  background: rgba(147, 51, 234, 0.2);
  color: #9333ea;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
`;

const MainContent = styled.div`
 flex: 1;
  height : 100%;
  background: #10121b66;
  overflow-y: auto;

  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgb(1 2 3 / 40%);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
}
`;



const NavItem = ({ onClick, icon: Icon, children, active }) => (
  <NavItemWrapper active={active} onClick={onClick}>
    <IconWrapper>
      <Icon size={20} />
    </IconWrapper>
    <span>{children}</span>
  </NavItemWrapper>
);

const Document = () => {
  //SECTION Document 
  const { activeRepositoryId } = useRegisteredRepoStore();


  const {
    data: docsData,
    isLoading,
    isError,
    error
  } = useDocument(activeRepositoryId);

  useEffect(() => {
    console.log('docsData', docsData)
  }, [docsData])

  // 선택된 파일명과 내용을 관리하는 상태
  const [selectedFileName, setSelectedFileName] = useState('');
  const [currentContent, setCurrentContent] = useState('');

  // 컨트롤러 문서와 테스트 문서 분리
  const [controllerDocs, setControllerDocs] = useState([]);
  const [summaryDocs, setSummaryDocs] = useState([]);

  // docsData가 변경될 때마다 문서 목록 업데이트
  useEffect(() => {
    if (!docsData) return;
    // Controller 문서 필터링 (Test 파일 제외)
    const controllers = docsData.regularFiles
    console.log('controllers', controllers)

    // Summary 문서 설정
    const summaries = docsData.summaryFiles || [];

    setControllerDocs(controllers);
    setSummaryDocs(summaries);

    // 초기 선택된 문서 설정
    if (controllers?.length && !selectedFileName) {
      setSelectedFileName(controllers[0].fileName);
      setCurrentContent(controllers[0].fileContents);
    }
  }, [docsData]);

  // 문서 선택 핸들러
  const handleDocSelect = (fileName, content) => {
    setSelectedFileName(fileName);
    setCurrentContent(content);
  };

  if (isLoading) return <LoadingSpinner />;



  return (
    <Container>
      <Splitter
        splitterWidth={'100%'}
        initialLeftWidth={250}
        minWidth={200}
        maxWidth={400}
      >
        <SideBar>
          <Section flex={7} mb={1.5}>
            <SectionTitle>regular Docs</SectionTitle>
            <SectionContent>
              {controllerDocs?.map(doc => (
                <NavItem
                  key={doc.fileName}
                  icon={Box}
                  active={selectedFileName === doc.fileName}
                  onClick={() => handleDocSelect(doc.fileName, doc.fileContents)}
                >
                  {doc.fileName}
                </NavItem>
              ))}
            </SectionContent>
          </Section>
          <Section flex={2}>
            <SectionTitle>Summary DOCS</SectionTitle>
            <SectionContent>
              {summaryDocs.map(doc => (
                <NavItem
                  key={doc.fileName}
                  icon={Pencil}
                  active={selectedFileName === doc.fileName}
                  onClick={() => handleDocSelect(doc.fileName, doc.fileContents)}
                >
                  {doc.fileName}
                </NavItem>
              ))}
            </SectionContent>
          </Section>
        </SideBar>

        <MainContent>
          {isError ? (
            <MarkdownRenderer content={"Error fetching document: " + error.message} />
          ) : (
            <MarkdownRenderer content={currentContent} />
          )}
        </MainContent>
      </Splitter>
    </Container>
  );
};

export default Document;