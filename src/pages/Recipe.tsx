import styled from 'styled-components';
import COLORS from '../styles/colors';
import RecipeBox from '../components/recipe/RecipeBox';

import { useRecipeData } from '../hooks/useRecipeData';

const RecipePage = () => {
  // 레시피 데이터
  const recipeData = useRecipeData();

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
  /* height: calc(100vh - 12.8rem); */
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 90rem;
  /* height: inherit; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;
