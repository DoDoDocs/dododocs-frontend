import React, { useState } from 'react';
import { Typo, Button } from "../../index.js"
import { Check } from "lucide-react"
import api from "../../../api/axios.js"
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import {
  HomeWrapper, MainSectionWrapper, HomeLayout,
  TextSectionWrapper, TextContainer, MainText, SubText,
  MainImageSectionWrapper, BgShape, MainImageFrame,
  MainFeatureSectionWrapper, MainFeatureSection, FeatureContentText, FeatureContentImage
} from "../HomeContent/HomeContent.styles.js"
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ChatButton = styled.button`
  padding: 8px 16px;
  margin: 8px;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
`;

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'var(--bg-color)', // 테마 색상 사용
    border: '1px solid #fff  ',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

const DocsContent = () => {

  const [testText, setTestText] = useState([])

  const apiHandler = async () => {
    const response = await api.get('api/analyze/result', {
      params: {
        repositoryName: "Gatsby-Starter-Haon"
      }
    });
    return response.data;
  }

  const handleTestClick = async () => {
    console.log(process.env.REACT_APP_API_BASE_URL)
    const data = await apiHandler();
    console.log(data)
  }

  const navigate = useNavigate();
  const { chattingId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(!!chattingId);

  const openModal = (id) => {
    navigate(`/chatting/${id}`);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    navigate('/chatting');
    setIsModalOpen(false);
  };


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

      <div>
        <h1>채팅 목록</h1>
        <div>
          <ChatButton onClick={() => openModal('123')}>
            채팅방 123 열기
          </ChatButton>
          <ChatButton onClick={() => openModal('456')}>
            채팅방 456 열기
          </ChatButton>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="채팅 모달"
        >
          {chattingId && (
            <>
              <h2>채팅방 {chattingId}</h2>
              <p>채팅 내용이 여기에 표시됩니다.</p>
              <ChatButton onClick={closeModal}>닫기</ChatButton>
            </>
          )}
        </Modal>
      </div>
    </>
  )
}

export default DocsContent;
