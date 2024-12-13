// src/components/organisms/RepoDetailContent/ReadMe.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Camera, Pencil, Video, Palette, Layout, Box, MoreVertical } from 'lucide-react';
import api from "../../../api/axios.js";
import { Splitter } from "../../index.js"
import { useMarkdown } from '../../../hooks/useAppReadMe.js';
import { MarkdownRenderer, LoadingSpinner, MarkdownEditor } from '../../index.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "../../index.js"
import { markdownText } from './markdownText.jsx';

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
  margin-bottom: 0.15rem;
`;


const SectionContent = styled.div`
flex: 1; // Section 내부에서 남은 공간을 모두 차지
  display: flex;
  flex-direction: column;
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

const ActionBtnWrapper = styled.div`
display : flex;
flex-direction: column;
gap : 1rem;
justify-content: center;
align-items: center;
padding-top : 0.75rem;
`

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

  /**
   * E제공된 콘텐츠를 지정된 파일 이름의 Markdown 파일로 내보냅니다
   * @param {string} content - The content to be exported as a Markdown file.
   * @param {string} [filename='document.md'] - The filename for the exported Markdown file.
   */
  const exportToMd = (markdownText, filename = 'document.md') => {
    try {
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export markdown:', error);
      // 사용자에게 오류 메시지 표시
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
          <Section flex={7} mb={0.75}>
            <SectionTitle>Read Me Table</SectionTitle>
            <SectionContent>
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
            </SectionContent>
          </Section>
          <Section flex={3}>
            <SectionTitle>action</SectionTitle>
            <ActionBtnWrapper>
              <Button btnType={"gradientLine"} size={'small'} style={{ width: "80%", padding: "0.75rem" }}>
                custom 하기
              </Button>
              <Button btnType={"gradient"} size={'small'} style={{ width: "80%", padding: "0.75rem" }}
                onClick={() => exportToMd(markdownText, 'README.md')}
              >
                .md로 내보내기
              </Button>
            </ActionBtnWrapper>
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