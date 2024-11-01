import React, { useState, useEffect } from 'react';
import { RotateWrapper, RotateWords } from "./RotateTypo.styles.js"


const RotateTypo = ({ rotateText }) => {
  const [showChatting, setShowChatting] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setShowChatting(prev => (prev + 1) % rotateText.length);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused, rotateText.length]);

  // 선택적: 마우스 호버 시 일시정지 기능
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <RotateWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {
        rotateText.map((text, index) => (
          <RotateWords key={index} isVisible={showChatting === index}
          >
            {text}
          </RotateWords>
        ))
      }

    </RotateWrapper>
  );
};

export default RotateTypo;