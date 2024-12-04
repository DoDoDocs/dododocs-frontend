// src/components/organisms/RepoDetailContent/ReadMe.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Camera, Pencil, Video, Palette, Layout, Box, MoreVertical } from 'lucide-react';
import api from "../../../api/axios.js";
import { Splitter } from "../../index.js"
import { useMarkdown } from '../../../hooks/useAppReadMe.js';
import { MarkdownRenderer, LoadingSpinner } from '../../index.js';
const Container = styled.div`
  display: flex;
  height: 100%;
  width : 100%;
  background: #10121b66;
`;

const SideBar = styled.div`
  background: rgba(24, 24, 27, 0.5);
  padding: 1.5rem 0;
  overflow-y: auto;
  height : 100%;

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #3f3f46;
  }
`;

const SectionTitle = styled.h2`
  text-transform: uppercase;
  color: #71717a;
  font-size: 0.75rem;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
`;

const Section = styled.div`
  margin-bottom: ${props => props.mb || 0}rem;
`;

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


const NavItem = ({ icon: Icon, children, active, badge }) => (
  <NavItemWrapper active={active}>
    <IconWrapper>
      <Icon size={20} />
    </IconWrapper>
    <span>{children}</span>
    {badge && <Badge>{badge}</Badge>}
  </NavItemWrapper>
);

const ReadMe = () => {
  // const [mdText, setMdText] = useState([]);

  // useEffect(() => {
  //   const apiHandler = async () => {
  //     try {
  //       const response = await api.get('api/analyze/result', {
  //         params: {
  //           repositoryName: "Gatsby-Starter-Haon"
  //         }
  //       });
  //       // regularFiles 배열만 추출하여 저장
  //       if (response.data && response.data.regularFiles) {
  //         const regularFiles = response.data.regularFiles;
  //         const valuesArray = Object.values(regularFiles).map(obj => Object.values(obj)[0]);
  //         setMdText(valuesArray);

  //         console.log(response.data.regularFiles);
  //       } console.log(response.data);
  //     } catch (error) {
  //       console.error('API 호출 중 에러 발생:', error);
  //     }
  //   };
  //   apiHandler();
  // }, []);

  // useEffect(() => {
  //   console.log('mdText', mdText);
  // }, [mdText]);

  const {
    data: content,
    isLoading,
    isError,
    error
  } = useMarkdown('readMeId');

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container >
      <Splitter
        splitterWidth={'100%'}
        initialLeftWidth={250}
        minWidth={200}
        maxWidth={400}
      >
        <SideBar >
          <Section mb={2}>
            <SectionTitle>시스템 아키텍쳐 문서</SectionTitle>
            <NavItem icon={Box}>전체구조</NavItem>
            <NavItem icon={Box} active badge="3">시스템 흐름</NavItem>
          </Section>
          <Section>
            <SectionTitle>컴포넌트 설명</SectionTitle>
            <NavItem icon={Pencil}>KeywordController.md</NavItem>
            <NavItem icon={Pencil}>PlannerController.md</NavItem>
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
                : content.map((content) => (
                  <MarkdownRenderer content={content} />
                ))

          }
        </MainContent>
      </Splitter>
    </Container>
  );
};

export default ReadMe;