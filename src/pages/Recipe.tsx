import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { getRecipeData } from '../apis/api';
import RecipeBox from '../components/recipe/RecipeBox';

// type Category = '밥' | '일품' | '국&찌개' | '반찬' | '후식' | '기타';
interface Category {
  RCP_SEQ: number;
  RCP_NM: string;
  RCP_PAT2: string;
  likes: number;
}

const Recipe = () => {
  // 레시피 데이터
  const [recipeData, setRecipeData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeData();
        setRecipeData(data);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  // 분류 선택 여닫기
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const showCategoryButton = () => {
    setShowCategories(!showCategories);
  };
  // 분류 선택 후 열기 후 고르기
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
  // 가나다 순
  const [sortType, setSortType] = useState<'가나다 순'>('가나다 순');
  const sortedRecipes = (recipes: Category[]): Category[] => {
    return [...recipes].sort((a: Category, b: Category) =>
      a.RCP_NM.localeCompare(b.RCP_NM)
    );
  };

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <TypeWrapper>
            <CategoriesParagraph>
              <p onClick={showCategoryButton}>분류</p>
              {showCategories && (
                <>
                  <p onClick={() => handleCategoryButton('전체 레시피')}>
                    전체 레시피
                  </p>
                  <p onClick={() => handleCategoryButton('밥')}>밥</p>
                  <p onClick={() => handleCategoryButton('일품')}>일품</p>
                  <p onClick={() => handleCategoryButton('국&찌개')}>국&찌개</p>
                  <p onClick={() => handleCategoryButton('반찬')}>반찬</p>
                  <p onClick={() => handleCategoryButton('후식')}>후식</p>
                  <p onClick={() => handleCategoryButton('기타')}>기타</p>
                </>
              )}
            </CategoriesParagraph>
            <SortParagraph>
              <p
                onClick={() => setSortType('가나다 순')}
                style={{
                  color: sortType === '가나다 순' ? COLORS.blue2 : 'inherit',
                }}
              >
                가나다 순
              </p>
            </SortParagraph>
          </TypeWrapper>
          <RecipeWrapper>
            {sortedRecipes(filteredRecipes).map((recipe: Category) => (
              <RecipeBox recipe={recipe} key={recipe.RCP_SEQ} />
            ))}
          </RecipeWrapper>
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Recipe;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 12.7rem);
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  /* background-color: yellow; */
  width: 90rem;
  /* height: 25rem; */
  /* display: flex; */
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;

const TypeWrapper = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex-wrap: wrap;
`;
const CategoriesParagraph = styled.div`
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
const SortParagraph = styled.div`
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

const RecipeWrapper = styled.div`
  /* background-color: red; */
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 5rem 0;
  overflow: hidden;
`;
