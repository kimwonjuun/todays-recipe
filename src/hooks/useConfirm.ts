import { useState } from 'react';

// custom window.confirm modal 사용하는 페이지에 사용할 훅

const useConfirm = (onConfirm: () => void) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
