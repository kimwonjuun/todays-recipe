import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface SearchFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
}

const SearchForm = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}: SearchFormProps) => {
  return (
    <FormWrapper onSubmit={onSubmit}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <SearchButton>검색</SearchButton>
    </FormWrapper>
  );
};

export default SearchForm;

const FormWrapper = styled.form`
  position: relative;
`;

const Input = styled.input`
  width: 46.5rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  outline: none;
  text-align: center;
  padding-right: 8rem;

  @media (max-width: 1050px) {
    width: 30rem;
    height: 3.5rem;
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 700px) {
    width: 25rem;
    height: 3.5rem;
    font-size: 1.1rem;
    &::placeholder {
      font-size: 1.1rem;
    }
  }
  @media (max-width: 550px) {
    width: 20rem;
    height: 3rem;
    font-size: 0.9rem;
    &::placeholder {
      font-size: 0.9rem;
    }
  }
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

  @media (max-width: 1050px) {
    width: 6rem;
    height: 4.15rem;
    font-size: 1.5rem;
  }
  @media (max-width: 700px) {
    width: 6rem;
    height: 4rem;
    font-size: 1.4rem;
  }
  @media (max-width: 550px) {
    width: 5rem;
    height: 3.65rem;
    font-size: 1.25rem;
  }
`;
