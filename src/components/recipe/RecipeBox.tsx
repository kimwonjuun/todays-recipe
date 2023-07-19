import { useState } from 'react';
import styled from 'styled-components';
import RecipeCard from './RecipeCard';
import COLORS from '../../styles/colors';

// 타입스크립트필요
// type Category = '밥' | '일품' | '국&찌개' | '반찬' | '후식' | '기타';
// 데이터 타입 사용하기
interface Category {
  RCP_SEQ: number;
  RCP_NM: string;
  RCP_PAT2: string;
}

interface RecipeBoxProps {
  recipeData: any[];
}

const RecipeBox = ({ recipeData }: RecipeBoxProps) => {
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
          (recipe: Category) => recipe.RCP_PAT2 === selectedCategory
        )
      : recipeData;

  // 기존 순 / 가나다 순 상태
  const [sortType, setSortType] = useState<'기존 정렬 상태' | '가나다 순'>(
    '기존 정렬 상태'
  );

  // 가나다 순 <-> 기존 정렬 상태간 전환
  const toggleSortType = () => {
    if (sortType === '기존 정렬 상태') {
      setSortType('가나다 순');
    } else if (sortType === '가나다 순') {
      setSortType('기존 정렬 상태');
    }
  };

  // 가나다 순 소팅
  const sortedRecipes = (recipes: Category[]): Category[] => {
    if (sortType === '가나다 순') {
      return [...recipes].sort((a: Category, b: Category) =>
        a.RCP_NM.localeCompare(b.RCP_NM)
      );
    }
    return recipes;
  };

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
            onClick={toggleSortType}
            isSelected={sortType === '가나다 순'}
          >
            가나다 순
          </SortButton>
        </SortingWrapper>
      </TypeWrapper>
      <RecipeWrapper>
        {sortedRecipes(filteredRecipes).map((recipe: Category) => (
          <RecipeCard recipe={recipe} key={recipe.RCP_SEQ} />
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
  justify-content: left;
  flex-wrap: wrap;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  & > p {
    margin-right: 1.5rem;
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
    margin-left: 1.5rem;
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
