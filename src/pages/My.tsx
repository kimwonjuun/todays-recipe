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

  // 프로필 이미지 수정
  const [photoURL, setPhotoURL] = useState<any>(user?.photoURL);
  const uploadFB = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPhotoURL(reader.result);
    };

    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );

    const file_url = await getDownloadURL(uploaded_file.ref);

    if (user) {
      updateProfile(user, {
        photoURL: file_url,
      })
        .then(() => {})
        .catch((error) => {
          alert('이미지 업로드 실패');
        });
    } else {
      alert('사용자가 로그인되어 있지 않습니다.');
    }
  };

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <ProfileBox>
            <Profile>
              <ProfileImg>
                <Img src={require('../assets/default_image.png')} />
              </ProfileImg>
              <ProfileText>
                <p>{user?.displayName}님 안녕하세요?</p>
              </ProfileText>
              {/* <ProfileText>
                <p>{user?.email}</p>
              </ProfileText> */}
            </Profile>
            <LogoutBox>
              <EditButton onClick={handleLogout}>프로필 수정</EditButton>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </LogoutBox>
          </ProfileBox>

          <UserHistoryBox>
            <UserHistory></UserHistory>
          </UserHistoryBox>
        </BoxWrapper>
      </PageWrapper>
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
  width: 25%;
  height: 95%;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const Profile = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

const ProfileImg = styled.div`
  width: 55%;
  border-radius: 50%;
`;

const Img = styled.img`
  width: 100%;
`;

const ProfileText = styled.div`
  width: 90%;
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoutBox = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: space-evenly;

  align-items: center;
  flex-direction: column;
`;

const EditButton = styled.button`
  width: 80%;
  height: 4.65rem;
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  font-size: 1.5rem;
  background-color: ${COLORS.blue1};
  color: #fff;
  cursor: pointer;
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
`;

const UserHistoryBox = styled.div`
  width: 70%;
  height: 95%;

  background-color: #fff;
  border-radius: 1rem;

  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
`;

const UserHistory = styled.div`
  width: 100%;
  height: 100%;
`;
