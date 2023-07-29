import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  placeholder: string;
}

export const SearchInput = ({
  value,
  onChange,
  onClick,
  placeholder,
}: SearchInputProps) => {
  return (
    <InputWrapper>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <SearchButton onClick={onClick}>검색</SearchButton>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 46.5rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.3rem;
  outline: none;
  text-align: center;
  padding-right: 8rem; // 검색 버튼 만큼 여백 추가
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0rem;
  width: 7rem;
  height: 4.65rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 2rem;
  background-color: ${COLORS.blue1};
  color: white;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${COLORS.blue2};
  }
`;
