import styled from 'styled-components';
import _ from '../../config/index.js';
//SECTION - styledComponent

export const SenHeader = styled.div`
  position: fixed;
  top: 0;
  height: ${_.HEADER.T_DVH}dvh;
  width: calc(100dvw - (100dvw - 100%));
  z-index: 22;
  transition: all 0.3s ease;
  background-color: #14152133;
  backdrop-filter: blur(40px);
  opacity: ${(props) => (props['data-scrolled'] ? 1 : 0)};
`;

export const LayoutHeaderWrapper = styled.div`
  padding: 1rem;
  width: calc(100dvw - (100dvw - 100%));
  align-items: center;
  justify-content: center;
  display: flex;
  align-items: center;
  height: ${_.HEADER.HEIGHT_DVH}dvh;
  box-sizing: border-box;
  position: fixed;
  top: ${_.HEADER.T_DVH}dvh;
  z-index: 20;
  transition: background-color 0.3s ease;
  ${(props) =>
    props['data-scrolled'] &&
    `
    background-color: #14152133;
    backdrop-filter: blur(40px);
    box-shadow:rgba(0, 0, 0, 0.07) 0px 3px 4px 0px;
  `}
`;

export const HeaderWrapper = styled.div`
  width: 95dvw;
  padding: 0 50px;

  @media screen and (max-width: 499px) {
    padding: 0px 20px;
    height: 64px;
  }
  @media screen and (max-width: 860px) {
    padding: 0px 32px;
  }
  @media screen and (max-width: 1279px) {
    padding: 0px 40px;
  }
`;

export const IconHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  height: 3.5rem;
  padding-left: 1rem;
  border: 1px solid #0d7000;
  border-radius: 6px;
  box-shadow: rgb(247 247 247) 0px 0px 0px 1px inset;
  font-size: 1.2rem;
  opacity: ${(props) => (props.$isEnded ? 1 : 0)};
`;

export const VerticalDivider = styled.div`
  width: 1px;
  height: 1rem;
  border-right: 1px solid rgb(204, 204, 204);
  margin: 0 1rem;
  @media (max-width: 860px) {
    border: none;
  }
`;

export const CategoryBox = styled.div`
  transition: border 0.1s ease, color 0.2s ease;

  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2rem;
  border-left: ${({ theme }) => theme.colors.link} 2px solid;
  padding-left: 5px;
  color: ${({ theme }) => theme.colors.link};
  font-family: 'Roboto';
  cursor: pointer;
  &:hover {
    border-left: #ffffff 2px solid;
    color: #ffffff;
  }
`;
export const LoginBtnBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.5rem 2rem 0.5rem 5px;
  height: 3.5dvh;
  /*width:max-content;*/
  right: 10px;
  position: static;
  z-index: 26;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 2rem;
  border-bottom: 1px solid rgb(238, 238, 238, 0.2);
  @media (max-width: 600px) {
    position: static;
    height: auto;
    justify-content: space-evenly;
  }
`;

export const LoginValueBtn = styled.div`
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: inherit;
  /* border-left : ${(props) => (props.red ? `#e64937` : `#545454`)} 2px solid; */
  padding-left: 5px;
  color: ${(props) => (props.red ? `#e64937` : `#888888`)};
  cursor: pointer;
  font-family: 'nixgon';
  margin-right: 20px;
  border-left-width: 1px;
  font-weight: bold;
  @media (max-width: 600px) {
    justify-content: center;
    border: none;
    padding: 5px 10px;
    font-size: 1.5rem;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;
