import React, { memo } from "react"
import styled from "styled-components"

const ContentStyle = styled.div`
    width: 100%;
    height : auto;
    /* height : 100%; */
    display : flex;
    justify-content : center;
    margin : 0 auto;
    flex-wrap : wrap;
    padding : 6vh 6.2vw;
    flex-direction: column;
    box-sizing: border-box;
    background-color: inherit;
  @media screen and (max-width: 1024px){
    padding : 2.6vh 2.6vw;
  }
  @media screen and (max-width: 768px){
    padding : 2.6vh 2vw;
  }

`

const Content = ({ children, style }) => {

  return (
    <>
      <ContentStyle style={style}>
        {children}
      </ContentStyle>
    </>
  )
}

export default memo(Content)