import { useState } from 'react';

// 검색창 사용하는 페이지에서 사용할 훅

const useInput = (value: string) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, setInputValue, handleInputChange };
};

export default useInput;
