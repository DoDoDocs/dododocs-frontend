// src/components/organisms/HomeContent/HomeContent.jsx
import React, { useState } from 'react';
import { Image, RotateTypo, Button, Typo } from "../../index.js"
import { useNavigate } from 'react-router-dom';

import { Row, Col } from "../../../layouts/index.js"
import styled from 'styled-components';
import mainBannerImg from "../../../assets/images/landing-hero-min.png";
import bgShapeFive from "../../../assets/images/bg-shape-five.png";
import bgShapeFour from "../../../assets/images/bg-shape-four.png";
import { Check } from "lucide-react"
import {
  HomeWrapper, MainSectionWrapper, HomeLayout,
  TextSectionWrapper, TextContainer, MainText, SubText,
  MainImageSectionWrapper, BgShape, MainImageFrame,
  MainFeatureSectionWrapper, MainFeatureSection, FeatureContentText, FeatureContentImage
} from "./HomeContent.styles.js"

const DocsContent = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    console.log("dkjdkd")
    return navigate('/login')
  }


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
                  <Button btnType={"gradient"} size={'large'} style={{ width: "30%", padding: "20px 0" }}
                    onClick={handleStartClick}
                  >
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
              <Image src={bgShapeFour} width={'640px'} height={'949px'} style={{ position: 'absolute', top: '5dvh', left: '0', loading: 'lazy', filter: 'brightness(0.4) opacity(90%)', pointerEvents: "none" }} />
              <Image src={bgShapeFive} width={'626px'} height={'1004px'} style={{ position: 'absolute', top: '5dvh', right: '0', loading: 'lazy', filter: 'brightness(0.7)', pointerEvents: "none" }} />


            </BgShape>

          </MainSectionWrapper>

          {/* SECTION - main 기능 소개*/}
          <MainFeatureSectionWrapper>
            <Typo fontFamily={'Roboto'} weight={300} size={'1.5rem'} $isGradient>Save hours of manually writing code documentation</Typo>
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
          <Typo fontFamily={'Roboto'} weight={100} size={'32px'} $isGradient>Dododocs</Typo>
        </MainFeatureSectionWrapper>

      </HomeWrapper>
    </>
  )
}

export default DocsContent;
