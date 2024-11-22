import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { Bell, Search } from 'lucide-react';
import bg_img from "../../../assets/images/bg_img.jpg"

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

    &:before {
      content: "";
      opacity: 0.1;
      background-image: url(${bg_img});
    background-size: cover;
    background-position: center; 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(0, 0, 0, 0.5); 투명도 조정 (rgba 사용) */
    pointer-events: none; /* 클릭 이벤트가 본래 요소로 전달되도록 설정 */
    }
`

const AppContainer = styled.div`

  background-color: rgba(16 18 27 / 40%);
  max-width: 1250px;
  max-height: 860px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  width: 100%;
  border-radius: 14px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  font-size: 15px;
  font-weight: 500;
  margin: 2em auto;
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

const MenuCircle = styled.div`
  width: 15px;
  height: 15px;
  background-color: #f96057;
  border-radius: 50%;
  box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
  margin-right: 195px;
  flex-shrink: 0;
`;

const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
  
  a {
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

// Main App Component
const App = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Apps');

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <AppContainer>
          <Header>
            <MenuCircle />
            <HeaderMenu>
              <a
                href="#"
                className={activeMenu === 'Apps' ? 'active' : ''}
                onClick={() => setActiveMenu('Apps')}
              >
                Apps
              </a>
              <a
                href="#"
                className={activeMenu === 'Your work' ? 'active' : ''}
                onClick={() => setActiveMenu('Your work')}
              >
                Your work
              </a>
              <a href="#">Discover</a>
              <a href="#">Market</a>
            </HeaderMenu>
            <SearchBar>
              <input type="text" placeholder="Search" />
              <Search className="search-icon" size={20} />
            </SearchBar>
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
        </AppContainer>
      </AppWrapper>
    </>
  );
};

export default App;