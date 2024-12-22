// ReadmeLanding.styles.js
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
  padding-top: 11.5dvh;
  position: relative; /* ::before 사용을 위해 필요 */
  /* animation: ${fadeIn} 0.5s ease-out; */

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(147, 51, 234, 0.2),
      transparent,
      transparent
    );

    /* background: linear-gradient(
      to right,
      rgba(147, 51, 234, 0.102),
      rgba(236, 72, 153, 0.102)
    ); */
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  /* margin-top: 11.5dvh; */
  background-color: #0e0c15;
  color: white;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  /* padding: clamp(5vh, 6vh, 8vh) clamp(4vw, 6vw, 8vw); */
  padding: clamp(5vh, 6vh, 8vh) 0;

  /* animation: ${fadeIn} 0.5s ease-out; */

  @media (max-width: 768px) {
    /* padding: clamp(3vh, 4vh, 6vh) clamp(2vw, 3vw, 4vw); */
    padding: clamp(3vh, 4vh, 6vh) 0;
  }
  /* &::before {
    opacity: 0.1;
    background-color: #000;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
  } */
`;

export const HeroSection = styled.div`
  position: relative;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem clamp(4vw, 6vw, 8vw);
`;

export const HeroGrid = styled.div`
  display: grid;
  gap: 3rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 24px;
  span {
    background: linear-gradient(to right, #9333ea, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(to right, #a78bfa, #f472b6);
  -webkit-background-clip: text;
  color: transparent;
`;

export const Description = styled.p`
  font-size: 1.25rem;
  color: #a1a1aa;
  margin-bottom: 32px;
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
  padding: clamp(5vh, 6vh, 8vh) clamp(4vw, 6vw, 8vw);

  background: ${(props) => props.bg || 'transparent'};

  @media (max-width: 768px) {
    padding: clamp(3vh, 4vh, 6vh) clamp(2vw, 3vw, 4vw);
  }

  ${(props) =>
    props.feature &&
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

export const FeatureCard = styled.div`
  padding: 3rem 2rem;
  border-radius: 12px;
  /* background: #27272a; */
  background-color: rgba(39, 39, 42, 0.5);
  border: 1px solid rgb(63 63 70);
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const FeatureWrapper = styled.div`
  /* display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #16112e;
  border: 1px solid rgba(147, 51, 234, 0.2); */

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
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
    color: #e9d5ff;
  }

  p {
    color: white;
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
  font-size: 0.8rem;
  /* background: rgba(147, 51, 234, 0.2); */
  background: rgba(168, 85, 247, 0.2);
  color: rgb(216, 180, 254);
  padding: 0.4rem 1.5rem;
  border-radius: 0.5rem;
`;
