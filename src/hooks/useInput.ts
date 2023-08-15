import { useState } from 'react';

const useInput = (value: string) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return { inputValue, setInputValue, handleInputChange };
};

export default useInput;
