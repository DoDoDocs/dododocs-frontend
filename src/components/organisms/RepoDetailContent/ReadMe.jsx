// src/components/organisms/RepoDetailContent/ReadMe.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Camera, Pencil, Video, Palette, Layout, Box, MoreVertical } from 'lucide-react';
import api from "../../../api/axios.js";
import { Splitter } from "../../index.js"
import { useMarkdown } from '../../../hooks/useAppReadMe.js';
import { MarkdownRenderer, LoadingSpinner, MarkdownEditor } from '../../index.js';
import { useLocation, useNavigate } from 'react-router-dom';

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

1. Parent item
    1. Nested list item
        1. Nested list item
        2. Nested list item
    2. sdfdfd

# Project Name
moheng

## Table of Contents
[ 📝 Overview](#📝-overview)  
[ 📁 Project Structure](#📁-project-structure)  
[ 🚀 Getting Started](#🚀-getting-started)  
[ 💡 Motivation](#💡-motivation)  
[ 🎬 Demo](#🎬-demo)  
[ 🌐 Deployment](#🌐-deployment)  
[ 🤝 Contributing](#🤝-contributing)  
[ ❓ Troubleshooting & FAQ](#❓-troubleshooting-&-faq)  
[ 📈 Performance](#📈-performance)  

## 📝 Overview
이 프로젝트는 여행 계획 및 추천 시스템을 구축하기 위한 것입니다. 사용자는 여행지에 대한 정보를 입력하고, 시스템은 사용자의 선호도에 따라 맞춤형 여행지를 추천합니다.

### Main Purpose
- 사용자가 선호하는 여행지를 기반으로 추천 시스템을 제공
- 여행 계획을 쉽게 할 수 있도록 도와주는 기능 제공
- 사용자 경험을 향상시키기 위한 다양한 기능 포함

### Key Features
- 소셜 로그인 기능 (Kakao, Google)
- 사용자 맞춤형 여행지 추천
- 여행 일정 관리 기능
- 실시간 여행 정보 제공

### Core Technology Stack
- Frontend: React, Vite
- Backend: Spring Boot
- Database: MySQL
- Others: Python (AI 모델)

## 📁 Project Structure
\`\`\`
moheng
├── 📁 ai
│   ├── 📁 model_serving
│   │   ├── 📁 application
│   │   ├── 📁 domain
│   │   ├── 📁 infra
│   │   ├── 📁 interface
│   │   └── ...
│   └── ...
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 api
│   │   ├── 📁 components
│   │   └── ...
│   └── ...
├── 📁 moheng
│   ├── 📁 auth
│   ├── 📁 member
│   ├── 📁 planner
│   ├── 📁 trip
│   └── ...
└── ...
\`\`\`

## 🚀 Getting Started
### Prerequisites
- 지원되는 운영 체제
  * Windows, macOS, Linux
- 필요한 소프트웨어
  * Java 11 이상
  * Node.js 14 이상
  * MySQL
- 시스템 의존성
  * Docker (선택 사항)

- First level
  - Second level
    - Third level
### Installation
\`\`\`bash
# 저장소 클론
git clone https://github.com/kakao-25/moheng.git
cd moheng

# 필요한 패키지 설치
cd frontend
npm install

# 백엔드 설정
cd ../moheng
./gradlew build
\`\`\`

### Usage
\`\`\`bash
# 프론트엔드 실행
cd frontend
npm run dev

# 백엔드 실행
cd ../moheng
./gradlew bootRun
\`\`\`

## 💡 Motivation
이 프로젝트는 여행 계획을 보다 쉽게 만들고, 사용자에게 맞춤형 추천을 제공하기 위해 시작되었습니다. 개인적인 여행 경험에서 영감을 받아, 더 나은 여행 경험을 제공하고자 합니다.

## 🎬 Demo
![Demo Video or Screenshot](path/to/demo.mp4)

## 🌐 Deployment
- AWS, Heroku와 같은 클라우드 플랫폼에 배포 가능
- 배포 단계 및 환경별 설정은 README에 추가 예정

## 🤝 Contributing
- 기여 방법: 이슈를 통해 피드백 및 제안
- 코드 표준: Java 및 JavaScript 코딩 표준 준수
- Pull Request 프로세스: Fork 후 변경 사항을 커밋하고 Pull Request 제출

## ❓ Troubleshooting & FAQ
- **문제:** 로그인 시 오류 발생
  - **해결:** 소셜 로그인 설정을 확인하세요.
- **문제:** 추천 여행지가 나타나지 않음
  - **해결:** 사용자 선호도를 확인하고 다시 시도하세요.

## 📈 Performance
- 성능 벤치마크 및 최적화 기법은 추후 추가 예정
- 시스템의 확장성 고려하여 설계됨

이 README는 프로젝트의 개요와 사용 방법을 설명합니다. 추가적인 정보는 각 디렉토리 내의 문서에서 확인할 수 있습니다.
`;

const initialMarkdown = `# 마크다운 에디터 예시

일반 텍스트와 **굵은 텍스트**

\`\`\`mermaid
graph TD
    A[시작] --> B[처리]
    B --> C[종료]
\`\`\`

## 코드 블록
\`\`\`javascript
const hello = "world";
console.log(hello);
\`\`\`
`;

const handleChange = (newContent) => {
  console.log('마크다운이 변경되었습니다:', newContent);
};


const NavItem = ({ onClick, icon: Icon, emoji, children, active, badge }) => (
  <NavItemWrapper onClick={onClick} active={active}>
    <IconWrapper>
      {
        emoji ? <span>{emoji}</span> :
          <Icon size={20} />
      }
    </IconWrapper>
    <span>{children}</span>
    {badge && <Badge>{badge}</Badge>}
  </NavItemWrapper>
);

const ReadMe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mainContentRef = useRef(null);



  /**
   * @desc readme '#','##' 문자열을 기준으로 마크다운 파싱
   */
  const [sectionsReadMe, setSectionsReadMe] = useState([]);


  useEffect(() => {
    // sections 배열 구조 예시:
    // [
    //   { level: 1, name : "Project Name",title: "#Project Name", content: "..." },
    //   { level: 2, name : "Table of Contents",title: "#Table of Contents", content: "..." },
    //   { level: 2, name : "Overview" ,title: "#Overview", content: "..." },
    //   ...
    // ]

    // 마크다운을 섹션으로 나누는 함수
    const parseSections = (markdown) => {
      const lines = markdown.split('\n');
      const sections = [];
      let currentSection = { level: 0, title: '', content: [] };
      let isInCodeBlock = false; // 코드 블록 내부인지 추적

      lines.forEach((line) => {
        // 코드 블록 시작/끝 체크
        if (line.includes('```')) {
          isInCodeBlock = !isInCodeBlock;
          currentSection.content.push(line);
          return;
        }

        // 코드 블록 내부가 아닐 때만 # 체크
        if (!isInCodeBlock && line.startsWith('#')) {
          const level = line.match(/^#+/)[0].length;

          if (level === 1 || level === 2) {
            if (currentSection.content.length > 0) {
              sections.push({
                ...currentSection,
                content: currentSection.content.join('\n')
              });
            }

            currentSection = {
              level,
              name: line.replace(/^#+\s+/, ''),
              title: line,
              content: []
            };
          } else {
            currentSection.content.push(line);
          }
        } else {
          currentSection.content.push(line);
        }
      });

      // 마지막 섹션 추가
      if (currentSection.content.length > 0) {
        sections.push({
          ...currentSection,
          content: currentSection.content.join('\n')
        });
      }

      return sections;
    };

    setSectionsReadMe(parseSections(markdownText));
  }, [markdownText]);

  useEffect(() => {
    console.log(sectionsReadMe)
  }, [sectionsReadMe])

  const {
    data: content,
    isLoading,
    isError,
    error
  } = useMarkdown('readMeId');

  if (isLoading) return <LoadingSpinner />;

  function hasLeadingEmoji(str) {
    if (!str) {
      return [false, str];
    }
    // 올바른 이모지 정규표현식
    const emojiRegex = /^[\p{Emoji}]/u;
    // 이모지 매칭
    const match = str.match(emojiRegex);

    if (!match) {
      // 이모지가 없으면 원래 문자열 반환
      return [false, str];
    }

    // 매칭된 이모지와 제거된 문자열 반환
    const emoji = match[0];
    const withoutEmoji = str.replace(emoji, '').trim();

    return [emoji, withoutEmoji];
  }

  // 현재 활성화된 섹션 확인
  const isActiveSection = (section) => {
    const currentHash = decodeURIComponent(location.hash.replace('#', ''));
    return currentHash === '📁-project-structure' &&
      section.title.includes('Project Structure');
  };

  // sidebar 클릭시 해당 섹션으로 이동
  const handleNavItemClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView();
      navigate(`${location.pathname}#${sectionId}`);
    }
  };


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
            <SectionTitle>Read Me Table</SectionTitle>
            {
              sectionsReadMe
                .filter((section) => section.level === 1 || section.level === 2) // 조건에 맞는 섹션 필터링
                .map((section, index) => {
                  const [emoji, withoutEmoji] = hasLeadingEmoji(section.name);
                  // URL 해시 생성
                  const sectionId = `${emoji ? emoji + '-' : ''}${withoutEmoji}`
                    .toLowerCase()
                    .replace(/\s+/g, '-');



                  return (
                    <NavItem
                      key={index}
                      onClick={() => handleNavItemClick(sectionId)}
                      // badge={section.level}
                      icon={Box}
                      emoji={emoji}
                    // active={isActiveSection(section)}
                    >
                      {withoutEmoji}
                    </NavItem>)
                })
            }

          </Section>
          <Section>
            <SectionTitle>action</SectionTitle>
            <NavItem icon={Pencil}>custom 하기</NavItem>
            <NavItem icon={Pencil}>내보내기</NavItem>
            {/* <NavItem icon={Video}>Video</NavItem>
            <NavItem icon={Palette}>Illustrations</NavItem>
            <NavItem icon={Layout}>UI/UX</NavItem>
            <NavItem icon={Box}>3D/AR</NavItem> */}
          </Section>
        </SideBar>

        <MainContent ref={mainContentRef}>
          {
            isLoading ? <LoadingSpinner /> :
              isError ?
                <div className="text-red-500 p-4">
                  Error: {error.message}
                </div>
                : sectionsReadMe.map((section) => {
                  const [emoji, withoutEmoji] = hasLeadingEmoji(section.name);
                  const sectionId = `${emoji ? emoji + '-' : ''}${withoutEmoji}`
                    .toLowerCase()
                    .replace(/\s+/g, '-');

                  return (
                    <div key={sectionId} id={sectionId}>
                      <MarkdownRenderer content={section.title} />
                      <MarkdownRenderer content={section.content} />
                    </div>
                  );
                })

          }
          <div style={{ padding: '20px' }}>
            <MarkdownEditor
              initialValue={initialMarkdown}
              onChange={handleChange}
            />
          </div>
        </MainContent>
      </Splitter>
    </Container >
  );
};

export default ReadMe;