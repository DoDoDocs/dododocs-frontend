import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: rgba(45, 45, 58, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const NoticeCard = styled.div`
  background: rgba(39, 39, 42, 0.5);
  border: 1px solid rgba(63, 63, 70, 0.3);
  border-radius: 1rem;
  padding: 2.5rem;
  max-width: 32rem;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
`;

export const IconWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background: rgba(147, 51, 234, 0.2);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #e9d5ff;
`;

export const Title = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;

  span {
    background: linear-gradient(to right, rgb(162, 92, 255), #d923ff);
    -webkit-background-clip: text;
    color: transparent;
  }
`;

export const Description = styled.p`
  color: #a1a1aa;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  margin: 1rem 0;

  li {
    color: #e4e4e7;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;
    background: rgba(63, 63, 70, 0.3);

    svg {
      color: #9333ea;
      flex-shrink: 0;
    }
  }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #9333ea;
  color: white;
  border-radius: 0.5rem;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #7e22ce;
  }

  svg {
    transition: transform 0.2s;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;
