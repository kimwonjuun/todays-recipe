import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../apis/firebase';
import ProfileBox from '../components/my/ProfileBox';
import EditProfileModal from '../components/my/EditProfileModal';
import UserAccountBox from '../components/my/UserAccountBox';
import { User } from 'firebase/auth';

const My = () => {
  const navigate = useNavigate();
  // 이 코드로 props 내려줄 시 프로필 수정 및 회원 탈퇴 안됨.
  // const isLoggedIn = sessionStorage.getItem(
  //   `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  // );
  // const user = JSON.parse(isLoggedIn ?? '{}');
  // 이 코드로 props 내려줄 시 새로고침 시 user 값 null.
  // const user = authService.currentUser;

  const [user, setUser] = useState<User | null>(null);
  const currentUserUid = user?.uid ?? undefined;
  const [photoURL, setPhotoURL] = useState<any>(null);

  useEffect(() => {
    // user 객체 존재 시 setUser, setPhoURL 업데이트 아닐 시 메인으로 이동
    const handleAuthStateChange = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setPhotoURL(user.photoURL);
      } else {
        navigate('/');
      }
    });
    return () => {
      handleAuthStateChange();
    };
  }, []);

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <ProfileBox openModal={openModal} photoURL={photoURL} user={user} />
          <UserAccountBox currentUserUid={currentUserUid} />
        </BoxWrapper>
      </PageWrapper>
      {isModalOpen && (
        <EditProfileModal
          setIsModalOpen={setIsModalOpen}
          user={user}
          photoURL={photoURL}
          setPhotoURL={setPhotoURL}
        />
      )}
    </>
  );
};

export default My;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 12.8rem);
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 2rem;
  margin: 3rem;
`;
