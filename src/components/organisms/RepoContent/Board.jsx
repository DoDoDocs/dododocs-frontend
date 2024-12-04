import React from 'react';
import styled from 'styled-components';
import { CalendarIcon, X, GitBranch, Plus } from 'lucide-react';

// Styled Components
const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProjectCard = styled.div`
  background: #18181b;
  border: 1px solid ${props => props.isSelected ? '#8b5cf6' : '#27272a'};
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #3f3f46;
    box-shadow: 0 0 0 2px #8b5cf6;
  }

  ${props => props.isSelected && `
    box-shadow: 0 0 0 2px #8b5cf6;
  `}
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: #27272a;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #ffffff;
`;

const CloseButton = styled.div`
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

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case 'In Progress':
        return 'rgba(59, 130, 246, 0.1)';
      case 'Completed':
        return 'rgba(34, 197, 94, 0.1)';
      case 'Upcoming':
        return 'rgba(161, 161, 170, 0.1)';
      default:
        return 'rgba(139, 92, 246, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'In Progress':
        return '#3b82f6';
      case 'Completed':
        return '#22c55e';
      case 'Upcoming':
        return '#a1a1aa';
      default:
        return '#8b5cf6';
    }
  }};
`;

const ProjectInfo = styled.div`
  margin-bottom: 1.5rem;
`;

const ProjectTitle = styled.h3`
  color: #fafafa;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;



const Timeline = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a1a1aa;
  font-size: 0.875rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 0.35rem;
  background: #27272a;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #8b5cf6;
  border-radius: 0.5rem;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const ProgressSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #27272a;
`;

const StatusContainer = styled.div`
  width: 100%;
  height: auto;
`

const BranchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.75rem 0;
`;

const BranchTag = styled.div`
  background: #2a2a3c;
  /* color: #a78bfa; */
  color : #e980ff;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #3f3f46;
  
  svg {
    /* color: #8b5cf6; */
    color : #d923ff;
  }
`;

const EmptySlot = styled.div`
  border: 2px dashed #27272a;
  border-radius: 0.5rem;
  height: 320px;
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

const ProjectBoard = ({
  dataSource = [],
  onCardClick,
  handleDeleteClick,
  selectedCard,
  onAddClick,
  MAX_PROJECTS
}) => {
  const emptySlots = Math.max(0, MAX_PROJECTS - dataSource.length);

  return (
    <BoardGrid>
      {dataSource.map((project) => (
        <ProjectCard
          key={project.key}
          onClick={() => onCardClick?.(project)}
          isSelected={selectedCard === project.key}
        >
          <CardContent>
            <HeaderSection>
              <ProjectIcon>
                {project.Repository.charAt(0)}
              </ProjectIcon>
              <CloseButton onClick={(e) => handleDeleteClick(e, project)}>
                <X />
              </CloseButton>
            </HeaderSection>

            <ProjectInfo>
              <ProjectTitle>{project.Repository}</ProjectTitle>
              <BranchContainer>
                <BranchTag>
                  <GitBranch size={14} />
                  {project.Branch}
                </BranchTag>
              </BranchContainer>
            </ProjectInfo>

            <Timeline>
              <CalendarIcon size={16} />
              <span>Dec 2024</span>
            </Timeline>
          </CardContent>

          <ProgressSection>
            <ProgressBarContainer>
              <ProgressBar progress={60} />
            </ProgressBarContainer>
            <StatusContainer>
              <StatusBadge status={project.Status}>
                {project.Status}
              </StatusBadge>
            </StatusContainer>
          </ProgressSection>
        </ProjectCard>
      ))}

      {/* Empty Slots */}
      {emptySlots > 0 && Array(emptySlots)
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
        ))}
    </BoardGrid>
  );
};

export default ProjectBoard;