import { useState, useRef } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { authService } from '../../apis/firebase';

export const LoginModal = ({
  setLoginModalIsOpen,
  setSignUpModalIsOpen,
}: {
  setLoginModalIsOpen: (state: boolean) => void;
  setSignUpModalIsOpen: (state: boolean) => void;
}) => {
  const [email, setEmail] = useState<string>(''); // 이메일 입력값
  const [emailMessage, setEmailMessage] = useState<string>(''); // 이메일 오류 메시지
  const [isEmail, setIsEmail] = useState<boolean>(false); // 이메일 유효성 검사
  const [password, setPassword] = useState<string>(''); // 패스워드 입력값
  const [passwordMessage, setPasswordMessage] = useState<string>(''); // 패스워드 오류 메시지
  const [isPassword, setIsPassword] = useState<boolean>(false); // 패스워드 유효성 검사
  const emailRef = useRef<HTMLInputElement | null>(null); // 이메일 입력창 참조
  const passwordRef = useRef<HTMLInputElement | null>(null); // 패스워드 입력창 참조
  const [emailValid, setEmailValid] = useState(false); // 로그인 시 이메일 유효성 결과
  const [passwordValid, setPasswordValid] = useState(false); // 로그인 시 패스워드 유효성 결과

  // 로그인 모달 닫기
  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
  };
  // 회원가입 모달 열기
  const openSignUpModal = () => {
    setLoginModalIsOpen(false);
    setSignUpModalIsOpen(true);
  };
  // 이메일 인풋, 유효성 검사
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const isValid = emailRegex.test(e.target.value);
    if (email.length > 0) {
      setEmailValid(isValid);
    } else {
      if (!isValid) {
        setEmailMessage('이메일 형식을 확인해주세요');
        setIsEmail(false);
      } else {
        setEmailMessage('사용 가능한 이메일 형식입니다.');
        setIsEmail(true);
      }
    }
  };

  // 비밀번호 인풋, 유효성 검사
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    const isValid = passwordRegex.test(e.target.value);
    if (password.length > 0) {
      setPasswordValid(isValid);
    } else {
      if (!isValid) {
        setPasswordMessage(
          '대소문자, 특수문자를 포함하여 8자리 이상 입력해주세요.'
        );
        setIsPassword(false);
      } else {
        setPasswordMessage('사용 가능한 비밀번호 형식입니다.');
        setIsPassword(true);
      }
    }
  };

  // 로그인 버튼
  const submitLogin = () => {
    setPersistence(authService, browserSessionPersistence)
      .then(() => signInWithEmailAndPassword(authService, email, password))
      .then(() => {
        alert('환영합니다!');
        setEmail('');
        setPassword('');
        setLoginModalIsOpen(false);
      })
      .catch((err) => {
        if (err.message.includes('user-not-found')) {
          alert('가입 정보가 없습니다. 회원가입을 먼저 진행해 주세요.');
          emailRef?.current?.focus();
          setEmail('');
          setPassword('');
        }
        if (err.message.includes('wrong-password')) {
          alert('잘못된 비밀번호 입니다.');
          passwordRef?.current?.focus();
          setPassword('');
        }
      });
  };

  return (
    <>
      <Modal>
        <CloseButton onClick={closeLoginModal}>&times;</CloseButton>
        <TitleWrapper>로그인</TitleWrapper>
        <InputWrapper>
          <Logo>
            <LogoImg src={require('../../assets/logo.png')}></LogoImg>
          </Logo>
          <Input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={changeEmail}
            ref={emailRef}
          />
          {!emailValid && email.length > 0 && (
            <CustomSpan className={emailValid ? 'success' : 'error'}>
              이메일 양식을 확인해주세요.
            </CustomSpan>
          )}

          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={changePassword}
            ref={passwordRef}
          />
          {!passwordValid && password.length > 0 && (
            <CustomSpan className={passwordValid ? 'success' : 'error'}>
              비밀번호 양식을 확인해주세요.
            </CustomSpan>
          )}
        </InputWrapper>
        <BottomWrapper>
          <Button onClick={submitLogin}>로그인하기</Button>
          <LoginText onClick={openSignUpModal}>
            아직 회원이 아니신가요?
          </LoginText>
        </BottomWrapper>
      </Modal>
    </>
  );
};

const Modal = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  width: 40rem;
  height: 50rem;
  position: relative;
  text-align: center;
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

const TitleWrapper = styled.div`
  width: inherit;
  height: 5rem;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: inherit;
  height: 35rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Logo = styled.div`
  width: 11rem;
  height: 11rem;
`;

const LogoImg = styled.img`
  width: 100%;
`;

const Input = styled.input`
  width: 30rem;
  height: 4rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  outline: none;
  text-align: left;
  padding-left: 1rem;
`;

const CustomSpan = styled.p`
  font-size: 1rem;
  margin: -2.2rem 0;
  &.success {
    color: ${COLORS.blue1};
  }
  &.error {
    color: ${COLORS.red};
  }
`;

const BottomWrapper = styled.div`
  width: inherit;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Button = styled.button`
  width: 31.5rem;
  height: 4.5rem;
  border-radius: 1rem;
  border: ${({ disabled }) =>
    disabled ? 'none' : `0.25rem solid ${COLORS.blue1}`};
  font-size: 2rem;
  color: #fff;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.gray : COLORS.blue1};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  outline: none;
`;

const LoginText = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;
