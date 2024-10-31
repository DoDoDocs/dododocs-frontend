import styled from 'styled-components';

export const CateCol = styled.div`
  border: 1px solid rgb(226, 226, 226);
  padding: 2.5rem 2.8rem;
  flex-basis: 83.33%;
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  @media (max-width: 576px) {
    padding: 1.3rem 1rem;
    flex-basis: 90%;
  }
`;

export const CategoriesBox = styled.div`
  display: flex;
  flex: 1;
  gap: 1rem 0;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 35%; /* 세로선의 길이를 조절할 수 있습니다 */
    width: 1px;
    background-color: rgb(226, 226, 226); /* 세로선의 색상 */
  }
`;
