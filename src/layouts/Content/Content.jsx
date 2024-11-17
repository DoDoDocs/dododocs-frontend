import React, { memo } from "react"
import styled from "styled-components"
import _ from "../../config/index.js"

const ContentStyle = styled.div`
    width: 100%;
    height : auto;
    /* height : 100%; */
    display : flex;
    justify-content : center;
    margin : 0 auto;
    flex-wrap : wrap;
    flex-direction: column;
    box-sizing: border-box;
    padding: ${_.HEADER.TOTAL_DVH}dvh 
         clamp(2vw, 6.2dvw, 6.2dvw) 
         clamp(2.6vh, 6dvh, 6dvh) 
         clamp(2vw, 6.2dvw, 6.2dvw);
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