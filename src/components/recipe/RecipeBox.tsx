import { useState } from 'react';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { Recipe } from '../../types/Recipe';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { RecipeCard } from '../common/RecipeCard';

// import해온 Recipe 타입
interface RecipeBoxProps {
  recipeData: Recipe[];
}

export const RecipeBox = ({ recipeData }: RecipeBoxProps) => {
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

  // 필터링된 레시피 뿌려주기
  const filteredRecipes =
    selectedCategory && selectedCategory !== '전체 레시피'
      ? recipeData.filter(
          (recipe: Recipe) => recipe.RCP_PAT2 === selectedCategory
        )
      : recipeData;

  // 기존 순/가나다 순 상태, 기존 순/저칼로리 순 상태
  const [sortAlphabetsType, setSortAlphabetsType] =
    useState<string>('기존 정렬 상태');
  const [sortCalorieType, setSortCalorieType] =
    useState<string>('기존 정렬 상태');

  // 가나다 순 <-> 기존 정렬 상태 간 전환
  const toggleSortType = () => {
    if (sortAlphabetsType === '기존 정렬 상태') {
      setSortAlphabetsType('가나다 순');
    } else if (sortAlphabetsType === '가나다 순') {
      setSortAlphabetsType('기존 정렬 상태');
    }
  };

  // 칼로리 순 <-> 기존 정렬 상태 간 전환
  const toggleSortCalorieType = () => {
    if (sortCalorieType === '기존 정렬 상태') {
      setSortCalorieType('저칼로리 순');
    } else if (sortCalorieType === '저칼로리 순') {
      setSortCalorieType('기존 정렬 상태');
    }
  };

  // 가나다 순 소팅
  const sortedRecipesByAlphabets = (recipes: Recipe[]): Recipe[] => {
    if (sortAlphabetsType === '가나다 순') {
      return [...recipes].sort((a: Recipe, b: Recipe) =>
        a.RCP_NM.localeCompare(b.RCP_NM)
      );
    }
    return recipes;
  };

  // 저칼로리 순 소팅
  const sortRecipesByLowCalories = (recipes: Recipe[]): Recipe[] => {
    if (sortCalorieType === '저칼로리 순') {
      return [...recipes].sort(
        (a: Recipe, b: Recipe) =>
          parseFloat(a.INFO_ENG) - parseFloat(b.INFO_ENG)
      );
    }
    return recipes;
  };

  const { currentPage } = useInfiniteScroll();
  // const showRecipes = sortedRecipesByAlphabets(filteredRecipes).slice(
  //   0,
  //   currentPage * 8
  // );

  const showRecipes = sortRecipesByLowCalories(
    sortedRecipesByAlphabets(filteredRecipes)
  ).slice(0, currentPage * 8);

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
            </>
          )}
        </CategoriesWrapper>
        <SortingWrapper>
          <SortButton
            onClick={toggleSortCalorieType}
            isSelected={sortCalorieType === '저칼로리 순'}
          >
            저칼로리 순
          </SortButton>
          <SortButton
            onClick={toggleSortType}
            isSelected={sortAlphabetsType === '가나다 순'}
          >
            가나다 순
          </SortButton>
        </SortingWrapper>
      </TypeWrapper>
      <RecipeWrapper>
        {showRecipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.RCP_SEQ} />
        ))}
      </RecipeWrapper>
      {/* {loading ? (
        <Loading />
      ) : (
        <RecipeWrapper>
          {showRecipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.RCP_SEQ} />
          ))}
        </RecipeWrapper>
      )} */}
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
