import React from 'react';
import styled from 'styled-components';
import { MarkdownRenderer } from '../../index.js';

const RendererContainer = styled.div`
  min-height: 20px;
`;

// 스트리밍 응답을 바로 렌더링하는 단순화된 컴포넌트
const StreamingMarkdownRenderer = ({ content, onComplete }) => {
  // 컴포넌트가 마운트되면 onComplete 호출
  React.useEffect(() => {
    if (onComplete) {
      onComplete();
    }
  }, [content]);

  return (
    <RendererContainer>
      <MarkdownRenderer content={content} />
    </RendererContainer>
  );
};

export default StreamingMarkdownRenderer;