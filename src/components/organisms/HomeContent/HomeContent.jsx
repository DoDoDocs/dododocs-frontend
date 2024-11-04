import React, { useState } from 'react';
import { Image, RotateTypo, Button } from "../../index.js"
import { useNavigate } from 'react-router-dom';
import {
  HomeLayout, HomePageWrapper, FirstHomeWrapper, RowWrapper, FirstRowItem, TextContainer,
  MainText, SubText, Card, SearchBar, SearchInput, ButtonGroup, SecondRowItem
} from './HomeContent.styles.js';

const HomeContent = () => {
  const navigate = useNavigate();





  return (
    <>
      <HomeLayout>
        {/* SECTION - Page1 */}

        <HomePageWrapper>
          <FirstHomeWrapper>
            <RowWrapper>
              <FirstRowItem>
                <TextContainer>
                  <MainText>Transform Your Code</MainText>
                  <RotateTypo></RotateTypo>
                  <MainText>with AI-Powered Code Analysis!</MainText>

                </TextContainer>
                <SubText>Smart Docs for Smarter Development</SubText>
                <Button btnType={"gradient"} size={'large'} >
                  Repo 관리
                </Button>
              </FirstRowItem>
              <SecondRowItem>
                <Button btnType={"gradient"} size={'large'} >
                  dfsdfsdfsdfdsfdsdf
                </Button>
              </SecondRowItem>
            </RowWrapper>
          </FirstHomeWrapper >
        </HomePageWrapper>
        {/* !SECTION - page1 */}

        {/* SECTION - page 2 */}
        <HomePageWrapper>

        </HomePageWrapper>
        {/* !SECTION - page 2 */}


      </HomeLayout>


    </>
  )
}

export default HomeContent;
