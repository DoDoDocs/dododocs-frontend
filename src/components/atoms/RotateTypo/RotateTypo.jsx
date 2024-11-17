// src/components/atoms/RotateTypo/RotateTypo.jsx
import React, { useState, useEffect } from 'react';
import { RotateWrapper, RotateWords } from "./RotateTypo.styles.js"


const RotateTypo = () => {
  const ROTATE_TEXT = ["AI Code Document", "AI Chatting", "Read Me Editor"];
  const [showChatting, setShowChatting] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setShowChatting(prev => (prev + 1) % ROTATE_TEXT.length);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused, ROTATE_TEXT.length]);

  //마우스 호버 시 일시정지 기능
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <RotateWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {
        ROTATE_TEXT.map((text, index) => (
          <RotateWords key={index} $isPrevVisible={index === (showChatting + ROTATE_TEXT.length - 1) % ROTATE_TEXT.length} $isVisible={index === showChatting}>
            {text}
          </RotateWords>
        ))
      }

    </RotateWrapper>
  );
};

export default RotateTypo;