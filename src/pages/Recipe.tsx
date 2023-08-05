import styled from 'styled-components';
import COLORS from '../styles/colors';
import RecipeBox from '../components/recipe/RecipeBox';
import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';
import { RecipeDataState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

const RecipePage = () => {
  // 기존 레시피 데이터 (훅)
  // const recipeData = useRecipeData();

  // recoil 도입
  const recipeData = useRecoilValue(RecipeDataState);

  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (recipeData.length > 0) {
      setLoading(false);
    }
  }, [recipeData]);

  return (
    <>
      <PageWrapper>
        {loading ? (
          <Loading />
        ) : (
          <BoxWrapper>
            <RecipeBox recipeData={recipeData} />
          </BoxWrapper>
        )}
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
  background-color: ${COLORS.backGround};
`;

const BoxWrapper = styled.div`
  width: 90rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 2rem;
  margin-top: 8rem;
`;
