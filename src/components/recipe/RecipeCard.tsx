import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { Recipe } from '../../types/Recipe';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/detail/${recipe.RCP_SEQ}`);
  };

  return (
    <>
      <RecipeCardWrapper onClick={handleCardClick}>
        <RecipeImgWrapper>
          <Img src={recipe.ATT_FILE_NO_MK} alt={recipe.RCP_NM} />
        </RecipeImgWrapper>
        <RecipeTextWrapper>
          <p>{recipe.RCP_PAT2}</p>
          <h1>{recipe.RCP_NM}</h1>
        </RecipeTextWrapper>
      </RecipeCardWrapper>
    </>
  );
};
export default RecipeCard;

const Img = styled.img`
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease-in-out;
`;

const RecipeCardWrapper = styled.div`
  border-radius: 1rem;
  border: 0.3rem solid ${COLORS.blue1};
  min-width: 25rem;
  max-width: 25rem;
  min-height: 30rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: color 300ms ease-in-out;
  margin: 0 2.25rem 4.5rem 2.25rem;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${COLORS.blue2};
  }
  &:hover ${Img} {
    transform: scale(1.1);
  }
`;

const RecipeImgWrapper = styled.div`
  width: 30rem;
  height: 25rem;
  overflow: hidden;
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
