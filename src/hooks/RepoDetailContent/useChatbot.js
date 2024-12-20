// src/hooks/useChatbot.js
import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { chatbotAPI } from '../../api/index.js';

export const useChatbot = (registeredRepoId) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // 채팅 히스토리 조회
  const {
    data: chatHistory,
    isLoading: isHistoryLoading,
    isError,
    error,
    refetch: refetchHistory,
  } = useQuery({
    queryKey: ['chatHistory', registeredRepoId],
    queryFn: () => chatbotAPI.getChatbotHistory(registeredRepoId),
    enabled: !!registeredRepoId,
    select: (data) => {
      return data.findChatLogResponses.map((chat, index) => ({
        id: index,
        text: chat.answer,
        isUser: false,
        question: chat.question,
      }));
    },
  });

  // 메시지 전송 핸들러
  const handleSendMessage = useCallback(
    //TODO if guide 경우
    //  const handleSend = async () => {
    //     if (!inputText.trim() || isLoading) return;

    //     // Add user message
    //     setMessages(prev => [...prev, {
    //       id: Date.now(),
    //       text: inputText,
    //       isUser: true
    //     }]);
    //     setInputText('');
    //     setIsLoading(true);

    //     try {
    //       // Simulate API call
    //       await new Promise(resolve => setTimeout(resolve, 2000));
    //       if (isTest === 0) {
    //         setMessages(prev => [...prev, {
    //           id: Date.now(),
    //           text: chattingText[0],
    //           isUser: false
    //         }]);
    //         setIsTest((state) => state + 1);
    //       }
    //       if (isTest === 1) {
    //         setMessages(prev => [...prev, {
    //           id: Date.now(),
    //           text: chattingText[1],
    //           isUser: false
    //         }]);
    //         setIsTest((state) => state + 1);
    //       }

    //       if (isTest > 1) {
    //         setMessages(prev => [...prev, {
    //           id: Date.now(),
    //           text: chattingText[2],
    //           isUser: false
    //         }]);
    //         setIsTest((state) => state + 1);
    //       }

    //     } catch (error) {
    //       setMessages(prev => [...prev, {
    //         id: Date.now(),
    //         text: "죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.",
    //         isUser: false,
    //         isError: true
    //       }]);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    async (message) => {
      if (!message.trim()) return null;

      setIsLoading(true);
      try {
        // API 호출 및 응답 처리
        const response = await chatbotAPI.postChatMessage(registeredRepoId, {
          question: message,
        });

        // 채팅 히스토리 갱신
        await refetchHistory();

        return {
          success: true,
          response: response.answer,
        };
      } catch (error) {
        console.error('Failed to send message:', error);
        return {
          success: false,
          error: error.message,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [registeredRepoId, refetchHistory],
  );

  // 채팅 초기화
  const resetChat = useCallback(async () => {
    try {
      // 채팅 초기화 API 호출 (필요한 경우)
      // await chatBotAPI.resetChat(registeredRepoId);

      // 캐시 무효화
      await queryClient.invalidateQueries(['chatHistory', registeredRepoId]);
    } catch (error) {
      console.error('Failed to reset chat:', error);
    }
  }, [queryClient, registeredRepoId]);

  return {
    chatHistory,
    isLoading: isLoading || isHistoryLoading,
    isError,
    error,
    sendMessage: handleSendMessage,
    resetChat,
  };
};
