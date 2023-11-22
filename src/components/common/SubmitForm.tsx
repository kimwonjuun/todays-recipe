import styled from 'styled-components';
import COLORS from '../../styles/colors';

interface SubmitFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  maxLength: number;
}

const SubmitForm = ({
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
        <SubmitButton>입력</SubmitButton>
      </FormWrapper>
    </>
  );
};

export default SubmitForm;

const FormWrapper = styled.form`
  width: 35.6rem;
  position: relative;
  display: flex;

  @media (max-width: 1150px) {
    width: 29rem;
  }
  @media (max-width: 950px) {
    width: 15rem;
  }
`;

const Input = styled.input`
  width: 35rem;
  height: 2.5rem;
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  font-size: 1.1rem;
  outline: none;
  text-align: center;
  padding-right: 5rem;

  @media (max-width: 950px) {
    width: 9.5rem;
    height: 1.5rem;
    font-size: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  margin-left: -4.5rem;
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

  @media (max-width: 1150px) {
    margin-left: -3.75rem;
  }
  @media (max-width: 950px) {
    width: 2.5rem;
    height: 2rem;
    font-size: 0.75rem;
    margin-left: -2rem;
  }
`;
