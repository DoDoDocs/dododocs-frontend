// src/components/organisms/RepoContent/AddRepo.test.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  Image, Typo, Button, TextBox, Select, Checkbox,
  Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter,
} from "../../../index.js";
import { useAddRepo } from '../../../../hooks/useAddRepo.js';
import { Check } from 'lucide-react';

// Styled Components

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #fafafa;
  font-weight: 500;
  text-align: right;
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


const CheckboxInput = styled.input`
 appearance: none;
 width: 20px;
 height: 20px;
 border: 2px solid #3F3F46;
 border-radius: 4px;
 background: transparent;
 cursor: pointer;
 position: relative;
 transition: all 0.2s ease;

 &:checked {
   background-color: #10B981;
   border-color: #10B981;

   &::after {
     content: '✓';
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
     color: white;
     font-size: 14px;
   }
 }

 &:hover:not(:checked) {
   border-color: #6B7280;
 }
`;

const CheckboxLabel = styled.label`
 display: flex;
 align-items: center;
 gap: 8px;
 cursor: pointer;
 user-select: none;
 color: ${props => props.checked ? '#ffffff' : '#71717a'};
`;

const StyledButton = styled(Button)`
  width : 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  word-break: keep-all;
`;


// 사용 예시 컴포넌트
const AddRepo = ({ isOpen, onOpen, onClose }) => {

  const { formData, handleChange } = useAddRepo();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 로직
    onClose();
  };

  const [selectedRepo, setSelectedRepo] = useState('');

  const repositories = [
    'euncherry/0526_signup',
    'euncherry/airbnb_clone',
    'euncherry/ant-design',
    'euncherry/0526_signupdfdfd',
    'euncherry/airbnb_clon',
    'euncherry/ant-desn',
    'euncherry/0526_sign',
    'euncherry/airbnb_cle',
    'euncherry/ant-',
    // ...
  ];


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
              <Select
                selectTitle={'Select Repository'}
                options={repositories}
                selectedValue={selectedRepo}
                onChange={setSelectedRepo}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Branch">Branch</Label>
              <TextBox
                id="username"
                placeholder="Enter your branch name"
                plane={true}
                style={{ width: '100%' }}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="Language">Language</Label>
              <RadioGroup>
                <RadioWrapper checked={formData.language === 'english'}>
                  <RadioInput
                    type="radio"
                    name="language"
                    value="english"
                    checked={formData.language === 'english'}
                    onChange={() => handleChange('language', 'english')}
                  />
                  <RadioLabel checked={formData.language === 'english'}>
                    English
                  </RadioLabel>
                </RadioWrapper>
                <RadioWrapper checked={formData.language === 'korean'}>
                  <RadioInput
                    type="radio"
                    name="language"
                    value="korean"
                    checked={formData.language === 'korean'}
                    onChange={() => handleChange('language', 'korean')}
                  />
                  <RadioLabel checked={formData.language === 'korean'}>
                    한국어
                  </RadioLabel>
                </RadioWrapper>
              </RadioGroup>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="isTestFile"> </Label>

              <Checkbox
                checked={formData.isTestFile}
                onChange={(checked) => handleChange('isTestFile', checked)}
              >
                테스트 코드를 분석 데이터에 포함하시겠습니까?
              </Checkbox>
            </FormGroup>
          </form>
        </ModalContent>

        <ModalFooter>
          <StyledButton btnType="primary" onClick={handleSubmit}>
            추가하기
          </StyledButton>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddRepo;