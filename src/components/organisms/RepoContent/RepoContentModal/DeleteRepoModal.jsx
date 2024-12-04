// src/components/organisms/RepoContent/AddRepo.test.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  Image, Typo, Button, TextBox, Select,
  Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter,
} from "../../../index.js";
import { X } from 'lucide-react';


const CloseButton = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  color: #9a9cae;
    border-color: #26272f;
    border-radius: 0.375rem;
    background: #18181b;

  &:hover {
    color: #fafafa;
    background: #27272a;
  }
`;
const WarningText = styled.p`
  color: #a1a1aa;
  margin-bottom:1.2rem;
  line-height: 1.5;

  strong {
    color: #fafafa;
    font-weight: 500;
  }
`;

const InputLabel = styled.label`
  display: block;
  color: #fafafa;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const DeleteInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 0.5rem;
  color: #fafafa;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 1px #8b5cf6;
  }

  &::placeholder {
    color: #71717a;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  word-break: keep-all;
`;

const DeleteRepo = ({ isOpen, onClose, onConfirm, repository }) => {

  const [confirmText, setConfirmText] = React.useState('');
  const expectedText = repository?.Repository || '';
  const isDeleteEnabled = confirmText === expectedText;

  const handleDelete = () => {
    if (isDeleteEnabled) {
      onConfirm();
      setConfirmText('');
    }
  };

  if (!isOpen) return null;


  return (
    <>
      <Modal modalWidth={'50dvw'} isOpen={isOpen} onClose={onClose}>
        <ModalHeader style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
          <ModalTitle>Delete Repository</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalContent onClick={e => e.stopPropagation()}>
          <WarningText>
            Repository를 삭제하면 만들어진 모든 데이터가 삭제됩니다.
            <br />
            정말 <strong>{repository?.Repository}</strong> repository를 삭제하시겠어요?
          </WarningText>

          <InputLabel>
            최종확인을 위해 레포지터리 이름을 입력해주세요.
          </InputLabel>
          <DeleteInput
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={repository ? repository.Repository : 'Repository 이름을 입력해 주세요'}
            autoFocus
          />
        </ModalContent>

        <ModalFooter>
          <StyledButton
            btnType="secondary"
            onClick={onClose}
          >
            취소하기
          </StyledButton>
          <StyledButton
            btnType="danger"
            onClick={handleDelete}
            disabled={!isDeleteEnabled}
          >
            Repository 삭제하기
          </StyledButton>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default DeleteRepo;