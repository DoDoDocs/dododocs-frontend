// src/components/atoms/Modal/index.jsx
import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useClickAway from '../../../hooks/useClickAway.js';

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

  ${({ overlayStyles }) =>
    overlayStyles &&
    css`
      ${overlayStyles}
    `}
`;

const ModalWrapper = styled.div`
  background-color: rgba(24,24,27,1);
  border-radius: 8px;
  padding: 0;
  width: 100%;
  max-width: ${props => props.modalWidth || '45dvw'};
  margin: 20px;
  position: relative;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  animation: modalFadeIn 0.3s ease-out;

  ${({ wrapperStyles }) =>
    wrapperStyles &&
    css`
      ${wrapperStyles}
    `}


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
  /* padding: 20px 24px; */
  padding : 1.25rem 1.5rem;
  border-bottom: 1px solid #27272a;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fafafa;
`;

const ModalDescription = styled.p`
  margin: 8px 0 0;
  font-size: 14px;
  color: #a1a1aa;
`;

const ModalContent = styled.div`
  padding: 1.5rem 1.5rem;
  overflow-y: auto;
  position: relative;
`;

const ModalFooter = styled.div`
  padding: clamp(1rem, 1.25rem + 0.5vw, 1.5rem);
  border-top: 1px solid #27272a;
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    
    button {
      width: 100%;
    }
  }
`;

const Modal = ({ modalWidth, isOpen, onClose, children, overlayStyles, wrapperStyles }) => {
  const modalRef = useRef(null);

  const handleClickAway = (event) => {
    if (event.target.closest('.select-container')) {
      return;
    }
    onClose();
  };

  useClickAway(modalRef, handleClickAway);

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
    <ModalOverlay overlayStyles={overlayStyles}>
      <ModalWrapper
        modalWidth={modalWidth}
        ref={modalRef} wrapperStyles={wrapperStyles}>
        {children}
      </ModalWrapper>
    </ModalOverlay>
  );
};

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter };
