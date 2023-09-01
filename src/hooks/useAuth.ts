import { useState, useRef } from 'react';
import { emailRegex, passwordRegex } from '../utils/regex';

// 로그인, 회원가입 관련 state들을 모아둔 훅
// 실시간 유효성검사 등이 추가되어 state들이 많아져 관련 코드를 전부 모아둠

const useAuth = () => {
  // 이메일 관련 state
  const [email, setEmail] = useState<string>(''); // 이메일 입력값
  const [emailMessage, setEmailMessage] = useState<string>(''); // 이메일 오류 메시지
  const [isEmail, setIsEmail] = useState<boolean>(false); // 이메일 유효성 검사 통과
  const [emailValid, setEmailValid] = useState(false); // 로그인 시 이메일 유효성 결과
  const emailRef = useRef<HTMLInputElement | null>(null); // 이메일 입력창 참조

  // 패스워드 관련 state
  const [password, setPassword] = useState<string>(''); // 패스워드 입력값
  const [passwordMessage, setPasswordMessage] = useState<string>(''); // 패스워드 오류 메시지
  const [isPassword, setIsPassword] = useState<boolean>(false); // 패스워드 유효성 검사 통과
  const [passwordValid, setPasswordValid] = useState(false); // 로그인 시 패스워드 유효성 결과
  const passwordRef = useRef<HTMLInputElement | null>(null); // 패스워드 입력창 참조

  // 패스워드 확인 관련 state
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // 패스워드 재입력
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>(''); // 패스워드 재입력 오류메시지
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false); // 패스워드 재입력 유효성 검사 통과

  // 닉네임 관련 state
  const [nickname, setNickname] = useState<string>(''); // 닉네임 입력값
  const [nicknameMessage, setNicknameMessage] = useState<string>(''); // 닉네임 오류 메시지
  const [isNickname, setIsNickname] = useState<boolean>(false); // 닉네임 유효성 검사 통과

  // 이메일 인풋, 유효성 검사
  const changeLoginEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValid(emailRegex.test(e.target.value));
  };

  // 비밀번호 인풋, 유효성 검사
  const changeLoginPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordValid(passwordRegex.test(e.target.value));
  };

  // 이메일 인풋, 유효성 검사
  const changeSignupEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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
  const changeSignupPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
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
  const changeSignupConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
  const changeSignupNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return {
    email,
    setEmail,
    emailMessage,
    setEmailMessage,
    isEmail,
    setIsEmail,
    emailValid,
    setEmailValid,
    emailRef,
    password,
    setPassword,
    passwordMessage,
    setPasswordMessage,
    isPassword,
    setIsPassword,
    passwordValid,
    setPasswordValid,
    passwordRef,
    confirmPassword,
    setConfirmPassword,
    passwordConfirmMessage,
    setPasswordConfirmMessage,
    isPasswordConfirm,
    setIsPasswordConfirm,
    nickname,
    setNickname,
    nicknameMessage,
    setNicknameMessage,
    isNickname,
    setIsNickname,
    changeLoginEmail,
    changeLoginPassword,
    changeSignupEmail,
    changeSignupPassword,
    changeSignupConfirmPassword,
    changeSignupNickname,
  };
};

export default useAuth;
