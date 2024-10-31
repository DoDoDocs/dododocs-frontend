import React, { useRef, useEffect } from "react"
import styled from "styled-components"

export const Text = styled.input.attrs(props => ({ type: (props.$type) || "text" }))`
display : flex;
width: 95%;
  border: none;
  font-size: inherit;
  /* padding-left: 1rem; */
  background: none;
  font-family: inherit;
  color : ${props => (props.color) || ` #333`};
  outline: 0;
::placeholder {
    color : #999;
};
&:focus {
    outline: 0;
}
/* 모바일 환경에서 center */
@media screen and (max-width: 576px){
    text-align: center;
}

text-align : ${props => (props.align) || null};

${props => (props.disabled) ? `background-color: rgba(0,0,0,0)` : null};


${props => (props.plane) ? `
padding: 4px 11px;
color: #000000d9;
background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    outline: 0;
    transition: all .3s;
    box-shadow: 0 0 0 2px #E4EBF5;
    &:selection {
    color: #fff;
    background: #1890ff;;
};
    &:hover{
        box-shadow: 0 0 0 1px #c8d0e7;
        border-color: #bec8e4;
    border-right-width: 1px!important;
    };
    &:focus{
        border-color: #bec8e4;
    box-shadow: 0 0 0 2px #E4EBF5;
    border-right-width: 1px!important;
    outline: 0;
    box-shadow: inset 0.2rem 0.2rem 0.5rem #c8d0e7, inset -0.2rem -0.2rem 0.5rem #FFFFFF;
  
    }
    
`: null};
${props => (props.block) ? `width : 90%;` : null};
`

/**
 * @description wrapper 만들어야함 
 *  @param type input type
 * @param block 가로크기 부모로 조정
 * @param value 값
 * @param onChange onChange
 * @param placeholder 값입력 전 입력을 돕기위한 힌트
 * @param disabled textbox 비활성화
 * @param align 텍스트 정렬
 * @param plane plane style
 */
const TextBox = ({ onKeyPress, type, autofocus, block, plane, value, onChange, placeholder, disabled, align, color }) => {
    const textRef = useRef();

    useEffect(() => {
        if (autofocus) {
            console.log(textRef)
            textRef.current.focus()
        }
    }, [autofocus])

    return (
        <>
            <Text $type={type}
                $align={align}
                $color={color}
                $plane={plane}
                $block={block}
                $disabled={disabled}
                ref={textRef}
                onKeyPress={onKeyPress}
                value={value}
                onChange={onChange}
                placeholder={placeholder} >
            </Text>
        </>
    )
}


export default TextBox