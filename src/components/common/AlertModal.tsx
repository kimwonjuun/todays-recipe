import React from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const AlertModal = ({ message, onClose }: AlertModalProps) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalWrapper onClick={handleClickOutside}>
      <Content>
        <Text>{message}</Text>
        <Button onClick={onClose}>확인</Button>
      </Content>
    </ModalWrapper>
  );
};

export default AlertModal;

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

const Content = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  padding: 2.5rem;
  max-width: 55rem;
  height: 12.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.div`
  font-size: 1.5rem;
`;

const Button = styled.button`
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
