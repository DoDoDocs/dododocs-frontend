
import React, { useState } from 'react';
import { Typo, Button } from "../../index.js"
import { Check } from "lucide-react"
import api from "../../../api/axios.js"
import {
  HomeWrapper, MainSectionWrapper, HomeLayout,
  TextSectionWrapper, TextContainer, MainText, SubText,
  MainImageSectionWrapper, BgShape, MainImageFrame,
  MainFeatureSectionWrapper, MainFeatureSection, FeatureContentText, FeatureContentImage
} from "../HomeContent/HomeContent.styles.js"


const DocsContent = () => {

  const [testText, setTestText] = useState([])

  const apiHandler = async () => {
    const response = await api.get('/api/dbfind');
    return response.data;
  }

  const handleTestClick = async () => {
    console.log(process.env.REACT_APP_API_BASE_URL)
    const data = await apiHandler();
    console.log(data)
  }


  return (
    <>

      <TextContainer style={{ width: '100%', marginTop: '15rem' }}>
        <Typo fontFamily={'Roboto'} weight={500} size={'3rem'} $isGradient>of the 꼬</Typo>
        <Typo fontFamily={'Roboto'} weight={500} size={'3rem'} $isGradient> by the  꼬 </Typo>
        <Typo fontFamily={'Roboto'} weight={500} size={'3rem'} $isGradient> for the 꼬</Typo>
        <Button onClick={handleTestClick} btnType={"gradientLine"} size={'large'} style={{ fontWeight: '400', width: "50%", padding: "1.2rem 1.2rem" }}>
          시작하기
        </Button>
      </TextContainer>

    </>
  )
}

export default DocsContent;
