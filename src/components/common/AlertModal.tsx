import React from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

export const AlertModal = ({ message, onClose }: AlertModalProps) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalWrapper onClick={handleClickOutside}>
      <ModalContent>
        <ModalText>{message}</ModalText>
        <ModalButton onClick={onClose}>확인</ModalButton>
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  padding: 2.5rem;
  width: 30rem;
  height: 12.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ModalText = styled.div`
  font-size: 1.5rem;
`;

const ModalButton = styled.button`
  background-color: ${COLORS.blue1};
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.blue1};
  }
`;
