import React, { useEffect } from 'react';
import {
  Boxes, Code, Book, ArrowRight, Github, Coffee, Sparkles,
  FileText, Settings, Upload, GitBranch,
  Flag, Layout,
} from 'lucide-react';
import { Image, Typo } from '../../../index.js';
import mainBannerImg from "../../../../assets/images/docu-landing.png"
import {
  Container, HeroSection, HeroGrid, HeroTitle, HeroImage, Section, Header, Title, Description,
  PreviewCard, PreviewHeader, PreviewTitle, PreviewContent, FileHeader, FileContent,
  Button, FeatureWrapper, FeatureCard, FeatureIcon, FeatureContent, TimelineContainer, ConnectionLine, StepsList, StepItem, NumberBox, GradientBorder, NumberContent, StepLabel, StepNumber, IconBox, ContentBox, ContentCard, ContentTitle, ArrowIcon, ContentDescription, Badge
} from "./DocsLanding.styles.js"
import { useNavigate } from 'react-router-dom';


const LandingReadme = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  const steps = [
    {
      number: "01",
      icon: Code,
      title: "Upload Java Repository",
      description: "Java 프로젝트의 repository를 업로드하세요",
      gradient: "rgba(147, 51, 234, 0.5), rgba(147, 51, 234, 0.4)"
    },
    {
      number: "02",
      icon: Boxes,
      title: "AI Analysis",
      description: "AI가 코드를 분석하여 문서 구조를 자동으로 생성합니다",
      gradient: "rgba(59, 130, 246, 0.5), rgba(59, 130, 246, 0.4)"
    },
    {
      number: "03",
      icon: Book,
      title: "EView Documentation",
      description: "생성된 문서를 확인하고 내보내세요",
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
              <Badge bg='#9333ea33' color='#d1d5db' style={{ margin: '0' }}>Java Documentation</Badge>
              <Coffee color="rgb(216, 180, 254)" size={20} />
            </Header>
            <Title>
              Create Beautiful<br></br>

              <span>Java Documentation</span>
            </Title>
            <Description>
              AI가 Java 프로젝트를 분석하여 깔끔한 문서를 자동으로 생성합니다.<br />
              더 이상 수동으로 문서를 작성하지 마세요.
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
            <Image src={mainBannerImg} width={'50rem'} height={'30rem'} fit={'cover'} style={{ objectPosition: 'left' }} />
          </HeroImage>
        </HeroGrid>
        <div style={{ display: 'flex', width: '100%', alignContent: 'center', justifyContent: 'center', gap: '16px' }}>

          <PreviewCard>
            <PreviewHeader>
              <FeatureIcon>
                <FileText size={24} />
              </FeatureIcon>
              <PreviewTitle>
                <h3>Java Documentation</h3>
                <div>
                  <Coffee size={16} /> Java 프로젝트 전용
                </div>
              </PreviewTitle>
            </PreviewHeader>

            <PreviewContent>
              <FileHeader>
                <Code size={16} />
                <span>Controller.java</span>
              </FileHeader>
              <FileContent>
                <p>- API 엔드포인트 설명</p>
                <p>- 요청/응답 구조</p>
                <p>- 비즈니스 로직 분석</p>
              </FileContent>
            </PreviewContent>
          </PreviewCard>
        </div>
      </HeroSection>

      {/* Features */}
      <Section feature={'true'}>
        <Header>
          <Badge bg='rgba(147, 51, 234, 0.2)' color='rgb(216, 180, 254)'>feature</Badge>
        </Header>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>
          AI-Powered Documentation Generation
        </h2>
        <p style={{ display: 'flex', flexDirection: 'column', alignContent: "center", justifyContent: 'center', color: '#a1a1aa', marginBottom: '48px', fontSize: "1.25rem" }}>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Java 코드를 자동으로 분석하고 체계적인 문서로 만듭니다.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            수동 문서화의 번거로움을 AI가 해결해드립니다.
          </p>
        </p>
        <FeatureWrapper>
          <FeatureCard>
            <FeatureIcon>
              <Layout size={24} />
            </FeatureIcon>
            <FeatureContent>
              <h3>
                Java 전문화
              </h3>
              <p>
                Java 프로젝트에 특화된 분석 엔진으로 Spring Boot, JPA 등 Java 생태계의 특성을 정확히 파악합니다.
              </p>

            </FeatureContent>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>
              <Sparkles size={24} />
            </FeatureIcon>
            <FeatureContent>
              <h3>
                체계적인 문서화
              </h3>
              <p>
                API 문서, 클래스 다이어그램, 시퀀스 다이어그램 등 다양한 형태의 문서를 자동으로 생성합니다.
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
          Java 프로젝트의 문서화를 AI와 함께 완성하세요.
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
          Java 문서화의 새로운 시작
        </h2>
        <p style={{ color: 'rgb(233 213 255)', marginBottom: '48px', fontSize: "1.25rem" }}>
          AI 기반 자동 문서 생성, 직관적인 인터페이스, 강력한 챗봇 기능까지. Dododocs로 스마트한 문서화를 시작하세요.
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

    </Container >
  );
};

export default LandingReadme;

// linear-gradient(rgba(39, 39, 42, 0.5), rgb(24, 24, 27)