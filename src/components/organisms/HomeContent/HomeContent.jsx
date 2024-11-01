import React, { useState } from 'react';
import { Image, RotateTypo } from "../../index.js"
import { useNavigate } from 'react-router-dom';
import { HomeLayout, HomePageWrapper, HomeWrapper, RowWrapper, FirstRowItem, TextContainer, MainText, SubText, Card, SearchBar, SearchInput, ButtonGroup, Button, SecondRowItem } from './HomeContent.styles.js';

const HomeContent = () => {
  const navigate = useNavigate();

  /**
   * @type {Array<string>} 
   * @description main Text에서 rotate되는 문자 배열로 나타낸것
   */
  const rotateText = ['AI Code Document', 'AI Chating', 'Read Me Editor']



  //!SECTION - search

  return (
    <>
      <HomeLayout>
        {/* SECTION - Page1 */}
        <HomePageWrapper>
          <HomeWrapper>
            <RowWrapper>
              <FirstRowItem>
                <TextContainer>
                  <MainText>Transform Your Code</MainText>
                  <RotateTypo rotateText={rotateText}></RotateTypo>
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
