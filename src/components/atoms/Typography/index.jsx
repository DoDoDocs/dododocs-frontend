import React from 'react'
import styled from 'styled-components'



const Typo = styled.div`
display : flex;
${props => (props.full) ? 'width : 100%; justify-content : inherit; flex-basis :100%' : null};
overflow : inherit;
font-size : ${props => (props.size) || '1rem'};
font-family : ${props => (props.fontFamily) || 'Noto Sans KR'};
color : ${props => (props.color)};
background-color : ${props => (props.backColor)};
opacity :  ${props => (props.opacity)};
font-weight : ${props => (props.$weight)};
${props => (props.radius) ? `border-radius: 5px;` : null};
border-bottom : ${props => (props.border) || null};
cursor : ${props => (props.cursor) || 'inherit'};
padding : ${props => (props.$padding)};
width : ${props => (props.width) || null};
text-align : ${props => (props.$textAlign) || null};
line-height :1.5;
`




const Typography = ({ size, color, onClick, radius, fontFamily, full, width, textAlign, style,
    backColor, children, opacity, weight, cursor, border, padding }) => {
    return (
        <>
            <Typo size={size} color={color} onClick={onClick} fontFamily={fontFamily} width={width} style={style}
                radius={radius} backColor={backColor} $weight={weight} full={full} $textAlign={textAlign}
                children={children} opacity={opacity} cursor={cursor} border={border} $padding={padding}>
            </Typo>
        </>
    )
}

export default Typography;