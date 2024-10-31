import React from "react"
import styled from "styled-components"


const ButtonComponent = styled.button`
    ${props => {
        switch (props.size) {
            case "small":
                return `
                    padding : 2px 8px;
                `
            case "large":
                return `
                    padding : 12px 20px;
                `
            default:
                return `
                    padding : 8px 16px;
                `
        }
    }}
${props => {
        switch (props.$btnType) {
            case "primary":
                return `
                background-color: #0d7000;
                border: #0d7000 1px solid;
                border-radius : 3px;
                color : #FFFFFF;
                font-weight : bold;
            `
            case "text":
                return `
                background-color: rgba(255,255,255,0);
                border: #0d7000 1px solid;
                border-radius : 3px;
                outline : 0;
                color : #063600;
            `
            case "black": return `
            background-color: #020202;
            border: #020202 1px solid;
            border-radius : 3px;
            outline : 0;
            color : #ffffff;
        `
            case "gradient": return `
            position: relative;
            background: transparent;
            border: none !important; // 기존 border 제거
            overflow: hidden; // 그라데이션이 삐져나가지 않도록
            z-index: 1; // 내부 콘텐츠를 위한 z-index
            border-radius : 5px;
            color : #bcc3d7;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    border-radius: inherit;
                    padding: 2px;
                    background: linear-gradient(to right, #a25cff, #d923ff);
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    pointer-events: none;
                    z-index: -1; // 내용 뒤에 위치하도록
                }
                &:hover {
                        background: linear-gradient(to right, #8a40ff, #c910ff);
                        color: #fff;
                }
            `
            default:
                return `
                background-color: #e9e9e9;
                border: none;
                border-radius : 3px;
                color : #000000;
                transition : all .2s cubic-bezier(.645,.045,.355,1);
              
            `
        }
    }}
    ${props => (props.block) ? `width : 100%;` : null}
    ${props => props.bold ? `font-weight : bold` : null};
    width : ${props => props.width ? props.width : null};
    font-family : 'Noto Sans KR';
    font-size: 1.1rem;
    text-align: center;

    cursor: pointer;
`

const Button = ({ children, href, size, btnType, block, onClick, bold, width, style }) => (
    <>
        <ButtonComponent style={style} width={width} href={href} size={size} $btnType={btnType} block={block} bold={bold} onClick={onClick}>
            {children}
        </ButtonComponent>
    </>
)



export default Button