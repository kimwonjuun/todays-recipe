import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { User } from 'firebase/auth';

interface CommentFormProps {
  user: User | null;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CommentForm = ({
  user,
  inputValue,
  onInputChange,
  onSubmit,
}: CommentFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <UserProfileWrapper>
        {user?.photoURL ? (
          <UserProfileImg src={user.photoURL} alt="users profile image" />
        ) : (
          <UserProfileImg
            src={require('../../assets/my/default_image.webp')}
            alt="users profile image"
          />
        )}
      </UserProfileWrapper>
      <CommentInputWrapper>
        <CommentInput
          value={inputValue}
          onChange={onInputChange}
          placeholder="댓글을 입력해주세요..."
          maxLength={50}
        />
      </CommentInputWrapper>
      <CommentButtonWrapper>
        <CommentButton>작성</CommentButton>
      </CommentButtonWrapper>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  width: 100%;
  margin: 2rem 0;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @media (max-width: 675px) {
    margin: 1rem 0;
  }
`;
const UserProfileWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;

  @media (max-width: 1000px) {
    width: 3rem;
    height: 3rem;
  }
  @media (max-width: 850px) {
    width: 2rem;
    height: 2rem;
  }
  @media (max-width: 675px) {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const CommentButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const UserProfileImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;

  @media (max-width: 1300px) {
    width: 4.5rem;
    height: 4.5rem;
  }
  @media (max-width: 1150px) {
    width: 4rem;
    height: 4rem;
  }
  @media (max-width: 1000px) {
    width: 3.5rem;
    height: 3.5rem;
  }
  @media (max-width: 850px) {
    width: 3rem;
    height: 3rem;
  }
  @media (max-width: 675px) {
    width: 2rem;
    height: 2rem;
    margin-right: 0;
  }
`;
const CommentInput = styled.input`
  width: 60rem;
  padding: 0.5rem;
  border: none;
  border-bottom: 0.2rem solid ${COLORS.blue2};
  border-radius: 0rem;
  outline: none;
  margin-left: 1rem;
  font-size: 1.25rem;

  &:focus {
    border-color: ${COLORS.blue1};
  }

  @media (max-width: 1300px) {
    width: 52.5rem;
  }
  @media (max-width: 1150px) {
    width: 42.5rem;
  }
  @media (max-width: 1000px) {
    width: 35rem;
    height: 1rem;
    font-size: 1rem;
  }
  @media (max-width: 850px) {
    width: 26.5rem;
    height: 0.8rem;
    font-size: 0.8rem;
  }
  @media (max-width: 675px) {
    width: 17.5rem;
    height: 0.75rem;
    font-size: 0.6rem;
  }
`;
const CommentButton = styled.button`
  width: 5rem;
  background-color: ${COLORS.blue2};
  font-size: 1.25rem;
  color: #fff;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.blue1};
  }

  @media (max-width: 1000px) {
    width: 4rem;
    font-size: 1rem;
  }
  @media (max-width: 850px) {
    width: 3.25rem;
    font-size: 0.6rem;
    margin-left: 0.5rem;
  }
  @media (max-width: 675px) {
    width: 2.5rem;
    font-size: 0.6rem;
    padding: 0.5rem;
  }
`;
