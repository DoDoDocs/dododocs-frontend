import styled from 'styled-components';

export const MarkdownContainer = styled.div`
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
    position: relative; // 부모에 relative 추가
  }

  h1 {
    font-size: 2rem;
    border-bottom: 1px solid rgba(63, 63, 70, 0.7);
  }
  h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid rgba(63, 63, 70, 0.7);
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
        transform: translate(0, -0.05rem);
      }
    }

    /* ul 리스트의 불릿 스타일 */
    &:not(ol) > li::before {
      content: '•'; /* 기본 불릿 기호 */
      color: #d923ff;
    }

    /* ol 리스트의 숫자 스타일 */
    &[type='1'],
    & {
      counter-reset: list-counter; /* 리스트 초기화 */

      > li {
        counter-increment: list-counter; /* 숫자 증가 */
        &::before {
          content: counter(list-counter) '.'; /* 숫자 형식 */
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
        content: '–'; /* 중첩된 리스트 불릿 */
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
          content: counter(nested-counter) '.'; /* 숫자 형식 */
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
          content: '∘'; /* 중첩된 리스트 불릿 */
          color: #e980ff;
          font-size: 1.2em;
        }

        &[type='1'] > li::before {
          content: counter(list-counter) '.' counter(nested-counter) '.'
            counter(subnested-counter); /* 3단계 숫자 */
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
    font-size: 0.8rem;
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
