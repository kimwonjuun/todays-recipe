import styled from 'styled-components';
import COLORS from '../../styles/colors';

// 타입스크립트필요
const RecipeBox = ({ recipe }: { recipe: any }) => {
  return (
    <>
      <RecipeCardWrapper>
        <RecipeImgWrapper>
          <Img src={recipe.ATT_FILE_NO_MK} />
        </RecipeImgWrapper>
        <RecipeTextWrapper>
          <p>{recipe.RCP_PAT2}</p>
          <h1>{recipe.RCP_NM}</h1>
        </RecipeTextWrapper>
      </RecipeCardWrapper>
    </>
  );
};
export default RecipeBox;

const RecipeCardWrapper = styled.div`
  border-radius: 1rem;
  border: 0.25rem solid ${COLORS.blue1};
  min-width: 25rem;
  max-width: 25rem;
  min-height: 30rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: color 300ms ease-in-out;
  &:hover {
    color: ${COLORS.blue2};
  }
  margin: 0 2.25rem 4.5rem 2.25rem;

  align-items: center;
  justify-content: center;
`;

const RecipeImgWrapper = styled.div`
  width: 30rem;
  height: 25rem;
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
  height: 10rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  flex-direction: column;
  & > p {
    font-size: smaller;
  }
`;
