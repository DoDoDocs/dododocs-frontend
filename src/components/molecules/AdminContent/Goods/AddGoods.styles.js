import styled from 'styled-components';

export const CreateTextArea = styled.textarea.attrs((props) => ({
  placeholder: '제목을 입력하세요',
}))`
  min-height: 2.5rem;
  display: block;
  padding: 0px;
  font-size: 2rem;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: rgb(33, 37, 41);
  ::placeholder {
    color: #adb5bd;
  }
`;

export const UploadContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
  background-color: #f5f5f5;
  border-radius: 6px;
  box-shadow: rgb(247 247 247) 0px 0px 0px 1px inset;
  font-size: 1.2rem;
  font-weight: 500;
`;
