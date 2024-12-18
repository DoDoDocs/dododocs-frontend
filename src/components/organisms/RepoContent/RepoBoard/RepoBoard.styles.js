import styled, { keyframes, css } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const BoardWrapper = styled.div`
  border-bottom: 1px solid rgba(63, 63, 70, 0.4);
  border-top: 1px solid rgba(63, 63, 70, 0.4);
  gap: 1.5rem;
  justify-content: space-between;
  width: 100%;
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
`;
export const ProjectCardWrapper = styled.div`
  /* width : 100%; */
  flex: 1;
  overflow: hidden;

  transition: all 0.2s ease;
  @media (min-width: 768px) {
    &:nth-child(3) {
      grid-column: 1 / -1;
    }
  }
  @media (min-width: 1024px) {
    &:nth-child(3) {
      grid-column: auto;
    }
  }
`;

export const ProjectCard = styled.div`
  flex-direction: column;
  display: flex;
  height: 21rem;
  background: #18181b;
  border: 1px solid rgb(39, 39, 42);
  transition: all 0.2s ease;
  width: 100%;
  border-radius: 0.5rem;
  position: relative;

  overflow: hidden;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  display: flex;
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
`;

export const CardContent = styled.div`
  transition: all 0.2s ease;
  flex: ${(props) => (props.isExpanded ? '0.8' : '0.2')};
  padding: 1rem 1.5rem;

  display: flex;
  gap: ${(props) => (props.isExpanded ? '0.75rem' : '0.4rem')};
  flex-direction: column;
`;
export const CardHeader = styled.div`
  transition: all 0.2s ease;
  align-items: ${(props) => (props.isExpanded ? 'flex-start' : 'center')};
  display: flex;
  gap: ${(props) => (props.isExpanded ? '1rem' : '.5rem')};
  flex-direction: ${(props) => (props.isExpanded ? 'column' : 'row')};
`;
export const ProjectIcon = styled.div`
  transition: all 0.2s ease;

  width: ${(props) => (props.isExpanded ? '3rem' : '2.3rem')};
  height: ${(props) => (props.isExpanded ? '3rem' : '2.3rem')};
  background: #27272a;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.isExpanded ? '1.5rem' : '1.2rem')};
  color: #ffffff;
`;

export const CardTitle = styled.div`
  color: #fafafa;
  font-size: 1.125rem;
  font-weight: 600;
`;

export const CardBody = styled.div`
  transition: all 0.2s ease;
  align-items: ${(props) => (props.isExpanded ? 'flex-start' : 'center')};
  display: flex;
  gap: ${(props) => (props.isExpanded ? '1.5rem' : '.5rem')};
  flex-direction: ${(props) => (props.isExpanded ? 'column' : 'row')};
`;

export const BranchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const BranchTag = styled.div`
  transition: all 0.2s ease;
  background: #2a2a3c;
  color: #e980ff;
  font-weight: ${(props) => (props.isExpanded ? '500' : 'normal')};
  padding: ${(props) => (props.isExpanded ? '0.375rem 0.75rem' : '0.2rem 0.75rem')};
  border-radius: 0.375rem;
  font-size: ${(props) => (props.isExpanded ? '.875rem' : '0.875rem')};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: ${(props) => (props.isExpanded ? '1px solid #3f3f46' : 'none')};

  svg {
    color: #d923ff;
  }
`;

export const BranchDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: #d923ff;
  border-radius: 9999px;
`;

export const TimeTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a1a1aa;
  font-size: 0.875rem;
`;

export const ExpandSection = styled.div`
  position: relative;
  padding: 0.5rem;
  cursor: pointer;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(39, 39, 42);

  ${ExpandSection}:hover & {
    background-color: rgba(138, 92, 246, 0.243);
  }
`;

export const ExpandButton = styled.div`
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
  color: #6b7280;
  ${ExpandSection}:hover & {
    border-color: #8b5cf6;
    background-color: #1b1127;

    svg {
      color: #8b5cf6;
    }
  }
`;

export const CardTimelineSection = styled.div`
  transition: all 0.2s ease;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex: ${(props) => (props.isExpanded ? '0.2' : '0.8')};
  flex-direction: ${(props) => (props.isExpanded ? 'row' : 'column')};
  /* flex : 0.3; */
  padding: 1rem 1.5rem;
`;

export const CardTimelineItem = styled.div`
  transition: padding 0.2s ease;
  width: ${(props) => (props.isExpanded ? '33%' : '100%')};
  flex: ${(props) => (props.isExpanded ? '0.32' : '0.3')};
  border-radius: 0.5rem;
  gap: ${(props) => (props.isExpanded ? 'null' : '0.5rem')};
  word-break: keep-all;
  padding: ${(props) => (props.isExpanded ? '0.5rem 0.1rem' : '0.75rem')};
  background-color: ${(props) => (props.isExpanded ? 'null' : 'rgba(30, 32, 38, 0.95)')};
  border: ${(props) =>
    props.isExpanded
      ? '1px solid rgba(63, 63, 70, 0.5)'
      : '1px solid rgba(30, 32, 38, 0.95)'};
  display: flex;
  flex-direction: ${(props) => (props.isExpanded ? 'row' : 'row')};
  align-items: center;
  justify-content: ${(props) => (props.isExpanded ? 'space-evenly' : 'space-between')};
  /* background-color : #27272a; */
`;

export const TimelineItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const TimeLineItemTitle = styled.div`
  display: ${(props) => (props.isExpanded ? 'none' : 'flex')};
  font-weight: 500;
  color: #d1d5db;
`;
export const TimeLineStatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: ${(props) => (props.isExpanded ? '0.25rem 0.5rem' : '0.25rem 0.75rem')};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.bdColor};
  background-color: ${(props) => props.bgColor};
`;

export const StatusIconWrapper = styled.div`
  display: inline-flex;
  ${(props) =>
    props.isSpinning &&
    css`
      animation: ${spin} 1s linear infinite;
    `}
  will-change: transform;
`;

export const TimeLineStatusText = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${(props) => props.color};
`;

export const EmptySlot = styled.div`
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

export const EmptySlotIcon = styled.div`
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
    border: 2px solid rgba(138, 92, 246, 0.05);
  }
`;

export const EmptySlotText = styled.p`
  color: #71717a;
  font-size: 0.875rem;
  font-weight: 500;
  ${EmptySlot}:hover & {
    color: #ffffff;
  }
`;

export const SlotCounter = styled.p`
  color: #52525b;
  font-size: 0.75rem;
  ${EmptySlot}:hover & {
    color: #71717a;
  }
`;

export const StatusCompletedContainer = styled.div`
  width: 100%;
  height: auto;
`;

export const StatusCompletedText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 100%;
  margin-top: 0.2rem;
`;

export const StatusCompletedBadge = styled.div`
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;

  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;
