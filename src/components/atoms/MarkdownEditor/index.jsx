import React, { useState, useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import styled from 'styled-components';
import mermaid from 'mermaid';
import hljs from 'highlight.js';
// 원하는 스타일 테마 import (dark 테마 예시)
import 'highlight.js/styles/atom-one-dark.css';
// 에디터 컨테이너 스타일
const EditorContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
`;

const EditorSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 16px;
  background: rgba(63, 63, 70, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #e4e4e7;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #d923ff;
  }
`;

// 프리뷰 스타일 (기존 MarkdownContainer와 동일)
const PreviewContainer = styled.div`
  color: #e4e4e7;
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 1.5rem;
  background: rgba(63, 63, 70, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow-y: auto;

  
  code {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.9em;
  }

  :not(pre) > code {
    background: rgba(63, 63, 70, 0.5);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
  }

  pre {
    margin: 1.5rem 0;
    border-radius: 0.5rem;
    overflow-x: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);

    code {
      // highlight.js 스타일이 적용될 수 있도록 배경색 제거
      background: transparent;
      padding: 1rem;
      display: block;
    }
  }

  // highlight.js 테마 커스터마이징
  .hljs {
    background: #282c34;
    color: #abb2bf;
  }
`;

// 커스텀 Mermaid 플러그인
const mermaidPlugin = (md) => {
  const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info === 'mermaid') {
      return `<div class="mermaid">${token.content}</div>`;
    }
    return defaultFence(tokens, idx, options, env, self);
  };
};

// Markdown-it 초기화
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) { }
    }
    return ''; // 언어가 지정되지 않은 경우 기본 처리
  }
}).use(mermaidPlugin);

// Mermaid 초기화
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#d923ff',
    primaryTextColor: '#e4e4e7',
    primaryBorderColor: 'rgba(255, 255, 255, 0.1)',
    lineColor: '#e4e4e7',
    secondaryColor: 'rgba(63, 63, 70, 0.5)',
    tertiaryColor: 'rgba(63, 63, 70, 0.3)',
  },
  fontFamily: 'JetBrains Mono, monospace',
  securityLevel: 'loose',
});

const MarkdownEditor = ({ initialValue = '', onChange }) => {
  const [markdown, setMarkdown] = useState(initialValue);

  useEffect(() => {
    mermaid.contentLoaded();
  }, [markdown]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setMarkdown(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const processMarkdown = (content) => {
    return md.render(content);
  };

  return (
    <EditorContainer>
      <EditorSection>
        <TextArea
          value={markdown}
          onChange={handleChange}
          placeholder="마크다운을 입력하세요..."
        />
      </EditorSection>
      <EditorSection>
        <PreviewContainer
          dangerouslySetInnerHTML={{ __html: processMarkdown(markdown) }}
        />
      </EditorSection>
    </EditorContainer>
  );
};

export default MarkdownEditor;