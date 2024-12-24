import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  Bot, Code, Zap, ArrowRight, Github, MessagesSquare, Sparkles,
  FileText, Settings, Upload, GitBranch,
  Flag, Layout,
} from 'lucide-react';
import { Image, Typo } from '../../../index.js';
import mainBannerImg from "../../../../assets/images/landing-hero-min.png"

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
  grid-template-columns: repeat(2, minmax(250px, 1fr)); /* 최소 250px, 최대 동일 비율 */
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
const TimelineContainer = styled.div`
  position: relative;
`;

const ConnectionLine = styled.div`
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

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const StepItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  &:hover {
    ${props => props.hoverEffects}
  }
`;

const NumberBox = styled.div`
  position: relative;
  z-index: 10;
`;

const GradientBorder = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 1rem;
  background: linear-gradient(to bottom right, ${props => props.gradient});
  padding: 1px;
`;

const NumberContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: rgb(24, 24, 27);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StepLabel = styled.span`
  font-size: 0.875rem;
  color: rgb(113, 113, 122);
  font-family: monospace;
`;

const StepNumber = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #a855f7, #9333ea);
  -webkit-background-clip: text;
  color: transparent;
`;

const IconBox = styled.div`
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

const ContentBox = styled.div`
  flex: 1;
  padding-top: 1rem;
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

const ContentTitle = styled.h3`
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

const ContentDescription = styled.p`
  color: rgb(161, 161, 170);
`;

const ArrowIcon = styled(ArrowRight)`
  margin-left: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;

  ${ContentCard}:hover & {
    opacity: 0;
  }
`;


const LandingReadme = () => {

  const steps = [
    {
      number: "01",
      icon: FileText,
      title: " AI Generated README",
      description: "프로젝트 codebase를 기반으로 즉시 AI가 README를 생성합니다",
      gradient: "rgba(147, 51, 234, 0.5), rgba(147, 51, 234, 0.4)"
    },
    {
      number: "02",
      icon: Settings,
      title: "Customize Content",
      description: "AI가 생성한 README를 커스터마이징합니다.",
      gradient: "rgba(59, 130, 246, 0.5), rgba(59, 130, 246, 0.4)"
    },
    {
      number: "03",
      icon: Upload,
      title: "Export README",
      description: "README를 MARKDOWN으로 내보내세요.",
      gradient: "rgba(16, 185, 129, 0.5), rgba(16, 185, 129, 0.4)"
    }
  ];

  return (
    <Container>
      {/* Hero Section */}
      <HeroSection>
        <HeroGrid>
          <HeroTitle>
            <Header>

            </Header>
            <Title>
              Create Beautiful <br></br> <span>Readme</span>
            </Title>
            <Description>
              체계적으로 구성된 README 파일을 손쉽게 생성하세요.<br></br> 코드베이스를 분석하여 필요한 정보를 자동으로 추출하고, 명확하고 이해하기 쉬운 문서로 정리해 드립니다.
            </Description>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button primary>
                Try It Now <ArrowRight size={20} />
              </Button>
              <Button>
                <Github size={20} /> View Example
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
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>
          완벽한 README를 위한 완벽한 솔루션
        </h2>
        <p style={{ display: 'flex', flexDirection: 'column', alignContent: "center", justifyContent: 'center', color: '#a1a1aa', marginBottom: '48px', fontSize: "1.25rem" }}>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            복잡하고 어려운 README작성, 어렵게 생각하지 마세요!
          </p>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            저희 dododocs의 도움을 받으면, 프로젝트의 모든 것을 담은 훌륭한 README를 누구나 쉽고 빠르게 만들 수 있습니다.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            문서 작성에 들이는 시간과 노력을 절약하고, 더욱 중요한 업무에 집중하세요.
          </p>
        </p>
        <FeatureWrapper>
          <FeatureCard>
            <FeatureIcon>
              <Layout size={24} />
            </FeatureIcon>
            <FeatureContent>
              <h3>
                Create ReadMe
              </h3>
              <p>
                간단하고 편리한 AI로 멋진 문서가 만들어집니다!
              </p>
              <p>
                Dododocs의 직관적인 인터페이스로, 나만의 README를 만들어 보세요
              </p>
            </FeatureContent>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <Sparkles size={24} />
            </FeatureIcon>
            <FeatureContent>
              <h3>
                AI-Powered Suggestions
              </h3>
              <p>
                프로젝트의 특성과 코드 분석을 통해, 콘텐츠 구성과 문서 구조에 대한 맞춤형 제안을 받아보세요.
              </p>
            </FeatureContent>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <GitBranch size={24} />
            </FeatureIcon>
            <FeatureContent>
              <h3>
                Connect Git Repositories
              </h3>
              <p>
                Git 저장소와 문서를 원활하게 동기화하고 코드를 가져오세요
              </p>
            </FeatureContent>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <Flag size={24} />
            </FeatureIcon>
            <FeatureContent>
              <h3>Custom</h3>
              <p>
                드래그 앤 드롭 인터페이스로 프로젝트 요구사항에 맞게 섹션을 쉽게 추가, 제거 또는 재배열하세요.
              </p>
            </FeatureContent>
          </FeatureCard>
        </FeatureWrapper>
      </Section>

      <Section feature={'true'}>
        <Header>
          <Badge bg='#9333ea33' color='#d1d5db'>How It Works</Badge>
        </Header>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>Create documentation in minutes</h2>
        <p style={{ color: '#a1a1aa', marginBottom: '48px', fontSize: "1.25rem" }}>
          3단계의 간단한 절차를 따라, 누구나 쉽고 빠르게 문서를 완성할 수 있습니다.
        </p>
        <TimelineContainer>
          <ConnectionLine />
          <StepsList>
            {steps.map((step) => (
              <StepItem key={step.number}>
                <NumberBox>
                  <GradientBorder gradient={step.gradient}>
                    <NumberContent>
                      <StepLabel>STEP</StepLabel>
                      <StepNumber>{step.number}</StepNumber>
                    </NumberContent>
                  </GradientBorder>
                  <IconBox>
                    <step.icon size={20} />
                  </IconBox>
                </NumberBox>

                <ContentBox>
                  <ContentCard>
                    <ContentTitle>
                      {step.title}
                      <ArrowIcon size={20} />
                    </ContentTitle>
                    <ContentDescription>{step.description}</ContentDescription>
                  </ContentCard>
                </ContentBox>
              </StepItem>
            ))}
          </StepsList>
        </TimelineContainer>
      </Section>

      <Section feature={'true'} bg={'rgba(39, 39, 42, 0.5)'}>
        <Header>
          <Badge bg='#9333ea33' color='#d1d5db'>Get Started</Badge>
        </Header>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '24px' }}>
          코드 이해의 새로운 시작, Dododocs
        </h2>
        <p style={{ color: 'rgb(233 213 255)', marginBottom: '48px', fontSize: "1.25rem" }}>
          AI 기반 자동 문서 생성, 직관적인 인터페이스, 강력한 챗봇 기능까지. Dododocs 하나로 코드 문서화의 모든 것을 경험하세요.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button primary>
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

export default LandingReadme;

// linear-gradient(rgba(39, 39, 42, 0.5), rgb(24, 24, 27)