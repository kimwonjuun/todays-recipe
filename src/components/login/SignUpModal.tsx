import { useState, useRef } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { authService } from '../../apis/firebase';

export const SignUpModal = ({
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
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 패스워드 재입력
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>(''); // 패스워드 재입력 오류메시지
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false); // 패스워드 재입력 유효성 검사
  const [nickname, setNickname] = useState<string>(''); // 닉네임 입력값
  const [nicknameMessage, setNicknameMessage] = useState<string>(''); // 닉네임 오류 메시지
  const [isNickname, setIsNickname] = useState<boolean>(false); // 닉네임 유효성 검사
  const emailRef = useRef<HTMLInputElement | null>(null); // 이메일 입력창 참조
  const passwordRef = useRef<HTMLInputElement | null>(null); // 패스워드 입력창 참조
  const [emailValid, setEmailValid] = useState(false); // 로그인 시 이메일 유효성 결과
  const [passwordValid, setPasswordValid] = useState(false); // 로그인 시 패스워드 유효성 결과

  // 회원가입 모달 닫기
  const closeSignUpModal = () => {
    setSignUpModalIsOpen(false);
  };
  // 로그인 모달 열기
  const openLoginModal = () => {
    setSignUpModalIsOpen(false);
    setLoginModalIsOpen(true);
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

  // 비밀번호 확인 인풋, 유효성 검사
  const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPasswordConfirm = e.target.value;
    setConfirmPassword(currentPasswordConfirm);
    if (password === currentPasswordConfirm) {
      setPasswordConfirmMessage('비밀번호가 일치합니다.');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirm(false);
    }
  };

  // 닉네임 인풋, 유효성 검사
  const changeNickname = (e: any) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);
    if (currentNickname.length < 2 || currentNickname.length > 4) {
      setNicknameMessage('닉네임은 2글자 이상, 4글자 미만으로 입력해주세요.');
      setIsNickname(false);
    } else {
      setNicknameMessage('사용 가능한 닉네임 형식입니다.');
      setIsNickname(true);
    }
  };

  // 회원가입 버튼
  const submitSignUp = () => {
    setPersistence(authService, browserSessionPersistence)
      .then(() => createUserWithEmailAndPassword(authService, email, password))
      .then(() => {
        if (authService.currentUser) {
          updateProfile(authService?.currentUser, {
            displayName: nickname,
          });
        }
      })
      .then(() => {
        alert('회원가입이 완료 되었습니다.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setNickname('');
        setSignUpModalIsOpen(false);
      })
      .catch((err) => {
        if (err.message.includes('already-in-use')) {
          alert('이미 가입된 계정입니다.');
          setEmail('');
        }
      });
  };

  return (
    <>
      <Modal>
        <CloseButton onClick={closeSignUpModal}>&times;</CloseButton>
        <TitleWrapper>회원가입</TitleWrapper>
        <InputWrapper>
          <Input
            id="email"
            type="email"
            placeholder="사용하실 이메일을 입력해주세요."
            value={email}
            onChange={changeEmail}
          />
          {email.length > 0 && (
            <CustomSpan className={isEmail ? 'success' : 'error'}>
              {emailMessage}
            </CustomSpan>
          )}
          <Input
            id="password"
            type="password"
            placeholder="사용하실 비밀번호를 입력해주세요."
            value={password}
            onChange={changePassword}
          />
          {password.length > 0 && (
            <CustomSpan className={isPassword ? 'success' : 'error'}>
              {passwordMessage}
            </CustomSpan>
          )}
          <Input
            id="confirm-password"
            type="password"
            placeholder="사용하실 비밀번호를 한 번 더 입력해주세요."
            value={confirmPassword}
            onChange={changeConfirmPassword}
          />
          {confirmPassword.length > 0 && (
            <CustomSpan className={isPasswordConfirm ? 'success' : 'error'}>
              {passwordConfirmMessage}
            </CustomSpan>
          )}
          <Input
            id="nickname"
            type="text"
            maxLength={4}
            placeholder="사용하실 닉네임을 입력해주세요."
            value={nickname}
            onChange={changeNickname}
          />
          {nickname.length > 0 && (
            <CustomSpan className={isNickname ? 'success' : 'error'}>
              {nicknameMessage}
            </CustomSpan>
          )}
        </InputWrapper>
        <BottomWrapper>
          <Button
            onClick={submitSignUp}
            disabled={
              !isEmail || !isPassword || !isPasswordConfirm || !isNickname
            }
          >
            회원가입하기
          </Button>
          <LoginText onClick={openLoginModal}>이미 회원이신가요?</LoginText>
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
