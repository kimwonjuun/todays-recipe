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
        <p>{message}</p>
        <ButtonContainer>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonContainer>
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
  z-index: 200;
  width: 30rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  > p {
    width: 100%;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ConfirmButton = styled.button``;

const CancelButton = styled.button``;
