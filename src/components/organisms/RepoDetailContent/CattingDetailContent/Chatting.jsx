import React, { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Send, User, Bot, Sparkles, RefreshCw, EllipsisVertical } from 'lucide-react';
import { Typo } from "../../../index.js";
import useClickAway from '../../../../hooks/useClickAway.js';
import { useChatbot } from '../../../../hooks/RepoDetailContent/useChatbot.js';
import { TypingMarkdownRenderer, MarkdownRenderer } from '../../../index.js';
import { chattingText } from "../chattingText.jsx";
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
  LoadingDots
} from "./Chatting.styles.js"


const ChatbotUI = () => {
  const { activeRepositoryId } = useRegisteredRepoStore();
  const token = useAuthStore(state => state.token);

  const {
    chatHistory,
    isLoading: isChatLoading,
    isError,
    error,
    sendMessage,
    resetChat
  } = useChatbot(activeRepositoryId);

  const [streamingResponse, setStreamingResponse] = useState('');

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);  // 메뉴 ref 생성


  const [isTest, setIsTest] = useState(0);




  // 채팅 히스토리 동기화
  useEffect(() => {
    if (chatHistory) {
      const formattedMessages = chatHistory.flatMap(chat => [
        { id: `q-${chat.id}`, text: chat.question, isUser: true },
        { id: `a-${chat.id}`, text: chat.text, isUser: false }
      ]);
      setMessages(formattedMessages);
    }
  }, [chatHistory]);

  // 스트리밍 응답이 업데이트될 때마다 메시지 업데이트
  useEffect(() => {
    if (streamingResponse) {
      console.log("스트리밍 응답이 업데이트될 때마다 메시지 업데이트", streamingResponse)
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.isUser) {
        // 새로운 AI 응답 메시지 추가
        setMessages(prev => [...prev, {
          id: `stream-${Date.now()}`,
          text: streamingResponse,
          isUser: false
        }]);
      } else {
        // 기존 AI 응답 메시지 업데이트
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            text: streamingResponse
          };
          return newMessages;
        });
      }
    }
  }, [streamingResponse]);

  // 메시지 전송 핸들러
  const handleSend = async () => {
    if (!inputText.trim() || isChatLoading || !token || !activeRepositoryId) return;

    const userMessageId = Date.now();
    setMessages(prev => [...prev, {
      id: `q-${userMessageId}`,
      text: inputText,
      isUser: true
    }]);

    setInputText('');
    setStreamingResponse('');

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log(result);

      setMessages(prev => [...prev, {
        id: `a-${userMessageId}`,
        text: result,
        isUser: false
      }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: `error-${userMessageId}`,
        text: "죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.",
        isUser: false,
        isError: true
      }]);
      console.error('채팅 요청 에러:', error);
    }
  };

  // 대화 초기화 핸들러
  const handleReset = async () => {
    await resetChat();
    setMessages([]);
    setStreamingResponse('');

  };



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
    console.log(messages)
  }, [messages]);



  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
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
                <Message isUser={message.isUser}>
                  {
                    message.isUser ?
                      message.text
                      :
                      <TypingMarkdownRenderer
                        content={message.text}
                        // onComplete={() => handleMessageComplete(message.id)}
                        onComplete={() => console.log('타이핑 완료')} // 필요한 경우에만 사용

                      />

                  }
                  {/* <MarkdownRenderer content={message.text} /> */}
                  {/* {message.text} */}
                </Message>
              </MessageBubble>
            ))}
            {isChatLoading && (
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
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              disabled={isChatLoading}
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
              disabled={!inputText.trim() || isChatLoading}
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


