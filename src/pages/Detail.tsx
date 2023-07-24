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
    return <div>로딩중</div>;
  }

  return (
    <>
      <PageWrapper>
        <RecipeDetailWrapper>
          <ImgTitleWrapper>
            <ImgWrapper>
              <Img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} />
            </ImgWrapper>
            <TItle>
              {recipe.RCP_PAT2} / {recipe.RCP_NM}
            </TItle>
          </ImgTitleWrapper>

          <IngredientWrapper>
            <Ingredient>
              <h1>재료</h1>
              <p>{recipe.RCP_PARTS_DTLS.split(',').join(', ')}</p>
            </Ingredient>
            <Ingredient>
              <h1>성분</h1>
              <p>
                중량(1인분):{' '}
                {recipe.INFO_WGT ? `${recipe.INFO_WGT} g` : '정보 없음'}
              </p>
              <p>열량: {recipe.INFO_ENG} kcal</p>
              <p>탄수화물: {recipe.INFO_CAR} g</p>
              <p>단백질: {recipe.INFO_PRO} g</p>
              <p>지방: {recipe.INFO_FAT} g</p>
              <p>나트륨: {recipe.INFO_NA} mg</p>
            </Ingredient>
          </IngredientWrapper>
          <OrderWrapper>
            <h1>조리법</h1>
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
  width: 80rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  position: relative;
  /* background-color: red; */
  margin: 3rem 0;
`;

const ImgTitleWrapper = styled.div`
  border: 0.25rem solid ${COLORS.blue1};
  border-radius: 1rem;
  background-color: #ffffff;
`;

const ImgWrapper = styled.div`
  width: 40rem;
  height: 40rem;

  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1;
`;

const TItle = styled.div`
  margin: 2rem 0;
  text-align: center;
  font-weight: bold;
`;

const IngredientWrapper = styled.div`
  width: inherit;
  margin: 1rem 0;
`;

const Ingredient = styled.div`
  margin: 3rem 0;
  padding: 1rem;
  border: 0.25rem solid ${COLORS.blue2};
  border-radius: 1rem;
  text-align: center;
  background-color: #ffffff;

  h1 {
    margin-bottom: 1.5rem;
  }
`;
const OrderWrapper = styled.div`
  width: inherit;
`;
const CommynityWrapper = styled.div``;
const BookmarkWrapper = styled.div``;
const CommentWrapper = styled.div``;
