import React, { useEffect } from 'react';
import COLORS from '../../styles/colors';
import styled from 'styled-components';
import useAlert from '../../hooks/useAlert';
import AlertModal from '../common/AlertModal';
import useAuth from '../../hooks/useAuth';
import { useMutation } from 'react-query';
import { login, resetPassword } from '../../apis/auth/auth';

const LoginModal = ({
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
    emailValid,
    emailRef,
    password,
    setPassword,
    passwordValid,
    passwordRef,
    changeLoginEmail,
    changeLoginPassword,
  } = useAuth();

  // custom alert modal
  const {
    openAlert,
    closeAlert,
    isOpen: isAlertOpen,
    alertMessage,
  } = useAlert();

  // 로그인 모달 닫기
  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
  };

  // 회원가입 모달 열기
  const openSignUpModal = () => {
    setLoginModalIsOpen(false);
    setSignUpModalIsOpen(true);
  };

  // 로그인 API
  const loginMutation = useMutation(login, {
    onSuccess: () => {
      openAlert('로그인 되었습니다.');
      setEmail('');
      setPassword('');
      setLoginModalIsOpen(false);
    },
    onError: (err: any) => {
      // 오류 메시지 처리
      if (err.message.includes('user-not-found')) {
        openAlert('가입 정보가 없습니다. 회원가입을 먼저 진행해 주세요.');
        emailRef?.current?.focus();
        setEmail('');
        setPassword('');
      }
      if (err.message.includes('wrong-password')) {
        openAlert('잘못된 비밀번호 입니다.');
        passwordRef?.current?.focus();
        setPassword('');
      }
    },
  });

  // 로그인 클릭
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  // 비밀번호 변경 API
  const resetPasswordMutation = useMutation(resetPassword, {
    onSuccess: () => {
      openAlert(
        '비밀번호 재설정 이메일이 발송되었습니다. 이메일을 확인해주세요.'
      );
    },
    onError: () => {
      openAlert('이메일 주소창에 이메일을 입력해주세요.');
      emailRef.current?.focus();
    },
  });

  // 비밀번호 찾기 클릭
  const handlePasswordReset = (email: string) => {
    resetPasswordMutation.mutate(email);
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <>
      <ModalWrapper>
        <Modal>
          <CloseButton onClick={closeLoginModal}>&times;</CloseButton>
          <TitleWrapper>로그인</TitleWrapper>
          <form onSubmit={handleLoginSubmit}>
            <InputWrapper>
              <Logo>
                <LogoImg
                  src={require('../../assets/common/logo.webp')}
                  alt="logo"
                ></LogoImg>
              </Logo>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={changeLoginEmail}
                ref={emailRef}
              />
              {!emailValid && email.length > 0 && (
                <Span className={emailValid ? 'success' : 'error'}>
                  이메일 양식을 확인해주세요.
                </Span>
              )}

              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={changeLoginPassword}
                ref={passwordRef}
              />
              {!passwordValid && password.length > 0 && (
                <Span className={passwordValid ? 'success' : 'error'}>
                  비밀번호 양식을 확인해주세요.
                </Span>
              )}
            </InputWrapper>
            <BottomWrapper>
              <Button>로그인하기</Button>

              <LinksWrapper>
                <LoginText onClick={openSignUpModal}>
                  아직 회원이 아니신가요?
                </LoginText>
                <ResetPasswordButton onClick={() => handlePasswordReset(email)}>
                  비밀번호를 잊으셨나요?
                </ResetPasswordButton>
              </LinksWrapper>
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

export default LoginModal;

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

const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const ResetPasswordButton = styled.button`
  font-size: 1rem;
  cursor: pointer;
  background: none;
  border: none;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const LoginText = styled.div`
  font-size: 1rem;
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

const Logo = styled.div`
  width: 9rem;
  height: 9rem;
`;

const LogoImg = styled.img`
  width: 100%;
`;
