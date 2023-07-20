import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { getRecipeData, Recipe } from '../apis/api';
import RecipeBox from '../components/recipe/RecipeBox';

const RecipePage = () => {
  // 레시피 데이터
  const [recipeData, setRecipeData] = useState<Recipe[]>([]);
  // 데이터 뿌려주기
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

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <RecipeBox recipeData={recipeData} />
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default RecipePage;

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
