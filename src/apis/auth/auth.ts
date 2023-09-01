import { authService } from '../firebase';

// 로그아웃
export const logout = async () => {
  await authService.signOut();
  sessionStorage.clear();
};
