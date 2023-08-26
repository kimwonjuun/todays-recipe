import styled from 'styled-components';
import COLORS from '../styles/colors';
import RecipeBox from '../components/recipe/RecipeBox';
import Loading from '../components/common/Loading';
import { RecipeDataState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';

const RecipePage = () => {
  // Recoil: RecipeDataState
  const recipeData = useRecoilValue(RecipeDataState);

  return (
    <>
      <Helmet>
        <title>todays recipe</title>
      </Helmet>
      <PageWrapper>
        {recipeData.length === 0 ? <Loading /> : <RecipeBox />}
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
