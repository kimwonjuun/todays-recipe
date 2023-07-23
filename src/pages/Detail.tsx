import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { Recipe } from '../types/Recipe';
import { useRecipeData } from '../hooks/useRecipeData';

const Detail = () => {
  // Recipe/RecipeBox, Search에서 받아온 각 레시피가 가지고 있는 고유한 id
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
    return <div>정보가 없음.</div>;
  }

  return (
    <>
      <PageWrapper>
        <RecipeDetailWrapper>
          <ImgWrapper>
            <Img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} />
          </ImgWrapper>
          <IngredientWrapper>
            <h1>{recipe.RCP_NM}</h1>
            <h2>재료:</h2>
            <p>{recipe.RCP_PARTS_DTLS.split(',').join(', ')}</p>
            <h3>요리 종류 : {recipe.RCP_PAT2}</h3>
            <p>중량(1인분) : {recipe.INFO_WGT} g</p>
            <p>열량 : {recipe.INFO_ENG} kcal</p>
            <p>탄수화물 : {recipe.INFO_CAR} g</p>
            <p>단백질 : {recipe.INFO_PRO} g</p>
            <p>지방 : {recipe.INFO_FAT} g</p>
            <p>나트륨 : {recipe.INFO_NA} mg</p>
          </IngredientWrapper>
          <OrderWrapper>
            <h2>조리법:</h2>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((step) => {
              const manual = (recipe as any)[
                `MANUAL${step.toString().padStart(2, '0')}`
              ];
              const manualImg = (recipe as any)[
                `MANUAL_IMG${step.toString().padStart(2, '0')}`
              ];
              return manual ? (
                <div key={`step-${step}`}>
                  <p>
                    Step {step}: {manual}
                  </p>
                  {manualImg && <img src={manualImg} alt={`Step ${step}`} />}
                </div>
              ) : null;
            })}
            <h2>저감 조리법 TIP:</h2>
            <p>{recipe.RCP_NA_TIP}</p>
          </OrderWrapper>
        </RecipeDetailWrapper>
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

const RecipeDetailWrapper = styled.div`
  width: 90rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  position: relative;
  background-color: red;
  margin: 3rem 0;
`;
const ImgWrapper = styled.div`
  width: 40rem;
  height: 40rem;
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const IngredientWrapper = styled.div``;
const OrderWrapper = styled.div``;
const CommynityWrapper = styled.div``;
const BookmarkWrapper = styled.div``;
const CommentWrapper = styled.div``;
