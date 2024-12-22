import { useState, useEffect } from 'react';
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
import styled, { keyframes, css } from 'styled-components';
import { RefreshCw, Loader2 } from 'lucide-react';

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


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 애니메이션 관련 styled-components
const fade = keyframes`
  0%, 100% { opacity: 0; transform: translateY(10px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  min-height: 3.5rem;  // 높이 고정으로 텍스트 변경시 레이아웃 시프트 방지
`;

const LoadingText = styled.span`
  color: #8b5cf6;
  font-size: 0.875rem;
  font-weight: 500;
  min-width : 12rem;
  animation: ${fade} 2s ease-in-out;
`;

const RotatingLoader = styled(Loader2)`
  ${css`
    animation: ${rotate} 1s linear infinite;
  `}
  color: #8b5cf6;
`;


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
    console.log("api/analyze/result testApi 결과 받기 : ", data)
  }

  const navigate = useNavigate();
  const { chattingId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(!!chattingId);

  const openModal = (id) => {
    navigate(`/chatting/${id}`);
  };

  const closeModal = () => {
    navigate('/chatting');
  };


  const loadingMessages = [
    '레포지토리 연결 중...',
    '코드를 분석하는 중입니다...',
    'AI가 코드를 이해하는 중입니다...'
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000); // 2초마다 메시지 변경

    return () => clearInterval(interval);
  }, []);





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
      <LoadingWrapper>
        <RotatingLoader size={16} />
        <LoadingText key={messageIndex}>
          {loadingMessages[messageIndex]}
        </LoadingText>
      </LoadingWrapper>
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
