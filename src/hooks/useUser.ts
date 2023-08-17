import { User } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { authService } from '../api/firebase';

// 유저 상태 업데이트해야 하는 페이지에서 사용할 훅

const useUser = () => {
  // 유저
  const [user, setUser] = useState<User | null>(null);

  // uid
  const currentUserUid = user?.uid ?? undefined;

  // 프로필 사진
  const [photoURL, setPhotoURL] = useState<any>(null);

  useEffect(() => {
    // user 객체 존재 시 setUser 업데이트
    const handleAuthStateChange = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setPhotoURL(user.photoURL);
      }
    });
    return () => {
      handleAuthStateChange();
    };
  }, []);

  return { user, currentUserUid, photoURL, setPhotoURL };
};

export default useUser;
