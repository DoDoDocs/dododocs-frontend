import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Image, Typo, Button, TextBox, Select } from "../../index.js";
import useClickAway from '../../../hooks/useClickAway.js';
// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background-color: rgba(24,24,27,1);
  border-radius: 8px;
  padding: 0;
  width: 100%;
  max-width: 45dvw;
  margin: 20px;
  position: relative;
  height : 40dvh;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: modalFadeIn 0.3s ease-out;

  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow:0 4px 6px rgba(0, 0, 0, 0.3);
  

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
`;

const ModalDescription = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: #666;
`;

const ModalContent = styled.div`
  padding: 20px 24px;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

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
  color: #333;
  font-weight: 500;
  text-align: right;
`;

// Modal.jsx
const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useClickAway(modalRef, onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        {children}
      </ModalWrapper>
    </ModalOverlay>
  );
};


// 사용 예시 컴포넌트
export default function AddRepo() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 로직
    setIsOpen(false);
  };

  const [selectedRepo, setSelectedRepo] = useState('');

  const repositories = [
    'euncherry/0526_signup',
    'euncherry/airbnb_clone',
    'euncherry/ant-design',
    'euncherry/0526_signup',
    'euncherry/airbnb_clone',
    'euncherry/ant-design',
    'euncherry/0526_signup',
    'euncherry/airbnb_clone',
    'euncherry/ant-design',
    // ...
  ];


  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Edit Profile
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <ModalTitle>Add Repository</ModalTitle>
          <ModalDescription>
            레포지터리와 연결하여 데이터를 가져올 수 있습니다.
          </ModalDescription>
        </ModalHeader>

        <ModalContent>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Select
                options={repositories}
                value={selectedRepo}
                onChange={setSelectedRepo}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <TextBox
                id="username"
                placeholder="Enter your username"
                plane={true}
              />
            </FormGroup>
          </form>
        </ModalContent>

        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}