import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, RefreshCw, EllipsisVertical } from 'lucide-react';
import { Typo } from "../../../index.js";
import useClickAway from '../../../../hooks/useClickAway.js';
import { useChatbot } from '../../../../hooks/RepoDetailContent/useChatbot.js';
import { TypingMarkdownRenderer, MarkdownRenderer } from '../../../index.js';
import { useRegisteredRepoStore, useAuthStore } from "../../../../store/store.js"

import {
  ChatWrapper,
  EllipsisMenuWrapper, EllipsisVerticalIcon, EllipsisMenu,
  ChatContainer,
  MessageContainer,
  WelcomeTitle, WelcomeMessage, WelcomeMessageTitle,
  SparklesIcon,
  BotIcon,
  MessageContent,
  Badge,
  ChatMessages,
  MessageBubble,
  Avatar,
  Message,
  InputContainer, InputWrapper, Input,
  ActionButton,
  LoadingDots,
  ErrorBanner, LoadingMessage, LoadingText, LoadingStatus,
} from "./Chatting.styles.js"


const ChatbotUI = () => {
  const { activeRepositoryId } = useRegisteredRepoStore();
  const token = useAuthStore(state => state.token);

  // === Chat History 관련 상태 (useChatbot) ===
  const {
    chatHistory,
    isLoading: isHistoryLoading, // 채팅 히스토리 로딩 상태
    isError: isHistoryError, // 채팅 히스토리 에러 상태
    error: historyError, // 채팅 히스토리 에러 메시지
    resetChat
  } = useChatbot(activeRepositoryId);


  // === 실시간 채팅 관련 상태 ===
  const [messages, setMessages] = useState([]); // 현재 화면에 표시되는 메시지들
  const [inputText, setInputText] = useState(''); // 입력창 텍스트
  const [isSending, setIsSending] = useState(false); // 메시지 전송 중 상태
  const [sendError, setSendError] = useState(null); // 메시지 전송 에러
  const [streamingResponse, setStreamingResponse] = useState(''); // 실시간 응답 데이터
  const [accumulatedResponse, setAccumulatedResponse] = useState('');
  // === UI 관련 상태 ===
  const messagesEndRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);


  const [isTest, setIsTest] = useState(0);





  // 채팅 히스토리 동기화
  useEffect(() => {
    if (chatHistory && !isHistoryLoading && !isHistoryError) {
      const formattedMessages = chatHistory.flatMap(chat => [
        { id: `q-${chat.id}`, text: chat.question, isUser: true },
        { id: `a-${chat.id}`, text: chat.text, isUser: false }
      ]);
      setMessages(formattedMessages);
    }
  }, [chatHistory, isHistoryLoading, isHistoryError]);



  // 스트리밍 응답 처리 useEffect 수정
  useEffect(() => {
    if (streamingResponse) {
      try {
        // 'data:' 부분 제거 및 JSON 파싱
        const cleanedStr = streamingResponse.split('data:')[1] || streamingResponse;
        const parsedResponse = JSON.parse(cleanedStr);
        const answer = parsedResponse.answer;
        console.log('parsedResponse', parsedResponse)
        console.log('parsedResponse.answer', parsedResponse.answer)

        console.log('answer', answer)
        // 누적된 응답 업데이트
        setAccumulatedResponse(prev => prev + answer);

        // 메시지 업데이트
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1];

          if (!lastMessage || lastMessage.isUser) {
            // 새로운 AI 메시지 추가
            return [...prev, {
              id: `stream-${Date.now()}`,
              text: accumulatedResponse + answer,
              isUser: false
            }];
          }

          // 기존 AI 메시지 업데이트 (누적된 응답 사용)
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            text: accumulatedResponse + answer
          };
          return newMessages;
        });
      } catch (error) {
        console.error('스트리밍 응답 파싱 에러:', error);
        // setSendError('응답 처리 중 오류가 발생했습니다.');
      }
    }
  }, [streamingResponse]);

  // 메시지 전송 핸들러
  const handleSend = async () => {
    if (!inputText.trim() || isSending || !token || !activeRepositoryId) return;

    const userMessageId = Date.now();
    // 사용자 메시지 즉시 표시
    setMessages(prev => [...prev, {
      id: `q-${userMessageId}`,
      text: inputText,
      isUser: true
    }]);

    // 상태 초기화
    setInputText('');
    setIsSending(true);
    setSendError(null);
    setStreamingResponse('');
    setAccumulatedResponse(''); // 누적 응답 초기화

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}api/chatbot/stream-and-save/${activeRepositoryId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            question: inputText
          })
        }
      );

      if (!response.ok) {
        throw new Error(`응답 오류: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setStreamingResponse(chunk);
      }

    } catch (error) {
      console.error('메시지 전송 에러:', error);
      setSendError(error.message);
      setMessages(prev => [...prev, {
        id: `error-${userMessageId}`,
        text: "죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.",
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsSending(false);
    }
  };


  // 대화 초기화 핸들러
  const handleReset = async () => {
    try {
      await resetChat(); // 서버 측 히스토리 초기화
      setMessages([]); // 로컬 메시지 초기화
      setStreamingResponse('');
      setSendError(null);
    } catch (error) {
      console.error('대화 초기화 에러:', error);
      setSendError('대화 초기화 중 오류가 발생했습니다.');
    }
  };



  useClickAway(menuRef, () => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  // 스크롤 핸들러
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  // 통합 로딩 상태 (히스토리 로딩 or 메시지 전송 중)
  const isLoading = isHistoryLoading || isSending;

  // 에러 메시지 우선순위
  const displayError = sendError || (isHistoryError ? historyError : null);



  return (
    <ChatWrapper>
      <EllipsisMenuWrapper>
        <EllipsisVerticalIcon
          className="ellipsis-menu"
          ref={menuRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <EllipsisVertical size={'1rem'} />
          <EllipsisMenu
            isOpen={isMenuOpen}
            $disabled={messages.length === 0}
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
        {/* 에러 메시지 표시 */}
        {displayError && (
          <ErrorBanner>
            {displayError}
          </ErrorBanner>
        )}
        <MessageContainer>
          {/* Welcome message */}
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
            messages.length === 0 && !isHistoryLoading ?
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
                    <p style={{ wordBreak: 'keep-all' }}>
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

          {/* Chat messages */}

          <ChatMessages>
            {messages.map(message => (
              <MessageBubble key={message.id} isUser={message.isUser}>
                <Avatar isUser={message.isUser}>
                  {message.isUser ? <User size={18} /> : <Bot size={18} />}
                </Avatar>
                <Message isUser={message.isUser} $isError={message.isError}>
                  {message.isUser ? (
                    message.text
                  ) : (
                    <TypingMarkdownRenderer
                      content={message.text}
                      onComplete={() => console.log('타이핑 완료')}
                    />
                  )}
                </Message>
              </MessageBubble>
            ))}
            {isLoading && (
              <MessageBubble isUser={false}>
                <Avatar isUser={false}>
                  <Bot size={18} />
                </Avatar>
                <Message isUser={false}>
                  <LoadingMessage>
                    <LoadingDots>
                      <span></span>
                      <span></span>
                      <span></span>
                    </LoadingDots>
                    <LoadingText>
                      {isHistoryLoading ? '채팅 내역을 불러오는 중...' : '답변 생성 중...'}
                    </LoadingText>
                  </LoadingMessage>
                </Message>
              </MessageBubble>
            )}
            <div ref={messagesEndRef} />
          </ChatMessages>
        </MessageContainer>

        <InputContainer>
          <InputWrapper $isLoading={isLoading}>
            <Input
              type="text"
              placeholder={isLoading ? "잠시만 기다려주세요..." : "코드에 대해 궁금한 점을 물어보세요..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <LoadingStatus $isVisible={isLoading}>
              <LoadingDots>
                <span></span>
                <span></span>
                <span></span>
              </LoadingDots>
            </LoadingStatus>
            <ActionButton
              onClick={handleReset}
              title="대화 새로 시작하기"
              disabled={messages.length === 0 || isLoading}
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


