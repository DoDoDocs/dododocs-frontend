import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import bg_img from "../../../assets/images/bg_img.jpg"
import { Bell, Search, Grid, RefreshCw, Camera, Layout, PlayCircle, Pen, Box, MessageSquare, Sun } from 'lucide-react';
import {
  Image, Typo, Button, TextBox, Select,
} from "../../index.js";

import useAppModalStore from '../../../store/useAppModalStore.js';

import Modal from 'react-modal';

import Chatting from "./Chatting.jsx"
import Document from "./Document.jsx"
import ReadMe from "./ReadMe.jsx"


// Styled Components

const modalStyles = {
  content: {
    border: 'none',
    position: 'relative',
    backgroundColor: 'rgba(24, 24, 27, 1)',
    borderRadius: '0.875rem',
    padding: '0',
    width: 'auto',
    height: 'auto',
    margin: ' 0',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    inset: 0,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
  }
};



const AppWrapper = styled.div`
  position: relative;
  border-radius: ${props => props.isFullscreen ? '0' : '0.875rem'} ;
  width: ${props => props.isFullscreen ? '100dvw' : '95dvw'};
  height: ${props => props.isFullscreen ? '100dvh' : '95dvh'};
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);

  background-color : #2d2d2d;
    &:before {
      content: "";
      /* opacity: 0.5; */
      opacity: 1;
       ${props => props.isImgMode ? `background-image: url(${bg_img});` : null} 
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
  border-bottom: 1px solid rgba(113 119 144 / 25%);
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
`;



const MainHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(113 119 144 / 25%);
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
  color: rgb(113 119 144 / 78%);
  border-bottom: 2px solid transparent;
  transition: 0.3s;
    
  &.active, &:hover {
      color: #f9fafb;
      border-bottom: 2px solid #f9fafb;
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
    font-family:"Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 0 20px 0 40px;
    color: #f9fafb;
    
    &::placeholder {
      font-family:"Poppins", sans-serif;
      color: rgb(113 119 144 / 78%);
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
  border: 2px solid #f9fafb;
  margin-left: 22px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const ChattingContainer = styled.div`
width : 100%;
height : 100%;
background-color : #10121b66;
`

// Main App Component
const App = ({ onClose }) => {

  const { isAppModalOpen: isOpen } = useAppModalStore();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [isImgMode, setIsImgMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Apps');
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        ...modalStyles,
        content: {
          ...modalStyles.content,
          borderRadius: isFullscreen ? '0' : '0.875rem',
        }
      }}
      contentLabel="채팅 모달"
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
      appElement={document.getElementById('root')}
    >
      {/* <ModalContent   style={{ padding: '0' }}> */}
      <AppWrapper isImgMode={isImgMode} isFullscreen={isFullscreen}>
        <AppContainer>
          <Header>
            <MenuCircleWrapper>
              <MenuCircle type={'red'} onClick={onClose}></MenuCircle>
              <MenuCircle type={'yellow'}></MenuCircle>
              <MenuCircle type={'green'} onClick={toggleFullscreen}></MenuCircle>
            </MenuCircleWrapper>

            <HeaderProfile>
              <NotificationIcon>
                <Bell size={22} />
                <span>3</span>
              </NotificationIcon>
              <ProfileImage
                src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Profile"
                onClick={() => { setIsImgMode((prevImgMode) => !prevImgMode) }}
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
            {(
              //  Chatting 
              activeMenu === 'AI Chatting' ?
                <ChattingContainer>
                  <Chatting></Chatting>
                </ChattingContainer> :
                activeMenu === 'AI Code Document' ?
                  <Document></Document>
                  :
                  activeMenu === 'Read Me Maker' ?
                    <ReadMe></ReadMe>
                    :
                    null
            )}

            {/* 
               <LeftSide>
                <SideWrapper>
                  <SideTitle>Apps</SideTitle>
                  <SideMenu>
                    <span href="#"><Grid size={16} /> All Apps</span>
                    <span ><RefreshCw size={16} /> Updates <span className="notification-number updates">3</span></span>
                  </SideMenu>
                </SideWrapper>

                <SideWrapper>
                  <SideTitle>Categories</SideTitle>
                  <SideMenu>
                    <span ><Camera size={16} /> Photography</span>
                    <span ><Pen size={16} /> Graphic Design</span>
                    <span ><PlayCircle size={16} /> Video</span>
                    <span ><Layout size={16} /> Illustrations</span>
                    <span ><Box size={16} /> UI/UX</span>
                    <span ><MessageSquare size={16} /> 3D/AR</span>
                  </SideMenu>
                </SideWrapper>
              </LeftSide> 

              <MainContainer>
                <ContentWrapper>
                  <ContentSection>
                    
                    <h3>Installed</h3>
                    <AppsCard>
                      <AppCard>
                        <div className="app-card__title">
                          <Camera size={28} />
                          <span>Photoshop</span>
                        </div>
                        <div className="app-card__subtext">
                          Edit, master and create powerful images
                        </div>
                        <div className="app-card-buttons">
                          <button className="content-button status-button">Update</button>
                        </div>
                      </AppCard>
                    </AppsCard> 


                  </ContentSection>
                </ContentWrapper>
              </MainContainer> */}
          </Wrapper>
        </AppContainer>
      </AppWrapper>
      {/* </ModalContent> */}
    </Modal>

  );
};

export default App;