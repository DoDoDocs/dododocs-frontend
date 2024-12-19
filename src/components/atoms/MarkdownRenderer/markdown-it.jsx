import React, { useEffect, useRef } from "react";
import MarkdownIt from "markdown-it";
import markdownItMermaid from "markdown-it-mermaid";
import styled from "styled-components";
import mermaid from "mermaid";

const MarkdownContainer = styled.div`
  color: #e4e4e7;
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 1.5rem;

  h1,
  h2,
  h3 {
    color: white;
    font-weight: 500;
    margin: 2rem 0 1rem;
  }

  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.25rem;
  }

  p {
    margin: 1rem 0;
  }

  code {
    background: rgba(63, 63, 70, 0.5);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.9em;
  }

  pre {
    background: rgba(63, 63, 70, 0.5);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin: 1.5rem 0;
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 1rem 0;

    li {
      margin: 0.5rem 0;
      position: relative;
      &::before {
        content: "•";
        color: #d923ff;
        position: absolute;
        left: -1rem;
      }
    }
  }

  blockquote {
    border-left: 3px solid #d923ff;
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(217, 35, 255, 0.05);
    padding: 1rem;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;

    th,
    td {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.75rem;
      text-align: left;
    }

    th {
      background: rgba(63, 63, 70, 0.8);
      color: white;
    }

    tr:nth-child(even) {
      background: rgba(63, 63, 70, 0.3);
    }
  }

  a {
    color: #d923ff;
    text-decoration: none;
    transition: all 0.2s;

    &:hover {
      color: #e980ff;
      text-decoration: underline;
    }
  }

  .mermaid {
    background: rgba(63, 63, 70, 0.3);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      max-width: 100%;
      height: auto;
    }
  }
`;
// 커스텀 Mermaid 플러그인 정의
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

// markdown-it 인스턴스 생성 및 설정
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true
}).use(mermaidPlugin);

const MarkdownViewer = ({ content }) => {
  useEffect(() => {
    // 마운트 시 Mermaid 다이어그램 렌더링
    mermaid.contentLoaded();
  }, [content]);

  const processMarkdown = (markdown) => {
    const trimmedContent = markdown
      .split('\n')
      .map(line => line.trim())
      .join('\n');
    return md.render(trimmedContent);
  };

  return (
    <MarkdownContainer
      dangerouslySetInnerHTML={{ __html: processMarkdown(content) }}
    />
  );
};

export default MarkdownViewer;