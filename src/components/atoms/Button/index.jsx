import React from "react";
import styled, { css } from "styled-components";

// 사이즈 스타일 상수
const SIZE_STYLES = {
  small: css`
    padding: 2px 8px;
    font-size: 0.9rem;
  `,
  medium: css`
    padding: 8px 16px;
    font-size: 1.1rem;
  `,
  large: css`
    padding: 12px 20px;
    font-size: 1.2rem;
  `
};

// 버튼 타입별 스타일 상수
const BUTTON_VARIANTS = {
  gradient: css`
    background:${({ theme }) => theme.gradients.values.primary};
    border: 0 solid transparent;
    border-radius: 8px;
    color: #FFFFFF;
    
    text-decoration : none;
    letter-spacing : .5px;

  `,
  text: css`
    background-color: rgba(255, 255, 255, 0);
    border: #0d7000 1px solid;
    border-radius: 3px;
    outline: 0;
    color: #063600;
  `,
  black: css`
    background-color: #020202;
    border: #020202 1px solid;
    border-radius: 3px;
    outline: 0;
    color: #ffffff;
  `,
  gradientLine: css`
    position: relative;
    background: transparent;
    border: none;
    overflow: hidden;
    z-index: 1;
    border-radius: 5px;
    color: #bcc3d7;
    cursor: pointer;
    transition: color 0.3s ease;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: inherit;
        padding: 2px;
        background:${({ theme }) => theme.gradients.values.primary};
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: -1;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:${({ theme }) => theme.gradients.values.primary};
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
    }

    &:hover {
      color: #fff;

      &::after {
        opacity: 1;
      }
    }
  `,
  default: css`
    background-color: #e9e9e9;
    border: none;
    border-radius: 3px;
    color: #000000;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  `
};

const ButtonComponent = styled.button`
  // 기본 스타일
  font-family: 'Noto Sans KR';
  text-align: center;
  cursor: pointer;
  
  // 사이즈 스타일 적용
  ${props => SIZE_STYLES[props.size || 'medium']}
  
  // 버튼 타입 스타일 적용
  ${props => BUTTON_VARIANTS[props.$btnType || 'default']}
  
  // 추가 스타일 속성
  ${props => props.block && css`width: 100%;`}
  ${props => props.bold && css`font-weight: bold;`}
  ${props => props.width && css`width: ${props.width};`}
  
  // 비활성화 상태 스타일
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = ({
  children,
  size = 'medium',
  btnType = 'default',
  block,
  bold,
  width,
  onClick,
  style,
  disabled,
  type = 'button',
  ...props
}) => (
  <ButtonComponent
    type={type}
    size={size}
    $btnType={btnType}
    block={block}
    bold={bold}
    width={width}
    onClick={onClick}
    style={style}
    disabled={disabled}
    {...props}
  >
    {children}
  </ButtonComponent>
);


export default Button;