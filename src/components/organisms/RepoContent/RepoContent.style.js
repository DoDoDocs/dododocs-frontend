import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const BgShape = styled.div`
  position: static !important;
`;

export const ContentStyle = styled.div`
  height: auto;
  margin-top: 11.5dvh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: clamp(5vh, 6vh, 8vh) clamp(4vw, 6vw, 8vw);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: clamp(3vh, 4vh, 6vh) clamp(2vw, 3vw, 4vw);
  }
`;

export const RepoBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(100% - 2rem, clamp(33.75rem, 85vw, 82.5rem));
  border-radius: 1rem;
  row-gap: 2.5rem;
  position: relative;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.5rem;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  border: 1px solid rgba(63, 63, 70, 0.7);
  border-radius: 1rem;
  padding: 1.5rem 0;
  background-color: rgba(22, 24, 30, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: backwards;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 1rem 1.5rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SearchTextWrapper = styled.div`
  width: auto;
  padding: 0.75rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const SearchInput = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    background-color: rgba(30, 32, 38, 0.95);
    border: 1px solid rgba(63, 63, 70, 0.5);
    border-radius: 0.5rem;
    color: #ffffff;
    font-size: 0.95rem;
    transition: all 0.2s ease;

    &:focus {
      border-color: #8b5cf6;
      box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
      outline: none;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    color: rgba(255, 255, 255, 0.4);
    pointer-events: none;
  }
`;

export const Divider = styled.div`
  border-top: 1px solid rgba(63, 63, 70, 0.4);
  margin: 0.5rem 0;
  width: 100%;
`;

export const PaginationWrapper = styled.div`
  padding: 0.5rem 0 0 0;
`;

export const DeleteBtn = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1;
    height: 1.3rem;
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: rgba(220, 38, 38, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
