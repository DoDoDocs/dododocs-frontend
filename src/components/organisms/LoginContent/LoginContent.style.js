import styled from 'styled-components';

export const ContentStyle = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: clamp(2.6vh, 4vh, 6vh) clamp(2vw, 3vw, 6.2vw);
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: clamp(20rem, 90vw, 28rem);
  border: 1px solid #ffffff4d;
  border-radius: 0.25rem;
  padding: 2rem;
  row-gap: 1rem;
`;

export const Divider = styled.div`
  border-top-color: rgba(255, 255, 255, 0.7);
  border-top-style: solid;
  border-top-width: 1px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  border-radius: 0;
`;

export const LoginBtnBox = styled.div`
  padding: 0.75rem 0.75rem;
  border: 1px #e5e7eb solid;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.75rem;
  width: 100%;
  height: 3.5rem;
  transition: background 0.3s ease;
  cursor: pointer;

  svg {
    vertical-align: middle; // SVG 수직 정렬 추가
    display: inline-block; // inline-block으로 변경
  }
  &:hover {
    background-color: rgba(229, 231, 235, 0.09);
  }
`;
