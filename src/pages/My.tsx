import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, firebaseConfig } from '../apis/firebase';
import { ProfileBox } from '../components/my/ProfileBox';
import { EditProfileModal } from '../components/my/EditProfileModal';
import { UserAccountBox } from '../components/my/UserAccountBox';

const My = () => {
  // 로그인 상태 확인
  const isLoggedIn = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );
  // const user = JSON.parse(isLoggedIn ?? ''); 이 코드로 props 내려줄 시 프로필 수정 및 회원 탈퇴 안됨.
  const user = authService.currentUser;
  const currentUserUid = user?.uid ?? undefined;

  // 비로그인시 마이페이지 접근 불가 -> 메인으로
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, []);

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 프로필 이미지
  const [photoURL, setPhotoURL] = useState<any>(user?.photoURL);

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
