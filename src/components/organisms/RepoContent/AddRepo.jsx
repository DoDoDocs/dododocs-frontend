// src/components/organisms/RepoContent/AddRepo.test.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  Image, Typo, Button, TextBox, Select,
  Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter,
} from "../../index.js";
import useClickAway from '../../../hooks/useClickAway.js';
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