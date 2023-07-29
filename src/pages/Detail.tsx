import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { Recipe } from '../types/Recipe';
import { useRecipeData } from '../hooks/useRecipeData';
import { Loading } from '../components/common/Loading';
import { IngredientDiv } from '../components/detail/IngredientDiv';

const Detail = () => {
  // Recipe/RecipeBox, Search에서 받아온 각 레시피가 가지고 있는 고유한 id
  const { id } = useParams<{ id: string }>();

  // 특정 레시피를 담아줄 state
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  // useRecipeData를 사용하여 레시피 데이터 받아오기
  const recipeData = useRecipeData();

  // 전체 레시피와 선택한 레시피의 고유한 id가 같다면 출력
  useEffect(() => {
    const selectedRecipe = recipeData.find(
      (recipe: Recipe) => recipe.RCP_SEQ === id
    );
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    }
  }, [id, recipeData]);

  if (!recipe) {
    return <Loading />;
  }

  return (
    <>
      <PageWrapper>
        <DetailWrapper>
          <IngredientDiv recipe={recipe} />

          <BottomWrapper>
            <h1>조리법</h1>
            {/* 만드는 방법 최대 길이 20 */}
            {Array.from({ length: 20 }, (_, i) => i + 1).map((step) => {
              const manual = (recipe as any)[
                `MANUAL${step.toString().padStart(2, '0')}`
              ];
              const manualImg = (recipe as any)[
                `MANUAL_IMG${step.toString().padStart(2, '0')}`
              ];

              return manual ? (
                <CookingStep key={`step-${step}`}>
                  {manualImg && (
                    <img src={manualImg} alt={`Step ${step}`} width="50%" />
                  )}
                  <p>
                    Step {step}:{' '}
                    {manual.replace(/^\d+\./g, '').replace('-', ':')}
                  </p>
                </CookingStep>
              ) : null;
            })}
            <TipWrapper>
              <h1>저감 조리법 TIP</h1>
              <p>{recipe.RCP_NA_TIP}</p>
            </TipWrapper>
          </BottomWrapper>
        </DetailWrapper>
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

const DetailWrapper = styled.div`
  width: 80rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  font-size: 1.6rem;
  position: relative;
  margin: 4rem 0;
  overflow: hidden;
`;

const BottomWrapper = styled.div`
  background-color: #fff;
  border: 0.25rem solid ${COLORS.blue1};
  border-radius: 1rem;
  text-align: center;
  padding: 1rem;

  h1 {
    margin-bottom: 1.5rem;
  }
`;

const CookingStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  background-color: #fff;

  p {
    margin-bottom: 1rem;
  }

  img {
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
`;

const TipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  border: 0.25rem solid ${COLORS.blue2};
  border-radius: 1rem;
  background-color: #fff;
  margin-bottom: 0;
`;

const CommynityWrapper = styled.div``;
const BookmarkWrapper = styled.div``;
const CommentWrapper = styled.div``;
