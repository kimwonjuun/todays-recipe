import { styled } from 'styled-components';
import COLORS from '../../styles/colors';
import { SubmitForm } from '../common/SubmitForm';
import { dbService } from '../../apis/firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { RecipeCard } from '../common/RecipeCard';
import { AlertModal } from '../common/AlertModal';
import { koreanOnly } from '../../utils/regex';

interface UserAccountBoxProps {
  currentUserUid: string | undefined;
}

export const UserAccountBox = ({ currentUserUid }: UserAccountBoxProps) => {
  // 인풋
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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

  // 재료 입력
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUserUid) {
      alert('유저 정보를 불러오지 못했어요.');
      return;
    }

    // 한글만 입력되었는지 검사
    if (!inputValue.trim() || !koreanOnly.test(inputValue)) {
      openAlertModal('재료는 한글 단어만 입력 가능합니다.');
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
          openAlertModal('냉장고에는 최대 20개의 재료만 추가할 수 있습니다.');
          setInputValue('');
          return;
        }

        if (!ingredients.includes(inputValue)) {
          ingredients.push(inputValue);
        } else {
          openAlertModal('이미 등록된 재료입니다.');
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
      openAlertModal('냉장고에 재료를 추가하지 못했습니다.');
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
      <UserAccounttWrapper>
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
                <img src={require('../../assets/my/refrigerator.gif')} />
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
      </UserAccounttWrapper>
      {alertModalOpen && (
        <AlertModal message={alertModalMessage} onClose={closeAlertModal} />
      )}
    </>
  );
};

const UserAccounttWrapper = styled.div`
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
`;

const CategoriesWrapper = styled.div`
  height: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const FormWarpper = styled.div`
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
`;

const MyRefrigeratorWrapper = styled.div`
  height: 35rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const MyRefrigerator = styled.div`
  width: 42.5rem;
  height: 15rem;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  padding: 1.5rem;
  gap: 1rem;
  margin: 5rem 2.5rem;

  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};

  > p {
    width: 100%;
    text-align: center;
  }
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
  width: 27.5rem;
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
`;

const MyLikes = styled.div`
  width: 70rem;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  padding: 0 1.25rem;

  > p {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
