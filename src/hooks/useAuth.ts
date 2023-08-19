import React, { useState, useRef, useEffect } from 'react';

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
  };
};

export default useAuth;
