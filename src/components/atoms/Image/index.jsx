import React from "react"
import styled from "styled-components"

const ImageStyle = styled.img.attrs((props) => ({
    src: props.src
}))`
    transition: all 0.5s ease  ;
    ${(props) => (props.circle) ? ` border-radius : 50%; ` : null};
    height :  ${props => props.height || null} ;
    ${(props) => (props.cursor) ? ` cursor : ${props.cursor}` : null};
    width : ${props => props.width};
    ${(props) => (props.circle) ? ` border-radius : 100%; ` : null};
    border : ${props => (props.border) || null};
    padding : ${props => (props.$padding) || null};
    object-fit : ${props => props.fit || 'fill'};
    margin :  ${props => (props.margin) || null};
`

const Image = ({ margin, src, width, circle, height, cursor, border, onClick, padding, fit, style }) => (
    <>
        <ImageStyle margin={margin} src={src} fit={fit} width={width} cursor={cursor} border={border} onClick={onClick} $padding={padding} style={style}
            height={height} circle={circle} ></ImageStyle>
    </>
)

export default Image;

