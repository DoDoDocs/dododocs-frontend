import React from "react"
import styled from "styled-components";
import profileImage from "../../../assets/images/man08.jpg"
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	margin: auto auto;
	justify-content: center;
  flex-direction: column;
  gap : 50px;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  max-width: 500px;
  gap : 10px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  width: 100%;
  text-align: center;
`;

const ImageContainer = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const TextContainer = styled.div`
  padding: 20px;
`;

const MainText = styled.p`
  font-size: 24px;
  color: #333;
  margin: 0;
  font-family: 'grandiflora';
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width : 100%;
  justify-content: space-between;
`;

const ResultButton = styled.button`
  border: none;
  padding: 18px 10px 19px 8px;
  font-size: 20px;
  font-family: 'diphylleia';
  cursor: pointer;
  border-radius: 5px;
  color: #102C57;
  width : calc((100% - 10px) / 2);
  ${props => props.map ?
    `background-color: #96C9F4;` :
    `background-color: #FAE300;`
  }
`;

const ActionButtonContainer = styled.div`
  width : 100%;
`;

const ActionButton = styled.button`
  background-color: #FFB1B1;
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  font-family: diphylleia;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 8px 8px 6px 0px rgba(0, 0, 0, 0.25);
  width : 100%;
  &:hover {
    background-color: #f69393;
  }
`


const MainContent = () => {
  const navigate = useNavigate();

  const handleActionButtonClick = () => {
    console.log('식당 골라줘! 버튼이 클릭되었습니다.');
    navigate('/main')
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Card>
            <ImageContainer>
              <Image src={profileImage} alt="Profile" />
            </ImageContainer>
            <TextContainer>
              <MainText>오늘의 식당은</MainText>
              <MainText>ㅁㅁㅁ</MainText>
              <MainText>맛있게 먹어요</MainText>
            </TextContainer>
          </Card>
          <ButtonContainer>
            <ResultButton> 💬 카톡 공유 </ResultButton>
            <ResultButton map="true"> 🗺️ 약도 보기 </ResultButton>
          </ButtonContainer>
          <ActionButtonContainer>
            <ActionButton onClick={handleActionButtonClick}>↪️ 다시 골라줘!</ActionButton>
          </ActionButtonContainer>

        </Container>
      </Wrapper>
    </>
  )
}

export default MainContent;