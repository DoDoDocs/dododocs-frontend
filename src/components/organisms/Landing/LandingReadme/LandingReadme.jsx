

// ReadmeLanding.jsx
import React from 'react';
import {
  Book, FileEdit, Layout, Sparkles, ArrowRight,
  Download, BookOpen, FileCode, GitBranch, Flag
} from 'lucide-react';

import {
  PageWrapper,
  PageContainer,
  HeroSection,
  ContentWrapper,
  HeroGrid,
  GradientText,
  ButtonGroup,
  Button,
  Section,
  FeatureWrapper,
  FeatureIcon,
  FeatureContent,
  FeatureGrid,
  StepsGrid,
  StepCard,
  StepIcon,
  CTASection,
  Badge,
  Title,
  Description,
  Header,
  FeatureCard,


} from './ReadMeLanding.styles.js'
import { Image } from '../../../index.js';
import mainBannerImg from "../../../../assets/images/landing-hero-min.png"


const Feature = ({ icon: Icon, title, description }) => (
  <FeatureWrapper>
    <FeatureIcon>
      <Icon size={24} />
    </FeatureIcon>
    <FeatureContent>
      <h3>{title}</h3>
      <p>{description}</p>
    </FeatureContent>
  </FeatureWrapper>
);


const ReadmeLanding = () => {
  return (
    <PageWrapper>
      <PageContainer>
        <HeroSection>
          <ContentWrapper>
            <HeroGrid>
              <div>
                <Badge >
                  README Maker
                </Badge>
                <Title>
                  Create Beautiful <span>Readme</span>
                </Title>
                <Description>
                  Generate comprehensive, well-structured README files for your projects
                  with our intelligent documentation maker.
                </Description>
                <ButtonGroup>
                  <Button primary>
                    Try README Maker <ArrowRight size={20} />
                  </Button>
                  <Button secondary>View Examples</Button>
                </ButtonGroup>
              </div>
              <div className="flex justify-center">
                <Image src={mainBannerImg} width={'60rem'} />
              </div>
            </HeroGrid>
          </ContentWrapper>
        </HeroSection>

        {/* Features */}
        <Section feature={'true'}>
          <Header>
            <Badge bg='#9333ea33' color='#d1d5db'>feature</Badge>
          </Header>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>코드를 이해하는 데 필요한 모든 것</h2>
          <p style={{ color: '#a1a1aa', marginBottom: '48px', fontSize: "1.25rem" }}>
            AI 어시스턴트가 강력한 코드 분석과 자연어 이해를 결합하여
            코드베이스를 쉽게 탐색하고 이해할 수 있도록 도와드립니다.
          </p>
          <FeatureWrapper>
            <FeatureCard>
              <FeatureIcon>
                <Layout size={24} />
              </FeatureIcon>
              <FeatureContent>
                <h3>자연스러운 대화</h3>
                <p>코드베이스와 자연어로 대화하세요. 질문하고 설명을 받아 복잡한 로직을 쉽게 이해하세요.</p>
              </FeatureContent>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <Sparkles size={24} />
              </FeatureIcon>
              <FeatureContent>
                <h3>깊이 있는 코드 분석</h3>
                <p>AI 기반 분석을 통해 코드 구조, 패턴 및 관계를 이해하세요.</p>
              </FeatureContent>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <GitBranch size={24} />
              </FeatureIcon>
              <FeatureContent>
                <h3>깊이 있는 코드 분석</h3>
                <p>AI 기반 분석을 통해 코드 구조, 패턴 및 관계를 이해하세요.</p>
              </FeatureContent>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <Flag size={24} />
              </FeatureIcon>
              <FeatureContent>
                <h3>깊이 있는 코드 분석</h3>
                <p>AI 기반 분석을 통해 코드 구조, 패턴 및 관계를 이해하세요.</p>
              </FeatureContent>
            </FeatureCard>
          </FeatureWrapper>
        </Section>



        <Section>
          <ContentWrapper>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300">
                Features
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Everything you need for perfect documentation
              </h2>
              <p className="text-purple-200 max-w-2xl mx-auto">
                Create comprehensive documentation with our intuitive tools and intelligent
                suggestions, making documentation a breeze.
              </p>
            </div>

            <FeatureGrid>
              {[
                {
                  icon: Layout,
                  title: "Smart Templates",
                  description: "Choose from various pre-built templates or customize your own structure."
                },
                {
                  icon: Sparkles,
                  title: "AI-Powered Suggestions",
                  description: "Get intelligent recommendations based on your project type."
                },
                {
                  icon: GitBranch,
                  title: "Version Control Integration",
                  description: "Seamlessly sync your documentation with your Git repository."
                },
                {
                  icon: Flag,
                  title: "Custom Sections",
                  description: "Add, remove, or rearrange sections with our drag-and-drop interface."
                }
              ].map((feature, index) => (
                <Feature key={index} {...feature} />
              ))}
            </FeatureGrid>
          </ContentWrapper>
        </Section>

        <Section darker>
          <ContentWrapper>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-purple-500/20 text-purple-300">
                How It Works
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                Create documentation in minutes
              </h2>
              <p className="text-purple-200 max-w-2xl mx-auto">
                Our simple three-step process makes documentation creation effortless
              </p>
            </div>

            <StepsGrid>
              {[
                {
                  icon: BookOpen,
                  title: "1. Choose Template",
                  description: "Select from our collection of professional README templates"
                },
                {
                  icon: FileEdit,
                  title: "2. Customize Content",
                  description: "Edit and customize sections with our intuitive editor"
                },
                {
                  icon: Download,
                  title: "3. Export & Deploy",
                  description: "Export to markdown and deploy to your repository"
                }
              ].map((step, index) => (
                <StepCard key={index}>
                  <StepIcon>
                    <step.icon size={32} />
                  </StepIcon>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-purple-200">{step.description}</p>
                </StepCard>
              ))}
            </StepsGrid>
          </ContentWrapper>
        </Section>

        <Section>
          <CTASection>
            <Badge className="mb-4 bg-purple-500/20 text-purple-300">
              Get Started
            </Badge>
            <h2 className="text-3xl font-bold mb-6">
              Ready to create amazing documentation?
            </h2>
            <p className="text-purple-200 mb-8">
              Join thousands of developers who are creating better documentation
              with Dododocs README Maker.
            </p>
            <Button primary className="mx-auto">
              Start Creating <ArrowRight size={20} />
            </Button>
          </CTASection>
        </Section>
      </PageContainer>
    </PageWrapper>

  );
};
export default ReadmeLanding;





