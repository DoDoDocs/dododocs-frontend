import React, { useState } from 'react';
import { Image } from "../../index.js"
import { useNavigate } from 'react-router-dom';
import { HomeLayout, HomePageWrapper, HomeWrapper, ColWrapper, FirstColItem, RowWrapper, FirstRowItem, TextContainer, MainText, SubText, Card, SearchBar, SearchInput, ButtonGroup, Button, SecondRowItem } from './HomeContent.styles.js';
import AnimatedContent from "./test.jsx"

const HomeContent = () => {
  const navigate = useNavigate();




  //!SECTION - search

  return (
    <>
      <HomeLayout>
        {/* SECTION - Page1 */}
        <HomePageWrapper>
          <HomeWrapper>
            <ColWrapper>
              <FirstColItem>
              </FirstColItem>
            </ColWrapper>
            <RowWrapper>
              <div style={{ zIndex: 100 }}>
                <AnimatedContent></AnimatedContent>
              </div>
              <FirstRowItem>
                <TextContainer>
                  <MainText>Transform Your Code</MainText>
                  <MainText > AI Document</MainText>
                </TextContainer>
                <SubText>Smart Docs for Smarter Development</SubText>

              </FirstRowItem>
              <SecondRowItem>

              </SecondRowItem>
            </RowWrapper>
          </HomeWrapper >
        </HomePageWrapper>
        {/* !SECTION - page1 */}

        {/* SECTION - page 2 */}
        <HomePageWrapper>
          <HomeWrapper>
          </HomeWrapper>
        </HomePageWrapper>
        {/* !SECTION - page 2 */}


      </HomeLayout>


    </>
  )
}

export default HomeContent;
