import React, { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Send, User, Bot, Sparkles, RefreshCw, EllipsisVertical } from 'lucide-react';
import { Typo } from "../../index.js";
import useClickAway from '../../../hooks/useClickAway.js';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const ChatWrapper = styled.div`
  display: flex;
  flex-direction : column;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  background: rgba(45, 45, 58, 0.4);
  backdrop-filter: blur(10px);

`;

const EllipsisMenuWrapper = styled.div`
  width : 100%;
  background: transparent;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height : 2.5rem;
`

const EllipsisVerticalIcon = styled.div`
  color : #ffffff;
  cursor : pointer;
  padding : 0.7rem;
  display : flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: rgba(13, 15, 15, 0.3);
  }
  position : relative;
  margin : 0 1rem 0 0 ;
`

const EllipsisMenu = styled.div`
  position: absolute;
  cursor: default;
  inset: 0px 0px auto auto;
  margin: 0px;
  transform: translate(0px, 2.5rem);
  border-radius: 0.75rem;
  padding: 1rem;
  min-width: 15rem;
  background-color: #232236;
  z-index: 3000;
  border: 1px solid rgba(63, 63, 70, 0.3);
  
  /* 최적화된 그림자 효과 */
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 8px 24px rgba(0, 0, 0, 0.15);

  /* 최적화된 트랜지션 */
  transform-origin: top right;
  transition: 
    opacity 0.2s ease-out,
    visibility 0.2s ease-out,
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    
  /* 상태에 따른 스타일 변화 */
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};

  ${props => props.isOpen ? css`
    opacity: 1;
    visibility: visible;
    transform: translate(0, 2.5rem) scale(1);
  ` : css`
    opacity: 0;
    visibility: hidden;
    transform: translate(0, 2rem) scale(0.95);
  `}
  ul {
    margin: 0;
    padding-inline-start : 0;
    li {
      margin: 0.5rem 0;
      background-color: #232236;
      padding: 0.7rem 0.5rem;
      color: ${props => props.$disabled ? 'rgba(113, 119, 144, 0.4)' : '#9492A6'};  // 비활성화 상태의 색상 변경
      transition: all 0.2s ease; // 부드러운 전환 효과 추가
      cursor: pointer; // hover 시 커서 변경
      border-radius: 4px;
      display : flex;
      align-items : center;
      font-size : 1rem;
      cursor: ${props => props.$disabled === true ? 'not-allowed' : 'cursor'};

      span{
        padding : 0.3rem;
        background: ${props => props.$disabled ? 'rgba(55, 53, 84, 0.5)' : '#373554'};
        display: flex;
        transition: all 0.2s ease; 
        border-radius : 4px;
        margin-right : .5rem;
      }
      svg{
        width : 1rem;
        height : 1rem;
        opacity: ${props => props.$disabled ? 0.4 : 1};  // 아이콘 투명도
        color : ${props => props.$disabled ? 'rgba(113, 119, 144, 0.4)' : '#d923ff'}
      }

      &:hover {
        background-color: ${props => props.$disabled ? '#232236' : '#373554'};  // 비활성화 상태에서는 hover 효과 제거
    color: ${props => props.$disabled ? 'rgba(113, 119, 144, 0.4)' : '#ffffff'};

    span {
      background: ${props => props.$disabled ? 'rgba(55, 53, 84, 0.5)' : '#a25cff'};
    }
    svg {
      color : ${props => props.$disabled ? 'rgba(113, 119, 144, 0.4)' : '#ffffff'}
    }
      }
  }
  }
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* flex : 1; */
  height : calc(100% - 2.5rem);
  width: 100%;
  border-radius: 16px;
  /* border: 1px solid rgba(255, 255, 255, 0.1); */
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  position: relative;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(217, 35, 255, 0.2);
    border-radius: 3px;
    
    &:hover {
      background: rgba(217, 35, 255, 0.3);
    }
  }
`;

const WelcomeTitle = styled.div`
  padding: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: .5rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction : column;
  gap: .5rem;
  align-items: flex-start;
  background: rgba(105, 14, 124, 0.05);
  border: 1px solid rgba(217, 35, 255, 0.1);
  padding: 1.5rem;
  border-radius: 1rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -30%);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 90%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
`;

const WelcomeMessageTitle = styled.div`
display :   flex;
flex-direction: row;
gap : 1rem;
align-items: center;
justify-content: center;
`

const SparklesIcon = styled(Sparkles)`
  display: inline;
  margin-right: 0.5rem;
  color: #d923ff;
  width: 24px;
  height: 24px;
`;

const BotIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #d923ff, #a78bfa);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(217, 35, 255, 0.2);
`;

const MessageContent = styled.div`
  color: #e4e4e7;
  font-size: 0.95rem;
  line-height: 1.6;

  strong {
    color: white;
    font-size : 1.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    /* margin-bottom: 0.5rem; */
  }

  ul {
    margin-top: 0.75rem;
    padding-left : 3.5rem;
    li {
      margin: 0.5rem 0;
      padding-left: 1rem;
      position: relative;
      
      &:before {
        content: "•";
        color: #d923ff;
        position: absolute;
        left: 0;
      }
    }
  }
`;

const Badge = styled.span`
padding: 0.125rem 0.5rem;
background-color: #d923ff;
font-size: 0.75rem;
border-radius: 9999px;
color: white;
margin-left: 0.5rem;
font-weight: 500;
margin : 0 0 0.2rem 0.2rem;
`;


const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 120px;
`;

const MessageBubble = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin: ${props => props.isUser ? '0 0 0 auto' : '0 auto 0 0'};
  max-width: 70%;
  animation: ${fadeIn} 0.3s ease-out;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isUser ?
    'linear-gradient(135deg, #d923ff, #a78bfa)' :
    'rgba(63, 63, 70, 0.8)'};
  color: white;
  order: ${props => props.isUser ? 1 : 0};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Message = styled.div`
  background: rgba(63, 63, 70, 0.8);
  padding: 14px 18px;
  border-radius: 16px;
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  ${props => props.isUser ? `
    background: transparent;
    border : 1px solid #a78bfa
    `:
    null
  }
`;

const InputContainer = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0 0 16px 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 8px 16px;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:focus-within {
    background: rgba(255, 255, 255, 0.09);
    border-color: rgba(217, 35, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(217, 35, 255, 0.1);
  }
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 0.95rem;
  padding: 10px 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.2)' : '#d923ff'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover:not(:disabled) {
    background: rgba(217, 35, 255, 0.1);
    color: #e048ff;
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 8px;

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #d923ff;
    animation: ${shimmer} 1.5s infinite;
    opacity: 0.7;

    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

const ChatbotUI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);  // 메뉴 ref 생성

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useClickAway(menuRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: inputText,
      isUser: true
    }]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "연결된 레포지토리의 코드를 분석하여 답변 드리겠습니다.",
        isUser: false
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.",
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  console.log(messages.length === 0)
  return (
    <ChatWrapper>
      <EllipsisMenuWrapper>
        <EllipsisVerticalIcon className="ellipsis-menu" ref={menuRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <EllipsisVertical size={'1rem'} />
          <EllipsisMenu isOpen={isMenuOpen} $disabled={messages.length === 0}
          >
            <ul>
              <li
                onClick={handleReset}
                title="대화 새로 시작하기"
              >
                <span><RefreshCw /></span>
                reset
              </li>
            </ul>
          </EllipsisMenu>
        </EllipsisVerticalIcon>
      </EllipsisMenuWrapper>
      <ChatContainer>
        <MessageContainer>
          <WelcomeTitle>
            <Typo fontFamily={'Roboto'} weight={100} size={'2.25rem'} cursor={"pointer"} $isGradient style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <SparklesIcon />
              Dododocs AI Chat
            </Typo>
            <Typo fontFamily={'Roboto'} size={'1.1rem'} padding={'.5rem 0 0 0'} style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              연결된 GitHub 레포지토리의 코드를 기반으로 답변을 제공해드립니다.
            </Typo>
          </WelcomeTitle>
          {
            messages.length === 0 ?
              <WelcomeMessage>
                <WelcomeMessageTitle>
                  <BotIcon>
                    <Bot size={20} color="white" />
                  </BotIcon>
                  <MessageContent>
                    <strong>
                      <span>DODODOCS AI</span>
                      {/* <Badge>AI 챗봇</Badge> */}
                    </strong>
                    <p>
                      안녕하세요! GitHub 레포지토리의 코드에 대해 궁금하신 점을 물어보세요.
                      자세한 분석과 함께 답변해드리겠습니다.
                    </p>
                  </MessageContent>
                </WelcomeMessageTitle>
                <MessageContent>
                  <ul>
                    <li>코드 구조와 아키텍처 분석</li>
                    <li>함수와 클래스의 역할 설명</li>
                    <li>코드 개선 방안 제안</li>
                    <li>버그 해결 방안 제시</li>
                  </ul>
                </MessageContent>
              </WelcomeMessage>
              : null
          }


          <ChatMessages>
            {messages.map(message => (
              <MessageBubble key={message.id} isUser={message.isUser}>
                <Avatar isUser={message.isUser}>
                  {message.isUser ? <User size={18} /> : <Bot size={18} />}
                </Avatar>
                <Message isUser={message.isUser}>{message.text}</Message>
              </MessageBubble>
            ))}
            {isLoading && (
              <MessageBubble isUser={false}>
                <Avatar isUser={false}>
                  <Bot size={18} />
                </Avatar>
                <Message isUser={false}>
                  <LoadingDots>
                    <span></span>
                    <span></span>
                    <span></span>
                  </LoadingDots>
                </Message>
              </MessageBubble>
            )}
            <div ref={messagesEndRef} />
          </ChatMessages>
        </MessageContainer>

        <InputContainer>
          <InputWrapper>
            <Input
              type="text"
              placeholder="코드에 대해 궁금한 점을 물어보세요..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <ActionButton
              onClick={handleReset}
              title="대화 새로 시작하기"
              disabled={messages.length === 0}
            >
              <RefreshCw size={18} />
            </ActionButton>
            <ActionButton
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
            >
              <Send size={18} />
            </ActionButton>
          </InputWrapper>
        </InputContainer>
      </ChatContainer>
    </ChatWrapper>
  );
};

export default ChatbotUI;


