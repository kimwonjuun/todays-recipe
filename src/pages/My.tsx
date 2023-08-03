import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService, firebaseConfig } from '../apis/firebase';
import { ProfileBox } from '../components/my/ProfileBox';
import { EditProfileModal } from '../components/my/EditProfileModal';
import { SubmitForm } from '../components/common/SubmitForm';
import { doc, updateDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

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
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 재료 입력
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUserUid) {
      alert('유저 정보를 불러오지 못했어요.');
      return;
    }

    const koreanOnly = /^[가-힣]*$/;

    // 한글만 입력되었는지 검사
    if (!koreanOnly.test(inputValue)) {
      alert('재료는 한글만 입력 가능합니다.');
      setInputValue('');
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

        if (ingredients.length >= 20) {
          alert('냉장고에는 최대 20개의 재료만 추가할 수 있습니다.');
          setInputValue('');
          return;
        }

        if (!ingredients.includes(inputValue)) {
          ingredients.push(inputValue);
        } else {
          alert('이미 등록된 재료입니다.');
          setInputValue('');
          return;
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
      // 재료 리스트 갱신
      getMyIngredients();
    } catch (error) {
      console.error('냉장고에 재료를 추가하지 못했습니다.', error);
      alert('냉장고에 재료를 추가하지 못했습니다.');
    }
  };

  // 내가 저장한 재료 출력
  const [myIngredients, setMyIngredients] = useState([]);
  const getMyIngredients = async () => {
    if (!currentUserUid) {
      return;
    }
    const docSnap = await getDoc(
      doc(dbService, 'my-refrigerator', currentUserUid)
    );
    if (docSnap.exists()) {
      const ingredientData = docSnap.data();
      if (ingredientData && ingredientData.ingredients) {
        setMyIngredients(ingredientData.ingredients);
      }
    }
  };
  useEffect(() => {
    getMyIngredients();
  }, []);

  // 재료 삭제
  const removeIngredient = async (ingredient: string) => {
    const confirmDelete = window.confirm(
      `선택한 재료 '${ingredient}'을(를) 삭제하시겠습니까?`
    );

    if (!confirmDelete || !currentUserUid) {
      return;
    }

    try {
      // 문서 가져오기
      const userRef = doc(dbService, 'my-refrigerator', currentUserUid);

      //문서 데이터 가져오기
      const userDoc = await getDoc(userRef);

      // 문서가 존재하면 선택한 재료를 제외한 나머지 재료로 업데이트
      if (userDoc.exists()) {
        const ingredients = userDoc.data().ingredients || [];
        const updatedIngredients = ingredients.filter(
          (item: string) => item !== ingredient
        );

        if (updatedIngredients.length === 0) {
          // 재료가 모두 삭제된 경우, 문서 자체를 삭제하기
          await deleteDoc(userRef);
        } else {
          // 선택한 재료만 삭제하기
          await updateDoc(userRef, { ingredients: updatedIngredients });
        }

        // 재료 리스트 갱신
        getMyIngredients();
      }
    } catch (error) {
      console.error('냉장고에서 재료를 삭제하지 못했습니다.', error);
      alert('냉장고에서 재료를 삭제하지 못했습니다.');
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
                  {myIngredients.map((ingredient, index) => (
                    <IngredientItem
                      onClick={() => {
                        removeIngredient(ingredient);
                      }}
                      key={index}
                    >
                      {ingredient}
                    </IngredientItem>
                  ))}
                </MyRefrigerator>
                <Img>
                  <img src={require('../assets/refrigerator.png')} />
                </Img>
              </MyRefrigeratorWrapper>
              <FormWarpper>
                <SubmitForm
                  value={inputValue}
                  onSubmit={handleSubmit}
                  onChange={handleInputChange}
                  placeholder="처리하고 싶은 냉장고 안의 재료들을 입력하세요."
                  maxLength={6}
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
  width: 70rem;
  height: 33rem;

  display: flex;
  flex-direction: column;

  /* background-color: yellow; */
`;

const CategoriesWrapper = styled.div`
  height: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;

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

  margin: 1.5rem 0;
  display: flex;

  /* background-color: yellow; */
`;

const MyRefrigerator = styled.div`
  flex: 1.2;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 1rem;

  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};
`;

const IngredientItem = styled.div`
  padding: 0.5rem 1rem;
  height: 2.5rem;
  border-radius: 1rem;
  background-color: ${COLORS.blue1};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
`;

const Img = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 75%;
    height: 90%;
  }
`;

// const UserLikes = styled.div``;
