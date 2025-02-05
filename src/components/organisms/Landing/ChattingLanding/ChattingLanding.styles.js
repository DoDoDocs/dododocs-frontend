// ChattingLanding.styles.js
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

export const PageWrapper = styled.div`
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(162, 92, 255, 0.1),
      transparent,
      transparent
    );
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  /* margin-top: 11.5dvh; */
  background-color: #0f0a1f;
  color: white;

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

export const HeroSection = styled.div`
  position: relative;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 1rem;
`;

export const HeroGrid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(to right, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  color: transparent;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s;

  ${(props) =>
    props.primary &&
    `
    background: #9333ea;
    color: white;
    &:hover {
      background: #7e22ce;
    }
  `}

  ${(props) =>
    props.secondary &&
    `
    border: 1px solid rgba(147, 51, 234, 0.2);
    color: white;
    &:hover {
      background: rgba(147, 51, 234, 0.2);
    }
  `}
`;

export const Section = styled.section`
  padding: 5rem 1rem;
  ${(props) =>
    props.darker &&
    `
    background: rgba(22, 17, 46, 0.5);
  `}
`;

export const FeatureWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #16112e;
  border: 1px solid rgba(147, 51, 234, 0.2);
`;

export const FeatureIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background: rgba(147, 51, 234, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e9d5ff;
`;

export const FeatureContent = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: white;
  }

  p {
    color: #e9d5ff;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StepsGrid = styled.div`
  display: grid;
  gap: 2rem;
  margin-top: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StepCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: #16112e;
  border-radius: 0.75rem;
  border: 1px solid rgba(147, 51, 234, 0.2);
`;

export const StepIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(147, 51, 234, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #e9d5ff;
`;

export const CTASection = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  text-align: center;
`;

export const Badge = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  background: rgba(147, 51, 234, 0.2);
  color: #9333ea;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
`;
