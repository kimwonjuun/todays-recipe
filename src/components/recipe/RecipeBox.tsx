import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import RecipeCard from '../common/RecipeCard';
import { doc, getDoc } from 'firebase/firestore';
import { authService, dbService, firebaseConfig } from '../../apis/firebase';
import { User } from 'firebase/auth';

interface RecipeProps {
  recipeData: Recipe[];
}

const RecipeBox = ({ recipeData }: RecipeProps) => {
  // 로그인 상태 확인
  const [user, setUser] = useState<User | null>(null);
  const currentUserUid = user?.uid ?? undefined;

  useEffect(() => {
    // user 객체 존재 시 setUser 업데이트
    const handleAuthStateChange = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => {
      handleAuthStateChange();
    };
  }, []);

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
  }, [currentUserUid]);

  // 내 냉장고 재료들로 만들 수 있는 레시피들
  const canMakeRecipe = (
    recipeIngredients: string,
    myIngredients: string[]
  ): boolean => {
    return myIngredients.every((ingredient) =>
      recipeIngredients.includes(ingredient)
    );
  };

  // 분류 선택 여닫기 후 선택하기
  const [selectedCategory, setSelectedCategory] =
    useState<string>('전체 레시피');
  const handleCategoryButton = (category: string) => {
    setSelectedCategory(category);
  };

  // 필터링된 레시피 뿌려주기 (나의 냉장고 추가 후)
  const filteredRecipes =
    selectedCategory && selectedCategory !== '전체 레시피'
      ? recipeData.filter((recipe: Recipe) => {
          if (selectedCategory === '나의 냉장고' && myIngredients.length > 0) {
            return canMakeRecipe(recipe.ingredients, myIngredients);
          }
          return recipe.type === selectedCategory;
        })
      : recipeData;

  const noRecipeMessage =
    selectedCategory === '나의 냉장고' && filteredRecipes.length === 0
      ? user
        ? '냉장고가 비었거나 냉장고에 보관된 재료들을 전부 포함해서 만들 수 있는 레시피가 없어요. 🫤'
        : '로그인 후 냉장고에 재료들을 넣어주세요. 🫤'
      : null;

  // 저칼로리 순/가나다 순 전 기존 정렬 상태
  const [sortType, setSortType] = useState<string>('기존 정렬 상태');

  // 소팅 상태 전환
  const handleSortType = (changeSortType: string) => {
    setSortType(changeSortType);
  };

  // 저칼로리 순/가나다 순 소팅 전환
  const sortedRecipes = (recipes: Recipe[]): Recipe[] => {
    if (sortType === '가나다 순') {
      return [...recipes].sort((a: Recipe, b: Recipe) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortType === '저칼로리 순') {
      return [...recipes].sort(
        (a: Recipe, b: Recipe) => parseFloat(a.calorie) - parseFloat(b.calorie)
      );
    }
    return recipes;
  };

  // 무한 스크롤
  const { currentPage } = useInfiniteScroll();
  const showRecipes = sortedRecipes(filteredRecipes).slice(0, currentPage * 8);

  return (
    <>
      <TypeWrapper>
        <CategoriesWrapper>
          <CategoryButton
            onClick={() => handleCategoryButton('전체 레시피')}
            data-is-selected={selectedCategory === '전체 레시피'}
          >
            전체 레시피
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryButton('밥')}
            data-is-selected={selectedCategory === '밥'}
          >
            밥
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryButton('일품')}
            data-is-selected={selectedCategory === '일품'}
          >
            일품
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryButton('국&찌개')}
            data-is-selected={selectedCategory === '국&찌개'}
          >
            국&찌개
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryButton('반찬')}
            data-is-selected={selectedCategory === '반찬'}
          >
            반찬
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryButton('후식')}
            data-is-selected={selectedCategory === '후식'}
          >
            후식
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryButton('기타')}
            data-is-selected={selectedCategory === '기타'}
          >
            기타
          </CategoryButton>
          <CategoryButton
            onClick={() => handleCategoryButton('나의 냉장고')}
            data-is-selected={selectedCategory === '나의 냉장고'}
          >
            나의 냉장고
          </CategoryButton>
        </CategoriesWrapper>
        <SortingWrapper>
          <SortButton
            onClick={() =>
              handleSortType(
                sortType === '저칼로리 순' ? '기존 정렬 상태' : '저칼로리 순'
              )
            }
            data-is-selected={sortType === '저칼로리 순'}
          >
            저칼로리 순
          </SortButton>
          <SortButton
            onClick={() =>
              handleSortType(
                sortType === '가나다 순' ? '기존 정렬 상태' : '가나다 순'
              )
            }
            data-is-selected={sortType === '가나다 순'}
          >
            가나다 순
          </SortButton>
        </SortingWrapper>
      </TypeWrapper>
      <RecipeWrapper>
        {showRecipes.length === 0 && noRecipeMessage && (
          <NoRecipeMessage>{noRecipeMessage}</NoRecipeMessage>
        )}
        {showRecipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </RecipeWrapper>
    </>
  );
};

export default RecipeBox;

const TypeWrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 1.5rem;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  & > p {
    cursor: pointer;
    &:hover {
      color: ${COLORS.blue2};
    }
  }

  & > p:first-of-type {
    margin-left: 2.25rem;
  }
`;

const SortingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1.5rem;
  & > p {
    cursor: pointer;
    &:hover {
      color: ${COLORS.blue2};
    }
  }

  & > p:last-of-type {
    margin-right: 2.25rem;
  }
`;

const CategoryButton = styled.p<{ 'data-is-selected': boolean }>`
  cursor: pointer;
  color: ${({ 'data-is-selected': isSelected }) =>
    isSelected ? COLORS.blue2 : 'inherit'};
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const SortButton = styled.p<{ 'data-is-selected': boolean }>`
  cursor: pointer;
  color: ${({ 'data-is-selected': isSelected }) =>
    isSelected ? COLORS.blue2 : 'inherit'};
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const RecipeWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;
`;

const NoRecipeMessage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 33rem);
  background-color: ${COLORS.backGround};
`;
