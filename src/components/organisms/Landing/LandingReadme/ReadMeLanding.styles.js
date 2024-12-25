import styled, { keyframes } from 'styled-components';
import { ArrowRight } from 'lucide-react';
export const fadeIn = keyframes`
  from {
    opacity: 0.5;
    transform: translateY(10px); /* 아래에서 올라오는 효과 추가 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const Container = styled.div`
  min-height: 100vh;
  background: #18181b;
  color: #e4e4e7;

  animation: ${fadeIn} 0.5s ease-out; /* 애니메이션 추가 */
`;
export const HeroSection = styled.div`
  padding-top: 11.5dvh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(147, 51, 234, 0.1),
      rgba(236, 72, 153, 0.1)
    );
    pointer-events: none;
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 60%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;
export const HeroGrid = styled.div`
  display: grid;
  gap: 5rem;
  align-items: center;

  padding: clamp(5vh, 6vh, 8vh) clamp(4vw, 6vw, 8vw);

  background: ${(props) => props.bg || 'transparent'};

  @media (min-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  @media (max-width: 768px) {
    padding: clamp(3vh, 4vh, 6vh) clamp(2vw, 3vw, 4vw);
  }
`;

export const HeroTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const HeroImage = styled.div`
  display: flex;
  justify-content: center;
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

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 24px;
  span {
    background: linear-gradient(to right, #9333ea, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 1300px) {
    br {
      display: none; // br 태그 숨김
    }
  }
`;

export const Description = styled.p`
  font-size: 1.25rem;
  color: #a1a1aa;
  margin-bottom: 32px;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: rgb(63 63 70) 1px solid;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s;
  ${(props) =>
    props.primary
      ? `background: #9333ea; color: white;`
      : `border:  rgb(63 63 70) 1px solid;`}

  &:hover {
    ${(props) => (props.primary ? `background: #7e22ce;` : `background: #27272a;`)}
  }
`;

export const FeatureWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr)); /* 최소 250px, 최대 동일 비율 */
  gap: 24px;
  align-items: stretch; /* 카드 높이를 균일하게 맞춤 */
`;

export const FeatureCard = styled.div`
  padding: 2rem;
  border-radius: 12px;
  background-color: rgba(39, 39, 42, 0.5);
  border: 1px solid rgb(63 63 70);
  display: flex;
  align-items: flex-start; /* 아이콘과 내용 상단 정렬 */
  gap: 16px;
  flex-grow: 1; /* 카드가 동일한 높이로 늘어남 */
`;

export const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #9333ea33;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #9333ea;
  flex-shrink: 0; /* 아이콘 크기가 줄어들지 않도록 고정 */
`;

export const FeatureContent = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 8px;
  }

  p {
    color: #a1a1aa;
    /* color : rgb(233 213 255); */
  }
`;

export const Badge = styled.span`
  background: ${(props) => props.bg || `rgba(168, 85, 247, .2)`};
  color: ${(props) => props.color || `rgb(216, 180, 254)`};
  border-radius: 0.5rem;

  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.25rem 1rem;
  background: rgba(147, 51, 234, 0.2);
  color: #c084fc;
  font-size: 0.875rem;
`;
export const TimelineContainer = styled.div`
  position: relative;
`;

export const ConnectionLine = styled.div`
  position: absolute;
  left: 3rem;
  top: -1.5rem;
  bottom: -0rem;
  width: 2px;
  border-radius: 1rem;
  background: linear-gradient(
    to bottom,
    rgba(147, 51, 234, 0.5),
    rgba(59, 130, 246, 0.5),
    rgba(16, 185, 129, 0.5)
  );
`;

export const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

export const StepItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  &:hover {
    ${(props) => props.hoverEffects}
  }
`;

export const NumberBox = styled.div`
  position: relative;
  z-index: 10;
`;

export const GradientBorder = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 1rem;
  background: linear-gradient(to bottom right, ${(props) => props.gradient});
  padding: 1px;
`;

export const NumberContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: rgb(24, 24, 27);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StepLabel = styled.span`
  font-size: 0.875rem;
  color: rgb(113, 113, 122);
  font-family: monospace;
`;

export const StepNumber = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #a855f7, #9333ea);
  -webkit-background-clip: text;
  color: transparent;
`;

export const IconBox = styled.div`
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: rgb(24, 24, 27);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(168, 85, 247);
`;

export const ContentBox = styled.div`
  flex: 1;
  padding-top: 1rem;
`;

export const ContentCard = styled.div`
  background: rgba(39, 39, 42, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(147, 51, 234, 0.1);
  transition: all 0.3s;

  &:hover {
    border-color: rgba(147, 51, 234, 0.2);
  }
`;

export const ContentTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(168, 85, 247);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: rgb(168, 85, 247);
  }
`;

export const ContentDescription = styled.p`
  color: rgb(161, 161, 170);
`;

export const ArrowIcon = styled(ArrowRight)`
  margin-left: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;

  ${ContentCard}:hover & {
    opacity: 0;
  }
`;
