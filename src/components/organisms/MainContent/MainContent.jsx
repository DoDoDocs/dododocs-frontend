import React, { useState, useEffect } from "react"
import profileImage from "../../../assets/images/man08.jpg"
import { useNavigate } from 'react-router-dom';
import {
  Wrapper,
  Container,
  Card,
  ImageContainer,
  Image,
  TextContainer,
  MainText,
  ButtonContainer,
  CategoryButton,
  ActionButtonContainer,
  ActionButton
} from './MainContent.styles.js';


const MainContent = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'all', label: '🍽️ 전체' },
    { name: 'korean', label: '🍚 한식' },
    { name: 'chinese', label: '🍜 중식' },
    { name: 'japanese', label: '🍣 일식' },
    { name: 'western', label: '🍝 양식' },
    { name: 'others', label: '🥓 기타' }
  ];

  const [userCategories, setUserCategories] = useState([]);

  useEffect(() => {
    console.log(userCategories)
  }, [userCategories])


  const handleCategoryClick = (category) => {
    if (category === "all") {

    }
    setUserCategories((state) => {
      if (category === "all") {
        return state.length === 5 ? [] : ['korean', 'chinese', 'japanese', 'western', 'others'];
      }
      return state.includes(category)
        ? state.filter((e) => e !== category)
        : [...state, category]
    });
  };

  const handleActionButtonClick = () => {
    console.log('식당 골라줘! 버튼이 클릭되었습니다.');
    navigate('/result')
  };

  return (
    <>
      {/* <Wrapper>
        <Container>
          <Card>
            <ImageContainer>
              <Image src={profileImage} alt="Profile" />
            </ImageContainer>
            <TextContainer>
              <MainText>아레아레.. 못 말리는 아가씨,</MainText>
              <MainText>카테고리를 선택해 주세요..</MainText>
            </TextContainer>
          </Card>
          <ButtonContainer>
            {categories.map((category) => (
              <CategoryButton checked={userCategories.includes(category.name)}
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.label}
              </CategoryButton>
            ))}
          </ButtonContainer>
          <ActionButtonContainer>
            <ActionButton onClick={handleActionButtonClick}>식당 골라줘!</ActionButton>
          </ActionButtonContainer>

        </Container>
      </Wrapper> */}
    </>
  )
}

export default MainContent;