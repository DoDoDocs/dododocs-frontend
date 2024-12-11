// components/LoadingSpinner.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
 0% { transform: rotate(0deg); }
 100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
 0%, 100% { transform: scale(1); opacity: 1; }
 50% { transform: scale(0.9); opacity: 0.5; }
`;

const SpinnerWrapper = styled.div`
  width : 100%;
  height : 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 2px solid #232236;
  border-top: 2px solid #d923ff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  color: #9492a6;
  font-size: 0.9rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = () => (
  <SpinnerWrapper>
    <Spinner />
    <LoadingText>Loading document...</LoadingText>
  </SpinnerWrapper>
);

export default LoadingSpinner;
