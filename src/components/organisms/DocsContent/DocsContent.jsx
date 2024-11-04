import React, { useState } from 'react';
import { Image, RotateTypo, Button, Typo } from "../../index.js"
import { useNavigate } from 'react-router-dom';

import { Row, Col } from "../../../layouts/index.js"
import styled from 'styled-components';
import bgBannerImg from '../../../assets/images/main-banner-bg.cb7bf167.png';
import bgSliderBgImg from "../../../assets/images/slider-main-bg.png";
import mainBannerImg from "../../../assets/images/landing-hero-min.png";
import bgShapeFive from "../../../assets/images/bg-shape-five.png";
import bgShapeFour from "../../../assets/images/bg-shape-four.png";
import { Check } from "lucide-react"
import _ from '../../../config/index.js';

export const HomeWrapper = styled.div`
  width: calc(100dvw - (100dvw - 100%));
  height: auto;
  padding : 0 0 100px 0;

  display: flex;
    flex-direction: column;
    gap:clamp(2rem, 5vw, 3.5rem);
  justify-content: center;
  align-items: center;


`
export const MainSectionWrapper = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: auto auto;
  justify-content: center;
  flex-direction: column;
  gap:clamp(2rem, 4vw, 3rem);

  background-image: url(${bgBannerImg});
  background-size: unset;
  background-repeat: no-repeat;
  background-position: 50% 70%;


`;

const HomeLayout = styled.div`
 width: 100%;
 height: auto;

  display: flex;
  flex-direction: column;
  gap:clamp(1.5rem, 3vw, 2.5rem);
  justify-content: center;
  align-items: center;
  position : relative;

  padding-bottom: 4rem;

  &::before {
    opacity: 0.1;
    background-color: #000;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
`

const TextSectionWrapper = styled.div`
margin-top : ${_.HEADER.TOTAL_DVH}dvh ;
  position : relative;
  width : 95dvw;
  height: 60dvh;
  display: flex;
  align-items: center;
  justify-content: center;

`

const TextContainer = styled.div`
  display: flex;
  font-size: ${({ theme }) => theme.layout.home.mainTextSize};
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  gap: 1rem;
  text-align: center;
`;

const MainText = styled.span`
  background: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${({ theme }) => theme.colors.white};
  background-clip: text;
  padding-bottom: 1rem;
  text-fill-color: ${({ theme }) => theme.colors.white};
`;

const SubText = styled.span`
  background: black;
  font-size: 20px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${({ theme }) => theme.colors.link};
  font-family: 'Roboto', sans-serif;

  background-clip: text;
  padding-top: 2rem;
  text-fill-color: ${({ theme }) => theme.colors.white};
  letter-spacing: 2px;
`;


const MainImageSectionWrapper = styled.div`
  width : 95dvw;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding : 2dvh 2dvw;
`

const BgShape = styled.div`
position: static !important;
`

const MainImageFrame = styled.div`
    background: url(${bgSliderBgImg});
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 70px 70px 42px;
    z-index: 3;
    overflow: hidden;


    mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 1) 60%,
    rgba(0, 0, 0, 0) 100%
  );
`
const MainFeatureSectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  display: flex;
  flex-direction: column;
  align-items: center;
  width : 95dvw;
  gap: 1rem;
  `

const MainFeatureSection = styled.main`
margin : 1dvh 0 4rem 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); 
  overflow: hidden;
   gap: 40px;
  width:clamp(
    min(100%, 540px),
    calc(90vw - 2rem),
    1320px
  );
  padding: 4.125rem 2.815rem 4.125rem 4.188rem;
    background: #15091d;
  border-radius: 20px;
  border : 1px solid #2a1454;
  border-radius: 15px;

  font-family: 'Roboto', sans-serif;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureContentText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-evenly;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  h2 {
    color : ${({ theme }) => theme.colors.white};
    font-size: clamp(4rem, 4vw, 2.5rem);
    margin-bottom: 2rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    gap : 1rem;
    font-size: clamp(1rem, 2vw, 1.2rem);
  }
`;

const FeatureContentImage = styled.div`
  
    width: 100%;
    height: auto;
    border-radius: 10px;
  
`;

const DocsContent = () => {





  return (
    <>
      <HomeWrapper>
        <HomeLayout>

          <MainSectionWrapper>
            {/* SECTION - main text section */}
            <TextSectionWrapper>
              <Row>
                <Col span={12} justify={'center'}>
                  <TextContainer>
                    <MainText>Transform Your Code</MainText>
                    <RotateTypo></RotateTypo>
                    <MainText>with AI-Powered Code Analysis!</MainText>
                  </TextContainer>
                </Col>
                <Col span={12} justify={'center'}>
                  <SubText>Smart Docs for Smarter Development</SubText>

                </Col>
                <Col span={12} justify={'center'} style={{ marginTop: "4rem" }}>
                  <Button btnType={"gradient"} size={'large'} style={{ width: "30%", padding: "20px 0" }}>
                    Dododocs 시작하기
                  </Button>
                </Col>
              </Row>

            </TextSectionWrapper>
            {/* !SECTION - main text section */}

            {/* SECTION - main Image section */}
            <MainImageSectionWrapper>
              <MainImageFrame>
                <Image src={mainBannerImg} width={'1055px'} />
              </MainImageFrame>

            </MainImageSectionWrapper>
            {/* !SECTION - main Image section */}

            <BgShape>
              <Image src={bgShapeFour} width={'640px'} height={'949px'} style={{ position: 'absolute', top: '5dvh', left: '0', loading: 'lazy', filter: 'brightness(0.4) opacity(90%)' }} />
              <Image src={bgShapeFive} width={'626px'} height={'1004px'} style={{ position: 'absolute', top: '5dvh', right: '0', loading: 'lazy', filter: 'brightness(0.7)' }} />


            </BgShape>

          </MainSectionWrapper>

          {/* SECTION - main 기능 소개*/}
          <MainFeatureSectionWrapper>
            <Typo fontFamily={'Roboto'} weight={300} size={'1.5rem'} isGradient>Save hours of manually writing code documentation</Typo>
            <Typo fontFamily={'Roboto'} color={'#ffffff'} weight={500} size={'clamp(2rem, 1.8rem + 1.5vw, 3rem)'} style={{ textAlign: 'center' }} >Elevate your code <br /> with AI </Typo>
            <MainFeatureSection>
              <FeatureContentText>
                <h2>AI Code <br />documentation <br /> tools</h2>
                <ul>
                  <li>
                    <Check style={{ minWidth: '2rem' }} />
                    Automated AI-powered tools to generate Code & Api documentation from your source code files
                  </li>

                  <li>
                    <Check style={{ minWidth: '2rem' }} />
                    Conditional Generative Models
                  </li>
                </ul>
                <Button btnType={"gradient"} size={'large'} style={{ fontWeight: '400', width: "50%", padding: "1.2rem 1.2rem" }}>
                  시작하기
                </Button>
              </FeatureContentText>
              <FeatureContentImage>
                <Image src={mainBannerImg} width={'60rem'} />
              </FeatureContentImage>
            </MainFeatureSection>

            <MainFeatureSection>
              <FeatureContentText>
                <h2>Chatbot <br /> with AI Solutions </h2>
                <ul>
                  <li>
                    <Check style={{ minWidth: '2rem' }} />
                    Automated AI-powered tools to generate Code & Api documentation from your source code files
                  </li>

                  <li>
                    <Check style={{ minWidth: '2rem' }} />
                    Conditional Generative Models
                  </li>
                </ul>
                <Button btnType={"gradient"} size={'large'} style={{ fontWeight: '400', width: "50%", padding: "1.2rem 1.2rem" }}>
                  시작하기
                </Button>
              </FeatureContentText>
              <FeatureContentImage>
                <Image src={mainBannerImg} width={'60rem'} />
              </FeatureContentImage>

            </MainFeatureSection>

            <MainFeatureSection>
              <FeatureContentText>
                <h2>README <br /> Mark Down <br /> Generator</h2>
                <ul>
                  <li>
                    <Check style={{ minWidth: '2rem' }} />
                    Automated AI-powered tools to generate Code & Api documentation from your source code files
                  </li>

                  <li>
                    <Check style={{ minWidth: '2rem' }} />
                    Conditional Generative Models
                  </li>
                </ul>
                <Button btnType={"gradient"} size={'large'} style={{ fontWeight: '400', width: "50%", padding: "1.2rem 1.2rem" }}>
                  시작하기
                </Button>
              </FeatureContentText>
              <FeatureContentImage>
                <Image src={mainBannerImg} width={'60rem'} />
              </FeatureContentImage>
            </MainFeatureSection>

          </MainFeatureSectionWrapper>
          {/* !SECTION - main 기능 소개*/}

        </HomeLayout>

        <MainFeatureSectionWrapper>
          <Typo fontFamily={'Roboto'} weight={100} size={'32px'} isGradient>Dododocs</Typo>
        </MainFeatureSectionWrapper>

      </HomeWrapper>
    </>
  )
}

export default DocsContent;
