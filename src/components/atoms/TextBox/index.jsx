import React, { useRef, useEffect } from "react"
import styled, { css } from "styled-components"

const planeStyle = css`
 display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  height: 2.5rem;
  padding-left: 1rem;
  border: 1px solid rgba(63, 63, 70, 0.7);
  border-radius: 6px;
  font-size: 1rem;
  transition: border 0.3s ease;
  &:focus {
    border: 1px solid #a25cff;
}
`


const Text = styled.input.attrs(props => ({ type: (props.$type) || "text" }))`
display : flex;
width: 95%;
  border: none;
  font-size: inherit;
  /* padding-left: 1rem; */
  background: none;
  font-family: inherit;
  color : ${props => (props.color) || ` #bcc3d7`};
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



${props => (props.block) ? `width : 90%;` : null};
${props => (props.plane) ? planeStyle : null};
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
 */
const TextBox = ({ onKeyPress, type, plane, autofocus, block, value, onChange, placeholder, disabled, align, color }) => {
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
                $block={block}
                $disabled={disabled}
                ref={textRef}
                plane={plane}
                onKeyPress={onKeyPress}
                value={value}
                onChange={onChange}
                placeholder={placeholder} >
            </Text>
        </>
    )
}


export default TextBox