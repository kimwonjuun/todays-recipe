import { authService } from '../firebase';
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

interface signupProps {
  email: string;
  password: string;
  nickname: string;
}

interface loginProps {
  email: string;
  password: string;
}

// 회원가입
export const signup = ({ email, password, nickname }: signupProps) => {
  return setPersistence(authService, browserSessionPersistence)
    .then(() => createUserWithEmailAndPassword(authService, email, password))
    .then(() => {
      if (authService.currentUser) {
        return updateProfile(authService?.currentUser, {
          displayName: nickname,
        });
      }
    })
    .then(() => authService.signOut())
    .catch((err) => {
      throw err;
    });
};

// 로그인
export const login = async ({ email, password }: loginProps) => {
  await setPersistence(authService, browserSessionPersistence);
  return signInWithEmailAndPassword(authService, email, password);
};

// 로그아웃
export const logout = async () => {
  await authService.signOut();
  sessionStorage.clear();
  window.location.reload();
};

// 비밀번호 변경
export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(authService, email);
};
