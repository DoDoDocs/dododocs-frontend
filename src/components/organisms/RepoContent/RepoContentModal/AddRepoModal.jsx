// src/components/organisms/RepoContent/AddRepo.test.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import {
  Button, TextBox, Select, Checkbox,
  Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter,
} from "../../../index.js";
import { useUser } from '../../../../hooks/useUser.js';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useUserStore } from '../../../../store/store.js';

// Styled Components
// 회전 애니메이션 정의
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 애니메이션 관련 styled-components
const fade = keyframes`
  0%, 100% { opacity: 0; transform: translateY(10px); }
  20%, 80% { opacity: 1; transform: translateY(0); }
`;


const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: start;
  gap: 16px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
// 에러 메시지 스타일 추가
const ErrorMessage = styled.span`
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
  grid-column: 2; // 라벨 밑이 아닌 입력 필드 밑에 위치하도록
`;
const Label = styled.label`
  font-size: 14px;
  color: #fafafa;
  font-weight: 500;
  text-align: right;
`;

const DataSection = styled.div`
width : 90%;
`
// 새로고침 아이콘 버튼
const RefreshButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    color: #8b5cf6;

  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const RotatingRefreshCw = styled(RefreshCw)`
  ${props => props.isLoading && css`
    animation: ${rotate} 1s linear infinite;
  `}
`;




const RadioGroup = styled.div`
 display: flex;
 gap: 24px;
`;

const RadioWrapper = styled.label`
 display: flex;
 align-items: center;
 gap: 8px;
 cursor: pointer;
 color: ${props => props.checked ? '#ffffff' : '#71717a'};
 &:hover {
    color: #a9a9ab; /* Lighter hover border color */
  }
`;


const RadioInput = styled.input`
 /* width: 18px;
 height: 18px;
 cursor: pointer;
 accent-color: #8b5cf6; */

 accent-color: #8b5cf6;
 appearance: none; /* Hide default input styles */
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #666; /* Default border color */
  background: transparent;
  position: relative;
  transition: all 0.3s ease;

  /* Custom dot for selected radio */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: transparent; /* Hidden by default */
    transition: all 0.3s ease;
  }

  /* When the radio is checked */
  &:checked {
    border-color: #8b5cf6; /* Mint color border */
  }

  &:checked::after {
    background-color: #8b5cf6; /* Filled dot in mint */
  }

  /* Hover effect */
  &:hover:not(:checked) {
    border-color: #999; /* Lighter hover border color */
  }
`;

const RadioLabel = styled.span`
  font-size: 14px;
  color: ${props => props.checked ? '#ffffff' : 'null'};
  transition: color 0.2s ease-in-out;

`;


const StyledButton = styled(Button)`
  width : 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  word-break: keep-all;
  min-height: 3.5rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  min-height: 3.5rem;  // 높이 고정으로 텍스트 변경시 레이아웃 시프트 방지
`;

const LoadingText = styled.span`
  color: #8b5cf6;
  font-size: 0.875rem;
  font-weight: 500;
  word-break: keep-all;
  animation: ${fade} 2s ease-in-out;
`;

const RotatingLoader = styled(Loader2)`
  ${css`
    animation: ${rotate} 1s linear infinite;
  `}
  color: #8b5cf6;
`;

// 사용 예시 컴포넌트
const AddRepo = ({ isOpen, onClose,
  formData,
  validationErrors,
  isAddingRepoLoading,
  addRepoError,
  handleChange,
  handleSubmit,
  resetForm,
}) => {
  // const isAddingRepoLoading = true;
  console.log('🥹🥹🥹addRepoError', addRepoError, isAddingRepoLoading)
  const { repoListRefetch, isUserDataLoading } = useUser();

  const { repositories } = useUserStore();

  useEffect(() => {
    console.log(formData);
    console.log("isAddingRepoLoading", isAddingRepoLoading)
  }, [formData, isAddingRepoLoading]);


  const userRepositories = repositories.length !== 0 ? repositories : [];


  const handleRefreshClick = (e) => {
    e.preventDefault();  // 이벤트 전파 중단
    e.stopPropagation();  // 이벤트 버블링 중단
    repoListRefetch();
  };

  const loadingMessages = [
    '레포지토리 연결 중...',
    '코드를 분석하는 중입니다...',
    'AI가 코드를 이해하는 중입니다...',

  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    let interval;

    if (isAddingRepoLoading) {
      interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
    } else {
      setMessageIndex(0);  // 로딩이 끝나면 메시지 인덱스 초기화
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAddingRepoLoading, loadingMessages.length]);



  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}
        widths={{
          desktop: '45dvw',
          tablet_large: '60dvw',
          tablet: '70dvw',
          mobile: '90dvw'
        }}
      >
        <ModalHeader>
          <ModalTitle>Add Repository</ModalTitle>
          <ModalDescription>
            레포지터리와 연결하여 데이터를 가져올 수 있습니다.
          </ModalDescription>
        </ModalHeader>

        <ModalContent>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="Repository">Repository</Label>
              <div style={{ width: '100%', display: 'flex' }}>
                <DataSection>
                  <Select
                    selectTitle={userRepositories.length === 0 ? 'No Repository' : 'Select Repository'}
                    options={userRepositories}
                    selectedValue={formData.name}
                    onChange={(selectedOption) => { handleChange('name', selectedOption) }}
                  />
                </DataSection>
                <div style={{ display: 'flex', width: '8%' }}>
                  <RefreshButton
                    onClick={handleRefreshClick}
                    disabled={isUserDataLoading}
                  >
                    <RotatingRefreshCw
                      size={16}
                      isLoading={isUserDataLoading}
                    />
                  </RefreshButton>
                </div>

              </div>
              {validationErrors.name && <ErrorMessage>{validationErrors.name}</ErrorMessage>}

            </FormGroup>
            <FormGroup>
              <Label htmlFor="Branch">Branch</Label>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <DataSection>
                  <TextBox
                    id="username"
                    placeholder="Enter your branch name"
                    onChange={(e) => handleChange('branch', e.target.value)}
                    plane={true}
                    style={{ width: '100%' }}
                  />
                </DataSection>
                {validationErrors.branch && <ErrorMessage>{validationErrors.branch}</ErrorMessage>}
              </div>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Language">Language</Label>
              <DataSection>
                <RadioGroup>
                  <RadioWrapper checked={formData.korean === false}>
                    <RadioInput
                      type="radio"
                      name="language"
                      value="english"
                      checked={formData.korean === false}
                      onChange={() => handleChange('korean', false)}
                    />
                    <RadioLabel checked={formData.korean === false}>
                      English
                    </RadioLabel>
                  </RadioWrapper>
                  <RadioWrapper checked={formData.korean === true}>
                    <RadioInput
                      type="radio"
                      name="language"
                      value="korean"
                      checked={formData.korean === true}
                      onChange={() => handleChange('korean', true)}
                    />
                    <RadioLabel checked={formData.korean === true}>
                      한국어
                    </RadioLabel>
                  </RadioWrapper>
                </RadioGroup>
              </DataSection>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="isTestFile"> </Label>
              <DataSection>
                <Checkbox
                  checked={formData.isTestFile}
                  onChange={(checked) => handleChange('isTestFile', checked)}
                >
                  테스트 코드를 분석 데이터에 포함하시겠습니까?
                </Checkbox>
              </DataSection>
            </FormGroup>
          </form>
        </ModalContent>

        <ModalFooter style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {addRepoError && <ErrorMessage>Error: {addRepoError}</ErrorMessage>}
          {
            isAddingRepoLoading ?
              <LoadingWrapper>
                <RotatingLoader size={'1rem'} />
                <LoadingText key={messageIndex}>
                  {loadingMessages[messageIndex]}
                </LoadingText>
              </LoadingWrapper>
              :
              <StyledButton
                btnType="primary"
                onClick={(e) => handleSubmit(e)}
                disabled={isAddingRepoLoading}
              >
                추가하기
              </StyledButton>
          }


        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddRepo;       