import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface ConfirmModalProps {
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  message,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <Modal>
        <Message>{message}</Message>
        <ButtonWrapper>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default ConfirmModal;

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
  min-width: 20rem;
  min-height: 7.5rem;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};

  @media (max-width: 550px) {
    min-width: 12.5rem;
    min-height: 5rem;
    padding: 2rem;
  }
`;

const Message = styled.div`
  font-size: 1.75rem;

  @media (max-width: 550px) {
    font-size: 1.25rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ConfirmButton = styled.button`
  outline: none;
  width: 5rem;
  height: 2.5rem;
  border-radius: 1rem;
  border: 0.15rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  background-color: ${COLORS.blue1};
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.blue2};
  }

  @media (max-width: 550px) {
    width: 4rem;
    height: 2.25rem;
    font-size: 1.25rem;
  }
`;

const CancelButton = styled.button`
  outline: none;
  width: 5rem;
  height: 2.5rem;
  border-radius: 1rem;
  border: 0.15rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  background-color: ${COLORS.backGround};
  color: ${COLORS.blue1};
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.gray};
  }

  @media (max-width: 550px) {
    width: 4rem;
    height: 2.25rem;
    font-size: 1.25rem;
  }
`;
