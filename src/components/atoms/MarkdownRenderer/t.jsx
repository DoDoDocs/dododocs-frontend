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
    
    svg {
      max-width: 100%;
      height: auto;
    }
  }
`;


const MermaidRenderer = ({ content }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (mermaidRef.current) {
      const renderDiagram = async () => {
        mermaidRef.current.innerHTML = '';
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        mermaidRef.current.id = id;

        try {
          await mermaid.render(id, content, (svgCode) => {
            mermaidRef.current.innerHTML = svgCode;
          });
        } catch (error) {
          console.error('Mermaid rendering failed:', error);
          mermaidRef.current.innerHTML = 'Failed to render diagram';
        }
      };

      renderDiagram();
    }
  }, [content]);

  return <div ref={mermaidRef} className="mermaid" />;
};

const MarkdownRenderer = ({ content }) => {
  useEffect(() => {
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
  }, []);

  const processMarkdown = (markdown) => {
    // 문자열을 줄 단위로 분할
    const lines = markdown.split('\n').map(line => line.trim());
    let processedLines = [];
    let inMermaidBlock = false;
    let currentMermaidContent = [];

    lines.forEach(line => {
      console.log(line)
      if (line.trim() === '```mermaid') {
        inMermaidBlock = true;
      } else if (line.trim() === '```' && inMermaidBlock) {
        // Mermaid 블록 종료
        processedLines.push(
          `<div class="mermaid-wrapper">
            ${currentMermaidContent.join('\n')}
          </div>`
        );
        currentMermaidContent = [];
        inMermaidBlock = false;
      } else if (inMermaidBlock) {
        // Mermaid 콘텐츠 수집
        currentMermaidContent.push(line);
      } else {
        // 일반 마크다운 라인
        processedLines.push(line);
      }
    });

    return processedLines.join('\n');
  };

  const components = {
    div({ node, className, children, ...props }) {
      if (className === 'mermaid-wrapper') {
        return <MermaidRenderer content={children[0]} />;
      }
      return <div className={className} {...props}>{children}</div>;
    }
  };

  return (
    <MarkdownContainer>
      <ReactMarkdown components={components}>
        {processMarkdown(content)}
      </ReactMarkdown>
    </MarkdownContainer>
  );
};

export default MarkdownRenderer;