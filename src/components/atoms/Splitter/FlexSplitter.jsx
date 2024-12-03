// src/components/atoms/Splitter/FlexSplitter.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, LeftPanel,
  Divider, DividerLine,
  RightPanel,
  NarrowPanel, WidePanel
} from './FlexSplitter.styles.js'


const FlexSplitter = ({
  splitterWidth = '100%',
  initialLeftWidth = 250,
  minWidth = 150,
  maxWidth = 800,
  position = 'left',
  children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartWidth(leftWidth);
    e.preventDefault();
  }, [leftWidth]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    // position에 따라 deltaX의 부호를 반대로 적용
    const adjustedDelta = position === 'left' ? deltaX : -deltaX;
    const newWidth = Math.min(Math.max(startWidth + adjustedDelta, minWidth), maxWidth);
    setLeftWidth(newWidth);
  }, [isDragging, startX, startWidth, minWidth, maxWidth, position]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <Container splitterWidth={splitterWidth}>
      {
        position === 'left' ?
          <>
            <NarrowPanel width={leftWidth} isDragging={isDragging}>
              {children[0]}
            </NarrowPanel>
            <Divider onMouseDown={handleMouseDown} isDragging={isDragging}>
              <DividerLine isDragging={isDragging} />
            </Divider>
            <WidePanel>
              {children[1]}
            </WidePanel>
          </>
          :
          <>
            <WidePanel>
              {children[0]}
            </WidePanel>
            <Divider onMouseDown={handleMouseDown} isDragging={isDragging}>
              <DividerLine isDragging={isDragging} />
            </Divider>
            <NarrowPanel width={leftWidth} isDragging={isDragging}>
              {children[1]}
            </NarrowPanel>
          </>
      }

    </Container>

  );
};

export default FlexSplitter;