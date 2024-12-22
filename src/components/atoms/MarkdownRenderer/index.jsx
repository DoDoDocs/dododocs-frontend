import React, { useEffect, useMemo, useCallback } from "react";
import { MarkdownContainer } from "./MarkdownRenderer.styles";

import MarkdownIt from "markdown-it";
import markdownItAnchor from 'markdown-it-anchor';
import mermaid from "mermaid";
import hljs from 'highlight.js/lib/core';

// highlight.js 필요한 언어만 등록
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import java from 'highlight.js/lib/languages/java';
import typescript from 'highlight.js/lib/languages/typescript';


// highlight.js 필요한 언어만 등록
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('java', java);
hljs.registerLanguage('typescript', typescript);


// URL에 사용할 수 있는 형태로 문자열 변환
const slugify = (s) => {
  return encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'));
};

// Mermaid 다이어그램 플러그인 설정
const mermaidPlugin = (md) => {
  const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules);

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // mermaid 코드 블록 처리
    if (token.info === 'mermaid') {
      return `<div class="mermaid">${token.content}</div>`;
    }
    return defaultFence(tokens, idx, options, env, self);
  };
};

// Mermaid 초기설정
const mermaidConfig = {
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
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
  }
};

// markdown-it 설정
const markdownConfig = {
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  indent: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, {  // highlight -> hljs.highlight
          language: lang,
          ignoreIllegals: true
        }).value;
      } catch (err) {
        console.error('Highlight error:', err);
      }
    }
    return '<pre><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
};
// markdown-it 인스턴스 생성 및 플러그인 설정
const md = new MarkdownIt(markdownConfig)
  .use(markdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    // 링크 아이콘 SVG
    permalinkSymbol: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f0f6fc" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
    level: [1, 2], // h1, h2 태그만 앵커 적용
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
  .use(mermaidPlugin);

// 메인 컴포넌트
const MarkdownViewer = React.memo(({ content }) => {
  // Mermaid 초기화
  useEffect(() => {
    try {
      mermaid.initialize(mermaidConfig);
      mermaid.contentLoaded();
    } catch (error) {
      console.error('Mermaid initialization error:', error);
    }
  }, [content]);

  // 마크다운 처리 로직
  const processMarkdown = useCallback((markdown) => {
    try {
      const lines = markdown.split('\n');

      // 공통 들여쓰기 공백 찾기
      const leadingSpaces = lines
        .filter(line => line.trim())
        .map(line => {
          const match = line.match(/^\s+/);
          return match ? match[0].length : 0;
        });

      const minCommonSpace = leadingSpaces.length > 0
        ? Math.min(...leadingSpaces)
        : 0;

      // 공통 들여쓰기 제거
      if (minCommonSpace > 0) {
        const cleanedContent = lines
          .map(line => (line.startsWith(' '.repeat(minCommonSpace)) ? line.slice(minCommonSpace) : line))
          .join('\n');
        return md.render(cleanedContent);
      }

      return md.render(markdown);
    } catch (err) {
      console.error('Markdown processing error:', err);
      return 'Error processing markdown content';
    }
  }, []);

  // 컨텐츠 메모이제이션
  const renderedContent = useMemo(() =>
    processMarkdown(content),
    [content, processMarkdown]
  );

  // 성능 모니터링
  useEffect(() => {
    performance.mark('markdown-render-start');
    return () => {
      performance.mark('markdown-render-end');
      performance.measure(
        'markdown-render',
        'markdown-render-start',
        'markdown-render-end'
      );
    };
  }, [content]);

  return (
    <MarkdownContainer
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
});

MarkdownViewer.displayName = 'MarkdownViewer';

export default MarkdownViewer;