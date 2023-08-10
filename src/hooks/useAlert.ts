import { useState } from 'react';

interface UseAlert {
  isOpen: boolean;
  openAlert: () => void;
  closeAlert: () => void;
}

const useAlert = (): UseAlert => {
  const [isOpen, setIsOpen] = useState(false);

  const openAlert = () => {
    setIsOpen(true);
  };

  const closeAlert = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openAlert,
    closeAlert,
  };
};

export default useAlert;
