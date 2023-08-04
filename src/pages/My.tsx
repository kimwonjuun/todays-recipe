import styled from 'styled-components';
import COLORS from '../styles/colors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dbService, firebaseConfig } from '../apis/firebase';
import { ProfileBox } from '../components/my/ProfileBox';
import { EditProfileModal } from '../components/my/EditProfileModal';
import { SubmitForm } from '../components/common/SubmitForm';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { RecipeCard } from '../components/common/RecipeCard';

const My = () => {
  // 로그인 상태 확인
  // 새로고침시 에러X
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
      alert('마이페이지는 로그인 후 접근 가능합니다.');
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
      alert('재료는 한글 단어만 입력 가능합니다.');
      setInputValue('');
      return;
    }

    try {
      // 문서 가져오기
      const userRef = doc(dbService, 'users', currentUserUid);

      // 문서 데이터 가져오기
      const userDoc = await getDoc(userRef);

      // 문서가 존재하면 기존 데이터에 재료 추가
      if (userDoc.exists()) {
        const ingredients = userDoc.data()['users-ingredients'] || [];

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

        await updateDoc(userRef, { 'users-ingredients': ingredients });
      } else {
        // 문서가 존재하지 않으면 새 문서를 생성 후 재료 추가
        const ingredients = [inputValue];

        await setDoc(userRef, {
          'users-ingredients': ingredients,
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

  // 내가 입력한 재료 출력
  const [myIngredients, setMyIngredients] = useState([]);
  const getMyIngredients = async () => {
    if (!currentUserUid) {
      return;
    }
    const docSnap = await getDoc(doc(dbService, 'users', currentUserUid));
    if (docSnap.exists()) {
      const ingredientData = docSnap.data();
      if (ingredientData && ingredientData['users-ingredients']) {
        setMyIngredients(ingredientData['users-ingredients']);
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
      const userRef = doc(dbService, 'users', currentUserUid);

      //문서 데이터 가져오기
      const userDoc = await getDoc(userRef);

      // 문서가 존재하면 선택한 재료를 제외한 나머지 재료로 업데이트
      if (userDoc.exists()) {
        const ingredients = userDoc.data()['users-ingredients'] || [];
        const updatedIngredients = ingredients.filter(
          (item: string) => item !== ingredient
        );

        // 선택한 재료만 삭제하기
        await updateDoc(userRef, { 'users-ingredients': updatedIngredients });

        // 재료 리스트 갱신
        getMyIngredients();
      }
    } catch (error) {
      console.error('냉장고에서 재료를 삭제하지 못했습니다.', error);
      alert('냉장고에서 재료를 삭제하지 못했습니다.');
    }
  };

  // 탭
  const [currentTab, setCurrentTab] = useState<string>('나의 냉장고');
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };

  // 내가 찜한 레시피 목록 출력
  const [likedRecipes, setLikedRecipes] = useState([]);

  const getMyLikedRecipes = async () => {
    if (!currentUserUid) {
      return;
    }
    const docSnap = await getDoc(doc(dbService, 'users', currentUserUid));
    if (docSnap.exists()) {
      const likedRecipesData = docSnap.data();
      if (likedRecipesData && likedRecipesData['users-likes']) {
        setLikedRecipes(likedRecipesData['users-likes']);
      }
    }
  };
  useEffect(() => {
    getMyLikedRecipes();
  }, []);

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <ProfileBox openModal={openModal} photoURL={photoURL} user={user} />

          <UserAccounttBox>
            <UserItem>
              <CategoriesWrapper>
                <Category
                  onClick={() => handleTabChange('나의 냉장고')}
                  isSelected={currentTab === '나의 냉장고'}
                >
                  나의 냉장고
                </Category>
                <Category
                  onClick={() => handleTabChange('찜한 레시피')}
                  isSelected={currentTab === '찜한 레시피'}
                >
                  찜한 레시피
                </Category>
              </CategoriesWrapper>
              <MyRefrigeratorWrapper
                style={{
                  display: currentTab === '나의 냉장고' ? 'flex' : 'none',
                }}
              >
                <TopWrapper>
                  <MyRefrigerator>
                    {myIngredients.length > 0 ? (
                      myIngredients.map((ingredient, index) => (
                        <IngredientItem
                          onClick={() => {
                            removeIngredient(ingredient);
                          }}
                          key={index}
                        >
                          {ingredient}
                        </IngredientItem>
                      ))
                    ) : (
                      <p>아직 냉장고에 넣은 재료가 없습니다! 🫤</p>
                    )}
                  </MyRefrigerator>
                  <Img>
                    <img src={require('../assets/refrigerator.gif')} />
                  </Img>
                </TopWrapper>
                <FormWarpper>
                  <SubmitForm
                    value={inputValue}
                    onSubmit={handleSubmit}
                    onChange={handleInputChange}
                    placeholder="처리하고 싶은 냉장고 안의 재료들을 입력하세요."
                    maxLength={6}
                  />
                </FormWarpper>
              </MyRefrigeratorWrapper>

              <MyLikesWrapper
                style={{
                  display: currentTab === '찜한 레시피' ? 'flex' : 'none',
                }}
              >
                <MyLikes>
                  {/* {likedRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                  ))} */}
                  {likedRecipes.length > 0 ? (
                    likedRecipes.map((recipe, index) => (
                      <RecipeCard key={index} recipe={recipe} />
                    ))
                  ) : (
                    <p>아직 보관한 레시피가 없습니다! 🫤</p>
                  )}
                </MyLikes>
              </MyLikesWrapper>
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
  height: 40rem;

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
  height: 37rem;

  display: flex;
  flex-direction: column;
  /* background-color: green; */
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

const TopWrapper = styled.div`
  display: flex;
`;

const Category = styled.div<{ isSelected: boolean }>`
  position: relative;
  height: 2rem;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? COLORS.blue2 : 'inherit')};
  &:hover {
    color: ${COLORS.blue2};
  }

  /* ${({ isSelected }) =>
    isSelected &&
    `
      border-bottom: 0.25rem solid ${COLORS.blue1};
    `} */
`;

const MyRefrigeratorWrapper = styled.div`
  height: 35rem;

  /* margin: 1.5rem 0; */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  /* background-color: yellow; */
`;

const MyRefrigerator = styled.div`
  width: 40rem;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 1rem;
  margin: 5rem 2.5rem;

  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue1};

  > p {
    width: 100%;
    text-align: center;
  }
  /* background-color: yellow; */
`;

const IngredientItem = styled.div`
  padding: 0.5rem 1rem;
  height: 2.5rem;
  border-radius: 1rem;
  background-color: ${COLORS.blue1};
  &:hover {
    background-color: ${COLORS.blue2};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
`;

const Img = styled.div`
  width: 35rem;
  display: flex;
  align-items: center;
  justify-content: end;

  img {
    width: 100%;
    height: 100%;
  }
`;

const MyLikesWrapper = styled.div`
  width: 70rem;
  height: 35rem;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  /* background-color: yellow; */
`;

const MyLikes = styled.div`
  width: 70rem;
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
  /* height: 100rem; */
  margin-top: 2.5rem;
  padding: 0 1.25rem;

  > p {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* background-color: blue; */
`;

const LikedRecipeItem = styled.div`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: ${COLORS.blue1};
  color: #fff;
  border-radius: 1rem;
  font-size: 1.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${COLORS.blue2};
  }
`;
