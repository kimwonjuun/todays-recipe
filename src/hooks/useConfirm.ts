import { useState } from 'react';

interface useConfirmProps {
  openConfirm: () => void;
  closeConfirm: () => void;
  handleConfirm: () => void;
  isOpen: boolean;
}

const useConfirm = (onConfirm: () => void): useConfirmProps => {
  const [isOpen, setIsOpen] = useState(false);

  const openConfirm = () => {
    setIsOpen(true);
  };

  const closeConfirm = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return {
    openConfirm,
    closeConfirm,
    handleConfirm,
    isOpen,
  };
};

export default useConfirm;
