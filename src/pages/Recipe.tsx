import styled from 'styled-components';
import COLORS from '../styles/colors';
import { RecipeBox } from '../components/recipe/RecipeBox';
import { useState, useEffect } from 'react';
import { useRecipeData } from '../hooks/useRecipeData';
import { Loading } from '../components/common/Loading';
// import { useRecoilValueLoadable } from 'recoil';
// import { fetchRecipeData } from '../recoil/recipeState';

const RecipePage = () => {
  // 레시피 데이터
  const recipeData = useRecipeData();
  // const recipeDataLoadable = useRecoilValueLoadable(fetchRecipeData(null));
  // const recipeData =
  //   recipeDataLoadable.state === 'hasValue' ? recipeDataLoadable.contents : [];

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
