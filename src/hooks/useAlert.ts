import { useState } from 'react';

// custom alert modal 사용하는 페이지에 사용할 훅

const useAlert = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

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
