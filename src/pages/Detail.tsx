import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { Recipe } from '../types/Recipe';
import { useRecipeData } from '../hooks/useRecipeData';

const Detail = () => {
  // Recipe/RecipeBox, Search에서 받아온 id
  const { id } = useParams<{ id: string }>();
  // 특정 레시피를 담아줄 state
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  // useRecipeData를 사용하여 레시피 데이터 받아오기
  const recipeData = useRecipeData();

  useEffect(() => {
    const selectedRecipe = recipeData.find(
      (recipe: Recipe) => recipe.RCP_SEQ === id
    );
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    }
  }, [id, recipeData]);

  if (!recipe) {
    return <div>안돼...</div>;
  }
  return (
    <>
      <PageWrapper>
        <RCPWrapper>
          <ImgWrapper>
            <img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} />
          </ImgWrapper>
          <IngredientWrapper>
            <h2>Ingredients:</h2>
            <p>{recipe.RCP_PAT2}</p>
          </IngredientWrapper>
          <OrderWrapper>
            <h2>Instructions:</h2>
            {/* Display instructions */}
          </OrderWrapper>
        </RCPWrapper>
        <CommynityWrapper>
          <BookmarkWrapper></BookmarkWrapper>
          <CommentWrapper></CommentWrapper>
        </CommynityWrapper>
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

const RCPWrapper = styled.div`
  width: 90rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  position: relative;
  background-color: red;
`;
const ImgWrapper = styled.div``;
const IngredientWrapper = styled.div``;
const OrderWrapper = styled.div``;
const CommynityWrapper = styled.div``;
const BookmarkWrapper = styled.div``;
const CommentWrapper = styled.div``;
