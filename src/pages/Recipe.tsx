import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { getRecipeData } from '../apis/api';
import RecipeBox from '../components/recipe/RecipeBox';

const Recipe = () => {
  // 레시피 data
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

  // 토글
  const [showCategories, setShowCategories] = useState(false);
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <TypeWrapper>
            <CategoriesParagraph>
              <p onClick={toggleCategories}>분류</p>
              {showCategories && (
                <>
                  <p>밥</p>
                  <p>일품</p>
                  <p>국&찌개</p>
                  <p>반찬</p>
                  <p>후식</p>
                  <p>기타</p>
                </>
              )}
            </CategoriesParagraph>

            <SortParagraph>
              <p>좋아요 많은 순</p>
              <p>가나다 순</p>
            </SortParagraph>
          </TypeWrapper>
          <RecipeWrapper>
            {recipeData.map((recipe: any) => (
              <RecipeBox recipe={recipe} />
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
