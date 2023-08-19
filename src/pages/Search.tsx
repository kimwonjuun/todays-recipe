import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../styles/colors';
import Loading from '../components/common/Loading';
import { RecipeDataState } from '../recoil/atoms';
import { useRecoilValue } from 'recoil';
import ResultBox from '../components/search/ResultBox';

const Search = () => {
  // Recoil: RecipeDataState
  const recipeData = useRecoilValue(RecipeDataState);

  // main.tsx에서 넘어온 keyword
  const { keyword } = useParams<{ keyword: string }>();

  return (
    <>
      <PageWrapper>
        {recipeData.length === 0 || !keyword ? (
          <Loading />
        ) : (
          <ResultBox keyword={keyword} />
        )}
      </PageWrapper>
    </>
  );
};

export default Search;

const PageWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.backGround};
`;
