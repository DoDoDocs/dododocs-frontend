import React, { useState, useEffect } from 'react';
import {
  CalendarIcon, X, GitBranch, Plus, ChevronUp, ChevronDown,
  FileText, MessageCircle, Book,
  Clock, Loader2, CheckCircle2
} from 'lucide-react';
import {
  BoardWrapper,
  ProjectCardWrapper, ProjectCard, CloseButton, CardContent, CardHeader, ProjectIcon, CardTitle, CardBody,
  BranchContainer, BranchTag, TimeTag, Divider, ExpandSection, ExpandButton,
  CardTimelineSection, CardTimelineItem, BranchDot, StatusCompletedContainer, StatusCompletedBadge,
  StatusCompletedText, TimelineItemInfo, TimeLineItemTitle, TimeLineStatusBadge,
  StatusIconWrapper, TimeLineStatusText, EmptySlot, EmptySlotIcon, EmptySlotText, SlotCounter
} from "./RepoBoard.styles.js"

import styled from 'styled-components';



const ProjectBoard = ({
  dataSource = [],
  onCardClick,
  handleDeleteClick,
  selectedCard,
  onAddClick,
  MAX_PROJECTS
}) => {
  console.log("🕹️🖲️🖲️🕹️🕹️", dataSource)
  // Transform the incoming data to match the component's expected structure
  const transformedData = dataSource.map(item => ({
    Action: "delete",
    Branch: item.branchName,
    Repository: item.repositoryName,
    Status: "Code Imported",
    registeredRepoId: item.registeredRepoId,
    projectsStatus: [
      {
        id: 1,
        title: "readme",
        name: "README 만들기",
        status: item.readmeComplete ? "completed" : "waiting",
      },

      {
        id: 2,
        title: "docs",
        name: "Docs 만들기",
        status: item.docsComplete ? "completed" :
          (item.readmeComplete ? "in-progress" : "waiting"),
      },
      {
        id: 3,
        title: "chatting",
        name: "Chatting 만들기",
        status: item.chatbotComplete ? "completed" :
          (item.docsComplete ? "in-progress" : "waiting"),
      },
    ],
    completed: item.readmeComplete && item.chatbotComplete && item.docsComplete,
    createdAt: item.createdAt
  }));

  const emptySlots = Math.max(0, MAX_PROJECTS - transformedData.length);
  const [expandedStates, setExpandedStates] = useState(
    transformedData?.reduce((acc, item) => ({
      ...acc,
      [item.registeredRepoId]: item.completed
    })
      , {})
  );

  const areAllProjectsCompleted = () => {
    return transformedData.every(project => project.completed);
  };

  useEffect(() => {
    console.log(expandedStates);
  }, [expandedStates]);

  const handleToggleExpand = (e, index) => {
    e.stopPropagation();
    setExpandedStates(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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

  return (
    <BoardWrapper>
      {transformedData.map((project, index) => (
        <ProjectCardWrapper key={project.registeredRepoId}
          onClick={() => onCardClick(project.registeredRepoId)}
        >
          <ProjectCard>
            {/* // isSelected={selectedCard === project.registeredRepoId} */}
            {/* > */}
            <CloseButton onClick={(e) => handleDeleteClick(e, dataSource.find(
              (repo) => repo.registeredRepoId === project.registeredRepoId,
            ))}>
              <X />
            </CloseButton>
            <CardContent isExpanded={expandedStates[project.registeredRepoId]}>
              <CardHeader isExpanded={expandedStates[project.registeredRepoId]}>
                <ProjectIcon isExpanded={expandedStates[project.registeredRepoId]}>
                  {project.Repository.charAt(0)}
                </ProjectIcon>
                <CardTitle>{project.Repository}</CardTitle>
              </CardHeader>
              <CardBody isExpanded={expandedStates[project.registeredRepoId]}>
                <BranchContainer>
                  <BranchTag isExpanded={expandedStates[project.registeredRepoId]}>
                    {expandedStates[project.registeredRepoId] ?
                      <GitBranch size={'.9rem'} />
                      :
                      <BranchDot />
                    }
                    {project.Branch}
                  </BranchTag>
                </BranchContainer>
                <TimeTag>
                  <CalendarIcon size={'1rem'} />
                  <span>{formatDate(project.createdAt)}</span>
                </TimeTag>
              </CardBody>
            </CardContent>
            <ExpandSection onClick={(e) => handleToggleExpand(e, project.registeredRepoId)}>
              <Divider />
              <ExpandButton>
                {expandedStates[project.registeredRepoId] ? (
                  <ChevronUp size={'1rem'} />
                ) : (
                  <ChevronDown size={'1rem'} />
                )}
              </ExpandButton>
            </ExpandSection>
            <CardTimelineSection isExpanded={expandedStates[project.registeredRepoId]}>
              {project.completed && expandedStates[project.registeredRepoId] ? (
                <StatusCompletedContainer>
                  <StatusCompletedBadge>
                    <CheckCircle2 size={'1rem'} />
                    <StatusCompletedText>
                      Dododocs complete !
                    </StatusCompletedText>
                  </StatusCompletedBadge>
                </StatusCompletedContainer>
              ) : (
                project.projectsStatus.map((statusList) => {
                  const status = getStatusDisplay(statusList.status);
                  const TimeLineIcon = getStatusIcon(statusList.title);
                  const StatusIcon = status.icon;
                  return (
                    <CardTimelineItem
                      key={statusList.id}
                      isExpanded={expandedStates[project.registeredRepoId]}
                    >
                      <TimelineItemInfo isExpanded={expandedStates[project.registeredRepoId]}>
                        <TimeLineIcon size={'1.2rem'} color="#9ca3af" />
                        <TimeLineItemTitle isExpanded={expandedStates[project.registeredRepoId]}>
                          {statusList.name}
                        </TimeLineItemTitle>
                      </TimelineItemInfo>
                      <TimeLineStatusBadge
                        isExpanded={expandedStates[project.registeredRepoId]}
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
      ))}

      {emptySlots > 0 && Array(emptySlots)
        .fill(null)
        .map((_, index) => (
          <ProjectCardWrapper empty={true} key={`empty-${index}`}>
            <EmptySlot
              key={`empty-${index}`}
              onClick={() => {
                if (transformedData.length < MAX_PROJECTS) {
                  onAddClick?.();
                }
              }}
            >
              <EmptySlotIcon>
                <Plus size={24} />
              </EmptySlotIcon>
              <EmptySlotText>Add New Project</EmptySlotText>
              <SlotCounter>
                {transformedData.length + 1} of {MAX_PROJECTS} Projects
              </SlotCounter>
            </EmptySlot>
          </ProjectCardWrapper>

        ))}
    </BoardWrapper>
  );
};

export default ProjectBoard;