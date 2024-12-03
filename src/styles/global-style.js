// src/styles/global-style.js

import { createGlobalStyle } from 'styled-components';
// import reset from 'styled-reset';
import normalize from 'normalize.css';
import { modalStyles } from './react-router-modal.js';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,body{
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    background-color:   ${({ theme }) => theme.colors.bg};
    color : ${({ theme }) => theme.colors.link};
    
    @media (max-width: 1200px) {
        font-size: 14px
      }
      @media (max-width: 1024px) {
        font-size: 12px
      }
      @media (max-width: 768px) {
        font-size: 8px
      }

      ${modalStyles}
  }


  #root{
      width : 100%;
      height : auto;
      margin : 0px;
      padding : 0px;
      /* min-height: 100vh; */

    }

`;

export default GlobalStyle;
