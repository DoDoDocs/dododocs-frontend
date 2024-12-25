import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  Bot, Code, Zap, ArrowRight, Github, MessagesSquare, Sparkles,
  FileText, Settings, Upload

} from 'lucide-react';
import { Image, Typo } from '../../../index.js';
import mainBannerImg from "../../../../assets/images/landing-hero-min.png"
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0.5;
    transform: translateY(10px); /* 아래에서 올라오는 효과 추가 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const Container = styled.div`
  min-height: 100vh;
  background: #18181b;
  color: #e4e4e7;

  animation: ${fadeIn} 0.5s ease-out; /* 애니메이션 추가 */


`;
const HeroSection = styled.div`
    padding-top : 11.5dvh;
  position : relative;


  &::before {
    content: '';
    position: absolute;
    inset: 0;
    height: 100%;
    background: linear-gradient(to right, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1));
    pointer-events : none;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%);
  }
`
const HeroGrid = styled.div`
  display: grid;
  gap: 5rem;
  align-items: center;

  
  padding: clamp(5vh, 6vh, 8vh) clamp(4vw, 6vw, 8vw); 
 
 background: ${(props) => props.bg || 'transparent'};

 @media (min-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
    gap : 3rem;
  }
 @media (max-width: 768px) {
    padding: clamp(3vh, 4vh, 6vh) clamp(2vw, 3vw, 4vw);
  }
`;

const HeroTitle = styled.div`
display : flex;
flex-direction: column;
justify-content: flex-start;
`

const HeroImage = styled.div`
display : flex;
justify-content: center;
`

const Section = styled.section`
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

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const Title = styled.h1`
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

const Description = styled.p`
  font-size: 1.25rem;
  color: #a1a1aa;
  margin-bottom: 32px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border : rgb(63 63 70) 1px solid;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s;
  ${(props) => (props.primary ? `background: #9333ea; color: white;` : `border:  rgb(63 63 70) 1px solid;`)}

  &:hover {
    ${(props) => (props.primary ? `background: #7e22ce;` : `background: #27272a;`)}
  }
`;

const FeatureWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(0, 1fr)); /* 자동 행 크기 설정 */
    gap: 24px;
  align-items: stretch; /* 카드 높이를 균일하게 맞춤 */
`;

const FeatureCard = styled.div`
padding: 2rem;
  border-radius: 12px;
  background-color: rgba(39,39,42,.5);
  border: 1px solid rgb(63 63 70);
  display: flex;
  align-items: flex-start; /* 아이콘과 내용 상단 정렬 */
  gap: 16px;
  flex-grow: 1; /* 카드가 동일한 높이로 늘어남 */
`;

const FeatureIcon = styled.div`
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

const FeatureContent = styled.div`
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

const Badge = styled.span`
background:  ${props => (props.bg) || `rgba(168, 85, 247, .2)`} ;
color: ${props => (props.color) || `rgb(216, 180, 254)`} ;
border-radius: 0.5rem;

display: inline-block;
  margin-bottom: 1rem;
  padding: 0.25rem 1rem;
  background: rgba(147, 51, 234, 0.2);
  color: #c084fc;
  font-size: 0.875rem;
`;


const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  background: rgba(105, 14, 124, 0.05);
  border: 1px solid rgba(217, 35, 255, 0.1);
  padding: 1.5rem;
  border-radius: 1rem;
  bottom: 0;
  left: 50%;
  backdrop-filter: blur(10px);
  max-width: calc(100% - 36px - 36px - 24px);
  width: 60%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
`;

const WelcomeMessageTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const BotIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #d923ff, #a78bfa);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(217, 35, 255, 0.2);
`;

const MessageContent = styled.div`
  color: #e4e4e7;
  font-size: 0.95rem;
  line-height: 1.6;

  strong {
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    /* margin-bottom: 0.5rem; */
  }

  ul {
    margin-top: 0.75rem;
    padding-left: 3.5rem;
    li {
      margin: 0.5rem 0;
      padding-left: 1rem;
      position: relative;

      &:before {
        content: '•';
        color: #d923ff;
        position: absolute;
        left: 0;
      }
    }
  }
`;


const ContentCard = styled.div`
  background: rgba(39, 39, 42, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(147, 51, 234, 0.1);
  transition: all 0.3s;

  &:hover {
    border-color: rgba(147, 51, 234, 0.2);
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();



  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroGrid>
          <HeroTitle>
            <Header>

            </Header>
            <Title>
              AI-Powered Code <br></br> <span>Chat Bot</span>
            </Title>
            <Description>
              Dododocs의 지능형 채팅 어시스턴트와 함께 코드베이스를 즉시 이해하세요. <br></br>
              질문하고 설명을 받고 복잡한 코드를 쉽게 탐색하세요.
            </Description>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button primary onClick={() => navigate('/repositories')}>
                Try It Now <ArrowRight size={20} />
              </Button>
            </div>
          </HeroTitle>
          <HeroImage>
            <Image src={mainBannerImg} width={'60rem'} />
          </HeroImage>
        </HeroGrid>
      </HeroSection>

      {/* Features */}
      <Section feature={'true'}>
        <Header>
          <Badge bg='#9333ea33' color='#d1d5db'>feature</Badge>
        </Header>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>AI chatbot이 도와주는 코드 분석</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '48px', fontSize: "1.25rem" }}>
          복잡한 코드도 쉽게 이해할 수 있습니다.
          DODODOCS AI 챗봇이 코드의 모든 측면을 분석하고 명확한 설명을 제공합니다.
        </p>
        <FeatureWrapper>
          <FeatureCard>
            <FeatureIcon>
              <MessagesSquare size={24} />
            </FeatureIcon>
            <FeatureContent>
              <h3>Code Analysis</h3>
              <p>GitHub 저장소의 코드를 자동으로 분석하여 구조를 파악하고, 복잡한 로직도 쉽게 설명해드립니다.</p>
            </FeatureContent>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <Code size={24} />
            </FeatureIcon>
            <FeatureContent>
              <h3>Real-time Interaction</h3>
              <p>자연스러운 대화를 통해 코드에 대한 질문을 주고받으며, 즉각적이고 정확한 답변을 받아보세요.</p>
            </FeatureContent>
          </FeatureCard>

        </FeatureWrapper>
      </Section>

      <Section feature={'true'}>
        <Header>
          <Badge bg='#9333ea33' color='#d1d5db'>How It Works</Badge>
        </Header>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>Interacting chatbot with AI</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '48px', fontSize: "1.25rem" }}>
          AI 코드 어시스턴트와 대화를 시작하세요.
        </p>
        <WelcomeMessage>
          <WelcomeMessageTitle>
            <BotIcon>
              <Bot size={20} color="white" />
            </BotIcon>
            <MessageContent>
              <strong>
                <span>DODODOCS AI</span>
                {/* <Badge>AI 챗봇</Badge> */}
              </strong>
              <p style={{ wordBreak: 'keep-all' }}>
                안녕하세요! GitHub 레포지토리의 코드에 대해 궁금하신 점을 물어보세요.
                자세한 분석과 함께 답변해드리겠습니다.
              </p>
            </MessageContent>
          </WelcomeMessageTitle>
          <MessageContent>
            <ul>
              <li>코드 구조와 아키텍처 분석</li>
              <li>함수와 클래스의 역할 설명</li>
              <li>코드 개선 방안 제안</li>
              <li>버그 해결 방안 제시</li>
            </ul>
          </MessageContent>
        </WelcomeMessage>
      </Section>

      <Section feature={'true'} bg={'rgba(39, 39, 42, 0.5)'}>
        <Header>
          <Badge bg='#9333ea33' color='#d1d5db'>Get Started</Badge>
        </Header>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px' }}>Get Clear Answers to Your Code Questions!</h2>
        <p style={{ color: 'rgb(233 213 255)', marginBottom: '48px', fontSize: "1.25rem" }}>
          복잡한 코드도 AI chatbot 의 도움으로 쉽게 이해할 수 있습니다. 지금 바로 시작해보세요.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button primary
            onClick={() => navigate('/repositories')}
          >
            Try It Now <ArrowRight size={20} />
          </Button>
        </div>
      </Section>

      <Section feature={'true'} >
        <Typo fontFamily={'Roboto'} weight={100} size={'32px'} $isGradient>Dododocs</Typo>
      </Section>

    </Container>
  );
};

export default LandingPage;

// linear-gradient(rgba(39, 39, 42, 0.5), rgb(24, 24, 27)