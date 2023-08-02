import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, firebaseConfig } from '../apis/firebase';
import { ProfileBox } from '../components/my/ProfileBox';
import { EditProfileModal } from '../components/my/EditProfileModal';
import { SubmitForm } from '../components/common/SubmitForm';

const My = () => {
  // 로그인 상태 확인
  const user = authService.currentUser;
  const isLoggedIn = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );

  // 비로그인시 마이페이지 접근 불가 -> 메인으로
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, []);

  // 모달 열기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 프로필 이미지
  const [photoURL, setPhotoURL] = useState<any>(user?.photoURL);

  // 인풋
  const [inputValue, setInputValue] = useState('');
  const [storedWords, setStoredWords] = useState<string[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  // 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      setStoredWords([...storedWords, inputValue]);
      setInputValue('');
    }
  };

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <ProfileBox openModal={openModal} photoURL={photoURL} user={user} />

          <UserAccounttBox>
            <UserItem>
              <CategoriesWrapper>
                <Category>나의 냉장고</Category>
              </CategoriesWrapper>
              <MyRefrigerator>
                <SubmitForm
                  value={inputValue}
                  onSubmit={handleSubmit}
                  onChange={handleInputChange}
                  placeholder="처리하고 싶은 재료를 입력히세요."
                  maxLength={8}
                />

                <div>
                  {storedWords.map((word, index) => (
                    <span key={index}>{word}</span>
                  ))}
                </div>
              </MyRefrigerator>
            </UserItem>
          </UserAccounttBox>
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
{
  /* <Category>저장한 레시피</Category> */
}

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

////////////////////
const UserAccounttBox = styled.div`
  width: 75rem;
  height: 37.5rem;

  background-color: #fff;
  border-radius: 1rem;

  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.75rem;
`;

const UserItem = styled.div`
  width: 70rem;
  height: 35rem;

  border: 1px solid black;

  display: flex;
  flex-direction: column;
`;

const CategoriesWrapper = styled.div`
  height: 2rem;
  display: flex;
  gap: 1.5rem;

  background-color: green;
`;

const Category = styled.div`
  height: 2rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const MyRefrigerator = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;
// const UserLikes = styled.div``;
