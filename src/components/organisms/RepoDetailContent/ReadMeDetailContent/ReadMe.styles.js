import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  background: #10121b66;
`;

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background: rgba(24, 24, 27, 0.5);
  padding: 1.5rem 0;
  /* overflow-y: auto; */
  height: 100%;
`;

export const Section = styled.div`
  margin-bottom: ${(props) => props.mb || 0}rem;
  flex: ${(props) => props.flex || 1};
  min-height: 0; // 중요: flex 자식 요소의 overflow 처리를 위해 필요
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SectionTitle = styled.h2`
  text-transform: uppercase;
  color: #71717a;
  font-size: 0.75rem;
  padding: 0 1.5rem;
  margin-bottom: 0.15rem;
`;

export const SectionContent = styled.div`
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
`;

export const DragHandle = styled.div`
  margin-right: 0.5rem;
  cursor: grab;
  opacity: ${(props) => (props.isCustomMode ? 0.7 : 0)};
  transition: opacity 0.2s;

  &:active {
    cursor: grabbing;
  }
`;

export const DropIndicator = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #9333ea;
  z-index: 10;
  ${(props) => (props.isTop ? 'top: -1px;' : 'bottom: -1px;')}

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

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-left: auto;
  background: ${(props) =>
    props.isIncluded ? 'rgba(147, 51, 234, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${(props) => (props.isIncluded ? '#9333ea' : '#71717a')};
  transition: all 0.2s;

  &:hover {
    background: ${(props) =>
      props.isIncluded ? 'rgba(147, 51, 234, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

export const NavItemContainer = styled.div`
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

export const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  cursor: ${(props) => (props.isCustomMode ? 'move' : 'pointer')};
  transition: all 0.2s;
  color: ${(props) => (props.active ? 'white' : '#a1a1aa')};
  background: ${(props) => (props.active ? 'rgba(147, 51, 234, 0.1)' : 'transparent')};
  position: relative;

  &:hover {
    background: ${(props) =>
      props.active ? 'rgba(147, 51, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
    color: white;
  }

  ${(props) =>
    props.active &&
    `
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

export const ExcludedSectionsContainer = styled.div`
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
`;

export const RestorableNavItem = styled(NavItemWrapper)`
  opacity: 0.6;
  background: transparent;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const IconWrapper = styled.div`
  margin-right: 0.75rem;
  opacity: 0.7;
`;

export const Badge = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  background: rgba(147, 51, 234, 0.2);
  color: #9333ea;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
`;

export const ActionBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding-top: 0.75rem;
`;

export const MainContent = styled.div`
  flex: 1;
  height: 100%;
  background: #10121b66;
  overflow-y: auto;

  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  will-change: transform; // 스크롤 성능 향상
  transform: translateZ(0); // GPU 가속
  -webkit-overflow-scrolling: touch; // iOS 스크롤 성능 향상
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

export const ErrorContainer = styled.div`
  height: 100%;
  background: rgba(45, 45, 58, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const ErrorLoadingCard = styled.div`
  background: rgba(39, 39, 42, 0.5);
  border: 1px solid rgba(63, 63, 70, 0.3);
  border-radius: 1rem;
  padding: 2.5rem;
  max-width: 32rem;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const ErrorIconWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(147, 51, 234, 0.2);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #e9d5ff;
  animation: ${pulse} 2s infinite;
`;

export const ErrorMessage = styled.p`
  color: #e9d5ff;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

export const ErrorSubMessage = styled.p`
  color: #a1a1aa;
  font-size: 1rem;
  line-height: 1.5;
`;
