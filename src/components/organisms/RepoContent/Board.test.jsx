import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  CalendarIcon, X, GitBranch, Plus, ChevronUp, ChevronDown,
  FileText, MessageCircle, Book,
  Clock, Loader2, CheckCircle2
} from 'lucide-react';


// Styled Components
// 회전 애니메이션 정의
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const BoardWrapper = styled.div`
  border-bottom : 1px solid rgba(63, 63, 70, 0.4);
  border-top : 1px solid rgba(63, 63, 70, 0.4);
  gap : 1.5rem;
  justify-content : space-between;
  width : 100%;
  padding: 1.5rem;

  display: flex;

  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

`
const ProjectCardWrapper = styled.div`
/* width : 100%; */
flex : 1;
overflow: hidden;

transition: all 0.2s ease;
 @media (min-width: 768px) {

    &:nth-child(3) {
      grid-column: 1 / -1;
    }
  } 
  @media (min-width: 1024px) {
    &:nth-child(3) {
      grid-column: auto ;
    }
  }
 
`


const ProjectCard = styled.div`
  flex-direction : column;
  display : flex;
  height : 21rem;
  background: #18181b;
  border: 1px solid  rgb(39, 39, 42);
  transition: all 0.2s ease;
  width : 100%;
  border-radius: 0.5rem;
  position : relative;

  overflow: hidden;
`

const CloseButton = styled.div`
  position: absolute;
  top : 1rem;
  right : 1.5rem;
  display : flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  color: #9a9cae;
  border-color: #26272f;
  border-radius: 0.375rem;
  background: #18181b;
  &:hover {
    background: #26272f;
  }
`



const CardContent = styled.div`
  transition: all 0.2s ease;
  flex : ${props => props.isExpanded ? '0.8' : '0.2'};
  padding : 1rem 1.5rem;

  display : flex;
  gap :  ${props => props.isExpanded ? '0.75rem' : '0.4rem'};
  flex-direction : column;
`
const CardHeader = styled.div`
  transition: all 0.2s ease;
  align-items: ${props => props.isExpanded ? 'flex-start' : 'center'} ;
  display : flex;
  gap : ${props => props.isExpanded ? '1rem' : '.5rem'};
  flex-direction :  ${props => props.isExpanded ? 'column' : 'row'};
`
const ProjectIcon = styled.div`
  transition: all 0.2s ease;

  width : ${props => props.isExpanded ? '3rem' : '2.3rem'} ;
  height : ${props => props.isExpanded ? '3rem' : '2.3rem'};
  background: #27272a;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size:  ${props => props.isExpanded ? '1.5rem' : '1.2rem'};
  color: #ffffff;
`;

const CardTitle = styled.div`
  color: #fafafa;
  font-size: 1.125rem;
  font-weight: 600;
`

const CardBody = styled.div`
  transition: all 0.2s ease;
  align-items: ${props => props.isExpanded ? 'flex-start' : 'center'} ;
  display : flex;
  gap : ${props => props.isExpanded ? '1.5rem' : '.5rem'};
  flex-direction :  ${props => props.isExpanded ? 'column' : 'row'};
`

const BranchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BranchTag = styled.div`
  transition: all 0.2s ease;
  background: #2a2a3c;
  color : #e980ff;
  font-weight:  ${props => props.isExpanded ? '500' : 'normal'};
  padding: ${props => props.isExpanded ? '0.375rem 0.75rem' : '0.2rem 0.75rem'};
  border-radius: 0.375rem;
  font-size:  ${props => props.isExpanded ? '.875rem' : '0.875rem'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: ${props => props.isExpanded ? '1px solid #3f3f46' : 'none'} ;
  
  svg {
    color : #d923ff;
  }
`;

const BranchDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: #d923ff;
  border-radius: 9999px;
`;


const TimeTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a1a1aa;
  font-size: 0.875rem;
`;


const ExpandSection = styled.div`
  position: relative;
  padding: 0.5rem;
  cursor: pointer;
 
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(39, 39, 42);

  ${ExpandSection}:hover &  {
    background-color: rgba(138, 92, 246, 0.243);
  }
`;

const ExpandButton = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.5rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #18181b;
  border: 1px solid rgb(39, 39, 42);
  transition: border-color 0.2s;
  color : #6b7280;
  ${ExpandSection}:hover & {
    border-color: #8b5cf6;
    background-color: #1b1127;

    svg {
      color: #8b5cf6;
    }
  }
`;


const CardTimelineSection = styled.div`
  transition: all 0.2s ease;
  width : 100%;
  display : flex;
  justify-content: space-between;
  flex : ${props => props.isExpanded ? '0.2' : '0.8'};
  flex-direction :  ${props => props.isExpanded ? 'row' : 'column'};
  /* flex : 0.3; */
  padding : 1rem 1.5rem;
`


const CardTimelineItem = styled.div`
  transition : padding 0.2s ease;
  width : ${props => props.isExpanded ? '33%' : '100%'};
  flex : ${props => props.isExpanded ? '0.32' : '0.3'};
  border-radius : 0.5rem;
  gap : ${props => props.isExpanded ? 'null' : '0.5rem'} ;
  word-break : keep-all;
  padding : ${props => props.isExpanded ? '0.5rem 0.1rem' : '0.75rem'} ;
  background-color: ${props => props.isExpanded ? 'null' : 'rgba(30, 32, 38, 0.95)'}  ;
  border: ${props => props.isExpanded ? '1px solid rgba(63, 63, 70, 0.5)' : '1px solid rgba(30, 32, 38, 0.95)'} ;
  display : flex;
  flex-direction : ${props => props.isExpanded ? 'row' : 'row'};
  align-items: center;
  justify-content:${props => props.isExpanded ? 'space-evenly' : 'space-between'} ;
  /* background-color : #27272a; */
`

const TimelineItemInfo = styled.div`
 display: flex;
  align-items: center;
  gap: 0.75rem;
`

const TimeLineItemTitle = styled.div`
  display :  ${props => props.isExpanded ? 'none' : 'flex'};
font-weight: 500;
color: #d1d5db;
`
const TimeLineStatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${props => props.isExpanded ? '0.25rem 0.5rem' : '0.25rem 0.75rem'} ;
  border-radius: 0.5rem;
  border : 1px solid ${props => props.bdColor};
  background-color: ${props => props.bgColor};

`;

const StatusIconWrapper = styled.div`
  display: inline-flex;
  ${props => props.isSpinning && css`
    animation: ${spin} 1s linear infinite;
  `}
  will-change: transform;
`;

const TimeLineStatusText = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${props => props.color};
`;

const EmptySlot = styled.div`
  border: 2px dashed #27272a;
  border-radius: 0.5rem;
  height: 21rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);

  }
`;

const EmptySlotIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border: 2px dashed #27272a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #71717a;

  ${EmptySlot}:hover & {
    background: rgba(139, 92, 246, 0.1);
    color: #8b5cf6;
    border : 2px solid rgba(138, 92, 246, 0.05);
  }
`;

const EmptySlotText = styled.p`
  color: #71717a;
  font-size: 0.875rem;
  font-weight: 500;
  ${EmptySlot}:hover & {
    color: #ffffff;
  }
`;

const SlotCounter = styled.p`
  color: #52525b;
  font-size: 0.75rem;
  ${EmptySlot}:hover & {
    color: #71717a;
  }
`;


const StatusCompletedContainer = styled.div`
  width: 100%;
  height: auto;
`


const StatusCompletedBadge = styled.div`
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background:rgba(139, 92, 246, 0.1);
  color: #8b5cf6;

  display: flex;
  width : 100%;
  height : 100%;
  align-items: center;
  justify-content: center;
  gap : 0.25rem
`;


const StatusCompletedText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 100%;
  margin-top: .2rem;
`


const ProjectBoard = ({
  // dataSource = [],
  onCardClick,
  handleDeleteClick,
  selectedCard,
  onAddClick,
  MAX_PROJECTS
}) => {

  const dataSource = [
    {
      Action: "delete",
      Branch: "main",
      Repository: "spring-boot_test",
      Status: "Code Imported",
      key: "0",
      projectsStatus: [
        {
          id: 1,
          title: "readme",
          name: "README 만들기",
          status: "waiting",
        },
        {
          id: 2,
          title: "chatting",
          name: "Chatting 만들기",
          status: "in-progress",
        },
        {
          id: 3,
          title: "docs",
          name: "Docs 만들기",
          status: "completed",
        }
      ],
      completed: false
    },
    {
      Action: "delete",
      Branch: "main",
      Repository: "moheng",
      Status: "Code Imported",
      key: "1",
      projectsStatus: [
        {
          id: 1,
          title: "readme",
          name: "README 만들기",
          status: "completed",
        },
        {
          id: 2,
          title: "chatting",
          name: "Chatting 만들기",
          status: "completed",
        },
        {
          id: 3,
          title: "docs",
          name: "Docs 만들기",
          status: "completed",
        }
      ],
      completed: true
    },
  ]

  const emptySlots = Math.max(0, MAX_PROJECTS - dataSource.length);
  const [expandedStates, setExpandedStates] = useState({
    0: dataSource[0]?.completed,
    1: dataSource[1]?.completed,
    2: dataSource[2]?.completed,
  });

  useEffect(() => {
    console.log(expandedStates)
  }, [expandedStates]);

  // handleToggleExpand 함수 수정
  const handleToggleExpand = (e, index) => {
    e.stopPropagation();
    setExpandedStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const projectsStatus = [
    {
      id: 1,
      title: "readme",
      name: "README 만들기",
      status: "waiting",
      icon: FileText
    },
    {
      id: 2,
      title: "chatting",
      name: "Chatting 만들기",
      status: "in-progress",
      icon: MessageCircle
    },
    {
      id: 3,
      title: "docs",
      name: "Docs 만들기",
      status: "completed",
      icon: Book
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'readme':
        return FileText;
      case 'chatting':
        return MessageCircle;
      case 'docs':
        return Book;
      default:
        return FileText; // 기본값 설정
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





  return (
    <>
      <BoardWrapper>
        {
          dataSource.map((project, index) => {
            return (
              <ProjectCardWrapper>
                <ProjectCard
                  key={project.key}
                  onClick={() => onCardClick?.(project)}
                  isSelected={selectedCard === project.key}
                >
                  <CloseButton onClick={(e) => handleDeleteClick(e, project)}>
                    <X />
                  </CloseButton>
                  <CardContent isExpanded={expandedStates[index]}>
                    <CardHeader isExpanded={expandedStates[index]}>
                      <ProjectIcon isExpanded={expandedStates[index]}>
                        {project.Repository.charAt(0)}
                      </ProjectIcon>
                      <CardTitle >{project.Repository}</CardTitle>
                    </CardHeader>
                    <CardBody isExpanded={expandedStates[index]}>
                      <BranchContainer>
                        <BranchTag isExpanded={expandedStates[index]}>
                          {
                            expandedStates[index] ?
                              <GitBranch size={'.9rem'} />
                              :
                              <BranchDot />
                          }

                          {project.Branch}
                        </BranchTag>
                      </BranchContainer>

                      <TimeTag>
                        <CalendarIcon size={'1rem'} />
                        <span>Dec 2024</span>
                      </TimeTag>

                    </CardBody>
                  </CardContent>
                  <ExpandSection onClick={(e) => handleToggleExpand(e, index)}>
                    <Divider />
                    <ExpandButton>
                      {expandedStates[index] ? (
                        <ChevronUp size={'1rem'} />
                      ) : (
                        <ChevronDown size={'1rem'} />
                      )}
                    </ExpandButton>
                  </ExpandSection>
                  {

                  }


                  <CardTimelineSection isExpanded={expandedStates[index]}>
                    {
                      project.completed && expandedStates[index] ?
                        <StatusCompletedContainer>
                          <StatusCompletedBadge >
                            <CheckCircle2 size={'1rem'} />
                            <StatusCompletedText>
                              Dododocs complete !
                            </StatusCompletedText>
                          </StatusCompletedBadge>
                        </StatusCompletedContainer>
                        :

                        project.projectsStatus.map((statusLists) => {
                          const status = getStatusDisplay(statusLists.status);
                          const TimeLineIcon = getStatusIcon(statusLists.title);
                          const StatusIcon = status.icon;
                          return (

                            <CardTimelineItem key={statusLists.id} isExpanded={expandedStates[index]}>
                              <TimelineItemInfo isExpanded={expandedStates[index]} >
                                <TimeLineIcon size={'1.2rem'} color="#9ca3af" />
                                <TimeLineItemTitle isExpanded={expandedStates[index]} >{statusLists.name}</TimeLineItemTitle>
                              </TimelineItemInfo>
                              <TimeLineStatusBadge isExpanded={expandedStates[index]} bgColor={status.bgColor} bdColor={status.bdColor}>
                                <StatusIconWrapper isSpinning={statusLists.status === 'in-progress'}>
                                  <StatusIcon
                                    size={'1rem'}
                                    color={status.color}
                                  />
                                </StatusIconWrapper>
                                <TimeLineStatusText color={status.color}>{status.text}</TimeLineStatusText>
                              </TimeLineStatusBadge>
                            </CardTimelineItem>
                          )

                        })
                    }
                  </CardTimelineSection>
                </ProjectCard>
              </ProjectCardWrapper>
            )

          })
        }
        <ProjectCardWrapper>
          {
            emptySlots > 0 && Array(emptySlots)
              .fill(null)
              .map((_, index) => (
                <EmptySlot
                  key={`empty-${index}`}
                  onClick={() => {
                    if (dataSource.length < MAX_PROJECTS) {
                      onAddClick?.();
                    }
                  }}
                >
                  <EmptySlotIcon>
                    <Plus size={24} />
                  </EmptySlotIcon>
                  <EmptySlotText>Add New Project</EmptySlotText>
                  <SlotCounter>
                    {dataSource.length + 1} of {MAX_PROJECTS} Projects
                  </SlotCounter>
                </EmptySlot>
              ))
          }
        </ProjectCardWrapper>

      </BoardWrapper >

    </>
  );
};

export default ProjectBoard;
