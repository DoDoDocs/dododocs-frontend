import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { MarkdownRenderer } from '../../index.js';

const TypewriterContainer = styled.div`
  min-height: 20px;
`;

const TypingMarkdownRenderer = ({ content, onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    if (!content) return;

    // 타이핑 시작 시 초기화
    setDisplayedContent('');
    currentIndexRef.current = 0;
    setIsTyping(true);

    intervalRef.current = setInterval(() => {
      if (currentIndexRef.current < content.length) {
        setDisplayedContent(prev => prev + content[currentIndexRef.current]);
        currentIndexRef.current++;
      } else {
        clearInterval(intervalRef.current);
        setIsTyping(false);
        onComplete && onComplete();
      }
    }, 10); // 타이핑 속도 조절

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [content]);

  return (
    <TypewriterContainer>
      {isTyping ? (
        <MarkdownRenderer content={displayedContent} />
      ) : (
        <MarkdownRenderer content={content} />
      )}
    </TypewriterContainer>
  );
};

export default TypingMarkdownRenderer;