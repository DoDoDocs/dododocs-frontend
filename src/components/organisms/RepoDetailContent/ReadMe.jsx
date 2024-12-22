// src/components/organisms/RepoDetailContent/ReadMe.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Camera, Pencil, Video, Palette, Layout, Box, MoreVertical, GripVertical, Check, X, Plus } from 'lucide-react';
import api from "../../../api/axios.js";
import { Splitter } from "../../index.js"
import { MarkdownRenderer, LoadingSpinner } from '../../index.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "../../index.js"
import { markdownText } from './markdownText.jsx';
import { useReadme } from '../../../hooks/RepoDetailContent/useReadme.js';
import { useRegisteredRepoStore, useAppModalStore } from "../../../store/store.js"

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




const DragHandle = styled.div`
  margin-right: 0.5rem;
  cursor: grab;
  opacity: ${props => props.isCustomMode ? 0.7 : 0};
  transition: opacity 0.2s;
  
  &:active {
    cursor: grabbing;
  }
`;

const DropIndicator = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #9333ea;
  z-index: 10;
  ${props => props.isTop ? 'top: -1px;' : 'bottom: -1px;'}

  &::before {
    content: '';
    position: absolute;
    left: -0.5rem;
    top: -0.375rem;
    width: 1rem;
    height: 1rem;
    background: #9333ea;
    border-radius: 50%;
  }
`;


const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-left: auto;
  background: ${props => props.isIncluded ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isIncluded ? '#9333ea' : '#71717a'};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isIncluded ? 'rgba(147, 51, 234, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;



const NavItemContainer = styled.div`
 position: relative;
  opacity: 1;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: #9333ea;
    opacity: 0;
    transition: opacity 0.2s;
  }
`;




const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  cursor: ${props => props.isCustomMode ? 'move' : 'pointer'};
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

const ExcludedSectionsContainer = styled.div`
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

const RestorableNavItem = styled(NavItemWrapper)`
  opacity: 0.6;
  background: transparent;
  
  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.05);
  }
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

const handleChange = (newContent) => {
  console.log('마크다운이 변경되었습니다:', newContent);
};



const NavItem = ({
  onClick,
  icon: Icon,
  emoji,
  children,
  active,
  isCustomMode,
  section, // section 객체 전체를 전달
  onDragStart,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDragEnd,
  onDrop,
  draggedOverItem,
  dropPosition,
  handleToggleButton,
  isIncluded
}) => (
  <NavItemContainer>
    {draggedOverItem?.sectionIndex === section.sectionIndex &&
      dropPosition === 'top' && <DropIndicator isTop />}
    <NavItemWrapper
      onClick={!isCustomMode ? onClick : undefined}
      active={active}
      isCustomMode={isCustomMode}
      draggable={isCustomMode}
      onDragStart={(e) => onDragStart(e, section)}
      onDragEnter={(e) => onDragEnter(e, section)}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    >
      {isCustomMode && (
        <DragHandle isCustomMode={isCustomMode}>
          <GripVertical size={16} />
        </DragHandle>
      )}
      <IconWrapper>
        {emoji ? <span>{emoji}</span> : <Icon size={20} />}
      </IconWrapper>
      <span>{children}</span>
      {isCustomMode &&
        (
          <ToggleButton
            onClick={(e) => {
              e.stopPropagation();
              handleToggleButton(section.sectionIndex);
            }}
            isIncluded={isIncluded}
          >
            {isIncluded ? <Check size={14} /> : <X size={14} />}
          </ToggleButton>
        )
      }
    </NavItemWrapper>
    {draggedOverItem?.sectionIndex === section.sectionIndex &&
      dropPosition === 'bottom' && <DropIndicator />}
  </NavItemContainer>
);


const ReadMe = () => {
  const { activeRepositoryId } = useRegisteredRepoStore();
  const { AppRepo } = useAppModalStore();
  const location = useLocation();
  const navigate = useNavigate();
  const mainContentRef = useRef(null);

  const {
    data: markdownText,
    isLoading,
    isError,
    error
  } = useReadme(activeRepositoryId);

  useEffect(() => {
    console.log("😂😂 READ  ME : ", markdownText)

  }, [markdownText])


  /**
    * @desc readme '#','##' 문자열을 기준으로 마크다운 파싱
    */
  const [sectionsReadMe, setSectionsReadMe] = useState([]);

  /**
   * @desc 네비게이션 바 Draggable 설정을 위한 useState
   */
  // 커스텀 모드 상태를 추적하는 상태
  const [isCustomMode, setIsCustomMode] = useState(false);
  // 현재 드래그 중인 항목을 추적하는 상태
  const [draggedItem, setDraggedItem] = useState(null);
  // 드래그된 항목이 위치한 대상 항목을 추적하는 상태
  const [draggedOverItem, setDraggedOverItem] = useState([]);
  // 드롭 위치(위/아래)를 추적하는 상태
  const [dropPosition, setDropPosition] = useState([]);



  useEffect(() => {

    console.log("😂😂😂😂😂 READ  ME : ", markdownText)

    if (!markdownText) return; // Add this check

    // 마크다운을 섹션으로 나누는 함수
    // sections 배열 구조 예시:
    // [
    //   { sectionIndex : 1,excludeSection : false ,level: 1, name : "Project Name",title: "#Project Name", content: "..." },
    //   { sectionIndex : 2 , excludeSection : false,level: 2, name : "Table of Contents",title: "#Table of Contents", content: "..." },
    //   { sectionIndex : 3, excludeSection : false,level: 2, name : "Overview" ,title: "#Overview", content: "..." },
    //   ...
    // ]
    const parseSections = (markdown) => {
      const lines = markdown.split('\n');
      const sections = [];
      let isInCodeBlock = false;
      let currentContent = [];

      const createSection = (level, title, content, sectionIndex) => ({
        sectionIndex,
        level,
        name: title.replace(/^#+\s+/, ''),
        title,
        content: content.join('\n'),
        // 제외 처리를 위한 속성 추가
        excludeSection: false
      });

      let sectionIndex = 0;
      let currentTitle = '';
      let currentLevel = 0;
      let isFirstSection = true;

      const processCurrentContent = (level, title, sectionIndex) => {
        // 첫 번째 섹션이 아니고, 실제 내용이 있는 경우에만 섹션 추가
        if (!isFirstSection && currentContent.length > 0) {
          sections.push(createSection(level, title, currentContent, sectionIndex));
        }
        isFirstSection = false;
        currentContent = [];
      };

      lines.forEach((line) => {
        if (line.includes('```')) {
          isInCodeBlock = !isInCodeBlock;
          currentContent.push(line);
          return;
        }

        if (!isInCodeBlock && line.startsWith('#')) {
          const level = line.match(/^#+/)[0].length;

          if (level === 1 || level === 2) {
            processCurrentContent(currentLevel, currentTitle, sectionIndex);
            currentTitle = line;
            currentLevel = level;
            sectionIndex++;
          } else {
            currentContent.push(line);
          }
        } else {
          currentContent.push(line);
        }
      });

      // 마지막 섹션 처리 (내용이 있는 경우에만)
      if (currentContent.length > 0) {
        sections.push(createSection(currentLevel, currentTitle, currentContent, sectionIndex));
      }

      return sections;
    };

    const initialSections = parseSections(markdownText);
    setSectionsReadMe(initialSections);
    console.log("😂😂😂😂😂 READ  ME : ", [markdownText])
  }, [markdownText]);




  // 목차 업데이트를 위한 상태 추가
  const [tableContent, setTableContent] = useState('');

  useEffect(() => {
    /**
     * 목차를 생성하는 함수
     * @param {Array} sections - 현재 섹션 배열
     * @returns {string} - 생성된 목차 마크다운 문자열
     */
    const generateTableOfContents = (sections) => {
      const activeSections = sections.filter(section => !section.excludeSection && section.name !== 'Table of Contents');

      return activeSections
        .filter(section => section.level === 1 || section.level === 2)
        .map(section => {
          const [emoji, withoutEmoji] = hasLeadingEmoji(section.name);
          const linkText = emoji ? `${emoji} ${withoutEmoji}` : withoutEmoji;
          const linkId = `${emoji ? emoji + '-' : ''}${withoutEmoji}`
            .toLowerCase()
            .replace(/\s+/g, '-');

          const indent = section.level === 2 ? '  ' : '';
          return `${indent}[ ${linkText}](#${linkId})`;
        })
        .join('\n');
    };

    // 목차 내용 생성
    const newTableContent = generateTableOfContents(sectionsReadMe);
    setTableContent(newTableContent);
  }, [sectionsReadMe]);

  // 목차 내용이 변경될 때마다 섹션 업데이트
  useEffect(() => {
    if (!tableContent) return;

    setSectionsReadMe(prevSections =>
      prevSections.map(section =>
        section.name === 'Table of Contents'
          ? { ...section, content: tableContent }
          : section
      )
    );
  }, [tableContent]);


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


  // sidebar 클릭시 해당 섹션으로 이동
  const handleNavItemClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView();
      navigate(`${location.pathname}#${sectionId}`);
    }
  };

  // SECTION 커스텀 모드 handler ( 드래그 , 제외 설정)
  /**
   * @desc sidebar 커스텀 모드 시 드래그를 통한 순서변경가능 하도록 처리
   * @desc sidebar 커스텀 모드 시 요소를 제외된 섹션을 통해서 요소를 추가 및 제외 가능
   */

  /**
   * 드래그 시작 핸들러
   * @param {DragEvent} e - 드래그 이벤트 객체
   * @param {Section} section - 드래그 중인 섹션
   */
  const handleDragStart = (e, section) => {
    console.log(section.name)
    setDraggedItem(section);
  };

  /**
   * 드래그 엔터 핸들러
   * @param {DragEvent} e - 드래그 이벤트 객체
   * @param {Section} section - 드래그가 진입한 섹션
   */
  const handleDragEnter = (e, section) => {
    e.preventDefault();
    if (section.sectionIndex === draggedItem?.sectionIndex) return;

    setDraggedOverItem(section);

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.top + rect.height / 2;
    setDropPosition(mouseY < threshold ? 'top' : 'bottom');
  };

  /**
     * 드래그된 항목이 다른 항목을 벗어날 때 호출되는 핸들러
     * @param {DragEvent} e - 드래그 이벤트 객체
     */
  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDraggedOverItem(null);
      setDropPosition(null);
    }
  };

  /**
     * 드래그 중인 항목이 다른 항목 위에 있을 때 지속적으로 호출되는 핸들러
     * @param {DragEvent} e - 드래그 이벤트 객체
     */
  const handleDragOver = (e) => {
    e.preventDefault();
    if (!draggedOverItem) return;

    // 마우스 위치에 따라 드롭 위치 실시간 업데이트
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY;
    const threshold = rect.top + rect.height / 2;
    setDropPosition(mouseY < threshold ? 'top' : 'bottom');
  };

  /**
     * 항목이 드롭될 때 호출되는 핸들러
     * @param {DragEvent} e - 드래그 이벤트 객체
     */
  const handleDrop = (e) => {
    e.preventDefault();
    // 유효하지 않은 드롭 동작 처리 방지
    if (!draggedItem || !draggedOverItem || draggedItem.sectionIndex === draggedOverItem.sectionIndex) return;

    const newSections = [...sectionsReadMe];
    // 드래그된 항목과 드롭된 위치의 인덱스 찾기
    const draggedIndex = sectionsReadMe.findIndex(section => section.sectionIndex === draggedItem.sectionIndex);
    const droppedIndex = sectionsReadMe.findIndex(section => section.sectionIndex === draggedOverItem.sectionIndex);

    // 항목 순서 변경 로직
    newSections.splice(draggedIndex, 1);
    const adjustedDropIndex = dropPosition === 'bottom' ?
      (draggedIndex < droppedIndex ? droppedIndex - 1 : droppedIndex) + 1 :
      (draggedIndex < droppedIndex ? droppedIndex - 1 : droppedIndex);

    newSections.splice(adjustedDropIndex, 0, draggedItem);

    // sectionIndex 재할당
    // const updatedSections = newSections.map((section, index) => ({
    //   ...section,
    //   sectionIndex: index + 1
    // }));

    // 상태 업데이트 및 초기화
    setSectionsReadMe(newSections);
    setDraggedItem(null);
    setDraggedOverItem(null);
    setDropPosition(null);
  };

  /**
   * 드래그가 종료될 때 호출되는 핸들러
   */
  const handleDragEnd = () => {
    // 모든 드래그 관련 상태 초기화
    setDraggedItem(null);
    setDraggedOverItem(null);
    setDropPosition(null);
  };

  /**
   * @desc 섹션Index 받아서 해당 섹션 제외 / 추가 설정
   * @param {Number} sectionIndex - 토글할 섹션의 인덱스 
   * @detail SectionsReadMe 배열에 속성을 !변경
   */
  const handleToggleButton = (sectionIndex) => {
    setSectionsReadMe(prevSections =>
      prevSections.map(section =>
        section.sectionIndex === sectionIndex
          ? { ...section, excludeSection: !section.excludeSection }
          : section
      )
    );
  }

  /**
   * @desc 커스텀 모드 버튼 클릭시 처리
   */
  const toggleCustomMode = () => {
    /**
     *@desc 커스텀 모드 종료 시 처리
     *@detail 확정 후 api 요청 처리
     */
    if (isCustomMode) {
      console.log("커스텀 모드 종료");
    }
    setIsCustomMode(!isCustomMode);
  };


  // !SECTION 커스텀 모드 handler


  /**
   * 제공된 콘텐츠를 지정된 파일 이름의 Markdown 파일로 내보냅니다
   * @param {string} content - The content to be exported as a Markdown file.
   * @param {string} [filename='document.md'] - The filename for the exported Markdown file.
   */
  const exportToMd = (markdownText, filename = 'document.md') => {
    try {
      const blob = new Blob([markdownText], { type: 'text/markdown' });
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
              {/* 활성화된 섹션 목록 */}
              {sectionsReadMe
                .filter(section => !section.excludeSection)
                .map((section, index) => {
                  const [emoji, withoutEmoji] = hasLeadingEmoji(section.name);
                  const sectionId = `${emoji ? emoji + '-' : ''}${withoutEmoji}`
                    .toLowerCase()
                    .replace(/\s+/g, '-');

                  return (
                    <NavItem
                      key={section.sectionIndex}
                      onClick={() => handleNavItemClick(sectionId)}
                      icon={Box}
                      emoji={emoji}
                      isCustomMode={isCustomMode}
                      section={section}
                      onDragStart={handleDragStart}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                      onDrop={handleDrop}
                      draggedOverItem={draggedOverItem}
                      dropPosition={dropPosition}
                      handleToggleButton={handleToggleButton}
                      isIncluded={!section.excludeSection}
                    >
                      {withoutEmoji}
                    </NavItem>


                  );
                })}
              {/* 제외된 섹션 목록 (커스텀 모드일 때만 표시)  */}
              {isCustomMode && sectionsReadMe.some(section => section.excludeSection) && (
                <ExcludedSectionsContainer>
                  <SectionTitle>제외된 섹션</SectionTitle>
                  {sectionsReadMe
                    .filter(section =>
                      section.excludeSection &&
                      (section.level === 1 || section.level === 2)
                    )
                    .map(section => {
                      const [emoji, withoutEmoji] = hasLeadingEmoji(section.name);

                      return (
                        <RestorableNavItem
                          key={section.sectionIndex}
                          onClick={() => handleToggleButton(section.sectionIndex)}
                        >
                          <IconWrapper>
                            <Plus size={16} />
                          </IconWrapper>
                          {emoji && <span>{emoji}</span>}
                          <span>{withoutEmoji}</span>
                        </RestorableNavItem>
                      );
                    })}
                </ExcludedSectionsContainer>
              )}
            </SectionContent>

          </Section>
          <Section flex={3}>
            <SectionTitle>action</SectionTitle>
            <ActionBtnWrapper>
              <Button
                btnType={isCustomMode ? "gradient" : "gradientLine"}
                size={'small'}
                style={{ width: "80%", padding: "0.75rem" }}
                onClick={toggleCustomMode}
              >
                {isCustomMode ? '완료' : 'custom 하기'}
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
                // <div className="text-red-500 p-4">
                //   Error: {error.message}
                // </div>
                sectionsReadMe.map((section) => {
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
                :
                sectionsReadMe.filter(section => !section.excludeSection).map((section) => {
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
        </MainContent>
      </Splitter>
    </Container >
  );
};

export default ReadMe;