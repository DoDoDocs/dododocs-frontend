import React, { useEffect } from "react";
import MarkdownIt from "markdown-it";
import markdownItAnchor from 'markdown-it-anchor';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import styled from "styled-components";
import mermaid from "mermaid";
import hljs from 'highlight.js';


const MarkdownContainer = styled.div`
  color: #e4e4e7;
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 0rem 1.5rem 0rem 2rem;

  h1,
  h2,
  h3 {
    color: white;
    font-weight: 500;
    margin: 2rem 0 1rem;
    position: relative;  // 부모에 relative 추가
  }

  h1 {
    font-size: 2rem;
    border-bottom : 1px solid rgba(63, 63, 70, 0.7);
  }
  h2 {
    font-size: 1.5rem;
    border-bottom : 1px solid rgba(63, 63, 70, 0.7);

  }
  h3 {
    font-size: 1.25rem;
  }

  p {
    margin: 1rem 0;
  }

  code {
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

  ul,ol {
  list-style: none; /* 기본 목록 스타일 제거 */
  padding-left: 1.5rem;
  margin: 0.8rem 0;

  li {
    position: relative;
    margin: 0.6rem 0;
    padding-left: 0.2rem;
    transition: all 0.2s ease;

    &::before {
      position: absolute;
      left: -1.2rem; /* 불릿 또는 숫자 위치 */
      opacity: 0.9;
      font-size: 1.1em;
      transition: all 0.2s ease;
      transform: translate(0,-0.05rem);
    }
  }

  /* ul 리스트의 불릿 스타일 */
  &:not(ol) > li::before {
    content: "•"; /* 기본 불릿 기호 */
    color: #d923ff;
  }

  /* ol 리스트의 숫자 스타일 */
  &[type="1"],
  & {
    counter-reset: list-counter; /* 리스트 초기화 */

    > li {
      counter-increment: list-counter; /* 숫자 증가 */
      &::before {
        content: counter(list-counter) "."; /* 숫자 형식 */
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  /* 중첩된 ul 리스트 스타일 */
  ul {
    margin: 0.4rem 0;
    padding-left: 1.6rem;
    border-left: 1px dashed rgba(161, 161, 170, 0.2);

    > li::before {
      content: "–"; /* 중첩된 리스트 불릿 */
      color: #e980ff;
      font-size: 1em;
      left: -1rem;
    }
  }

  /* 중첩된 ol 리스트 스타일 */
  ol {
    counter-reset: nested-counter; /* 중첩 리스트 초기화 */

    > li {
      counter-increment: nested-counter; /* 중첩 숫자 증가 */
      &::before {
        content: counter(nested-counter) "."; /* 숫자 형식 */
        color: rgba(255, 255, 255, 0.8);
      }
    }

    /* 3단계 중첩 리스트 */
    ul,
    ol {
      margin: 0.4rem 0;
      padding-left: 1.6rem;
      border-left: 1px dashed rgba(161, 161, 170, 0.2);

      &:not(ol) > li::before {
        content: "∘"; /* 중첩된 리스트 불릿 */
        color: #e980ff;
        font-size: 1.2em;
      }

      &[type="1"] > li::before {
        content: counter(list-counter) "." counter(nested-counter) "." counter(subnested-counter); /* 3단계 숫자 */
        counter-increment: subnested-counter;
        color: #e980ff;
      }
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

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .toc-item {
    margin: 0.5rem 0;
    padding-left: 1rem;
    
    &::before {
      display: none; // 기존 bullet point 제거
    }
  }

  .toc-link {
    color: #e4e4e7;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #d923ff;
    }
  }

  .header-anchor {
    position: absolute;
    font-size : 0.8rem;
    left: -1.3rem;
    top: 50%;
    transform: translateY(calc(-50%));
    opacity: 0;
    transition: opacity 0.2s;
    text-decoration: none;
    color: #d923ff;
    
    &:hover {
      opacity: 1;
      color: #e980ff;
    }
  }

  h1:hover .header-anchor,
  h2:hover .header-anchor,
  h3:hover .header-anchor {
    opacity: 0.5;
  }
`;
// // 커스텀 Mermaid 플러그인 정의
// const mermaidPlugin = (md) => {
//   const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules);

//   md.renderer.rules.fence = (tokens, idx, options, env, self) => {
//     const token = tokens[idx];
//     if (token.info === 'mermaid') {
//       return `<div class="mermaid">${token.content}</div>`;
//     }
//     return defaultFence(tokens, idx, options, env, self);
//   };
// };


// slug 생성 함수
const slugify = (s) => {
  return encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
};

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
  breaks: true,
  indent: true,
  // 중첩 목록 처리를 위한 설정 추가

  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) { }
    }
    return ''; // 언어가 지정되지 않은 경우 기본 처리
  }
})
  .use(markdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f0f6fc" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',

    level: [1, 2], // h2 태그만 대상으로 지정
    slugify: slugify,
    // Table of Contents 섹션에만 앵커 표시
    permalinkFilter: (slug, state) => {
      const title = state.tokens.find(token =>
        token.type === 'heading_open' &&
        (token.markup === '#' || token.markup === '##') &&
        token.map
      );
      if (!title) return false;

      const contentIndex = title.map[0] + 1;
      const content = state.tokens[contentIndex].content;

      return content.includes('Table of Contents');
    }
  })
  .use(mermaidPlugin)


const MarkdownViewer = ({ content }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [content]);

  const processMarkdown = (markdown) => {
    const lines = markdown.split('\n');

    // 모든 줄의 시작 공백 길이 확인
    const leadingSpaces = lines
      .filter(line => line.trim()) // 빈 줄 제외
      .map(line => {
        const match = line.match(/^\s+/);
        return match ? match[0].length : 0;
      });

    // 가장 작은 공통 공백 길이 찾기
    const minCommonSpace = leadingSpaces.length > 0
      ? Math.min(...leadingSpaces)
      : 0;

    // 공통 공백이 있는 경우에만 제거
    if (minCommonSpace > 0) {
      const cleanedContent = lines
        .map(line => (line.startsWith(' '.repeat(minCommonSpace)) ? line.slice(minCommonSpace) : line))
        .join('\n');
      return md.render(cleanedContent);
    }

    // 공통 공백이 없으면 원본 그대로 렌더링
    return md.render(markdown);
  };

  return (
    <MarkdownContainer
      dangerouslySetInnerHTML={{ __html: processMarkdown(content) }}
    />
  );
};


export default MarkdownViewer;