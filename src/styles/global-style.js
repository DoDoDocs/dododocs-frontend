import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css';
import { modalStyles } from './react-router-modal.js';
import reset from './reset.css';

const GlobalStyle = createGlobalStyle`
 ${normalize}
 ${reset}
${modalStyles}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');

 *, *::before, *::after {
   box-sizing: border-box;
 }

 html, body {
   width: 100%;
   height: auto;
   margin: 0;
   padding: 0;
   font-family: 'Noto Sans KR', sans-serif;
   background-color: ${({ theme }) => theme.colors.bg};
   color: ${({ theme }) => theme.colors.link};
   
   @media (max-width: 1200px) {
     font-size: 14px;
   }
   @media (max-width: 1024px) {
     font-size: 12px;
   }
   @media (max-width: 768px) {
     font-size: 8px;
   }
 }

 #root {
   width: 100%;
   height: auto;
   margin: 0;
   padding: 0;
 }

 .ReactModal__Content {
   all: revert;
 }
`;

export default GlobalStyle;
