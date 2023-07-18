import styled from 'styled-components';
import COLORS from '../../styles/colors';

const RecipeBox = ({ recipe }: { recipe: any }) => {
  return (
    <>
      <RecipeBoxWrapper>
        <RecipeImgWrapper>
          <Img src={recipe.ATT_FILE_NO_MK} />
        </RecipeImgWrapper>
        <RecipeTextWrapper>
          <p>{recipe.RCP_PAT2}</p>
          <h1>{recipe.RCP_NM}</h1>
        </RecipeTextWrapper>
      </RecipeBoxWrapper>
    </>
  );
};
export default RecipeBox;

const RecipeBoxWrapper = styled.div`
  border-radius: 1rem;
  border: 0.2rem solid ${COLORS.blue2};
  min-width: 28rem;
  min-height: 30rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: color 300ms ease-in-out;
  &:hover {
    color: ${COLORS.blue1};
  }
  margin-bottom: 5rem;

  align-items: center;
  justify-content: center;
`;

const RecipeImgWrapper = styled.div`
  width: 100%;
  height: 22rem;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  /* transition: transform 100ms ease-in-out; */
  transition: -webkit-transform 0.4s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const RecipeTextWrapper = styled.div`
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;
