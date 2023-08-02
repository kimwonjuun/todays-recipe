import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface SubmitFormProps {
  value: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  maxLength: number;
}

export const SubmitForm = ({
  value,
  onSubmit,
  onChange,
  placeholder,
  maxLength,
}: SubmitFormProps) => {
  return (
    <>
      <FormWrapper onSubmit={onSubmit}>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        <SubmitButton type="submit">입력</SubmitButton>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.form`
  width: 35.6rem;
  position: relative;
  display: flex;
`;

const Input = styled.input`
  width: 35rem;
  height: 2.5rem;
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  outline: none;
  text-align: center;
`;

const SubmitButton = styled.button`
  margin-left: -5rem;
  width: 5rem;
  height: 3rem;
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  background-color: ${COLORS.blue1};
  color: white;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${COLORS.blue2};
  }
`;
