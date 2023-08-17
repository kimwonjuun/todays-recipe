import styled from 'styled-components';
import COLORS from '../styles/colors';
import RecipeBox from '../components/recipe/RecipeBox';
import Loading from '../components/common/Loading';
import { RecipeDataState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';

const RecipePage = () => {
  // Recoil: RecipeDataState
  const recipeData = useRecoilValue(RecipeDataState);

  return (
    <PageWrapper>
      {recipeData.length === 0 ? (
        <Loading />
      ) : (
        <BoxWrapper>
          <RecipeBox />
        </BoxWrapper>
      )}
    </PageWrapper>
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
