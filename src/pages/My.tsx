import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useState } from 'react';
import ProfileBox from '../components/my/ProfileBox';
import EditProfileModal from '../components/my/EditProfileModal';
import UserAccountBox from '../components/my/UserAccountBox';
import useUser from '../hooks/useUser';
import { Helmet } from 'react-helmet-async';

const My = () => {
  // 유저 상태 업데이트: useUser hook
  const { user, currentUserUid, photoURL, setPhotoURL } = useUser();

  // 프로필 수정 클릭 시 나타나는 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{`${user?.displayName}님의 마이페이지 - todays recipe`}</title>
      </Helmet>
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
