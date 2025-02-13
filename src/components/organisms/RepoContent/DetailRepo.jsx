import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import bg_img from "../../../assets/images/bg_img.jpg"
import { Bell, Search, Grid, RefreshCw, Camera, Layout, PlayCircle, Pen, Box, MessageSquare, Sun } from 'lucide-react';
import {
  Image, Typo, Button, TextBox, Select,
  Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter,
} from "../../index.js";

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
  
  :root {
    --theme-bg-color: rgba(16 18 27 / 40%);
    --border-color: rgba(113 119 144 / 25%);
    --theme-color: #f9fafb;
    --inactive-color: rgb(113 119 144 / 78%);
    --body-font: "Poppins", sans-serif;
    --hover-menu-bg: rgba(12 15 25 / 30%);
    --content-title-color: #999ba5;
    --content-bg: rgb(146 151 179 / 13%);
    --button-inactive: rgb(249 250 251 / 55%);
    --dropdown-bg: #21242d;
    --dropdown-hover: rgb(42 46 60);
    --popup-bg: rgb(22 25 37);
    --search-bg:  #14162b;
    --overlay-bg: rgba(36, 39, 59, 0.3);
    --scrollbar-bg: rgb(1 2 3 / 40%);
  }

  * {
    outline: none;
    box-sizing: border-box;
  }

  /* body {
    margin: 0;
    padding: 0;
    font-family: var(--body-font);
    background-image: url(${bg_img});
    background-size: cover;
    background-position: center;
    height: 100vh;
  } */
`;

// Styled Components

const AppWrapper = styled.div`
    position: relative;
  border-radius: 14px;
  width : 95dvw;
  height : 95dvh;
  background-color : #2d2d2d;
    &:before {
      content: "";
      /* opacity: 0.5; */
      opacity: 1;
      background-image: url(${bg_img});
      background-size: cover;
      background-position: center; 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius : inherit;
      /* background: rgba(0, 0, 0, 0.5); 투명도 조정 (rgba 사용) */
      pointer-events: none; /* 클릭 이벤트가 본래 요소로 전달되도록 설정 */
    }
`

const AppContainer = styled.div`
  background-color: rgba(16 18 27 / 40%);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;
  border-radius: inherit;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 58px;
  width: 100%;
  border-bottom: 1px solid var(--border-color);
  padding: 0 30px;
  white-space: nowrap;
`;

const MenuCircleWrapper = styled.div`
width : auto;
height : auto;
flex : 1 ;
display: flex;
gap : 0.5rem;
  `



const MenuCircle = styled.button`
  width: 15px;
  height: 15px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'red':
        return '#f96057';
      case 'yellow':
        return '#f8ce52';
      case 'green':
        return '#5fcf65';
      default:
        return '#f96057'; // 기본값
    }
  }};  border-radius: 50%;
  flex-shrink: 0;
/* 
  width: 15px;
  height: 15px;
  background-color: #f96057;
  border-radius: 50%;
  box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
  margin-right: 195px;
  flex-shrink: 0; */
`;


const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
  
  span {
    padding: 20px 30px;
    text-decoration: none;
    color: var(--inactive-color);
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    
    &.active, &:hover {
      color: var(--theme-color);
      border-bottom: 2px solid var(--theme-color);
    }
  }
`;

const MainHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  height: auto;
  flex-shrink: 0;
`;


const MainHeaderTitle = styled.div`
display : flex;
justify-content : flex-end;
padding : 0 1rem 0 0 ;
  width: 240px;
`
const MainHeaderContent = styled.div`
  padding : 1.25rem 1.5rem;
  text-decoration: none;
  color: var(--inactive-color);
  border-bottom: 2px solid transparent;
  transition: 0.3s;
    
  &.active, &:hover {
      color: var(--theme-color);
      border-bottom: 2px solid var(--theme-color);
    }
`

const SearchBar = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  max-width: 400px;
  padding-left: 16px;
  border-radius: 4px;
  
  input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: var(--search-bg);
    border-radius: 4px;
    font-family: var(--body-font);
    font-size: 15px;
    font-weight: 500;
    padding: 0 20px 0 40px;
    color: var(--theme-color);
    
    &::placeholder {
      font-family: var(--body-font);
      color: var(--inactive-color);
      font-size: 15px;
      font-weight: 500;
    }
  }
`;

const HeaderProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px 0 40px;
  margin-left: auto;
  flex-shrink: 0;
`;

const NotificationIcon = styled.div`
  position: relative;
  cursor: pointer;
  
  span {
    position: absolute;
    background-color: #3a6df0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    right: -6px;
    top: -6px;
  }
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--theme-color);
  margin-left: 22px;
`;




const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

// Sidebar Components
const LeftSide = styled.div`
  flex-basis: 240px;
  border-right: 1px solid var(--border-color);
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;
  
  @media screen and (max-width: 945px) {
    display: none;
  }
`;

const SideWrapper = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const SideTitle = styled.div`
  color: var(--inactive-color);
  margin-bottom: 14px;
`;

const SideMenu = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  
  span {
    text-decoration: none;
    color: var(--theme-color);
    display: flex;
    align-items: center;
    font-weight: 400;
    padding: 10px;
    font-size: 14px;
    border-radius: 6px;
    transition: 0.3s;
    
    &:hover {
      background-color: var(--hover-menu-bg);
    }
    
    svg {
      width: 16px;
      margin-right: 8px;
    }
  }
`;

// Main Content Components
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;



const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--theme-color);
  padding: 20px 40px;
  height: 100%;
  overflow: auto;
  background-color: var(--theme-bg-color);
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  background-image: linear-gradient(
    to right top,
    #cf4af3,
    #e73bd7,
    #f631bc,
    #fd31a2,
    #ff3a8b
  );
  border-radius: 14px;
  padding: 20px 40px;
`;

const ContentSection = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const AppsCard = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: calc(100% + 20px);
`;

const AppCard = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(33.3% - 20px);
  font-size: 16px;
  background-color: var(--content-bg);
  border-radius: 14px;
  border: 1px solid var(--theme-bg-color);
  padding: 20px;
  cursor: pointer;
  transition: 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    background-color: var(--theme-bg-color);
  }
  
  @media screen and (max-width: 1110px) {
    width: calc(50% - 20px);
  }
  
  @media screen and (max-width: 565px) {
    width: calc(100% - 20px);
  }
`;

// Main App Component
const App = ({ isOpen, onOpen, onClose }) => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Apps');

  return (
    <Modal isOpen={isOpen} onClose={onClose}
      modalWidth={'100%'}
      overlayStyles={`
          background-color: rgba(0, 0, 0, 0);
        `}
      wrapperStyles={`
      height : auto;
      width : auto;
      margin : 0;
    `}>
      <ModalContent style={{ padding: '0' }}>
        <GlobalStyle />
        <AppWrapper>
          <AppContainer>
            <Header>
              <MenuCircleWrapper>
                <MenuCircle type={'red'}></MenuCircle>
                <MenuCircle type={'yellow'}></MenuCircle>
                <MenuCircle type={'green'}></MenuCircle>
              </MenuCircleWrapper>

              <HeaderProfile>
                <NotificationIcon>
                  <Bell size={22} />
                  <span>3</span>
                </NotificationIcon>
                <ProfileImage
                  src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Profile"
                />
              </HeaderProfile>
            </Header>
            {/* Add remaining content components here */}
            <MainHeader>
              <MainHeaderTitle >All Apps</MainHeaderTitle>
              {
                ['AI Code Document', 'AI Chatting', 'Read Me Maker'].map(menu => (
                  <MainHeaderContent
                    key={menu}
                    className={activeMenu === menu ? 'active' : ''}
                    onClick={() => setActiveMenu(menu)}
                  >
                    {menu}
                  </MainHeaderContent>
                ))
              }
            </MainHeader>

            <Wrapper>
              <MainContainer>
                <ContentWrapper>
                  <ContentSection>
                  </ContentSection>
                </ContentWrapper>
              </MainContainer>
            </Wrapper>
          </AppContainer>
        </AppWrapper>
      </ModalContent>
    </Modal>

  );
};

export default App;