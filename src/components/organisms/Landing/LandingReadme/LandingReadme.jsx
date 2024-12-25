import React from 'react';
import {
  Bot, Code, Zap, ArrowRight, Github, MessagesSquare, Sparkles,
  FileText, Settings, Upload, GitBranch,
  Flag, Layout,
} from 'lucide-react';
import { Image, Typo } from '../../../index.js';
import mainBannerImg from "../../../../assets/images/landing-hero-min.png"
import {
  Container, HeroSection, HeroGrid, HeroTitle, HeroImage, Section, Header, Title, Description,
  Button, FeatureWrapper, FeatureCard, FeatureIcon, FeatureContent, TimelineContainer, ConnectionLine, StepsList, StepItem, NumberBox, GradientBorder, NumberContent, StepLabel, StepNumber, IconBox, ContentBox, ContentCard, ContentTitle, ArrowIcon, ContentDescription, Badge
} from "./ReadMeLanding.styles.js"
import { useNavigate } from 'react-router-dom';

const LandingReadme = () => {
  const navigate = useNavigate();

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
              Automated
              <br></br> <span>Readme</span>
            </Title>
            <Description>
              체계적으로 구성된 README 파일을 손쉽게 생성하세요.<br></br> 코드베이스를 분석하여 필요한 정보를 자동으로 추출하고, 명확하고 이해하기 쉬운 문서로 정리해 드립니다.
            </Description>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Button primary onClick={() => navigate('/repositories')}>
                Try It Now <ArrowRight size={20} />
              </Button>
              <Button onClick={() => navigate('/repositories/guide')}>
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

export default LandingReadme;

// linear-gradient(rgba(39, 39, 42, 0.5), rgb(24, 24, 27)