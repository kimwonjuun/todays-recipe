import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { authService } from '../../apis/firebase';
import { User } from 'firebase/auth';
import { AlertModal } from '../common/AlertModal';
import { useState } from 'react';

interface ProfileBoxProps {
  openModal: () => void;
  photoURL: string | undefined;
  user: User | null;
}

export const ProfileBox = ({ user, openModal, photoURL }: ProfileBoxProps) => {
  const navigate = useNavigate();

  // 얼럿 모달
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState('');

  // 얼럿 모달 열기
  const openAlertModal = (message: string) => {
    setAlertModalOpen(true);
    setAlertModalMessage(message);
  };

  // 얼럿 모달 닫기
  const closeAlertModal = () => {
    setAlertModalOpen(false);
  };

  // 로그아웃
  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      return authService.signOut().then(() => {
        sessionStorage.clear();
        openAlertModal('로그아웃 되었습니다.');
        navigate('/', { replace: true });
      });
    } else {
      return;
    }
  };

  return (
    <>
      <ProfileWrapper>
        <Profile>
          <ProfileImg>
            <Img
              src={photoURL || require('../../assets/my/default_image.png')}
            />
          </ProfileImg>

          <ProfileText>
            <p>{user?.displayName}</p>
            <p>{user?.email}</p>
          </ProfileText>
        </Profile>
        <LogoutBox>
          <EditButton onClick={openModal}>프로필 수정</EditButton>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </LogoutBox>
      </ProfileWrapper>
      {alertModalOpen && (
        <AlertModal message={alertModalMessage} onClose={closeAlertModal} />
      )}
    </>
  );
};

const ProfileWrapper = styled.div`
  width: 20rem;
  height: 30rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const Profile = styled.div`
  width: inherit;
  height: 20rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ProfileImg = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileText = styled.div`
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  & > p:last-child {
    font-size: 1rem;
    color: gray;
  }
`;

const LogoutBox = styled.div`
  width: inherit;
  height: 10rem;
  display: flex;
  justify-content: space-evenly;

  align-items: center;
  flex-direction: column;
`;

const EditButton = styled.button`
  width: 17.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 0.15rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  background-color: ${COLORS.blue1};
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.blue2};
  }
`;

const LogoutButton = styled.button`
  outline: none;
  width: 17.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 0.15rem solid ${COLORS.blue1};
  font-size: 1.25rem;
  background-color: ${COLORS.backGround};
  color: ${COLORS.blue1};
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${COLORS.gray};
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
