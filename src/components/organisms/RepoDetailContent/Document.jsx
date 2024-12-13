// src/components/organisms/RepoDetailContent/ReadMe.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Camera, Pencil, Video, Palette, Layout, Box, MoreVertical } from 'lucide-react';
import api from "../../../api/axios.js";
import { Splitter } from "../../index.js"
import { useMarkdown } from '../../../hooks/useAppReadMe.js';
import { MarkdownRenderer, LoadingSpinner } from '../../index.js';
import { documentText } from './documentText.jsx';

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

const ContentArea = styled.div`
  padding: 2rem;
  color: #a1a1aa;
`;


const markdownText = `
## 2. Strategy Pattern Implementation

### Strategy Pattern Overview

The strategy pattern is implemented through the use of interfaces for OAuth clients and URI providers, allowing for different implementations based on the OAuth provider.

### Strategy Interface and Concrete Classes

- **OAuthClient**: Interface for OAuth clients that defines methods for retrieving OAuth member information.
- **OAuthMember**: Interface representing an OAuth member with methods to get social login ID, email, and profile image URL.
- **OAuthProvider**: Interface that provides methods to get specific OAuth clients and URI providers based on the provider name.
- **OAuthUriProvider**: Interface for generating OAuth URIs.

### Context Class

- **AuthService**: Acts as the context that uses the strategy interfaces to perform authentication tasks.

### Class Diagram

\`\`\`mermaid
classDiagram
    class OAuthClient {
        +getOAuthMember(code: String): OAuthMember
        +isSame(oAuthProviderName: String): boolean
    }

    class OAuthMember {
        +getSocialLoginId(): String
        +getEmail(): String
        +getProfileImageUrl(): String
    }

    class OAuthProvider {
        +getOauthClient(providerName: String): OAuthClient
        +getOAuthUriProvider(providerName: String): OAuthUriProvider
        +getSocialType(provider: String): SocialType
    }

    class OAuthUriProvider {
        +generateUri(): String
        +isSame(provider: String): boolean
    }

    class AuthService {
        +generateTokenWithCode(code: String, providerName: String): MemberToken
        +generateUri(providerName: String): String
    }

    AuthService --> OAuthProvider
    OAuthProvider --> OAuthClient
    OAuthProvider --> OAuthUriProvider
    OAuthClient --> OAuthMember
\`\`\`
`;


const NavItem = ({ onClick, icon: Icon, children, active, badge }) => (
  <NavItemWrapper active={active} onClick={onClick}>
    <IconWrapper>
      <Icon size={20} />
    </IconWrapper>
    <span>{children}</span>
    {badge && <Badge>{badge}</Badge>}
  </NavItemWrapper>
);

const ReadMe = () => {


  const [selectedDoc, setSelectedDoc] = useState('AuthController'); // 선택된 문서 상태 추가
  const [content, setContent] = useState(documentText[0]); // 현재 표시될 내용

  // 문서 메뉴 데이터 정의
  const controllerDocs = [
    { id: 'AuthController', name: 'AuthController.md', content: documentText[0] },
    { id: 'KeywordController', name: 'KeywordController.md', content: documentText[1] },
    { id: 'LiveInformationController', name: 'LiveInformationController.md', content: documentText[2] },
    { id: 'MemberController', name: 'MemberController.md', content: documentText[0] },
    { id: 'MemberLiveInformationController', name: 'MemberLiveInformationController.md', content: documentText[0] },
    { id: 'PlannerController', name: 'PlannerController.md', content: documentText[0] },
    { id: 'RecommendController', name: 'RecommendController.md', content: documentText[0] },
    { id: 'TripController', name: 'TripController.md', content: documentText[0] },
    { id: 'TripScheduleController', name: 'TripScheduleController.md', content: documentText[0] }
  ];

  // 문서 선택 핸들러
  const handleDocSelect = (docId) => {
    setSelectedDoc(docId);
    const selectedContent = controllerDocs.find(doc => doc.id === docId)?.content;
    if (selectedContent) {
      setContent(selectedContent);
    }

  };


  console.log(documentText)
  const {
    // data: content,
    isLoading,
    isError,
    error
  } = useMarkdown('readMeId');

  if (isLoading) return <LoadingSpinner />;
  if (content) console.log('Document content', content);
  return (
    <Container >
      <Splitter
        splitterWidth={'100%'}
        initialLeftWidth={250}
        minWidth={200}
        maxWidth={400}
      >
        <SideBar >
          <Section flex={7} mb={0.75}>
            <SectionTitle>Controller Docs</SectionTitle>
            <SectionContent>
              {controllerDocs.map(doc => (
                <NavItem
                  key={doc.id}
                  icon={Box}
                  active={selectedDoc === doc.id}
                  onClick={() => handleDocSelect(doc.id)}
                >
                  {doc.name}
                </NavItem>
              ))}
            </SectionContent>
          </Section>
          <Section flex={3}>
            <SectionTitle>Controller Summary</SectionTitle>
            <SectionContent>
              <NavItem icon={Pencil} onClick={() => handleDocSelect(2)}>Controller_summery.md</NavItem>
            </SectionContent>
            {/* <NavItem icon={Video}>Video</NavItem>
            <NavItem icon={Palette}>Illustrations</NavItem>
            <NavItem icon={Layout}>UI/UX</NavItem>
            <NavItem icon={Box}>3D/AR</NavItem> */}
          </Section>
        </SideBar>

        <MainContent>
          <ContentArea>Main Content Area</ContentArea>
          {
            isLoading ? <LoadingSpinner /> :
              isError ?
                <div className="text-red-500 p-4">
                  Error: {error.message}
                </div>
                :
                <MarkdownRenderer content={content} />
          }
        </MainContent>
      </Splitter>
    </Container>
  );
};

export default ReadMe;