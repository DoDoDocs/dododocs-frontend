import React, { useRef, useEffect } from "react"
import styled from "styled-components"

export const Text = styled.input.attrs({ type: 'number', })`
/* Chrome, Safari, Edge, Opera */
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
  appearance: none;
  -moz-appearance: none;
  margin: 0;
}

/* Firefox */
[type=number] {
  -moz-appearance: textfield;
}
border : none ;

font-size: inherit;
font-weight : bold;

&:focus{
    outline-color : #0d7000;
}

@media screen and (max-width: 992px){
    text-align: center;
}


${props => {
        switch (props.size) {
            case "small":
                return `
                padding : 2px;
            `
            case "large":
                return `
                padding : 12px 20px;
            `
            default:
                return `
                padding : 8px 10px;
            `
        }
    }}
    text-align : ${props => (props.align) || `center`};
    border-radius : ${props => (props.radius) || null};
    width : ${props => (props.width) || "44px"};

${props => (props.border) ? `border : solid gray 1px;` : null};
${props => (props.block) ? `width : 90%;` : null};
${props => (props.disabled) ? `background-color: rgba(0,0,0,0);` : null};

color : ${props => (props.color) || ` #707070`};
`

/**
 * @param border 테두리 유무
 * @param radius radius 추가 
 * @param size 크기 
 * @param block 가로크기 부모로 조정
 * @param value 값
 * @param onChange onChange
 * @param placeholder 값입력 전 입력을 돕기위한 힌트
 * @param disabled textbox 비활성화
 * @param align 텍스트 정렬
 */
const TextBox = ({ width, autofocus, border, radius, size, block, value, onChange, placeholder, disabled, align, color }) => {
    const ref = useRef()

    useEffect(() => {
        if (autofocus) {
            ref.current.focus()
        }
    }, [autofocus])

    return (
        <>
            <Text onFocus={e => e.target.select()} width={width} ref={ref} border={border} align={align} radius={radius} size={size} color={color}
                block={block} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} >
            </Text>
        </>
    )
}


export default TextBox