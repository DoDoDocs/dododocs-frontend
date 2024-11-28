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
} from "./DashboardContent.styles.js"


import ParticleBackground from './ParticleBackground.jsx';
import Particle from "./particle.jsx";
const DashboardContent = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    console.log("dkjdkd")
    return navigate('/login')
  }


  return (
    <>
      <HomeWrapper>
        <Particle></Particle>
        {/* <ParticleBackground></ParticleBackground> */}

        {/* <BgShape>
          <Image src={bgShapeFour} width={'640px'} height={'949px'} style={{ position: 'absolute', top: '5dvh', left: '0', loading: 'lazy', filter: 'brightness(0.4) opacity(90%)' }} />
          <Image src={bgShapeFive} width={'626px'} height={'1004px'} style={{ position: 'absolute', top: '5dvh', right: '0', loading: 'lazy', filter: 'brightness(0.7)' }} />
        </BgShape> */}
      </HomeWrapper>
    </>
  )
}

export default DashboardContent;
