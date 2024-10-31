import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: auto auto;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  max-width: 500px;
  gap: 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  text-align: center;
`;

export const ImageContainer = styled.div`
  width: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const TextContainer = styled.div`
  padding: 20px;
`;

export const MainText = styled.p`
  font-size: 24px;
  color: #333;
  margin: 0;
  font-family: 'grandiflora';
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

export const CategoryButton = styled.button`
  background-color: #ffffff;
  border: none;
  padding: 18px 10px 19px 8px;
  font-size: 1rem;
  font-family: 'grandiflora';
  cursor: pointer;
  border-radius: 5px;
  color: #000000;

  ${(props) =>
    props.checked &&
    `
    background-color: #96C9F4;
    box-shadow: inset 3px 3px 3px 0px rgba(0, 0, 0, 0.25);
  `}
`;

export const ActionButtonContainer = styled.div`
  width: 100%;
`;

export const ActionButton = styled.button`
  background-color: #ffeb3b;
  border: none;
  padding: 15px 30px;
  font-size: 1.2em;
  font-family: diphylleia;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 8px 8px 6px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  &:hover {
    background-color: #fdd835;
  }
`;
