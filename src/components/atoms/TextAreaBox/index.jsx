import React from "react"
import styled from "styled-components"

const TextArea = styled.textarea`
    width: 98%;
    height: 95%;
    padding : 5px;
    border: none;
    border-radius: 5px;
    background: none;
    line-height : 1.5rem;
    resize: none;
    font-size: 1.1rem;
    ::placeholder {
    color : #999;
};
&:focus {
    outline: 0;
}
`

const TextAreaBox = ({ value, placeholder, onChange, style }) => (
    <>
        <TextArea placeholder={placeholder} value={value} onChange={onChange} style={style} />
    </>
)

export default TextAreaBox