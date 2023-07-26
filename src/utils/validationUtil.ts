// 이메일 확인
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
  return emailRegex.test(email);
};

// 비밀번호 확인
export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

// 비밀번호 재확인
export const validatePasswordConfirmation = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

// 닉네임 확인
export const validateNickname = (nickname: string): boolean => {
  return nickname.length >= 2 && nickname.length <= 4;
};
