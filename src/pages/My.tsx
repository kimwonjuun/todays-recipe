import styled from 'styled-components';
import COLORS from '../styles/colors';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../apis/firebase';

const My = () => {
  // 현재 유저
  const auth = getAuth();
  const user = auth.currentUser;

  // 비로그인시 마이페이지 접근 불가 -> 메인으로
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      try {
        await signOut(auth);
        alert('로그아웃되었습니다.');
        navigate('/');
      } catch (error) {
        alert('로그아웃에 실패하였습니다.');
      }
    }
  };

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 프로필 이미지 수정
  const [photoURL, setPhotoURL] = useState<any>(user?.photoURL); // 프로필 사진
  const [tempPhotoURL, setTempPhotoURL] = useState<any>(null); // 임시 photoURL 상태
  const [tempFileURL, setTempFileURL] = useState<any>(null); // 임시 file URL 상태

  const uploadFB = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTempPhotoURL(reader.result);
    };
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    setTempFileURL(await getDownloadURL(uploaded_file.ref));
  };

  // 프로필 닉네임 수정
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ''
  );
  const onChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  // 프로필 수정하기 버튼
  const handleProfileEdit = async () => {
    if (user) {
      await updateProfile(user, {
        displayName: displayName ? displayName : user.displayName,
        photoURL: tempFileURL || photoURL, // 사용자가 이미지를 업로드한 경우 tempFileURL을 사용
      })
        .then(() => {
          alert('프로필 수정 완료');
          closeModal();
          setPhotoURL(tempFileURL || photoURL); // photoURL 업데이트
          setDisplayName(''); // 새로운 displayName을 저장
        })
        .catch((error) => {
          alert('프로필 수정 실패');
        });
    }
  };

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <ProfileBox>
            <Profile>
              <ProfileImg>
                <Img src={photoURL || '../assets/default_image.png'} />
              </ProfileImg>
              <ProfileText>
                <p>{user?.displayName}</p>
              </ProfileText>
            </Profile>
            <LogoutBox>
              <EditButton onClick={openModal}>프로필 수정</EditButton>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </LogoutBox>
          </ProfileBox>

          <UserHistoryBox>
            <UserHistory></UserHistory>
          </UserHistoryBox>
        </BoxWrapper>
      </PageWrapper>
      {isModalOpen && (
        <ModalWrapper>
          <Modal>
            <CloseButtonWrapper>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </CloseButtonWrapper>
            <TopWrapper>
              <ModalTitle>프로필 수정</ModalTitle>
              <ModalImg>
                <Img
                  src={
                    tempPhotoURL || photoURL || '../assets/default_image.png'
                  }
                />
                <ModalCamImg src={require('../assets/camera.png')} />
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    width: '25%',
                    top: '80%',
                    left: '90%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  onChange={uploadFB}
                />
              </ModalImg>
            </TopWrapper>
            <BottomWrapper>
              <Input
                type="text"
                placeholder={user?.displayName ? user?.displayName : undefined}
                onChange={onChangeDisplayName}
              />
              <SubmitButton onClick={handleProfileEdit}>수정하기</SubmitButton>
            </BottomWrapper>
          </Modal>
        </ModalWrapper>
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
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  margin: 3rem;

  /* border: 1rem solid yellow; */
`;

const ProfileBox = styled.div`
  width: 25rem;
  height: 37.5rem;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const Profile = styled.div`
  width: inherit;
  height: 25rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ProfileImg = styled.div`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileText = styled.div`
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoutBox = styled.div`
  width: inherit;
  height: 12.5rem;
  display: flex;
  justify-content: space-evenly;

  align-items: center;
  flex-direction: column;
`;

const EditButton = styled.button`
  width: 80%;
  height: 4.65rem;
  border-radius: 1rem;
  border: 0.15rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  background-color: ${COLORS.blue1};
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.blue2};
  }
`;

const LogoutButton = styled.button`
  outline: none;
  width: 80%;
  height: 4.65rem;
  border-radius: 1rem;
  border: 0.15rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  background-color: ${COLORS.backGround};
  color: ${COLORS.blue1};
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${COLORS.gray};
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  width: 23rem;
  height: 28rem;
  position: relative;
  text-align: center;
`;

const CloseButtonWrapper = styled.div`
  height: 10%;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 55%;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 35%;
`;

const ModalTitle = styled.div`
  font-size: 1.5rem;
`;

const ModalImg = styled.div`
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

const ModalCamImg = styled.img`
  position: absolute;
  width: 2.5rem;
  top: 80%;
  left: 90%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Input = styled.input`
  width: 16.75rem;
  height: 1.75rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  border-radius: 1rem;
  text-align: center;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 18rem;
  height: 3rem;
  padding: 0.5rem;
  font-size: 1rem;
  border: 0.175rem solid ${COLORS.blue1};
  border-radius: 1rem;
  background-color: ${COLORS.blue1};

  color: white;
  cursor: pointer;
  /* &:hover {
    background-color: ${COLORS.blue2};
  } */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 10;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

////////////////////
const UserHistoryBox = styled.div`
  width: 75rem;
  height: 37.5rem;

  background-color: #fff;
  border-radius: 1rem;

  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const UserHistory = styled.div`
  width: 100%;
  height: 100%;
`;
