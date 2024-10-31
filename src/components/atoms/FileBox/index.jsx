import React from "react"
import styled from "styled-components"


const LabelBtn = styled.label`

font-size: 1rem;

// button default size
padding : 8px 16px;

//button default type
 background-color: #FFFFFF;
 border: 1px solid #0d7000;
 border-radius : 3px;
 color : #000000;

 cursor: pointer;

display : ${props => (props.display) || 'flex'};
justify-content: center;

${props => (props.block) ? `width : 100%;` : null};
`


const File = styled.input.attrs(props => ({ type: "file" }))`
display : none;

 clip : rect(0,0,0,0);
`
const LabelForm = styled.label`
      width: ${props => props.size || `102px`};
    height: ${props => props.size || `102px`};
    display : flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-inline-end: 8px;
    margin-bottom: 8px;
    text-align: center;
    vertical-align: top;
    background-color: rgba(0,0,0,.02);
    border: 1px dashed #d9d9d9;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color .3s;
`

const Index = ({ types, size, id, display, block, name, accept, onChange, children }) => (
    <>
        {
            types === 'button' ?
                <>
                    <LabelBtn block={block} htmlFor={id} display={display} >{children}</LabelBtn>
                    <File name={name} id={id} accept={accept} onChange={onChange}></File>
                </>
                :
                <>
                    <LabelForm size={size} htmlFor={id} >{children}</LabelForm>
                    <File name={name} id={id} accept={accept} onChange={onChange}></File>
                </>
        }

    </>
)

export default Index