import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { Recipe } from '../../types/Recipe';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { RecipeCard } from '../common/RecipeCard';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { dbService, firebaseConfig } from '../../apis/firebase';

// import해온 Recipe 타입
interface RecipeProps {
  recipeData: Recipe[];
}

export const RecipeBox = ({ recipeData }: RecipeProps) => {
  // 로그인 상태 확인
  const isLoggedIn = sessionStorage.getItem(
    `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`
  );
  const user = JSON.parse(isLoggedIn ?? '');
  const currentUserUid = user.uid;

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

  console.log('myIngredients: ', myIngredients);
  console.log('recipeData: ', recipeData);

  // 내 냉장고 재료들로 만들 수 있는 레시피들
  const canMakeRecipe = (
    recipeIngredients: string,
    myIngredients: string[]
  ): boolean => {
    return myIngredients.every((ingredient) =>
      recipeIngredients.includes(ingredient)
    );
  };

  // 분류 선택 여닫기
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const showCategoryButton = () => {
    setShowCategories(!showCategories);
  };

  // 분류 선택 여닫기 후 선택하기
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const handleCategoryButton = (category: string) => {
    setSelectedCategory(category);
  };

  // 필터링된 레시피 뿌려주기 (기존)
  // const filteredRecipes =
  //   selectedCategory && selectedCategory !== '전체 레시피'
  //     ? recipeData.filter((recipe: Recipe) => recipe.type === selectedCategory)
  //     : recipeData;

  // 필터링된 레시피 뿌려주기 (나의 냉장고 추가 후)
  const filteredRecipes =
    selectedCategory && selectedCategory !== '전체 레시피'
      ? recipeData.filter((recipe: Recipe) => {
          if (selectedCategory === '나의 냉장고') {
            return canMakeRecipe(recipe.ingredients, myIngredients);
          }
          return recipe.type === selectedCategory;
        })
      : recipeData;

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
          <CategoryTitle onClick={showCategoryButton}>분류</CategoryTitle>
          {showCategories && (
            <>
              <CategoryButton
                onClick={() => handleCategoryButton('전체 레시피')}
                isSelected={selectedCategory === '전체 레시피'}
              >
                전체 레시피
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryButton('밥')}
                isSelected={selectedCategory === '밥'}
              >
                밥
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryButton('일품')}
                isSelected={selectedCategory === '일품'}
              >
                일품
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryButton('국&찌개')}
                isSelected={selectedCategory === '국&찌개'}
              >
                국&찌개
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryButton('반찬')}
                isSelected={selectedCategory === '반찬'}
              >
                반찬
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryButton('후식')}
                isSelected={selectedCategory === '후식'}
              >
                후식
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryButton('기타')}
                isSelected={selectedCategory === '기타'}
              >
                기타
              </CategoryButton>
              <CategoryButton
                onClick={() => handleCategoryButton('나의 냉장고')}
                isSelected={selectedCategory === '나의 냉장고'}
              >
                나의 냉장고
              </CategoryButton>
            </>
          )}
        </CategoriesWrapper>
        <SortingWrapper>
          <SortButton
            onClick={() =>
              handleSortType(
                sortType === '저칼로리 순' ? '기존 정렬 상태' : '저칼로리 순'
              )
            }
            isSelected={sortType === '저칼로리 순'}
          >
            저칼로리 순
          </SortButton>
          <SortButton
            onClick={() =>
              handleSortType(
                sortType === '가나다 순' ? '기존 정렬 상태' : '가나다 순'
              )
            }
            isSelected={sortType === '가나다 순'}
          >
            가나다 순
          </SortButton>
        </SortingWrapper>
      </TypeWrapper>
      <RecipeWrapper>
        {showRecipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </RecipeWrapper>
    </>
  );
};

const TypeWrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  /* justify-content: left; */
  flex-wrap: wrap;
  font-size: 1.75rem;

  /* background-color: yellow; */
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
`;

const SortingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  & > p {
    cursor: pointer;
    &:hover {
      color: ${COLORS.blue2};
    }
  }
`;

const CategoryTitle = styled.p`
  margin-left: 2.25rem;
`;
const CategoryButton = styled.p<{ isSelected: boolean }>`
  font-size: 1.25rem;
  margin-top: 0.5rem;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? COLORS.blue2 : 'inherit')};
  &:hover {
    color: ${COLORS.blue2};
  }
`;

const SortButton = styled.p<{ isSelected: boolean }>`
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? COLORS.blue2 : 'inherit')};
  &:hover {
    color: ${COLORS.blue2};
  }
  margin-right: 2.25rem;
`;

const RecipeWrapper = styled.div`
  flex-wrap: wrap;
  display: flex;
  /* justify-content: space-between; */
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;
`;
