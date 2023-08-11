import { useState } from 'react';

interface UseAlertProps {
  alertMessage: string;
  isOpen: boolean;
  openAlert: (message: string) => void;
  closeAlert: () => void;
}

const useAlert = (): UseAlertProps => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const openAlert = (message: string) => {
    setAlertMessage(message);
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  return {
    alertMessage,
    isOpen,
    openAlert,
    closeAlert,
  };
};

export default useAlert;
