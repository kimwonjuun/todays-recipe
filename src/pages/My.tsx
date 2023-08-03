import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService, firebaseConfig } from '../apis/firebase';
import { ProfileBox } from '../components/my/ProfileBox';
import { EditProfileModal } from '../components/my/EditProfileModal';
import { SubmitForm } from '../components/common/SubmitForm';
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const My = () => {
  // 로그인 상태 확인
  const user = authService.currentUser;
  const currentUserUid = user?.uid;
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

  // 모달
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
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     await addDoc(collection(dbService, 'my-refrigerator'), {
  //       userId: currentUserUid,
  //       ingredient: inputValue,
  //     });
  //     setInputValue('');
  //   } catch (error) {
  //     console.error('냉장고에 재료를 넣지 못했어요.', error);
  //     alert('냉장고에 재료를 넣지 못했어요.');
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUserUid) {
      alert('유저 정보를 불러오지 못했습니다.');
      return;
    }

    try {
      // 문서 가져오기
      const userRef = doc(dbService, 'my-refrigerator', currentUserUid);

      // 문서 데이터 가져오기
      const userDoc = await getDoc(userRef);

      // 문서가 존재하면 기존 데이터에 재료 추가
      if (userDoc.exists()) {
        const ingredients = userDoc.data().ingredients || [];
        if (!ingredients.includes(inputValue)) {
          ingredients.push(inputValue);
        }

        await updateDoc(userRef, { ingredients });
      } else {
        // 문서가 존재하지 않으면 새 문서를 생성 후 재료 추가
        const ingredients = [inputValue];

        await setDoc(userRef, {
          userId: currentUserUid,
          ingredients,
        });
      }

      setInputValue('');
    } catch (error) {
      console.error('냉장고에 재료를 넣지 못했어요.', error);
      alert('냉장고에 재료를 넣지 못했어요.');
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
              <MyRefrigeratorWrapper>
                <MyRefrigerator>
                  {storedWords.map((word, index) => (
                    <span key={index}>{word}</span>
                  ))}
                </MyRefrigerator>
              </MyRefrigeratorWrapper>
              <FormWarpper>
                <SubmitForm
                  value={inputValue}
                  onSubmit={handleSubmit}
                  onChange={handleInputChange}
                  placeholder="처리하고 싶은 재료를 입력히세요."
                  maxLength={8}
                />
              </FormWarpper>
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
  /* height: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /* align-items: center; */
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

  font-size: 1.5rem;
`;

const UserItem = styled.div`
  width: 69rem;
  height: 33rem;

  display: flex;
  flex-direction: column;

  /* background-color: yellow; */
`;

const CategoriesWrapper = styled.div`
  height: 2rem;
  display: flex;
  gap: 1.5rem;

  /* background-color: green; */
  /* border: 1px solid; */
`;

const FormWarpper = styled.div`
  /* height: 4rem; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Category = styled.div`
  height: 2rem;
  cursor: pointer;
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const MyRefrigeratorWrapper = styled.div`
  height: 25rem;
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
  margin: 1.5rem 0;
`;

const MyRefrigerator = styled.div``;

// const UserLikes = styled.div``;
