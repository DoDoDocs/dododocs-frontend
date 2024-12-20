import React, { useState } from 'react';
import styled from 'styled-components';
import {
  CalendarIcon, GitBranch, Plus, ChevronUp, ChevronDown,
  FileText, MessageCircle, Book,
  Clock, Loader2, CheckCircle2Clock, CheckCircle2, HelpCircle, X
} from 'lucide-react';

import {
  BoardWrapper,
  ProjectCardWrapper, ProjectCard, CloseButton, CardContent, CardHeader, ProjectIcon, CardTitle, CardBody,
  BranchContainer, BranchTag, TimeTag, Divider, ExpandSection, ExpandButton,
  CardTimelineSection, CardTimelineItem, BranchDot, StatusCompletedContainer, StatusCompletedBadge,
  StatusCompletedText, TimelineItemInfo, TimeLineItemTitle, TimeLineStatusBadge,
  StatusIconWrapper, TimeLineStatusText, EmptySlot, EmptySlotIcon, EmptySlotText, SlotCounter
} from "./RepoBoard/RepoBoard.styles.js"
import { useRepoStore } from '../../../store/store.js'


const GuideContainer = styled.div`
  width: 100%;
  width: 100%;
  margin: 0 auto;
  /* padding: 1rem; */
`;

const GuideWrapper = styled.div`
  background-color: rgba(17, 24, 39, 0.95);
  border-top:1px solid rgba(63, 63, 70, 0.4);
  /* border-radius: 0.5rem; */
  overflow: hidden;
  backdrop-filter: blur(8px);
`;

const GuideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(31, 41, 55, 0.5);
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span {
    color: white;
    font-weight: 500;
  }
`;

const GuideContent = styled.div`
  transition: max-height 0.3s;
  max-height: ${props => props.isExpanded ? 'auto' : '0'};
  overflow: hidden;
  display : grid;
  grid-template-columns: 1fr 1fr;
`;

const StepsList = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StepItem = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.isActive ? 'rgba(139, 92, 246, 0.5)' : 'rgb(31, 41, 55)'};
  background-color: ${props => props.isActive ? 'rgba(31, 41, 55, 0.5)' : 'rgba(17, 24, 39, 0.5)'};
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(31, 41, 55, 0.3);
  }
`;

const StepContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const StepIconWrapper = styled.div`
  margin-top: 0.25rem;
`;

const StepInfo = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  color: white;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const StepDescription = styled.p`
  color: rgb(156, 163, 175);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const StepHint = styled.div`
  color: rgba(139, 92, 246, 0.8);
  font-size: 0.75rem;
  background-color: rgba(139, 92, 246, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  display: inline-block;
`;

const RepositoryGuide = ({ onCardClick }) => {
  // const { testRepo } = useRepoStore();
  const transformedData = {
    Action: "delete",
    Branch: 'main',
    repositoryName: 'testRepo?.repositoryName',
    Status: "Code Imported",
    registeredRepoId: 'guide',
    projectsStatus: [
      {
        id: 1,
        title: "readme",
        name: "README 만들기",
        status: "completed",
      },

      {
        id: 2,
        title: "docs",
        name: "Docs 만들기",
        status: 'completed',
      },
      {
        id: 3,
        title: "chatting",
        name: "Chatting 만들기",
        status: 'completed',
      },
    ],
    completed: true,
    createdAt: '2024-12-18',
    // completed: testRepo?.readmeComplete && testRepo?.chatbotComplete && testRepo?.docsComplete,
    // createdAt: testRepo?.createdAt
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const guideSteps = [
    {
      title: "README 문서 작성",
      status: "progress",
      description: "AI가 Repository 분석 후 최적화된 README를 생성합니다",
      hint: "Repository를 선택하고 'Create README' 버튼을 클릭하세요"
    },
    {
      title: "실시간 채팅 지원",
      status: "waiting",
      description: "코드에 대해 질문하고 실시간으로 답변을 받아보세요",
      hint: "채팅 탭을 선택하고 질문을 입력하세요"
    },
    {
      title: "문서 자동화",
      status: "waiting",
      description: "코드 문서화를 자동으로 생성하고 관리합니다",
      hint: "문서 탭에서 자동 생성된 문서를 확인하세요"
    }
  ];

  const getStatusGuideIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FileText className="text-emerald-400" size={18} />;
      case 'progress':
        return <Loader2 className="text-purple-400 animate-spin" size={18} />;
      default:
        return <Clock className="text-gray-400" size={18} />;
    }
  };


  const getStatusIcon = (status) => {
    switch (status) {
      case 'readme':
        return FileText;
      case 'chatting':
        return MessageCircle;
      case 'docs':
        return Book;
      default:
        return FileText;
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'waiting':
        return {
          icon: Clock,
          text: "대기",
          color: "#9ca3af",
          bgColor: "#1f2937",
          bdColor: "rgba(156, 163, 175, 0.1)"
        };
      case 'in-progress':
        return {
          icon: Loader2,
          text: "진행중",
          color: "rgb(192, 132, 252)",
          bgColor: "rgba(126, 34, 206, 0.3)",
          bdColor: "rgba(192, 132, 252,0.1)"
        };
      case 'completed':
        return {
          icon: CheckCircle2,
          text: "완료",
          color: "rgb(74, 222, 128)",
          bgColor: "rgba(21, 128, 61, 0.3)",
          bdColor: "rgba(74, 222, 128,0.1)"
        };
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  const [expandedStates, setExpandedStates] = useState(true)
  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setExpandedStates((prev) => !prev);
  };


  return (
    <GuideContainer>
      <GuideWrapper>
        <GuideHeader onClick={() => setIsExpanded(!isExpanded)}>
          <HeaderTitle>
            <HelpCircle color="#A78BFA" size={20} />
            <span>How to Use Guide</span>
          </HeaderTitle>
          {isExpanded ?
            <ChevronUp color="#9CA3AF" size={20} /> :
            <ChevronDown color="#9CA3AF" size={20} />
          }
        </GuideHeader>

        <GuideContent isExpanded={isExpanded}>
          <StepsList>
            {guideSteps.map((step, index) => (
              <StepItem
                key={index}
                isActive={currentStep === index}
                onClick={() => setCurrentStep(index)}
              >
                <StepContent>
                  <StepIconWrapper>
                    {getStatusGuideIcon(step.status)}
                  </StepIconWrapper>
                  <StepInfo>
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                    <StepHint>💡 {step.hint}</StepHint>
                  </StepInfo>
                </StepContent>
              </StepItem>
            ))}
          </StepsList>
          <div style={{ padding: '1rem' }}>
            <ProjectCardWrapper
              onClick={() => onCardClick('guide')}
            >
              <ProjectCard>
                <CloseButton>
                  <X />
                </CloseButton>
                <CardContent isExpanded={expandedStates}>
                  <CardHeader isExpanded={expandedStates}>
                    <ProjectIcon isExpanded={expandedStates}>
                      {transformedData.repositoryName.charAt(0)}
                    </ProjectIcon>
                    <CardTitle>{transformedData.repositoryName}</CardTitle>
                  </CardHeader>
                  <CardBody isExpanded={expandedStates}>
                    <BranchContainer>
                      <BranchTag isExpanded={expandedStates}>
                        {expandedStates ?
                          <GitBranch size={'.9rem'} />
                          :
                          <BranchDot />
                        }
                        {transformedData.Branch}
                      </BranchTag>
                    </BranchContainer>
                    <TimeTag>
                      <CalendarIcon size={'1rem'} />
                      <span>{formatDate(transformedData.createdAt)}</span>
                    </TimeTag>
                  </CardBody>
                </CardContent>
                <ExpandSection onClick={(e) => handleToggleExpand(e, transformedData.registeredRepoId)}>
                  <Divider />
                  <ExpandButton>
                    {expandedStates ? (
                      <ChevronUp size={'1rem'} />
                    ) : (
                      <ChevronDown size={'1rem'} />
                    )}
                  </ExpandButton>
                </ExpandSection>
                <CardTimelineSection isExpanded={expandedStates}>
                  {
                    transformedData.completed && expandedStates ? (
                      <StatusCompletedContainer>
                        <StatusCompletedBadge>
                          <CheckCircle2 size={'1rem'} />
                          <StatusCompletedText>
                            Dododocs complete !
                          </StatusCompletedText>
                        </StatusCompletedBadge>
                      </StatusCompletedContainer>
                    ) : (
                      transformedData.projectsStatus.map((statusList) => {
                        const status = getStatusDisplay(statusList.status);
                        const TimeLineIcon = getStatusIcon(statusList.title);
                        const StatusIcon = status.icon;
                        return (
                          <CardTimelineItem
                            key={statusList.id}
                            isExpanded={expandedStates}
                          >
                            <TimelineItemInfo isExpanded={expandedStates}>
                              <TimeLineIcon size={'1.2rem'} color="#9ca3af" />
                              <TimeLineItemTitle isExpanded={expandedStates}>
                                {statusList.name}
                              </TimeLineItemTitle>
                            </TimelineItemInfo>
                            <TimeLineStatusBadge
                              isExpanded={expandedStates}
                              bgColor={status.bgColor}
                              bdColor={status.bdColor}
                            >
                              <StatusIconWrapper isSpinning={statusList.status === 'in-progress'}>
                                <StatusIcon
                                  size={'1rem'}
                                  color={status.color}
                                />
                              </StatusIconWrapper>
                              <TimeLineStatusText color={status.color}>
                                {status.text}
                              </TimeLineStatusText>
                            </TimeLineStatusBadge>
                          </CardTimelineItem>
                        );
                      })
                    )}
                </CardTimelineSection>
              </ProjectCard>
            </ProjectCardWrapper>

          </div>
        </GuideContent>

      </GuideWrapper>
    </GuideContainer >
  );
};

export default RepositoryGuide;