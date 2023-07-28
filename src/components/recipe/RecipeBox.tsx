import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RecipeCard from '../common/RecipeCard';
import COLORS from '../../styles/colors';
import { Recipe } from '../../types/Recipe';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { Loading } from '../common/Loading';

// import해온 Recipe 타입
interface RecipeBoxProps {
  recipeData: Recipe[];
}

const RecipeBox = ({ recipeData }: RecipeBoxProps) => {
  // // 로딩 상태
  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   if (recipeData.length > 0) {
  //     setLoading(false);
  //   }
  // }, [recipeData]);

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

  // 기존 순/가나다 순 상태
  const [sortType, setSortType] = useState<string>('기존 정렬 상태');

  // 가나다 순 <-> 기존 정렬 상태간 전환
  const toggleSortType = () => {
    if (sortType === '기존 정렬 상태') {
      setSortType('가나다 순');
    } else if (sortType === '가나다 순') {
      setSortType('기존 정렬 상태');
    }
  };

  // 가나다 순 소팅
  const sortedRecipes = (recipes: Recipe[]): Recipe[] => {
    if (sortType === '가나다 순') {
      return [...recipes].sort((a: Recipe, b: Recipe) =>
        a.RCP_NM.localeCompare(b.RCP_NM)
      );
    }
    return recipes;
  };

  // 무한 스크롤
  // // scrollTop: 맨 위 ~ 현재 보이는 부분까지
  // // scrollHeight: 맨 위 ~ 맨 아래
  // // clientHeight: 현재 보이는 부분(border 제외)
  // // offsetHeight: 현재 보이는 부분(border 포함)

  // // 초기 표시할 페이지
  // const [currentPage, setCurrentPage] = useState(1);

  // // 페이지 당 표시할 아이템 수
  // const itemsPerPage = 8;

  // // 함수 호출 시 현재 페이지 +1
  // const loadMorePage = () => {
  //   setCurrentPage((prev) => prev + 1);
  // };

  // // 스크롤 이벤트 발생 시, 스크롤 위치 확인. 스크롤이 맨 아래 위치하면 loadMorePage 함수 호출해 페이지 로드
  // const handleScroll = () => {
  //   const scrollTop =
  //     document.documentElement.scrollTop || document.body.scrollTop;
  //   const scrollHeight =
  //     document.documentElement.scrollHeight || document.body.scrollHeight;

  //   if (scrollHeight - scrollTop === window.innerHeight) {
  //     loadMorePage();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // // 기존 sortedRecipes(filteredRecipes)에서 slice 메서드를 통해 현재 페이지에 해당하는 레시피를 보여줌
  // const showRecipes = sortedRecipes(filteredRecipes).slice(
  //   0,
  //   currentPage * itemsPerPage
  // );
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
