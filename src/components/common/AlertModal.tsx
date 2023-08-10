import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface AlertModalProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const AlertModal = ({ message, isOpen, onClose }: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <Modal>
        <Message>{message}</Message>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </Modal>
    </ModalWrapper>
  );
};

export default AlertModal;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  /* z-index: 200; */
  min-width: 15rem;
  min-height: 7.5rem;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
`;

const Message = styled.p`
  font-size: 1.25rem;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  font-size: 1rem;
  background-color: ${COLORS.blue1};
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.blue2};
  }
`;
