// src/components/organisms/RepoContent/RepoContent.style.js
import styled, { css } from 'styled-components';

export const ContentStyle = styled.div`
  /* min-height: calc(100dvh - 11.5dvh); */
  height: auto;
  margin-top: 11.5dvh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  /* 수평 패딩은 더 넓게, 수직 패딩은 상단 여백을 더 확보 */
  padding: clamp(4vh, 5vh, 8vh) clamp(3.5vw, 5vw, 8vw);

  /* 반응형 미디어 쿼리 추가 */
  @media (max-width: 768px) {
    padding: clamp(3vh, 4vh, 6vh) clamp(2vw, 3vw, 4vw);
  }
`;

export const RepoBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* min-width: clamp(20rem, 50vw, 40vw); */
  width: min(100% - 2rem, clamp(33.75rem, 85vw, 82.5rem));
  /* border: 1px solid #fwawa01050220621  fffff; */
  border-radius: 0.75rem;
  /* padding: 2rem 0; */
  row-gap: 2.5rem;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  border: 1px solid rgba(63, 63, 70, 0.7);
  border-radius: 0.75rem;
  padding: 0.75rem 0;
  /* background-color: #27272a; */
  background-color: #16181e;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 1.5rem 1rem 1rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Divider = styled.div`
  border-top-color: rgba(63, 63, 70, 0.7);
  border-top-style: solid;
  border-top-width: 1px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border-radius: 0;
`;
export const SearchTextWrapper = styled.div`
  width: auto;
  padding: 0.5rem 1rem 1rem 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const DeleteBtn = styled.div`
  padding: 0.2rem 0.5rem;
  /* border: 1px #e5e7eb solid; */

  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.2rem;
  width: fit-content;
  height: auto;
  transition: all 0.3s ease;
  color: #dc2626;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  span {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1rem; /* 텍스트의 높이를 font-size와 동일하게 */
    height: 1.3rem;
    display: flex;
    align-items: flex-end;
  }

  &:hover {
    /* background-color: rgba(229, 231, 235, 0.09); */
    background-color: rgba(220, 21, 21, 0.15);
  }
`;
