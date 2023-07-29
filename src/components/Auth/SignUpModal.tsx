import { useState } from 'react';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  updateProfile,
} from 'firebase/auth';
import { authService } from '../../apis/firebase';
import {
  BottomWrapper,
  Button,
  CloseButton,
  CustomSpan,
  Input,
  InputWrapper,
  LoginText,
  Modal,
  ModalWrapper,
  TitleWrapper,
} from '../../styles/modalStyles';

export const SignUpModal = ({
  setLoginModalIsOpen,
  setSignUpModalIsOpen,
}: {
  setLoginModalIsOpen: (state: boolean) => void;
  setSignUpModalIsOpen: (state: boolean) => void;
}) => {
  const [email, setEmail] = useState<string>(''); // 이메일 입력값
  const [emailMessage, setEmailMessage] = useState<string>(''); // 이메일 오류 메시지
  const [isEmail, setIsEmail] = useState<boolean>(false); // 이메일 유효성 검사 통과
  const [password, setPassword] = useState<string>(''); // 패스워드 입력값
  const [passwordMessage, setPasswordMessage] = useState<string>(''); // 패스워드 오류 메시지
  const [isPassword, setIsPassword] = useState<boolean>(false); // 패스워드 유효성 검사 통과
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 패스워드 재입력
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>(''); // 패스워드 재입력 오류메시지
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false); // 패스워드 재입력 유효성 검사 통과
  const [nickname, setNickname] = useState<string>(''); // 닉네임 입력값
  const [nicknameMessage, setNicknameMessage] = useState<string>(''); // 닉네임 오류 메시지
  const [isNickname, setIsNickname] = useState<boolean>(false); // 닉네임 유효성 검사 통과
  const [emailValid, setEmailValid] = useState(false); // 회원가입 시 이메일 유효성 결과
  const [passwordValid, setPasswordValid] = useState(false); // 회원가입 시 패스워드 유효성 결과

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
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(e.target.value);
    if (isValid) {
      setEmailValid(true);
      setEmailMessage('사용 가능한 이메일 형식입니다.');
      setIsEmail(true);
    } else {
      setEmailValid(false);
      setEmailMessage('이메일 형식을 확인해주세요');
      setIsEmail(false);
    }
  };

  // 비밀번호 인풋, 유효성 검사
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    const isValid = passwordRegex.test(e.target.value);
    if (isValid) {
      setPasswordValid(true);
      setPasswordMessage('사용 가능한 비밀번호 형식입니다.');
      setIsPassword(true);
    } else {
      setPasswordValid(false);
      setPasswordMessage(
        '대소문자, 특수문자를 포함하여 8자리 이상 입력해주세요.'
      );
      setIsPassword(false);
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
      setNicknameMessage('닉네임은 2글자 이상, 4글자 이하로 입력해주세요.');
      setIsNickname(false);
    } else {
      setNicknameMessage('사용 가능한 닉네임 형식입니다.');
      setIsNickname(true);
    }
  };

  // 회원가입 버튼 - 로컬스토리지 저장
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
        alert('회원가입이 완료 되었습니다! 로그인 해주세요.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setNickname('');
        setSignUpModalIsOpen(false);
        setLoginModalIsOpen(true);
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
      <ModalWrapper>
        <Modal>
          <CloseButton onClick={closeSignUpModal}>×</CloseButton>
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
              <CustomSpan className={emailValid ? 'success' : 'error'}>
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
              <CustomSpan className={passwordValid ? 'success' : 'error'}>
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
      </ModalWrapper>
    </>
  );
};
