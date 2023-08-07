import React, { useState } from 'react';
import AlertModal from '../components/common/AlertModal';

interface UseAlertModalProps {
  alertModalOpen: boolean;
  alertModal: React.ReactNode;
  openAlertModal: (message: string) => void;
  closeAlertModal: () => void;
}

// AlertModal을 사용하는 Hook
const useAlertModal = (): UseAlertModalProps => {
  // 모달, 메시지 상태들
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState('');

  // 얼럿 모달 열기
  const openAlertModal = (message: string) => {
    setAlertModalMessage(message);
    setAlertModalOpen(true);
  };

  // 얼럿 모달 닫기
  const closeAlertModal = () => {
    setAlertModalOpen(false);
  };

  const alertModal = alertModalOpen ? (
    <AlertModal message={alertModalMessage} onClose={closeAlertModal} />
  ) : null;

  return { alertModalOpen, alertModal, openAlertModal, closeAlertModal };
};

export default useAlertModal;
