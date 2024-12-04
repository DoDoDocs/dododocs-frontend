import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import styled from 'styled-components';

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
    font-family: 'JetBrains Mono', monospace;
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
        content: '•';
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
}
    svg {
      max-width: 100%;
      height: auto;
    }

`;


const MermaidRenderer = ({ content }) => {
  const elementRef = useRef();

  useEffect(() => {
    let mounted = true;

    const renderDiagram = async () => {
      if (!elementRef.current || !mounted) return;

      try {
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        elementRef.current.innerHTML = '';
        const { svg } = await mermaid.render(id, content);
        if (mounted && elementRef.current) {
          elementRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error('Mermaid rendering failed:', error);
        if (mounted && elementRef.current) {
          elementRef.current.innerHTML = 'Failed to render diagram';
        }
      }
    };

    renderDiagram();

    return () => {
      mounted = false;
    };
  }, [content]);

  return <div className="mermaid" ref={elementRef} />;
};


const MarkdownRenderer = ({ content }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
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
  }, []);

  const processMarkdown = (markdown) => {
    // 1. 줄 단위로 분리하고 각 줄 양 끝의 공백 제거
    let lines = markdown.split('\n').map((line) => line.trim());

    // 2. 빈 줄 제거
    lines = lines.filter((line) => line !== '');

    // 3. 특정 키워드 대체 (예: `[TODO]` → `**TODO**`)
    // lines = lines.map((line) =>
    //   line.replace(/\[TODO\]/g, '**TODO**') // 원하는 키워드 대체
    // );

    // 4. Mermaid 블록 감지 및 처리


    // 5. 최종적으로 다시 문자열로 합치기

    return lines.join('\n')
    // return markdown.split('\n').map((v) => v.trim()).join('\n')

  };

  const components = {

    code({ inline, children, className }) {
      const match = /language-mermaid/.test(className || "");
      return !inline && match ? (
        <MermaidRenderer content={String(children).trim()} />
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <MarkdownContainer>
      <ReactMarkdown components={components}>
        {processMarkdown(content)}
        {/* {content.split('\n').map((v) => v.trim()).join('\n')} */}
      </ReactMarkdown>
    </MarkdownContainer>
  );
};

export default MarkdownRenderer;