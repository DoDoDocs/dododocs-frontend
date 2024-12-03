// src/components/atoms/Splitter/FlexSplitter.styles.js
import styled from 'styled-components';
// Divider에서 Container 참조

export const Container = styled.div`
  display: flex;
  height: 100%;
  /* width: 50%; */
  width: ${(props) => props.splitterWidth};
  /* background-color: rgb(39 39 42); */
  transition: background-color 0.2s ease;
`;

export const Panel = styled.div`
  height: 100%;
  overflow: hidden;
  /* background-color: rgb(39 39 42); */
`;

export const NarrowPanel = styled(Panel)`
  flex: 0 0 ${(props) => props.width}px;
  width: ${(props) => props.width}px;
  transition: ${(props) => (props.isDragging ? 'none' : 'all 0.1s ease')};
`;

export const WidePanel = styled(Panel)`
  flex: 1;
`;

export const Divider = styled.div`
  flex: 0 0 clamp(10px, auto, 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: col-resize;
  user-select: none;
  background: rgba(39, 39, 42, 0.3);
  transition: background-color 0.2s ease;

  border-left: 1px solid rgba(39, 39, 42, 0.5);
  border-right: 1px solid rgba(39, 39, 42, 0.5);

  &:hover {
    color: white;
    background: transparent;
  }
`;

export const DividerLine = styled.div`
  /* width: 2px;
  height: 32px;
  background-color: #3f3f46;
  border-radius: 9999px; */
  width: 10px;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: col-resize;

  &::after {
    content: '︙';
    color: ${(props) => (props.isDragging ? '#fff' : '#adb5bd')};
    font-size: 12px;
    font-weight: bold;
  }
  &:hover {
    &::after {
      color: #fff;
    }
  }
`;
