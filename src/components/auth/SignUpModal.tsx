import { useEffect } from 'react';
import { emailRegex, passwordRegex } from '../../utils/regex';
import COLORS from '../../styles/colors';
import styled from 'styled-components';
import useAlert from '../../hooks/useAlert';
import AlertModal from '../common/AlertModal';
import useAuth from '../../hooks/useAuth';
import { useMutation } from 'react-query';
import { signup } from '../../apis/auth/auth';

const SignUpModal = ({
  setLoginModalIsOpen,
  setSignUpModalIsOpen,
}: {
  setLoginModalIsOpen: (state: boolean) => void;
  setSignUpModalIsOpen: (state: boolean) => void;
}) => {
  // useAuth hook
  const {
    email,
    setEmail,
    emailMessage,
    isEmail,
    emailValid,
    emailRef,
    password,
    setPassword,
    passwordMessage,
    isPassword,
    passwordValid,
    confirmPassword,
    setConfirmPassword,
    passwordConfirmMessage,
    isPasswordConfirm,
    nickname,
    setNickname,
    nicknameMessage,
    isNickname,
    changeSignupEmail,
    changeSignupPassword,
    changeSignupConfirmPassword,
    changeSignupNickname,
  } = useAuth();

  // custom alert modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 회원가입 모달 닫기
  const closeSignUpModal = () => {
    setSignUpModalIsOpen(false);
  };

  // 로그인 모달 열기
  const openLoginModal = () => {
    setSignUpModalIsOpen(false);
    setLoginModalIsOpen(true);
  };

  // 회원가입 API
  const signupMutation = useMutation(signup, {
    onSuccess: () => {
      openAlert('회원가입이 완료 되었습니다! 로그인 해주세요.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setNickname('');
    },
    onError: (err: any) => {
      if (err.message.includes('already-in-use')) {
        openAlert('이미 가입된 계정입니다.');
        setEmail('');
      }
    },
  });

  // 회원가입
  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutation.mutate({ email, password, nickname });
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <>
      <ModalWrapper>
        <Modal>
          <CloseButton onClick={closeSignUpModal}>×</CloseButton>
          <TitleWrapper>회원가입</TitleWrapper>
          <form onSubmit={handleSignupSubmit}>
            <InputWrapper>
              <Input
                id="email"
                type="email"
                placeholder="사용하실 이메일을 입력해주세요."
                value={email}
                onChange={changeSignupEmail}
                ref={emailRef}
              />
              {email.length > 0 && (
                <Span className={emailValid ? 'success' : 'error'}>
                  {emailMessage}
                </Span>
              )}
              <Input
                id="password"
                type="password"
                placeholder="사용하실 비밀번호를 입력해주세요."
                value={password}
                onChange={changeSignupPassword}
              />
              {password.length > 0 && (
                <Span className={passwordValid ? 'success' : 'error'}>
                  {passwordMessage}
                </Span>
              )}
              <Input
                id="confirm-password"
                type="password"
                placeholder="사용하실 비밀번호를 한 번 더 입력해주세요."
                value={confirmPassword}
                onChange={changeSignupConfirmPassword}
              />
              {confirmPassword.length > 0 && (
                <Span className={isPasswordConfirm ? 'success' : 'error'}>
                  {passwordConfirmMessage}
                </Span>
              )}
              <Input
                id="nickname"
                type="text"
                maxLength={4}
                placeholder="사용하실 닉네임을 입력해주세요."
                value={nickname}
                onChange={changeSignupNickname}
              />
              {nickname.length > 0 && (
                <Span className={isNickname ? 'success' : 'error'}>
                  {nicknameMessage}
                </Span>
              )}
            </InputWrapper>
            <BottomWrapper>
              <Button
                disabled={
                  !isEmail || !isPassword || !isPasswordConfirm || !isNickname
                }
              >
                회원가입하기
              </Button>
              <LoginText onClick={openLoginModal}>이미 회원이신가요?</LoginText>
            </BottomWrapper>
          </form>
        </Modal>
        <AlertModal
          message={alertMessage}
          isOpen={isAlertOpen}
          onClose={closeAlert}
        />
      </ModalWrapper>
    </>
  );
};

export default SignUpModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  width: 25rem;
  height: 35rem;
  position: relative;
  text-align: center;
`;

const TitleWrapper = styled.div`
  width: inherit;
  height: 2.5rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: inherit;
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Input = styled.input`
  width: 22.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  outline: none;
  text-align: left;
  padding-left: 1rem;
`;

const BottomWrapper = styled.div`
  width: inherit;
  height: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Button = styled.button`
  width: 24rem;
  height: 3rem;
  border-radius: 1rem;
  border: ${({ disabled }) =>
    disabled ? 'none' : `0.25rem solid ${COLORS.blue1}`};
  font-size: 1.5rem;
  color: #fff;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.gray : COLORS.blue1};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  outline: none;
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? COLORS.gray : COLORS.blue2};
  }
`;

const LoginText = styled.div`
  font-size: 1.25rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 10;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const Span = styled.span`
  font-size: 1rem;
  margin: -1.82rem 0;
  &.success {
    color: ${COLORS.blue1};
  }
  &.error {
    color: ${COLORS.red};
  }
`;
