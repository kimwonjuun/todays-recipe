import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface SearchFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
}

export const SearchForm = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}: SearchFormProps) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <SearchButton>검색</SearchButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  position: relative;
`;

const Input = styled.input`
  width: 46.5rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  outline: none;
  text-align: center;
  padding-right: 8rem;
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
