import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { Recipe } from '../types/Recipe';
import { Loading } from '../components/common/Loading';
import { IngredientBox } from '../components/detail/IngredientBox';
import { StepsBox } from '../components/detail/StepsBox';
import { RecipeDataState } from '../recoil/recipeState';
import { useRecoilValue } from 'recoil';

const Detail = () => {
  // Recipe/RecipeBox, Search에서 받아온 각 레시피가 가지고 있는 고유한 id
  const { id } = useParams<{ id: string }>();

  // 기존 레시피 데이터 (훅)
  // const recipeData = useRecipeData();

  // recoil 도입
  const recipeData = useRecoilValue(RecipeDataState);
  console.log('recipeData: ', recipeData);

  // 전체 레시피와 선택한 레시피의 고유한 id가 같다면 출력
  useEffect(() => {
    const selectedRecipe = recipeData.find(
      (recipe: Recipe) => recipe.id === id
    );
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    }
  }, [recipeData]);

  // 선택한 레시피를 담아줄 state
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  console.log('recipe: ', recipe);

  if (!recipe) {
    return <Loading />;
  }

  return (
    <>
      <PageWrapper>
        <BoxWrapper>
          <IngredientBox recipe={recipe} />
          <StepsBox recipe={recipe} />
        </BoxWrapper>
      </PageWrapper>
    </>
  );
};

export default Detail;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;

  font-size: 1.5rem;
  position: relative;
  margin: 4rem 0;
  overflow: hidden;
`;
