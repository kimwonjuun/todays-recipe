import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import { Recipe } from '../types/Recipe';
import { useRecipeData } from '../hooks/useRecipeData';
import { Loading } from '../components/common/Loading';

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
          <TopWrapper>
            <CardWrapper>
              <Img>
                <img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} />
              </Img>
              <Title>
                {recipe.RCP_PAT2} | {recipe.RCP_NM}
              </Title>
            </CardWrapper>
            <IngredientWrapper>
              <Ingredient>
                <h1>성분</h1>
                <List>
                  <Item>
                    <img src={require('../assets/ring1.png')} alt="Calories" />
                    <ItemText>
                      <p>열량</p>
                      <p>{recipe.INFO_ENG} kcal</p>
                    </ItemText>
                  </Item>
                  <Item>
                    <img
                      src={require('../assets/ring2.png')}
                      alt="Carbohydrates"
                    />
                    <ItemText>
                      <p>탄수화물</p>
                      <p>{recipe.INFO_CAR} g</p>
                    </ItemText>
                  </Item>
                  <Item>
                    <img src={require('../assets/ring1.png')} alt="Protein" />
                    <ItemText>
                      <p>단백질</p>
                      <p>{recipe.INFO_PRO} g</p>
                    </ItemText>
                  </Item>
                  <Item>
                    <img src={require('../assets/ring2.png')} alt="Fat" />
                    <ItemText>
                      <p>지방</p>
                      <p>{recipe.INFO_FAT} g</p>
                    </ItemText>
                  </Item>
                  <Item>
                    <img src={require('../assets/ring1.png')} alt="Sodium" />
                    <ItemText>
                      <p>나트륨</p>
                      <p>{recipe.INFO_NA} mg</p>
                    </ItemText>
                  </Item>
                </List>
                {/* <p>
                  중량(1인분):{' '}
                  {recipe.INFO_WGT ? `${recipe.INFO_WGT} g` : '해당 레시피는 중량이 따로 없습니다.'}
                </p> */}
              </Ingredient>
              <Ingredient>
                <h1>재료</h1>
                <p>{recipe.RCP_PARTS_DTLS.split(',').join(', ')}</p>
              </Ingredient>
            </IngredientWrapper>
          </TopWrapper>

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

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* gap: 1rem; */
  margin-bottom: 1rem;

  /* background-color: blue; */
`;

const CardWrapper = styled.div`
  width: 25rem;
  height: 35rem;
  /* border: 0.25rem solid ${COLORS.blue1}; */
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  position: relative;
  background-color: #fff;
`;

const Img = styled.div`
  width: inherit;
  height: 30rem;
  overflow: hidden;

  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: bold;
`;

const IngredientWrapper = styled.div`
  width: 53.5rem;
  height: 35rem;
  /* margin: 1rem 0; */
  /* display: flex; */
  flex-direction: column;
  /* justify-content: center; */
`;

const Ingredient = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 17rem;
  padding: 1.25rem;
  border-radius: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.12),
    0 0.25rem 0.5rem rgba(0, 0, 0, 0.24);
  &:first-child {
    margin-bottom: 1rem;
  }

  /* &:nth-child(2) {
    height: 19rem;
  } */

  h1 {
    margin-bottom: 1.5rem;
  }
`;

const List = styled.div`
  width: 100%;
  height: 9rem;

  display: flex;
  justify-content: space-between;

  /* background-color: yellow; */
`;

const Item = styled.div`
  width: 9rem;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const ItemText = styled.div`
  width: 7.5rem;
  height: 3.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.25rem;

  p {
    margin-bottom: 0.5rem;
  }

  p:last-child {
    font-size: 1.6rem;
    font-weight: bold;
  }
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
