// src/components/atoms/RotateTypo/RotateTypo.styles.js
import styled, { keyframes } from 'styled-components';

const rotateIn = keyframes`
  0% {
    transform: rotateX(180deg);
    opacity: 0;
  }
  35% {
    transform: rotateX(120deg);
    opacity: 0;
  }
  65% {
    opacity: 0;
  }
  to {
    transform: rotateX(360deg);
    opacity: 1;
  }
`;

const rotateOut = keyframes`
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  35% {
    transform: rotateX(-40deg);
    opacity: 1;
  }
  65% {
    opacity: 0;
  }
  to {
    transform: rotateX(180deg);
    opacity: 0;
  }
`;

export const RotateWrapper = styled.span`
  position: relative;
  width: 100%;
  height: clamp(2.56rem, 3.5vw + 1.8rem, 4.69rem);
  perspective: 1000px;
  z-index: 3;
  font-size: ${({ theme }) => theme.layout.home.mainTextSize};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
`;

export const RotateWords = styled.span`
  background: ${({ theme }) => theme.gradients.values.primary};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block; // Changed to inline-block for text gradient
  width: fit-content; // Ensure width matches content
  position: absolute;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  opacity: 1;
  transform: rotateX(180deg);
  transform-origin: 50% 100%;

  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: ${(props) => (props.$isVisible ? 'rotateX(0deg)' : 'rotateX(180deg)')};
  animation: ${(props) => (props.$isVisible ? rotateIn : rotateOut)} 1.5s;
  display: ${(props) => (props.$isPrevVisible || props.$isVisible ? 'flex' : `none`)};
  line-height: 1.2; // 라인 높이 조정
`;
