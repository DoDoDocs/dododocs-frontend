import styled from 'styled-components';
import _ from '../../../config/index.js';
export const ContentStyle = styled.div`
  padding-top: ${_.HEADER.TOTAL_DVH}dvh;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
`;

export const PanelContent = styled.div`
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const LeftPanelContent = styled(PanelContent)`
  background-color: transparent;
`;

export const RightPanelContent = styled(PanelContent)`
  background-color: rgb(39 39 42);
  border-radius: 0.75rem;
`;

export const RightTitle = styled.div`
  height: 4dvh;
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #3f3f46;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
`;

export const RightContentWrapper = styled.div`
  padding: 0 1rem;
  overflow: hidden;
  max-height: 100dvh;
`;

export const RightContent = styled.div`
  padding: 0.75rem 1rem;
  width: 100%;
  outline: none;
  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  height: 100%;
  /* Chrome, Safari, Edge */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const Item = styled.div`
  padding: 0.75rem;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
`;

export const Content = styled.div`
  padding: 1rem;
  background-color: #f9fafb38;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;
